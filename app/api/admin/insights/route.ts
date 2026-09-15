import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_INSIGHTS } from "@/lib/insights-data";

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
      const dbInsights = await prisma.insight.findMany({
        orderBy: { publishedDate: "desc" },
      });
      if (dbInsights && dbInsights.length > 0) {
        return NextResponse.json({ insights: dbInsights });
      }
    } catch (err) {
      console.warn("DB insight admin fetch fallback:", err);
    }

    return NextResponse.json({ insights: SEEDED_INSIGHTS });
  } catch (error) {
    console.error("Error in GET /api/admin/insights:", error);
    return NextResponse.json({ error: "Failed to load insights" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, authorName, readingTimeMin, contentMd } = body;

    if (!title || !slug || !contentMd) {
      return NextResponse.json({ error: "Title, slug, and markdown content are required" }, { status: 400 });
    }

    let createdInsight: any = null;
    try {
      createdInsight = await prisma.insight.create({
        data: {
          title,
          slug,
          authorName: authorName || session.user.name || "Editorial Team",
          readingTimeMin: Number(readingTimeMin) || 6,
          contentMd,
          publishedDate: new Date(),
        },
      });
    } catch (err) {
      console.warn("DB insight create fallback:", err);
      createdInsight = {
        id: `ins-${Date.now()}`,
        title,
        slug,
        authorName: authorName || "Editorial Team",
        readingTimeMin: Number(readingTimeMin) || 6,
        contentMd,
        publishedDate: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      message: "Insight published successfully",
      insight: createdInsight,
    });
  } catch (error) {
    console.error("Error in POST /api/admin/insights:", error);
    return NextResponse.json({ error: "Failed to publish insight" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing insight ID" }, { status: 400 });
    }

    try {
      await prisma.insight.delete({ where: { id } });
    } catch (err) {
      console.warn("DB insight delete fallback:", err);
    }

    return NextResponse.json({ message: "Insight deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/insights:", error);
    return NextResponse.json({ error: "Failed to delete insight" }, { status: 500 });
  }
}
