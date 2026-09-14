import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SEEDED_THEMES, SEEDED_COMPANIES } from "@/lib/mock-data";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const completedCompanyIds = new Set<string>();
    if (userId) {
      try {
        const userProgress = await prisma.userCompanyProgress.findMany({
          where: { userId, completed: true },
          select: { companyId: true, company: { select: { slug: true } } },
        });
        userProgress.forEach((p) => {
          completedCompanyIds.add(p.companyId);
          if (p.company?.slug) completedCompanyIds.add(p.company.slug);
        });
      } catch (err) {
        console.warn("Could not query user progress:", err);
      }
    }

    // Try DB
    try {
      const dbTheme = await prisma.theme.findUnique({
        where: { slug },
        include: {
          themeCompanies: {
            include: { company: true },
            orderBy: { sortOrder: "asc" },
          },
          quizzes: {
            select: { id: true, title: true, description: true, passingScorePercent: true },
          },
        },
      });

      if (dbTheme) {
        const companies = dbTheme.themeCompanies.map((tc) => ({
          ...tc.company,
          isCompleted:
            completedCompanyIds.has(tc.company.id) ||
            completedCompanyIds.has(tc.company.slug),
        }));

        const completedCount = companies.filter((c) => c.isCompleted).length;
        const allCompleted = companies.length > 0 && completedCount === companies.length;

        return NextResponse.json({
          theme: {
            id: dbTheme.id,
            slug: dbTheme.slug,
            name: dbTheme.name,
            description: dbTheme.description,
            companies,
            quiz: dbTheme.quizzes[0] || {
              id: "quiz-theme-sovereign",
              title: `Theme Mastery: ${dbTheme.name}`,
              passingScorePercent: 70,
            },
            completedCount,
            totalCompanies: companies.length,
            allCompleted,
          },
        });
      }
    } catch (err) {
      // Fallback to memory
    }

    // Memory fallback
    const memTheme = SEEDED_THEMES.find((t) => t.slug === slug);
    if (!memTheme) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    const companies = memTheme.companySlugs
      .map((compSlug) => {
        const found = SEEDED_COMPANIES.find((c) => c.slug === compSlug);
        if (!found) return null;
        return {
          ...found,
          isCompleted: completedCompanyIds.has(found.slug),
        };
      })
      .filter(Boolean);

    const completedCount = companies.filter((c: any) => c.isCompleted).length;
    const allCompleted = companies.length > 0 && completedCount === companies.length;

    const quiz =
      SEEDED_QUIZZES.find((q) => q.themeSlug === slug) ||
      SEEDED_QUIZZES.find((q) => q.type === "theme") || {
        id: "quiz-theme-sovereign",
        title: `Theme Mastery: ${memTheme.name}`,
        passingScorePercent: 70,
      };

    return NextResponse.json({
      theme: {
        id: `theme-${memTheme.slug}`,
        slug: memTheme.slug,
        name: memTheme.name,
        description: memTheme.description,
        companies,
        quiz,
        completedCount,
        totalCompanies: companies.length,
        allCompleted,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/themes/[slug]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve theme details" },
      { status: 500 }
    );
  }
}
