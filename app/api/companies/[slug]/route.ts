import { NextRequest, NextResponse } from "next/server";
import { getCompanyBySlug } from "@/lib/companies";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const result = await getCompanyBySlug(slug);

    if (!result.company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET /api/companies/[slug]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve company details" },
      { status: 500 }
    );
  }
}
