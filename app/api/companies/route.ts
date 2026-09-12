import { NextRequest, NextResponse } from "next/server";
import { getCompanies } from "@/lib/companies";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as any) || "name";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "9", 10);

    // Support comma-separated or multiple entries for filter arrays
    const parseFilter = (key: string): string[] => {
      const all = searchParams.getAll(key);
      if (all.length > 0) {
        return all.flatMap((v) => v.split(",")).map((v) => v.trim()).filter(Boolean);
      }
      return [];
    };

    const industry = parseFilter("industry");
    const technique = parseFilter("technique");
    const geography = parseFilter("geography");
    const businessModel = parseFilter("businessModel");
    const stage = parseFilter("stage");

    const data = await getCompanies({
      search,
      sort,
      page,
      pageSize,
      industry,
      technique,
      geography,
      businessModel,
      stage,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/companies:", error);
    return NextResponse.json(
      { error: "Failed to retrieve companies" },
      { status: 500 }
    );
  }
}
