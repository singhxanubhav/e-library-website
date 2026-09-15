import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";
import { SEEDED_COMPANIES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = session.user.id;
    let attempts: any[] = [];
    let progressList: any[] = [];
    let certificates: any[] = [];

    try {
      [attempts, progressList, certificates] = await Promise.all([
        prisma.userQuizAttempt.findMany({
          where: { userId },
          include: { quiz: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.userCompanyProgress.findMany({
          where: { userId, completed: true },
        }),
        prisma.certificate.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
        }),
      ]);
    } catch (err) {
      console.warn("Could not query DB for quiz-certificate status, using fallback:", err);
    }

    // Map attempts by quizId (or slug)
    const attemptsByQuiz = new Map<string, { bestScore: number; passed: boolean; count: number }>();
    for (const att of attempts) {
      const qKey = att.quiz?.id || att.quizId;
      const current = attemptsByQuiz.get(qKey) || { bestScore: 0, passed: false, count: 0 };
      current.count += 1;
      if (att.scorePercent > current.bestScore) {
        current.bestScore = att.scorePercent;
      }
      if (att.passed) {
        current.passed = true;
      }
      attemptsByQuiz.set(qKey, current);
    }

    // Build categorized quiz lists
    const moduleQuizzes = SEEDED_QUIZZES.filter((q) => q.type === "module").map((q) => {
      const att = attemptsByQuiz.get(q.id) || attemptsByQuiz.get(q.companySlug || "");
      return {
        id: q.id,
        type: q.type,
        companySlug: q.companySlug,
        title: q.title,
        description: q.description,
        passingScorePercent: q.passingScorePercent,
        questionCount: q.questions.length,
        status: att?.passed ? "passed" : att?.count ? "failed" : "unattempted",
        bestScore: att?.bestScore ?? null,
        attemptsCount: att?.count || 0,
      };
    });

    const themeQuizzes = SEEDED_QUIZZES.filter((q) => q.type === "theme").map((q) => {
      const att = attemptsByQuiz.get(q.id) || attemptsByQuiz.get(q.themeSlug || "");
      return {
        id: q.id,
        type: q.type,
        themeSlug: q.themeSlug,
        title: q.title,
        description: q.description,
        passingScorePercent: q.passingScorePercent,
        questionCount: q.questions.length,
        status: att?.passed ? "passed" : att?.count ? "failed" : "unattempted",
        bestScore: att?.bestScore ?? null,
        attemptsCount: att?.count || 0,
      };
    });

    const scenarioQuizzes = SEEDED_QUIZZES.filter((q) => q.type === "scenario").map((q) => {
      const att = attemptsByQuiz.get(q.id);
      return {
        id: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        passingScorePercent: q.passingScorePercent,
        questionCount: q.questions.length,
        status: att?.passed ? "passed" : att?.count ? "failed" : "unattempted",
        bestScore: att?.bestScore ?? null,
        attemptsCount: att?.count || 0,
      };
    });

    const finalQuizzes = SEEDED_QUIZZES.filter((q) => q.type === "final").map((q) => {
      const att = attemptsByQuiz.get(q.id);
      return {
        id: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        passingScorePercent: q.passingScorePercent,
        questionCount: q.questions.length,
        status: att?.passed ? "passed" : att?.count ? "failed" : "unattempted",
        bestScore: att?.bestScore ?? null,
        attemptsCount: att?.count || 0,
      };
    });

    const completedModulesCount = Math.max(progressList.length, moduleQuizzes.filter((q) => q.status === "passed").length);
    const themeQuizzesPassedCount = themeQuizzes.filter((q) => q.status === "passed").length;
    const scenarioPassed = scenarioQuizzes.some((q) => q.status === "passed");
    const finalPassed = finalQuizzes.some((q) => q.status === "passed");
    const finalBestScore = finalQuizzes[0]?.bestScore || 0;

    // Eligibility check:
    // 1. At least 5 company modules completed
    // 2. At least 1 theme quiz passed
    // 3. Final AI Mastery Certification Quiz passed (>= 70%)
    const minModulesRequired = 5;
    const hasMinModules = completedModulesCount >= minModulesRequired;
    const hasThemeQuiz = themeQuizzesPassedCount >= 1;
    const hasFinalQuiz = finalPassed;
    const isEligible = hasMinModules && hasThemeQuiz && hasFinalQuiz;

    const latestCertificate = certificates[0]
      ? {
          id: certificates[0].id,
          verificationId: certificates[0].verificationId,
          learnerName: certificates[0].learnerName,
          completionDate: certificates[0].completionDate,
          programName: certificates[0].programName,
        }
      : null;

    return NextResponse.json({
      user: {
        id: userId,
        name: session.user.name || "Learner",
        email: session.user.email,
      },
      stats: {
        totalModules: SEEDED_COMPANIES.length,
        completedModulesCount,
        themeQuizzesPassedCount,
        scenarioPassed,
        finalPassed,
        finalBestScore,
      },
      eligibility: {
        minModulesRequired,
        completedModulesCount,
        hasMinModules,
        hasThemeQuiz,
        hasFinalQuiz,
        isEligible,
      },
      certificate: latestCertificate,
      quizzes: {
        module: moduleQuizzes,
        theme: themeQuizzes,
        scenario: scenarioQuizzes,
        final: finalQuizzes,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/quiz-certificate/status:", error);
    return NextResponse.json({ error: "Failed to load quiz & certificate status" }, { status: 500 });
  }
}
