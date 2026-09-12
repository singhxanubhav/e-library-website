"use client";

import * as React from "react";
import { Filter, X, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  industry: string[];
  technique: string[];
  geography: string[];
  businessModel: string[];
  stage: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (category: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  activeCount: number;
}

const FILTER_SECTIONS = [
  {
    key: "industry" as keyof FilterState,
    title: "Industry Sector",
    options: [
      "Enterprise SaaS",
      "Consumer AI",
      "FinTech",
      "HealthTech",
      "LegalTech",
      "EdTech",
      "Logistics",
      "Agritech",
    ],
  },
  {
    key: "technique" as keyof FilterState,
    title: "AI Technique",
    options: [
      "generative AI",
      "NLP",
      "speech AI",
      "predictive analytics",
      "optimization",
      "computer vision",
    ],
  },
  {
    key: "geography" as keyof FilterState,
    title: "Geography / Region",
    options: ["India", "US", "Europe", "Global"],
  },
  {
    key: "businessModel" as keyof FilterState,
    title: "Business Model",
    options: [
      "usage-based",
      "SaaS",
      "API-based",
      "enterprise licensing",
      "freemium",
      "marketplace",
    ],
  },
  {
    key: "stage" as keyof FilterState,
    title: "Funding Stage",
    options: ["Seed", "Series A-B", "Growth", "Scale-up"],
  },
];

export function FilterPanel({
  filters,
  onFilterChange,
  onResetFilters,
  activeCount,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-electric-600 dark:text-electric-400" />
          <span className="font-heading font-bold text-sm">Filters</span>
          {activeCount > 0 && (
            <Badge variant="electric" className="h-5 px-1.5 text-[10px]">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="space-y-5">
        {FILTER_SECTIONS.map((section) => {
          const activeValues = filters[section.key];
          return (
            <div key={section.key} className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {section.options.map((opt) => {
                  const isSelected = activeValues.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => onFilterChange(section.key, opt)}
                      className={`inline-flex items-center space-x-1 rounded-xl px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-navy-800 text-white dark:bg-electric-500 shadow-sm"
                          : "border border-border bg-background text-muted-foreground hover:border-border/80 hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="h-3 w-3 ml-1 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
