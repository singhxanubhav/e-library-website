import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SEEDED_THEMES, SEEDED_COMPANIES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Get user completed companies if logged in
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
        console.warn("Could not query user progress for themes:", err);
      }
    }

    // Attempt DB query
    try {
      const dbThemes = await prisma.theme.findMany({
        include: {
          themeCompanies: {
            include: { company: true },
            orderBy: { sortOrder: "asc" },
          },
          quizzes: {
            select: { id: true, title: true, passingScorePercent: true },
          },
        },
      });

      if (dbThemes && dbThemes.length > 0) {
        const themes = dbThemes.map((t) => {
          const companies = t.themeCompanies.map((tc) => tc.company);
          const totalCompanies = companies.length;
          const completedCount = companies.filter(
            (c) => completedCompanyIds.has(c.id) || completedCompanyIds.has(c.slug)
          ).length;
          const progressPercent =
            totalCompanies > 0 ? Math.round((completedCount / totalCompanies) * 100) : 0;

          return {
            id: t.id,
            slug: t.slug,
            name: t.name,
            description: t.description,
            companyCount: totalCompanies,
            companies: companies.map((c) => ({
              slug: c.slug,
              name: c.name,
              hqCountry: c.hqCountry,
              fundingStage: c.fundingStage,
              readingTimeMin: c.readingTimeMin,
              isCompleted: completedCompanyIds.has(c.id) || completedCompanyIds.has(c.slug),
            })),
            quiz: t.quizzes[0] || null,
            progressPercent,
            completedCount,
          };
        });

        return NextResponse.json({ themes });
      }
    } catch (err) {
      // Fall through to memory fallback
    }

    // Memory store fallback
    const themes = SEEDED_THEMES.map((t) => {
      const themeCompanies = t.companySlugs
        .map((slug) => SEEDED_COMPANIES.find((c) => c.slug === slug))
        .filter(Boolean);

      const totalCompanies = themeCompanies.length;
      const completedCount = themeCompanies.filter(
        (c) => c && completedCompanyIds.has(c.slug)
      ).length;
      const progressPercent =
        totalCompanies > 0 ? Math.round((completedCount / totalCompanies) * 100) : 0;

      return {
        id: `theme-${t.slug}`,
        slug: t.slug,
        name: t.name,
        description: t.description,
        companyCount: totalCompanies,
        companies: themeCompanies.map((c: any) => ({
          slug: c.slug,
          name: c.name,
          hqCountry: c.hqCountry,
          fundingStage: c.fundingStage,
          readingTimeMin: c.readingTimeMin,
          isCompleted: completedCompanyIds.has(c.slug),
        })),
        quiz: {
          id: `quiz-theme-${t.slug.split("-")[0]}`,
          title: `Theme Mastery: ${t.name}`,
          passingScorePercent: 70,
        },
        progressPercent,
        completedCount,
      };
    });

    return NextResponse.json({ themes });
  } catch (error) {
    console.error("Error in GET /api/themes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve themes" },
      { status: 500 }
    );
  }
}
