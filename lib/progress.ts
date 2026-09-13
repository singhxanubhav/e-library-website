import { prisma } from "./db";
import { SEEDED_BADGES } from "./quiz-data";

export async function recordUserActivity(userId: string) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userStreak = await prisma.userStreak.findUnique({
      where: { userId },
    });

    if (!userStreak) {
      await prisma.userStreak.create({
        data: {
          userId,
          currentStreakDays: 1,
          longestStreakDays: 1,
          lastActivityDate: new Date(),
        },
      });
      return;
    }

    const lastDate = new Date(userStreak.lastActivityDate);
    lastDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Activity occurred today, streak unchanged
      await prisma.userStreak.update({
        where: { userId },
        data: { lastActivityDate: new Date() },
      });
    } else if (diffDays === 1) {
      // Consecutive day!
      const newStreak = userStreak.currentStreakDays + 1;
      const newLongest = Math.max(userStreak.longestStreakDays, newStreak);
      await prisma.userStreak.update({
        where: { userId },
        data: {
          currentStreakDays: newStreak,
          longestStreakDays: newLongest,
          lastActivityDate: new Date(),
        },
      });
    } else if (diffDays > 1) {
      // Streak broken, reset to 1
      await prisma.userStreak.update({
        where: { userId },
        data: {
          currentStreakDays: 1,
          lastActivityDate: new Date(),
        },
      });
    }
  } catch (error) {
    console.warn("Could not record user streak activity:", error);
  }
}

export async function checkAndAwardBadges(userId: string) {
  try {
    // 1. Gather user stats
    const [modulesCompleted, passedAttempts, streakRecord, existingBadges] =
      await Promise.all([
        prisma.userCompanyProgress.count({
          where: { userId, completed: true },
        }),
        prisma.userQuizAttempt.findMany({
          where: { userId, passed: true },
          include: { quiz: true },
        }),
        prisma.userStreak.findUnique({
          where: { userId },
        }),
        prisma.userBadge.findMany({
          where: { userId },
          include: { badge: true },
        }),
      ]);

    const ownedBadgeSlugs = new Set(existingBadges.map((ub) => ub.badge.slug));

    const themeQuizzesPassed = passedAttempts.filter(
      (a) => a.quiz?.type === "theme"
    ).length;

    const streakDays = streakRecord?.currentStreakDays || 1;

    // Ensure all badges exist in DB
    for (const b of SEEDED_BADGES) {
      const dbBadge = await prisma.badge.upsert({
        where: { slug: b.slug },
        update: { name: b.name, description: b.description },
        create: {
          slug: b.slug,
          name: b.name,
          description: b.description,
          criteriaJson: b.criteriaJson,
        },
      });

      if (ownedBadgeSlugs.has(b.slug)) continue;

      // Check criteria
      let eligible = false;
      const crit = b.criteriaJson as any;

      if (crit.modules_completed && modulesCompleted >= crit.modules_completed) {
        eligible = true;
      }
      if (crit.theme_quizzes_passed && themeQuizzesPassed >= crit.theme_quizzes_passed) {
        eligible = true;
      }
      if (crit.streak_days && streakDays >= crit.streak_days) {
        eligible = true;
      }

      if (eligible) {
        await prisma.userBadge.create({
          data: {
            userId,
            badgeId: dbBadge.id,
          },
        });
        console.log(`🏆 Awarded badge "${b.name}" to user ${userId}`);
      }
    }
  } catch (error) {
    console.warn("Could not check and award badges:", error);
  }
}

export async function markCompanyComplete(userId: string, companyId: string) {
  try {
    await prisma.userCompanyProgress.upsert({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      update: {
        completed: true,
        lastAccessedAt: new Date(),
      },
      create: {
        userId,
        companyId,
        completed: true,
        lastAccessedAt: new Date(),
      },
    });

    await recordUserActivity(userId);
    await checkAndAwardBadges(userId);
  } catch (error) {
    console.warn("Could not mark company complete in DB:", error);
  }
}
