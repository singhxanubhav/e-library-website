"use client";

import * as React from "react";
import { ArrowRightLeft, Check, Sparkles, AlertCircle, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "@/types";
import { SEEDED_COMPANIES } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";

export function CompanyComparator() {
  const [companyAId, setCompanyAId] = React.useState<string>("sarvam-ai");
  const [companyBId, setCompanyBId] = React.useState<string>("cursor");

  const companyA = SEEDED_COMPANIES.find((c) => c.slug === companyAId) || SEEDED_COMPANIES[0];
  const companyB = SEEDED_COMPANIES.find((c) => c.slug === companyBId) || SEEDED_COMPANIES[1];

  // Derive target customer
  const getTargetCustomer = (comp: CompanyData) => {
    if (comp.slug === "sarvam-ai") return "Indian Enterprises, Public Sector Banks & Vernacular Developers";
    if (comp.slug === "krutrim") return "Indian Tech Startups, Cloud Engineers & Ola Mobility Users";
    if (comp.slug === "yellow-ai") return "Global Fortune 2000 Customer Experience & Operations Teams";
    if (comp.slug === "observe-ai") return "Enterprise Contact Centers, Sales QA Teams & Compliance Officers";
    if (comp.slug === "cursor") return "Software Engineers, Full-Stack Developers & Engineering Orgs";
    if (comp.slug === "harvey-ai") return "Magic Circle Law Firms, General Counsels & Corporate Legal Depts";
    if (comp.slug === "perplexity-ai") return "Knowledge Workers, Researchers, Programmers & Information Seekers";
    if (comp.slug === "elevenlabs") return "Audiobook Publishers, Indie Creators, Game Studios & Video Producers";
    return "Enterprise & Developers";
  };

  // Derive core challenge
  const getCoreChallenge = (comp: CompanyData) => {
    return comp.keyInsights?.[0] || comp.problemDescription.slice(0, 110) + "...";
  };

  const rows = [
    {
      label: "Headquarters & Region",
      valA: `${companyA.hqCity}, ${companyA.hqCountry}`,
      valB: `${companyB.hqCity}, ${companyB.hqCountry}`,
      matches: companyA.hqCountry === companyB.hqCountry,
    },
    {
      label: "Industry Sector",
      valA: companyA.sector,
      valB: companyB.sector,
      matches: companyA.sector === companyB.sector,
    },
    {
      label: "Core AI Technique",
      valA: companyA.tags?.technique?.join(" • ") || "Generative AI",
      valB: companyB.tags?.technique?.join(" • ") || "Generative AI",
      matches: companyA.tags?.technique?.[0] === companyB.tags?.technique?.[0],
    },
    {
      label: "Target Customer Segment",
      valA: getTargetCustomer(companyA),
      valB: getTargetCustomer(companyB),
      matches: false,
    },
    {
      label: "Monetization Engine",
      valA: companyA.tags?.business_model?.join(", ") || "SaaS",
      valB: companyB.tags?.business_model?.join(", ") || "SaaS",
      matches: companyA.tags?.business_model?.[0] === companyB.tags?.business_model?.[0],
    },
    {
      label: "Funding Stage",
      valA: companyA.fundingStage,
      valB: companyB.fundingStage,
      matches: companyA.fundingStage === companyB.fundingStage,
    },
    {
      label: "Key Strategic Challenge",
      valA: getCoreChallenge(companyA),
      valB: getCoreChallenge(companyB),
      matches: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Selection Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card shadow-soft">
        <div className="w-full sm:w-1/2 space-y-1">
          <label className="text-xs font-bold text-muted-foreground uppercase">
            Select Company A:
          </label>
          <select
            value={companyAId}
            onChange={(e) => setCompanyAId(e.target.value)}
            className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-electric-500"
          >
            {SEEDED_COMPANIES.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === companyBId}>
                {c.name} ({c.hqCountry})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted shrink-0 text-muted-foreground">
          <ArrowRightLeft className="h-4 w-4" />
        </div>

        <div className="w-full sm:w-1/2 space-y-1">
          <label className="text-xs font-bold text-muted-foreground uppercase">
            Select Company B:
          </label>
          <select
            value={companyBId}
            onChange={(e) => setCompanyBId(e.target.value)}
            className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-electric-500"
          >
            {SEEDED_COMPANIES.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === companyAId}>
                {c.name} ({c.hqCountry})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <Card className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border bg-navy-50/50 dark:bg-navy-900/40 p-5">
          <div className="flex items-center space-x-3 pb-3 md:pb-0">
            <div className="h-10 w-10 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold text-sm">
              {getInitials(companyA.name)}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {companyA.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                Founded {companyA.foundingYear} • {companyA.hqCountry}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-3 md:pt-0 md:pl-5">
            <div className="h-10 w-10 rounded-xl bg-electric-600 text-white flex items-center justify-center font-bold text-sm">
              {getInitials(companyB.name)}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {companyB.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                Founded {companyB.foundingYear} • {companyB.hqCountry}
              </p>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60">
          {rows.map((row, idx) => (
            <div key={idx} className="p-5 space-y-2 hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </span>
                {row.matches && (
                  <Badge variant="success" className="text-[10px] space-x-1">
                    <Check className="h-3 w-3 inline mr-1" />
                    <span>Exact Alignment</span>
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-sm font-medium">
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-xs font-bold text-muted-foreground block mb-1">
                    {companyA.name}:
                  </span>
                  <span className="text-foreground leading-relaxed">{row.valA}</span>
                </div>

                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-xs font-bold text-muted-foreground block mb-1">
                    {companyB.name}:
                  </span>
                  <span className="text-foreground leading-relaxed">{row.valB}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
