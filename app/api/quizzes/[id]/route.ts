import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 1. Try DB lookup
    try {
      const dbQuiz = await prisma.quiz.findUnique({
        where: { id },
        include: {
          questions: {
            orderBy: { sortOrder: "asc" },
          },
        },
      });

      if (dbQuiz) {
        // Strip correctOptionId and explanation
        const safeQuestions = dbQuiz.questions.map((q) => ({
          id: q.id,
          type: q.type,
          text: q.text,
          options: q.options,
          sortOrder: q.sortOrder,
        }));

        return NextResponse.json({
          quiz: {
            id: dbQuiz.id,
            type: dbQuiz.type,
            title: dbQuiz.title,
            description: dbQuiz.description,
            passingScorePercent: dbQuiz.passingScorePercent,
            companyId: dbQuiz.companyId,
            themeId: dbQuiz.themeId,
            questions: safeQuestions,
          },
        });
      }
    } catch (err) {
      // Fall through to memory store
    }

    // 2. Check SEEDED_QUIZZES
    const memQuiz = SEEDED_QUIZZES.find(
      (q) => q.id === id || q.companySlug === id
    );

    if (!memQuiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Strip answers from payload
    const safeQuestions = memQuiz.questions.map((q) => ({
      id: q.id,
      type: q.type,
      text: q.text,
      options: q.options,
      sortOrder: q.sortOrder,
    }));

    return NextResponse.json({
      quiz: {
        id: memQuiz.id,
        type: memQuiz.type,
        companySlug: memQuiz.companySlug,
        themeSlug: memQuiz.themeSlug,
        title: memQuiz.title,
        description: memQuiz.description,
        passingScorePercent: memQuiz.passingScorePercent,
        questions: safeQuestions,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/quizzes/[id]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve quiz" },
      { status: 500 }
    );
  }
}
