"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEEDED_COMPANIES } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";

const FLAG_MAP: Record<string, string> = {
  India: "🇮🇳",
  US: "🇺🇸",
  Europe: "🇪🇺",
  Global: "🌐",
};

export function FeaturedCompanies() {
  const featured = SEEDED_COMPANIES.filter((c) => c.isFeatured).slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
              Featured Case Studies
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
              Deep Dives into Generational AI Startups
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">
              Hand-picked teardowns dissecting product-market fit, unit economics, and AI architectures.
            </p>
          </div>
          <Link href="/case-library">
            <Button variant="outline" className="rounded-xl space-x-2">
              <span>View All 8+ Cases</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((company, idx) => {
            const flag = FLAG_MAP[company.hqCountry] || "🌐";
            const initials = getInitials(company.name);

            return (
              <motion.div
                key={company.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex"
              >
                <Link href={`/company/${company.slug}`} className="flex w-full">
                  <Card className="flex flex-col w-full border-border/80 bg-card hover:border-electric-500/60 hover:shadow-card transition-all duration-300 rounded-2xl group overflow-hidden">
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        {/* Monogram Initials Badge */}
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-navy-800 via-electric-600 to-purpleAccent-500 text-white flex items-center justify-center font-heading font-black text-base shadow-sm group-hover:shadow-glow transition-shadow">
                          {initials}
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-muted-foreground font-medium bg-muted/60 px-2.5 py-1 rounded-lg">
                          <span className="text-sm">{flag}</span>
                          <span>{company.hqCountry}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400 transition-colors">
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
                        Read Case <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
