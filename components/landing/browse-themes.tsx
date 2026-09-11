"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TAXONOMIES = [
  {
    title: "Browse by Industry",
    queryKey: "industry",
    tags: ["Enterprise SaaS", "Consumer AI", "FinTech", "HealthTech", "LegalTech", "EdTech", "Logistics", "Agritech"],
    color: "hover:border-electric-500 hover:text-electric-600 dark:hover:text-electric-400",
  },
  {
    title: "Browse by AI Technique",
    queryKey: "technique",
    tags: ["generative AI", "NLP", "speech AI", "predictive analytics", "optimization", "computer vision"],
    color: "hover:border-purpleAccent-500 hover:text-purpleAccent-500",
  },
  {
    title: "Browse by Business Model",
    queryKey: "businessModel",
    tags: ["usage-based", "SaaS", "API-based", "enterprise licensing", "freemium", "marketplace"],
    color: "hover:border-amberHighlight-500 hover:text-amberHighlight-600 dark:hover:text-amberHighlight-400",
  },
  {
    title: "Browse by Geography",
    queryKey: "geography",
    tags: ["India", "US", "Europe", "Global"],
    color: "hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400",
  },
  {
    title: "Browse by Funding Stage",
    queryKey: "stage",
    tags: ["Seed", "Series A-B", "Growth", "Scale-up"],
    color: "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400",
  },
];

export function BrowseThemes() {
  return (
    <section className="py-16 md:py-24 border-t border-border/60 bg-navy-50/30 dark:bg-navy-950/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
            Structured Taxonomy
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            Explore AI Startups by Dimension
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Filter our library across technical architectures, geographic ecosystems, and monetization engines.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {TAXONOMIES.map((group, gIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: gIdx * 0.08 }}
              className="rounded-2xl border border-border/80 bg-card/70 p-5 sm:p-6 backdrop-blur-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3.5">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/case-library?${group.queryKey}=${encodeURIComponent(tag)}`}
                  >
                    <span
                      className={`inline-flex items-center rounded-xl border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:scale-[1.03] hover:shadow-sm ${group.color}`}
                    >
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
