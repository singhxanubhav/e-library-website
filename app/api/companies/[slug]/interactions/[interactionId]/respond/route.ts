import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { recordUserActivity, checkAndAwardBadges } from "@/lib/progress";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string; interactionId: string } }
) {
  try {
    const { slug, interactionId } = params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || "guest-user-001";

    const body = await request.json();
    const { selectedOptionId, textResponse } = body;

    let existingResponse = null;
    let isNew = true;

    try {
      // Check if user already responded (unique constraint userId_interactionId)
      existingResponse = await prisma.userModuleInteraction.findUnique({
        where: {
          userId_interactionId: {
            userId,
            interactionId,
          },
        },
      });

      if (existingResponse) {
        // Gracefully return existing response instead of throwing a conflict error
        isNew = false;
      } else {
        await prisma.userModuleInteraction.create({
          data: {
            userId,
            interactionId,
            selectedOptionId,
            textResponse,
          },
        });

        await recordUserActivity(userId);
        await checkAndAwardBadges(userId);
      }
    } catch (dbError) {
      console.warn("DB interaction upsert failed, continuing gracefully:", dbError);
    }

    return NextResponse.json({
      success: true,
      isNew,
      selectedOptionId: existingResponse?.selectedOptionId || selectedOptionId,
      textResponse: existingResponse?.textResponse || textResponse,
      message: isNew
        ? "Your perspective was recorded successfully."
        : "You have already voted on this dilemma. Showing current results.",
    });
  } catch (error) {
    console.error("Error in POST /api/companies/[slug]/interactions/[interactionId]/respond:", error);
    return NextResponse.json(
      { error: "Failed to record response" },
      { status: 500 }
    );
  }
}
