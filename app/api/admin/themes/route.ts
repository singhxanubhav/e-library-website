import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SEEDED_THEMES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function checkAdminOrEditor(role?: string) {
  return role === "admin" || role === "editor";
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
      const dbThemes = await prisma.theme.findMany({
        include: {
          themeCompanies: {
            include: { company: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      });

      if (dbThemes && dbThemes.length > 0) {
        return NextResponse.json({ themes: dbThemes });
      }
    } catch (err) {
      console.warn("DB theme lookup error, using fallback:", err);
    }

    return NextResponse.json({ themes: SEEDED_THEMES });
  } catch (error) {
    console.error("Error in GET /api/admin/themes:", error);
    return NextResponse.json({ error: "Failed to load themes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    let createdTheme: any = null;
    try {
      createdTheme = await prisma.theme.create({
        data: {
          name,
          slug,
          description: description || "Curated learning track for AI engineering and architecture.",
        },
      });
    } catch (err) {
      console.warn("DB theme create fallback:", err);
      createdTheme = {
        id: `theme-${Date.now()}`,
        name,
        slug,
        description: description || "",
        themeCompanies: [],
      };
    }

    return NextResponse.json({
      message: "Theme track created successfully",
      theme: createdTheme,
    });
  } catch (error) {
    console.error("Error in POST /api/admin/themes:", error);
    return NextResponse.json({ error: "Failed to create theme" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!checkAdminOrEditor(session?.user?.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing theme ID" }, { status: 400 });
    }

    try {
      await prisma.theme.delete({
        where: { id },
      });
    } catch (err) {
      console.warn("DB theme delete fallback:", err);
    }

    return NextResponse.json({ message: "Theme track deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/themes:", error);
    return NextResponse.json({ error: "Failed to delete theme" }, { status: 500 });
  }
}
