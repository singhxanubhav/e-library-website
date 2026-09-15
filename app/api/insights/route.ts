import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SEEDED_ARTICLES } from "@/lib/insights-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    let dbInsights: any[] = [];
    try {
      dbInsights = await prisma.insight.findMany({
        orderBy: { publishedDate: "desc" },
      });
    } catch (err) {
      console.warn("Could not query DB for public insights:", err);
    }

    // Format DB insights into displayable articles
    const formattedDbInsights = dbInsights.map((ins) => {
      // Generate summary from first 160 chars of markdown
      const cleanSummary = ins.contentMd
        .replace(/^#+\s+/gm, "")
        .replace(/\*\*/g, "")
        .replace(/\n+/g, " ")
        .slice(0, 180)
        .trim() + "...";

      const tags = (ins.tagsJson as string[]) || ["Industry Analysis", "Architecture"];

      return {
        slug: ins.slug,
        title: ins.title,
        author: ins.authorName,
        readingTimeMin: ins.readingTimeMin,
        publishedDate: ins.publishedDate.toISOString().split("T")[0],
        summary: cleanSummary,
        tags,
      };
    });

    // Merge with seeded articles (avoiding duplicate slugs)
    const dbSlugs = new Set(formattedDbInsights.map((a) => a.slug));
    const missingSeeded = SEEDED_ARTICLES.filter((a) => !dbSlugs.has(a.slug));

    return NextResponse.json({
      insights: [...formattedDbInsights, ...missingSeeded],
    });
  } catch (error) {
    console.error("Error in GET /api/insights:", error);
    return NextResponse.json({ insights: SEEDED_ARTICLES });
  }
}
