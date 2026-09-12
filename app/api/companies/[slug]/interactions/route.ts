import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_COMPANIES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // 1. Try DB
    try {
      const dbCompany = await prisma.company.findUnique({
        where: { slug },
        include: {
          moduleInteractions: {
            include: {
              userAnswers: {
                select: {
                  selectedOptionId: true,
                  textResponse: true,
                  createdAt: true,
                  userId: true,
                },
              },
            },
          },
        },
      });

      if (dbCompany && dbCompany.moduleInteractions.length > 0) {
        const inter = dbCompany.moduleInteractions[0];
        const options = (inter.options as any[]) || [];
        const totalAnswers = inter.userAnswers.length;

        // Calculate option counts
        const countMap = new Map<string, number>();
        options.forEach((opt) => countMap.set(opt.id, 0));

        let userChoice: string | null = null;
        let userText: string | null = null;

        inter.userAnswers.forEach((ans) => {
          if (ans.selectedOptionId) {
            countMap.set(
              ans.selectedOptionId,
              (countMap.get(ans.selectedOptionId) || 0) + 1
            );
          }
          if (userId && ans.userId === userId) {
            userChoice = ans.selectedOptionId;
            userText = ans.textResponse;
          }
        });

        // Compute percentages with base simulated total
        const baseVotes = 1200;
        const totalVotes = baseVotes + totalAnswers;

        const computedOptions = options.map((opt) => {
          const actualVotes = countMap.get(opt.id) || 0;
          const defaultPct = opt.percentage || 25;
          const weightedPct =
            totalAnswers > 0
              ? Math.round(
                  (defaultPct * baseVotes + (actualVotes / totalAnswers) * 100 * totalAnswers) /
                    totalVotes
                )
              : defaultPct;

          return {
            id: opt.id,
            text: opt.text,
            description: opt.description,
            voteCount: actualVotes,
            percentage: weightedPct,
          };
        });

        // Anonymized peer reflections
        const peerSnippets = inter.userAnswers
          .filter((a) => a.textResponse && a.textResponse.trim())
          .map((a) => ({
            text: a.textResponse,
            createdAt: a.createdAt,
          }));

        return NextResponse.json({
          interaction: {
            id: inter.id,
            type: inter.type,
            promptText: inter.promptText,
            options: computedOptions,
            totalVotes,
            userResponse: userChoice
              ? { selectedOptionId: userChoice, textResponse: userText }
              : null,
            peerSnippets: peerSnippets.slice(0, 10),
          },
        });
      }
    } catch (err) {
      // Fallback
    }

    // Memory fallback
    const comp = SEEDED_COMPANIES.find((c) => c.slug === slug);
    if (!comp || !comp.interaction) {
      return NextResponse.json({ error: "Interaction not found" }, { status: 404 });
    }

    return NextResponse.json({
      interaction: comp.interaction,
    });
  } catch (error) {
    console.error("Error in GET /api/companies/[slug]/interactions:", error);
    return NextResponse.json(
      { error: "Failed to retrieve interaction" },
      { status: 500 }
    );
  }
}
