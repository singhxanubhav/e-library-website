import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-client";
    const limitCheck = rateLimit(`forgot-password:${ip}`, 5, 15 * 60 * 1000);
    if (!limitCheck.success) {
      return NextResponse.json(
        {
          error: `Too many password reset requests. Please try again in ${limitCheck.resetInSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = body?.email?.toLowerCase().trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    let token = crypto.randomBytes(32).toString("hex");
    let userFound = false;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        userFound = true;
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        await prisma.passwordResetToken.create({
          data: {
            userId: user.id,
            token,
            expiresAt,
          },
        });
      }
    } catch (err) {
      console.warn("DB password reset error, falling back to simulated flow:", err);
    }

    // In demo environment, provide the direct reset URL in the response
    const resetUrl = `/reset-password?token=${token}`;

    return NextResponse.json({
      success: true,
      message: "If an account matches this email, password reset instructions have been generated.",
      resetUrl,
      note: "In production, this link is delivered via email service.",
    });
  } catch (error) {
    console.error("Error in POST /api/auth/forgot-password:", error);
    return NextResponse.json(
      { error: "Internal server error processing reset request." },
      { status: 500 }
    );
  }
}
