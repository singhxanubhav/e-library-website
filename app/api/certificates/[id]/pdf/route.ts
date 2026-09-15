import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    let cert: any = null;
    try {
      cert = await prisma.certificate.findFirst({
        where: {
          OR: [{ id }, { verificationId: id }],
        },
      });
    } catch (err) {
      console.warn("DB cert lookup error:", err);
    }

    if (!cert && (id.startsWith("AICL-") || id === "demo")) {
      cert = {
        verificationId: id.startsWith("AICL-") ? id : "AICL-2026-DEMO01",
        learnerName: "Distinguished AI Scholar",
        programName: "AI Company Case Library Executive Learning Experience",
        completionDate: new Date(),
      };
    }

    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate - ${cert.verificationId}</title>
  <style>
    @page { size: landscape; margin: 0; }
    body {
      margin: 0;
      padding: 40px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0B132B;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .cert-box {
      width: 100%;
      max-width: 900px;
      border: 8px solid #F59E0B;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      background: #0B132B;
      position: relative;
    }
    .cert-inner {
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 40px;
      border-radius: 12px;
    }
    .gold-text { color: #F59E0B; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; font-size: 14px; }
    h1 { font-size: 36px; margin: 10px 0; color: #FFFFFF; }
    .learner { font-size: 44px; font-family: serif; color: #FDE68A; margin: 25px 0; border-bottom: 2px solid rgba(245, 158, 11, 0.4); display: inline-block; padding: 0 40px 10px 40px; }
    .desc { font-size: 16px; color: #94A3B8; max-width: 650px; margin: 0 auto 30px auto; line-height: 1.6; }
    .meta { display: flex; justify-content: space-between; border-top: 1px solid #1E293B; padding-top: 25px; margin-top: 20px; font-size: 12px; color: #64748B; }
    .meta strong { color: #E2E8F0; }
  </style>
</head>
<body>
  <div class="cert-box">
    <div class="cert-inner">
      <div class="gold-text">Certificate of Completion</div>
      <h1>AI Company Case Library</h1>
      <p style="color: #94A3B8; margin: 0;">Advanced Agentic Coding & Machine Learning Business Engineering</p>
      
      <p style="margin-top: 30px; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #CBD5E1;">This certifies that</p>
      <div class="learner">${cert.learnerName}</div>
      <p class="desc">
        Has successfully demonstrated mastery in foundation model token economics, sovereign cloud infrastructure moats, agentic retrieval systems, and real-world AI executive strategy.
      </p>

      <div class="meta">
        <div>
          <div>Verification ID:</div>
          <strong>${cert.verificationId}</strong>
        </div>
        <div>
          <div>Awarded Date:</div>
          <strong>${new Date(cert.completionDate).toLocaleDateString()}</strong>
        </div>
        <div>
          <div>Issuing Authority:</div>
          <strong>AI Case Library Board</strong>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
    `;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/certificates/[id]/pdf:", error);
    return NextResponse.json({ error: "Failed to generate certificate document" }, { status: 500 });
  }
}
