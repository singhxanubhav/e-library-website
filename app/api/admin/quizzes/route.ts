import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";

export const dynamic = "force-dynamic";

function checkAdminOrEditor(role?: string) {
  return role === "admin" || role === "editor";
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
      const dbQuizzes = await prisma.quiz.findMany({
        include: {
          questions: true,
          company: { select: { name: true, slug: true } },
          theme: { select: { name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      if (dbQuizzes && dbQuizzes.length > 0) {
        return NextResponse.json({
          quizzes: dbQuizzes.map((q) => ({
            id: q.id,
            type: q.type,
            title: q.title,
            description: q.description,
            passingScorePercent: q.passingScorePercent,
            questionCount: q.questions.length,
            companyName: q.company?.name,
            themeName: q.theme?.name,
          })),
        });
      }
    } catch (err) {
      console.warn("DB quiz admin fetch fallback:", err);
    }

    return NextResponse.json({
      quizzes: SEEDED_QUIZZES.map((q) => ({
        id: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        passingScorePercent: q.passingScorePercent,
        questionCount: q.questions.length,
        companySlug: q.companySlug,
        themeSlug: q.themeSlug,
      })),
    });
  } catch (error) {
    console.error("Error in GET /api/admin/quizzes:", error);
    return NextResponse.json({ error: "Failed to load quizzes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, type, passingScorePercent, companyId, themeId } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
      const createdQuiz = await prisma.quiz.create({
        data: {
          title,
          description: description || "Comprehensive architectural assessment",
          type: (type as any) || "module",
          passingScorePercent: Number(passingScorePercent) || 70,
          companyId: companyId || null,
          themeId: themeId || null,
          questions: {
            create: [
              {
                type: "mcq",
                text: `What is the core architectural objective highlighted in the "${title}" assessment?`,
                options: [
                  { id: "opt_1", text: "Decoupled inferencing with verified guardrails and vertical data moat" },
                  { id: "opt_2", text: "Monolithic model deployment without caching or rate limits" },
                  { id: "opt_3", text: "Zero-data fine tuning on uncurated public web crawl" },
                  { id: "opt_4", text: "Synchronous compute scaling without observability or telemetry" },
                ],
                correctOptionId: "opt_1",
                explanation: "Modern AI business architecture focuses on decoupled inferencing pipelines with defensive guardrails and proprietary vertical data moats.",
                sortOrder: 1,
              },
            ],
          },
        },
        include: {
          questions: true,
        },
      });

      return NextResponse.json({
        message: "Assessment created successfully",
        quiz: {
          id: createdQuiz.id,
          type: createdQuiz.type,
          title: createdQuiz.title,
          description: createdQuiz.description,
          passingScorePercent: createdQuiz.passingScorePercent,
          questionCount: createdQuiz.questions.length,
        },
      });
    } catch (err: any) {
      console.error("DB quiz create error:", err);
      return NextResponse.json(
        { error: err.message || "Failed to create assessment in database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/admin/quizzes:", error);
    return NextResponse.json({ error: "Failed to create assessment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing quiz ID" }, { status: 400 });
    }

    try {
      await prisma.quiz.delete({ where: { id } });
    } catch (err) {
      console.warn("DB quiz delete fallback:", err);
    }

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/quizzes:", error);
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}
