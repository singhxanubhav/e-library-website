"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Building, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "@/types";
import { getInitials } from "@/lib/utils";

const FLAG_MAP: Record<string, string> = {
  India: "🇮🇳",
  US: "🇺🇸",
  Europe: "🇪🇺",
  Global: "🌐",
};

interface CompanyCardProps {
  company: CompanyData;
  index?: number;
}

export function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const flag = FLAG_MAP[company.hqCountry] || "🌐";
  const initials = getInitials(company.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
      className="flex h-full"
    >
      <Link href={`/company/${company.slug}`} className="flex w-full">
        <Card className="flex flex-col w-full border-border/80 bg-card hover:border-electric-500/60 hover:shadow-card transition-all duration-300 rounded-2xl group overflow-hidden">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-start justify-between gap-3">
              {/* Monogram Initials Badge */}
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-navy-800 via-electric-600 to-purpleAccent-500 text-white flex items-center justify-center font-heading font-black text-base shadow-sm group-hover:shadow-glow transition-shadow shrink-0">
                {initials}
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-muted-foreground font-medium bg-muted/60 px-2.5 py-1 rounded-lg">
                <span className="text-sm">{flag}</span>
                <span>{company.hqCountry}</span>
              </div>
            </div>

            <div className="mt-3.5">
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400 transition-colors line-clamp-1">
                {company.name}
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                {company.fundingStage} • Est. {company.foundingYear}
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
              {company.valueProposition}
            </p>

            {/* Tag Chips */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {company.tags?.industry?.[0] && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  {company.tags.industry[0]}
                </Badge>
              )}
              {company.tags?.technique?.[0] && (
                <Badge variant="electric" className="text-[10px] px-2 py-0.5">
                  {company.tags.technique[0]}
                </Badge>
              )}
              {company.tags?.business_model?.[0] && (
                <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                  {company.tags.business_model[0]}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{company.readingTimeMin} min read</span>
            </div>
            <span className="font-semibold text-electric-600 dark:text-electric-400 group-hover:translate-x-0.5 transition-transform flex items-center">
              Explore <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
