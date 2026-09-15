"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Award, Printer, Share2, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CertificateFrameProps {
  certificate: {
    id: string;
    verificationId: string;
    learnerName: string;
    programName: string;
    completionDate: string | Date;
  };
  verificationUrl: string;
}

export function CertificateFrame({ certificate, verificationUrl }: CertificateFrameProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(certificate.completionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-secondary/30 border border-border print:hidden">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />
          <span className="truncate">
            Verified: <strong className="text-foreground font-mono">{certificate.verificationId}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="rounded-xl flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </Button>
          <Button
            size="sm"
            onClick={handlePrint}
            className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </Button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div
        id="certificate-print-area"
        className="relative bg-[#0B132B] text-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-10 md:p-16 border-4 sm:border-8 border-[#F59E0B]/80 shadow-2xl overflow-hidden print:border-4 print:p-8 print:rounded-none print:shadow-none print:m-0"
      >
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#5B6CFF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        {/* Inner Gold Border */}
        <div className="border border-[#F59E0B]/30 rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#F59E0B] to-amber-300 text-[#0B132B] shadow-lg shadow-amber-500/20 mb-1 sm:mb-2">
              <Award className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>
            <div className="text-[10px] sm:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#F59E0B] font-semibold">
              Executive Certificate of Completion
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              AI Company Case Library
            </h1>
            <p className="text-[11px] sm:text-sm text-slate-400 font-light max-w-xl mx-auto">
              Advanced Agentic Coding & Machine Learning Business Engineering
            </p>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 sm:space-y-6 my-6 sm:my-10 max-w-2xl mx-auto">
            <p className="text-xs sm:text-base text-slate-300 uppercase tracking-widest font-mono">
              This is to officially certify that
            </p>
            <div className="py-2 border-b border-[#F59E0B]/40 inline-block px-3 sm:px-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-200 tracking-wide">
                {certificate.learnerName}
              </h2>
            </div>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed pt-1 sm:pt-2">
              has completed the comprehensive curricular requirements of the{" "}
              <span className="font-semibold text-white">
                {certificate.programName}
              </span>
              , demonstrating mastery in foundation model token economics, sovereign cloud moats, agentic retrieval architectures, and real-world executive dilemmas.
            </p>
          </div>

          {/* Footer Seals & Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-end pt-12 mt-8 border-t border-slate-800 text-center sm:text-left">
            {/* Signature 1 */}
            <div className="space-y-2">
              <div className="font-serif italic text-lg text-amber-200/90 border-b border-slate-700 pb-1">
                Google DeepMind Fellow
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Academic Program Director
              </div>
            </div>

            {/* Middle QR Code & Verification */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <QRCodeSVG
                  value={verificationUrl}
                  size={90}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <div className="text-[11px] font-mono text-slate-400 text-center">
                <span>Scan to Verify</span>
                <br />
                <span className="text-amber-400 font-bold">{certificate.verificationId}</span>
              </div>
            </div>

            {/* Signature 2 / Date */}
            <div className="space-y-2 text-center sm:text-right">
              <div className="font-mono text-sm text-slate-200 border-b border-slate-700 pb-1">
                {formattedDate}
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Date of Conferral
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Verification footer link (hidden when printing) */}
      <div className="text-center text-xs text-muted-foreground pt-4 print:hidden">
        <span>To independently verify this credential, visit </span>
        <Link
          href={`/verify/${certificate.verificationId}`}
          className="text-[#5B6CFF] underline underline-offset-4 hover:text-[#5B6CFF]/80 inline-flex items-center gap-1"
        >
          {verificationUrl}
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
