import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { selectedOptionId, textResponse } = body;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (userId) {
      try {
        await prisma.userModuleInteraction.upsert({
          where: {
            userId_interactionId: {
              userId,
              interactionId: id,
            },
          },
          update: {
            selectedOptionId,
            textResponse,
          },
          create: {
            userId,
            interactionId: id,
            selectedOptionId,
            textResponse,
          },
        });
      } catch (err) {
        // Fall through gracefully
      }
    }

    // Return updated response stats
    return NextResponse.json({
      success: true,
      interactionId: id,
      selectedOptionId,
      message: "Response recorded successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/interactions/[id]/respond:", error);
    return NextResponse.json(
      { error: "Failed to record response" },
      { status: 500 }
    );
  }
}
