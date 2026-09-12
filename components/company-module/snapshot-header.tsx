"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "@/types";
import { getInitials } from "@/lib/utils";

const FLAG_MAP: Record<string, string> = {
  India: "🇮🇳",
  US: "🇺🇸",
  Europe: "🇪🇺",
  Global: "🌐",
};

export function SnapshotHeader({ company }: { company: CompanyData }) {
  const flag = FLAG_MAP[company.hqCountry] || "🌐";
  const initials = getInitials(company.name);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-10 shadow-card"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-electric-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 h-56 w-56 rounded-full bg-purpleAccent-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
              <span>{flag}</span>
              <span>
                {company.hqCity}, {company.hqCountry}
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-electric-500/20 px-3 py-1 text-xs font-semibold text-electric-300 border border-electric-500/30">
              {company.sector}
            </span>
            <span className="inline-flex items-center rounded-full bg-amberHighlight-500/20 px-3 py-1 text-xs font-semibold text-amberHighlight-400 border border-amberHighlight-500/30">
              {company.fundingStage}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{company.readingTimeMin} min case study</span>
          </div>
        </div>

        {/* Company Title and Monogram */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-electric-500 via-purpleAccent-500 to-amberHighlight-500 p-1 shadow-glow shrink-0 flex items-center justify-center">
            <div className="h-full w-full rounded-[14px] bg-navy-950 flex items-center justify-center font-heading font-black text-2xl text-white">
              {initials}
            </div>
          </div>

          <div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {company.name}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-200 font-medium max-w-3xl leading-relaxed">
              {company.valueProposition}
            </p>
          </div>
        </div>

        {/* Grid Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Founders
            </span>
            <p className="text-sm font-semibold text-white mt-1">
              {company.founders}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Founded
            </span>
            <p className="text-sm font-semibold text-white mt-1">
              {company.foundingYear}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Key Investors
            </span>
            <p className="text-sm font-semibold text-white mt-1 line-clamp-1">
              {company.notableInvestors}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Core Stack
            </span>
            <p className="text-sm font-semibold text-white mt-1">
              {company.tags?.technique?.slice(0, 2).join(" • ") || "AI Architecture"}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
