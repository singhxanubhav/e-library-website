import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";
import { recordUserActivity, checkAndAwardBadges, markCompanyComplete } from "@/lib/progress";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { answers } = body as {
      answers: Array<{ questionId: string; selectedOptionId: string }>;
    };

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid answers array provided" },
        { status: 400 }
      );
    }

    // Identify Quiz
    let questionsWithAnswers: Array<{
      id: string;
      correctOptionId: string;
      explanation: string;
    }> = [];
    let passingScorePercent = 70;
    let quizType = "module";
    let companyIdOrSlug: string | undefined;

    // 1. Try DB
    try {
      const dbQuiz = await prisma.quiz.findUnique({
        where: { id },
        include: { questions: true, company: true },
      });
      if (dbQuiz) {
        passingScorePercent = dbQuiz.passingScorePercent;
        quizType = dbQuiz.type;
        companyIdOrSlug = dbQuiz.companyId || dbQuiz.company?.slug;
        questionsWithAnswers = dbQuiz.questions.map((q) => ({
          id: q.id,
          correctOptionId: q.correctOptionId,
          explanation: q.explanation,
        }));
      }
    } catch (err) {
      // Fall through to memory
    }

    // 2. Try memory store if not found in DB
    if (questionsWithAnswers.length === 0) {
      const memQuiz = SEEDED_QUIZZES.find(
        (q) => q.id === id || q.companySlug === id
      );
      if (memQuiz) {
        passingScorePercent = memQuiz.passingScorePercent;
        quizType = memQuiz.type;
        companyIdOrSlug = memQuiz.companySlug;
        questionsWithAnswers = memQuiz.questions.map((q) => ({
          id: q.id,
          correctOptionId: q.correctOptionId,
          explanation: q.explanation,
        }));
      }
    }

    if (questionsWithAnswers.length === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Answer evaluation
    const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedOptionId]));
    let correctCount = 0;

    const perQuestion = questionsWithAnswers.map((q) => {
      const selected = answerMap.get(q.id);
      const isCorrect = selected === q.correctOptionId;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        correct: isCorrect,
        correctOptionId: q.correctOptionId,
        explanation: q.explanation,
      };
    });

    const scorePercent = Math.round(
      (correctCount / questionsWithAnswers.length) * 100
    );
    const passed = scorePercent >= passingScorePercent;

    // User session integration
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (userId) {
      try {
        await prisma.userQuizAttempt.create({
          data: {
            userId,
            quizId: id,
            scorePercent,
            passed,
            answers: answers as any,
          },
        });

        await recordUserActivity(userId);

        if (passed && quizType === "module" && companyIdOrSlug) {
          await markCompanyComplete(userId, companyIdOrSlug);
        }

        await checkAndAwardBadges(userId);
      } catch (dbError) {
        console.warn("Could not save attempt in DB:", dbError);
      }
    }

    return NextResponse.json({
      scorePercent,
      passed,
      passingScorePercent,
      totalQuestions: questionsWithAnswers.length,
      correctCount,
      perQuestion,
    });
  } catch (error) {
    console.error("Error in POST /api/quizzes/[id]/attempt:", error);
    return NextResponse.json(
      { error: "Failed to process quiz attempt" },
      { status: 500 }
    );
  }
}
