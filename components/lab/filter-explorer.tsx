"use client";

import * as React from "react";
import Link from "next/link";
import { Filter, RotateCcw, ArrowRight, Clock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEEDED_COMPANIES } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";

const DIMENSIONS = [
  {
    key: "industry",
    label: "Industry",
    options: ["Enterprise SaaS", "Consumer AI", "FinTech", "LegalTech"],
  },
  {
    key: "technique",
    label: "AI Technique",
    options: ["generative AI", "NLP", "speech AI", "predictive analytics"],
  },
  {
    key: "geography",
    label: "Geography",
    options: ["India", "US", "Europe", "Global"],
  },
  {
    key: "businessModel",
    label: "Business Model",
    options: ["usage-based", "SaaS", "API-based", "enterprise licensing"],
  },
  {
    key: "stage",
    label: "Funding Stage",
    options: ["Series A-B", "Growth", "Scale-up"],
  },
];

export function FilterExplorer() {
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({
    industry: [],
    technique: [],
    geography: [],
    businessModel: [],
    stage: [],
  });

  const toggleFilter = (cat: string, val: string) => {
    setSelectedFilters((prev) => {
      const current = prev[cat] || [];
      const exists = current.includes(val);
      return {
        ...prev,
        [cat]: exists ? current.filter((v) => v !== val) : [...current, val],
      };
    });
  };

  const handleReset = () => {
    setSelectedFilters({
      industry: [],
      technique: [],
      geography: [],
      businessModel: [],
      stage: [],
    });
  };

  // Instant client-side filtering
  const matchingCompanies = React.useMemo(() => {
    return SEEDED_COMPANIES.filter((comp) => {
      if (
        selectedFilters.industry.length > 0 &&
        !comp.tags?.industry?.some((t) => selectedFilters.industry.includes(t))
      ) {
        return false;
      }
      if (
        selectedFilters.technique.length > 0 &&
        !comp.tags?.technique?.some((t) => selectedFilters.technique.includes(t))
      ) {
        return false;
      }
      if (
        selectedFilters.geography.length > 0 &&
        !comp.tags?.geography?.some((t) => selectedFilters.geography.includes(t))
      ) {
        return false;
      }
      if (
        selectedFilters.businessModel.length > 0 &&
        !comp.tags?.business_model?.some((t) =>
          selectedFilters.businessModel.includes(t)
        )
      ) {
        return false;
      }
      if (
        selectedFilters.stage.length > 0 &&
        !comp.tags?.stage?.some((t) => selectedFilters.stage.includes(t))
      ) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);

  const activeCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="space-y-6">
      {/* Filter Chips Bar */}
      <Card className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-electric-600 dark:text-electric-400" />
            <span className="font-heading font-bold text-sm">Faceted AI Filter Explorer</span>
            {activeCount > 0 && (
              <Badge variant="electric" className="text-[10px]">
                {activeCount} active
              </Badge>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {DIMENSIONS.map((dim) => (
            <div key={dim.key} className="space-y-2">
              <span className="text-[11px] font-bold uppercase text-muted-foreground">
                {dim.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dim.options.map((opt) => {
                  const isSelected = selectedFilters[dim.key]?.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleFilter(dim.key, opt)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-medium transition-all ${
                        isSelected
                          ? "bg-navy-800 text-white dark:bg-electric-500 shadow-sm"
                          : "border border-border bg-background text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Live Counter Badge */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-foreground">
            Live Results:
          </span>
          <Badge variant="electric" className="text-sm font-mono px-2.5 py-0.5">
            {matchingCompanies.length} of {SEEDED_COMPANIES.length} startups match
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          Updates immediately on filter toggle
        </span>
      </div>

      {/* Compact Result List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {matchingCompanies.map((comp) => (
          <Link key={comp.slug} href={`/company/${comp.slug}`}>
            <div className="p-3.5 rounded-2xl border border-border bg-card hover:border-electric-500/60 hover:shadow-soft transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {getInitials(comp.name)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400">
                    {comp.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {comp.sector} • {comp.hqCountry}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
