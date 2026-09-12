import { prisma } from "./db";
import { SEEDED_COMPANIES, SEEDED_TAGS, SEEDED_THEMES } from "./mock-data";
import { CompanyData, CompanyFilterParams, TagItem } from "@/types";

export async function getTags(type?: string): Promise<TagItem[]> {
  try {
    const whereClause = type ? { type: type as any } : {};
    const dbTags = await prisma.tag.findMany({
      where: whereClause,
      orderBy: [{ type: "asc" }, { value: "asc" }],
    });
    if (dbTags && dbTags.length > 0) {
      return dbTags.map((t) => ({ id: t.id, type: t.type as any, value: t.value }));
    }
  } catch (error) {
    // Graceful fallback to seeded static data
  }

  let filtered = SEEDED_TAGS;
  if (type) {
    filtered = filtered.filter((t) => t.type === type);
  }
  return filtered.map((t, idx) => ({
    id: `tag-${idx}-${t.value.toLowerCase().replace(/\s+/g, "-")}`,
    type: t.type,
    value: t.value,
  }));
}

export async function getCompanies(params: CompanyFilterParams = {}) {
  const {
    search,
    industry = [],
    technique = [],
    geography = [],
    businessModel = [],
    stage = [],
    sort = "name",
    page = 1,
    pageSize = 9,
  } = params;

  try {
    // Attempt Prisma query
    const whereAnd: any[] = [];

    if (search && search.trim()) {
      const q = search.trim();
      whereAnd.push({
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { valueProposition: { contains: q, mode: "insensitive" } },
          { sector: { contains: q, mode: "insensitive" } },
          { problemDescription: { contains: q, mode: "insensitive" } },
        ],
      });
    }

    const tagFilters = [
      ...industry,
      ...technique,
      ...geography,
      ...businessModel,
      ...stage,
    ].filter(Boolean);

    if (tagFilters.length > 0) {
      whereAnd.push({
        companyTags: {
          some: {
            tag: {
              value: { in: tagFilters },
            },
          },
        },
      });
    }

    const where = whereAnd.length > 0 ? { AND: whereAnd } : {};

    let orderBy: any = { name: "asc" };
    if (sort === "foundingYear") orderBy = { foundingYear: "desc" };
    if (sort === "readingTime") orderBy = { readingTimeMin: "asc" };
    if (sort === "stage") orderBy = { fundingStage: "asc" };

    const total = await prisma.company.count({ where });
    const dbCompanies = await prisma.company.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        companyTags: {
          include: { tag: true },
        },
        moduleInteractions: true,
      },
    });

    if (dbCompanies && dbCompanies.length > 0) {
      const companies: CompanyData[] = dbCompanies.map((c) => {
        const tags: Record<string, string[]> = {
          industry: [],
          technique: [],
          business_model: [],
          geography: [],
          stage: [],
        };
        c.companyTags.forEach((ct) => {
          if (ct.tag && tags[ct.tag.type]) {
            tags[ct.tag.type].push(ct.tag.value);
          }
        });

        const inter = c.moduleInteractions[0];

        return {
          id: c.id,
          slug: c.slug,
          name: c.name,
          logoUrl: c.logoUrl,
          logoPermission: c.logoPermission,
          founders: c.founders,
          foundingYear: c.foundingYear,
          hqCity: c.hqCity,
          hqCountry: c.hqCountry,
          sector: c.sector,
          valueProposition: c.valueProposition,
          fundingStage: c.fundingStage,
          notableInvestors: c.notableInvestors,
          problemDescription: c.problemDescription,
          aiSolutionDescription: c.aiSolutionDescription,
          businessModelDescription: c.businessModelDescription,
          tractionMetrics: (c.tractionMetrics as any) || {},
          keyInsights: c.keyInsights,
          funFact: c.funFact,
          readingTimeMin: c.readingTimeMin,
          isFeatured: c.isFeatured,
          tags,
          interaction: inter
            ? {
                id: inter.id,
                type: inter.type as any,
                promptText: inter.promptText,
                options: (inter.options as any) || [],
              }
            : undefined,
        };
      });

      return {
        companies,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }
  } catch (error) {
    // Fallback to rich in-memory dataset
  }

  // Resilient fallback implementation
  let results = [...SEEDED_COMPANIES];

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.valueProposition.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.problemDescription.toLowerCase().includes(q)
    );
  }

  if (industry.length > 0) {
    results = results.filter((c) =>
      c.tags?.industry?.some((t) => industry.includes(t))
    );
  }

  if (technique.length > 0) {
    results = results.filter((c) =>
      c.tags?.technique?.some((t) => technique.includes(t))
    );
  }

  if (geography.length > 0) {
    results = results.filter((c) =>
      c.tags?.geography?.some((t) => geography.includes(t))
    );
  }

  if (businessModel.length > 0) {
    results = results.filter((c) =>
      c.tags?.business_model?.some((t) => businessModel.includes(t))
    );
  }

  if (stage.length > 0) {
    results = results.filter((c) =>
      c.tags?.stage?.some((t) => stage.includes(t))
    );
  }

  // Sorting
  if (sort === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "foundingYear") {
    results.sort((a, b) => b.foundingYear - a.foundingYear);
  } else if (sort === "readingTime") {
    results.sort((a, b) => a.readingTimeMin - b.readingTimeMin);
  } else if (sort === "stage") {
    results.sort((a, b) => a.fundingStage.localeCompare(b.fundingStage));
  }

  const total = results.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paged = results.slice(startIndex, startIndex + pageSize);

  return {
    companies: paged,
    pagination: {
      total,
      page,
      pageSize,
      totalPages,
    },
  };
}

