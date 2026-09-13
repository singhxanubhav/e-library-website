import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;
    const companyId = searchParams.get("companyId") || undefined;
    const themeId = searchParams.get("themeId") || undefined;

    // First attempt DB lookup
    try {
      const where: any = {};
      if (type) where.type = type;
      if (companyId) where.companyId = companyId;
      if (themeId) where.themeId = themeId;

      const dbQuizzes = await prisma.quiz.findMany({
        where,
        select: {
          id: true,
          type: true,
          title: true,
          description: true,
          passingScorePercent: true,
          companyId: true,
          themeId: true,
        },
      });

      if (dbQuizzes && dbQuizzes.length > 0) {
        return NextResponse.json({ quizzes: dbQuizzes });
      }
    } catch (err) {
      // Fall through to memory store
    }

    // Fallback from SEEDED_QUIZZES
    let filtered = [...SEEDED_QUIZZES];
    if (type) {
      filtered = filtered.filter((q) => q.type === type);
    }
    if (companyId) {
      filtered = filtered.filter(
        (q) => q.companySlug === companyId || q.id.includes(companyId)
      );
    }
    if (themeId) {
      filtered = filtered.filter(
        (q) => q.themeSlug === themeId || q.id.includes(themeId)
      );
    }

    const quizzes = filtered.map((q) => ({
      id: q.id,
      type: q.type,
      title: q.title,
      description: q.description,
      passingScorePercent: q.passingScorePercent,
      companySlug: q.companySlug,
      themeSlug: q.themeSlug,
      questionCount: q.questions.length,
    }));

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Error in GET /api/quizzes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve quizzes" },
      { status: 500 }
    );
  }
}
