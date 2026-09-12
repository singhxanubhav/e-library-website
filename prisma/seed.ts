import { PrismaClient, TagType, InteractionType, QuizType, QuestionType } from "@prisma/client";
import { SEEDED_TAGS, SEEDED_COMPANIES, SEEDED_THEMES } from "../lib/mock-data";
import { SEEDED_QUIZZES, SEEDED_BADGES } from "../lib/quiz-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AI Company Case Library seed...");

  // 1. Seed Tags
  console.log("Inserting tags...");
  const tagMap = new Map<string, string>(); // "type:value" -> id

  for (const tag of SEEDED_TAGS) {
    const createdTag = await prisma.tag.upsert({
      where: {
        type_value: {
          type: tag.type as TagType,
          value: tag.value,
        },
      },
      update: {},
      create: {
        type: tag.type as TagType,
        value: tag.value,
      },
    });
    tagMap.set(`${tag.type}:${tag.value}`, createdTag.id);
  }
  console.log(`✅ Seeded ${SEEDED_TAGS.length} tags.`);

  // 2. Seed Companies & Interactions
  console.log("Inserting companies & interactions...");
  const companyIdMap = new Map<string, string>(); // slug -> id

  for (const comp of SEEDED_COMPANIES) {
    const createdCompany = await prisma.company.upsert({
      where: { slug: comp.slug },
      update: {
        name: comp.name,
        founders: comp.founders,
        foundingYear: comp.foundingYear,
        hqCity: comp.hqCity,
        hqCountry: comp.hqCountry,
        sector: comp.sector,
        valueProposition: comp.valueProposition,
        fundingStage: comp.fundingStage,
        notableInvestors: comp.notableInvestors,
        problemDescription: comp.problemDescription,
        aiSolutionDescription: comp.aiSolutionDescription,
        businessModelDescription: comp.businessModelDescription,
        tractionMetrics: comp.tractionMetrics as any,
        keyInsights: comp.keyInsights,
        funFact: comp.funFact,
        readingTimeMin: comp.readingTimeMin,
        isFeatured: comp.isFeatured,
      },
      create: {
        slug: comp.slug,
        name: comp.name,
        founders: comp.founders,
        foundingYear: comp.foundingYear,
        hqCity: comp.hqCity,
        hqCountry: comp.hqCountry,
        sector: comp.sector,
        valueProposition: comp.valueProposition,
        fundingStage: comp.fundingStage,
        notableInvestors: comp.notableInvestors,
        problemDescription: comp.problemDescription,
        aiSolutionDescription: comp.aiSolutionDescription,
        businessModelDescription: comp.businessModelDescription,
        tractionMetrics: comp.tractionMetrics as any,
        keyInsights: comp.keyInsights,
        funFact: comp.funFact,
        readingTimeMin: comp.readingTimeMin,
        isFeatured: comp.isFeatured,
      },
    });

    companyIdMap.set(comp.slug, createdCompany.id);

    // Attach tags
    if (comp.tags) {
      for (const [tagCategory, tagValues] of Object.entries(comp.tags)) {
        for (const val of tagValues) {
          const tagId = tagMap.get(`${tagCategory}:${val}`);
          if (tagId) {
            await prisma.companyTag.upsert({
              where: {
                companyId_tagId: {
                  companyId: createdCompany.id,
                  tagId,
                },
              },
              update: {},
              create: {
                companyId: createdCompany.id,
                tagId,
              },
            });
          }
        }
      }
    }

    // Seed Interaction
    if (comp.interaction) {
      const inter = comp.interaction;
      const existingInter = await prisma.moduleInteraction.findFirst({
        where: { companyId: createdCompany.id },
      });

      if (!existingInter) {
        await prisma.moduleInteraction.create({
          data: {
            companyId: createdCompany.id,
            type: inter.type as InteractionType,
            promptText: inter.promptText,
            options: inter.options as any,
          },
        });
      }
    }
  }
  console.log(`✅ Seeded ${SEEDED_COMPANIES.length} companies.`);

  // 3. Seed Themes
  console.log("Inserting themes...");
  const themeIdMap = new Map<string, string>(); // slug -> id

  for (const theme of SEEDED_THEMES) {
    const createdTheme = await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: {
        name: theme.name,
        description: theme.description,
      },
      create: {
        slug: theme.slug,
        name: theme.name,
        description: theme.description,
      },
    });

    themeIdMap.set(theme.slug, createdTheme.id);

    let sortOrder = 0;
    for (const compSlug of theme.companySlugs) {
      const companyId = companyIdMap.get(compSlug);
      if (companyId) {
        await prisma.themeCompany.upsert({
          where: {
            themeId_companyId: {
              themeId: createdTheme.id,
              companyId,
            },
          },
          update: { sortOrder },
          create: {
            themeId: createdTheme.id,
            companyId,
            sortOrder,
          },
        });
        sortOrder++;
      }
    }
  }
  console.log(`✅ Seeded ${SEEDED_THEMES.length} themes.`);

  // 4. Seed Quizzes & Questions
  console.log("Inserting quizzes and questions...");
  for (const quiz of SEEDED_QUIZZES) {
    const companyId = quiz.companySlug ? companyIdMap.get(quiz.companySlug) : undefined;
    const themeId = quiz.themeSlug ? themeIdMap.get(quiz.themeSlug) : undefined;

    const createdQuiz = await prisma.quiz.upsert({
      where: { id: quiz.id },
      update: {
        type: quiz.type as QuizType,
        title: quiz.title,
        description: quiz.description,
        passingScorePercent: quiz.passingScorePercent,
        companyId,
        themeId,
      },
      create: {
        id: quiz.id,
        type: quiz.type as QuizType,
        title: quiz.title,
        description: quiz.description,
        passingScorePercent: quiz.passingScorePercent,
        companyId,
        themeId,
      },
    });

    for (const q of quiz.questions) {
      await prisma.question.upsert({
        where: { id: q.id },
        update: {
          quizId: createdQuiz.id,
          type: q.type as QuestionType,
          text: q.text,
          options: q.options as any,
          correctOptionId: q.correctOptionId,
          explanation: q.explanation,
          sortOrder: q.sortOrder,
        },
        create: {
          id: q.id,
          quizId: createdQuiz.id,
          type: q.type as QuestionType,
          text: q.text,
          options: q.options as any,
          correctOptionId: q.correctOptionId,
          explanation: q.explanation,
          sortOrder: q.sortOrder,
        },
      });
    }
  }
  console.log(`✅ Seeded ${SEEDED_QUIZZES.length} quizzes and their questions.`);

  // 5. Seed Badges
  console.log("Inserting badges...");
  for (const b of SEEDED_BADGES) {
    await prisma.badge.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        description: b.description,
        criteriaJson: b.criteriaJson,
      },
      create: {
        slug: b.slug,
        name: b.name,
        description: b.description,
        criteriaJson: b.criteriaJson,
      },
    });
  }
  console.log(`✅ Seeded ${SEEDED_BADGES.length} badges.`);

  console.log("🎉 All seed data successfully generated!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
