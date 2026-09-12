import { NextRequest, NextResponse } from "next/server";
import { getTags } from "@/lib/companies";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;

    const tags = await getTags(type);
    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Error in GET /api/tags:", error);
    return NextResponse.json(
      { error: "Failed to retrieve tags" },
      { status: 500 }
    );
  }
}
