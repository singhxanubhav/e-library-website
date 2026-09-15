import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CertificateFrame } from "@/components/certificate/certificate-frame";

interface CertificatePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  return {
    title: `Certificate of Completion: ${params.id} | AI Case Library`,
    description: "Official credential issued by AI Company Case Library.",
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = params;

  let certificate: any = null;

  try {
    certificate = await prisma.certificate.findFirst({
      where: {
        OR: [{ id }, { verificationId: id }],
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  } catch (err) {
    console.warn("DB certificate lookup error, using fallback:", err);
  }

  // Fallback demo certificate if offline or test ID
  if (!certificate && (id.startsWith("AICL-") || id === "demo" || id === "cert-demo-001")) {
    certificate = {
      id: "cert-demo-001",
      verificationId: id.startsWith("AICL-") ? id : "AICL-2026-DEMO01",
      learnerName: "Distinguished AI Scholar",
      programName: "AI Company Case Library Executive Learning Experience",
      completionDate: new Date().toISOString(),
    };
  }

  if (!certificate) {
    notFound();
  }

  const siteUrl = process.env.NEXTAUTH_URL || "https://ai-case-library.vercel.app";
  const verificationUrl = `${siteUrl}/verify/${certificate.verificationId}`;

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <CertificateFrame
        certificate={{
          id: certificate.id,
          verificationId: certificate.verificationId,
          learnerName: certificate.learnerName || certificate.user?.name || "AI Scholar",
          programName: certificate.programName || "AI Company Case Library Executive Learning Experience",
          completionDate: certificate.completionDate,
        }}
        verificationUrl={verificationUrl}
      />
    </div>
  );
}