export async function getCompanyBySlug(slug: string): Promise<{
  company: CompanyData | null;
  prevCompany: { slug: string; name: string } | null;
  nextCompany: { slug: string; name: string } | null;
}> {
  try {
    const dbComp = await prisma.company.findUnique({
      where: { slug },
      include: {
        companyTags: { include: { tag: true } },
        moduleInteractions: true,
      },
    });

    if (dbComp) {
      const allCompanies = await prisma.company.findMany({
        select: { slug: true, name: true },
        orderBy: { name: "asc" },
      });

      const currentIndex = allCompanies.findIndex((c) => c.slug === slug);
      const prev = currentIndex > 0 ? allCompanies[currentIndex - 1] : null;
      const next =
        currentIndex < allCompanies.length - 1
          ? allCompanies[currentIndex + 1]
          : null;

      const tags: Record<string, string[]> = {
        industry: [],
        technique: [],
        business_model: [],
        geography: [],
        stage: [],
      };
      dbComp.companyTags.forEach((ct) => {
        if (ct.tag && tags[ct.tag.type]) {
          tags[ct.tag.type].push(ct.tag.value);
        }
      });

      const inter = dbComp.moduleInteractions[0];

      const company: CompanyData = {
        id: dbComp.id,
        slug: dbComp.slug,
        name: dbComp.name,
        logoUrl: dbComp.logoUrl,
        logoPermission: dbComp.logoPermission,
        founders: dbComp.founders,
        foundingYear: dbComp.foundingYear,
        hqCity: dbComp.hqCity,
        hqCountry: dbComp.hqCountry,
        sector: dbComp.sector,
        valueProposition: dbComp.valueProposition,
        fundingStage: dbComp.fundingStage,
        notableInvestors: dbComp.notableInvestors,
        problemDescription: dbComp.problemDescription,
        aiSolutionDescription: dbComp.aiSolutionDescription,
        businessModelDescription: dbComp.businessModelDescription,
        tractionMetrics: (dbComp.tractionMetrics as any) || {},
        keyInsights: dbComp.keyInsights,
        funFact: dbComp.funFact,
        readingTimeMin: dbComp.readingTimeMin,
        isFeatured: dbComp.isFeatured,
        tags,
        interaction: inter
          ? {
              id: inter.id,
              type: inter.type as any,
              promptText: inter.promptText,
              options: (inter.options as any) || [],
            }
          : undefined,
      };

      return {
        company,
        prevCompany: prev,
        nextCompany: next,
      };
    }
  } catch (err) {
    // Fallback
  }

  const currentIndex = SEEDED_COMPANIES.findIndex((c) => c.slug === slug);
  if (currentIndex === -1) {
    return { company: null, prevCompany: null, nextCompany: null };
  }

  const company = SEEDED_COMPANIES[currentIndex];
  const prev =
    currentIndex > 0
      ? {
          slug: SEEDED_COMPANIES[currentIndex - 1].slug,
          name: SEEDED_COMPANIES[currentIndex - 1].name,
        }
      : null;
  const next =
    currentIndex < SEEDED_COMPANIES.length - 1
      ? {
          slug: SEEDED_COMPANIES[currentIndex + 1].slug,
          name: SEEDED_COMPANIES[currentIndex + 1].name,
        }
      : null;

  return {
    company,
    prevCompany: prev,
    nextCompany: next,
  };
}
