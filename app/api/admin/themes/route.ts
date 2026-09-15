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

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const cleanSlug = (slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
      .trim()
      .toLowerCase();

    let finalSlug = cleanSlug;
    try {
      const existing = await prisma.theme.findUnique({ where: { slug: cleanSlug } });
      if (existing) {
        finalSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch (e) {
      // Continue
    }

    try {
      const createdTheme = await prisma.theme.create({
        data: {
          name,
          slug: finalSlug,
          description: description || "Curated learning track for AI engineering and architecture.",
        },
      });

      return NextResponse.json({
        message: "Theme track created successfully",
        theme: createdTheme,
      });
    } catch (err: any) {
      console.error("DB theme create error:", err);
      return NextResponse.json(
        { error: err.message || "Failed to create theme in database" },
        { status: 500 }
      );
    }
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
