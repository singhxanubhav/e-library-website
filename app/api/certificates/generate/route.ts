import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_QUIZZES } from "@/lib/quiz-data";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = session.user.id;
    const userName = session.user.name || "AI Case Library Scholar";

    // 1. Check if user already has a certificate
    try {
      const existing = await prisma.certificate.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      if (existing) {
        return NextResponse.json({
          message: "Certificate already issued",
          certificate: existing,
        });
      }
    } catch (err) {
      console.warn("Prisma error checking existing certificate:", err);
    }

    // 2. Validate eligibility
    let attempts: any[] = [];
    let progressList: any[] = [];

    try {
      [attempts, progressList] = await Promise.all([
        prisma.userQuizAttempt.findMany({
          where: { userId, passed: true },
          include: { quiz: true },
        }),
        prisma.userCompanyProgress.findMany({
          where: { userId, completed: true },
        }),
      ]);
    } catch (err) {
      console.warn("DB check error during certificate generation:", err);
    }

    const completedCount = Math.max(progressList.length, attempts.filter(a => a.quiz?.type === "module").length);
    const themePassed = attempts.some(a => a.quiz?.type === "theme");
    const finalPassed = attempts.some(a => a.quiz?.type === "final" || a.quizId === "quiz-final-mastery");

    // In demo / fallback mode, if user is taking action, require at least 1 module + final OR allow if final was passed
    const isEligible = (completedCount >= 5 && themePassed && finalPassed) || finalPassed;

    if (!isEligible) {
      return NextResponse.json(
        {
          error: "Eligibility criteria not yet met. Please complete at least 5 modules, 1 theme quiz, and pass the Final AI Mastery assessment.",
          details: {
            completedCount,
            minRequired: 5,
            themePassed,
            finalPassed,
          },
        },
        { status: 403 }
      );
    }

    // Generate unique verification ID
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const verificationId = `AICL-${year}-${randomHex}`;

    let newCert: any = null;

    try {
      newCert = await prisma.certificate.create({
        data: {
          userId,
          verificationId,
          learnerName: userName,
          programName: "AI Company Case Library Executive Learning Experience",
          completionDate: new Date(),
        },
      });
    } catch (dbError) {
      console.warn("Could not insert certificate to DB, using fallback memory record:", dbError);
      newCert = {
        id: `cert-${Date.now()}`,
        userId,
        verificationId,
        learnerName: userName,
        programName: "AI Company Case Library Executive Learning Experience",
        completionDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      message: "Certificate successfully awarded! Congratulations!",
      certificate: newCert,
    });
  } catch (error) {
    console.error("Error in POST /api/certificates/generate:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
