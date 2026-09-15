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

    let dbInsights: any[] = [];
    try {
      dbInsights = await prisma.insight.findMany({
        orderBy: { publishedDate: "desc" },
      });
    } catch (err) {
      console.warn("DB insight admin fetch fallback:", err);
    }

    const dbSlugs = new Set(dbInsights.map((i) => i.slug));
    const missingSeeded = SEEDED_INSIGHTS.filter((s) => !dbSlugs.has(s.slug));

    return NextResponse.json({
      insights: [...dbInsights, ...missingSeeded],
    });
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

    if (!title || !contentMd) {
      return NextResponse.json({ error: "Title and markdown content are required" }, { status: 400 });
    }

    const cleanSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
      .trim()
      .toLowerCase();

    let finalSlug = cleanSlug;
    try {
      const existing = await prisma.insight.findUnique({ where: { slug: cleanSlug } });
      if (existing) {
        finalSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch (e) {
      // Continue
    }

    try {
      const createdInsight = await prisma.insight.create({
        data: {
          title,
          slug: finalSlug,
          authorName: authorName || session.user.name || "Editorial Team",
          readingTimeMin: Number(readingTimeMin) || 6,
          contentMd,
          publishedDate: new Date(),
        },
      });

      return NextResponse.json({
        message: "Insight published successfully",
        insight: createdInsight,
      });
    } catch (err: any) {
      console.error("DB insight create error:", err);
      return NextResponse.json(
        { error: err.message || "Failed to publish article to database" },
        { status: 500 }
      );
    }
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
