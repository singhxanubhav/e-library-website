"use client";

import { motion } from "framer-motion";
import { DollarSign, Cpu, HelpCircle, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PILLARS = [
  {
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    title: "Unit Economics & Moats",
    description:
      "Understand gross margins, inference token costs, GPU depreciation, and sustainable defensibility against frontier foundation labs.",
  },
  {
    icon: Cpu,
    color: "from-electric-500 to-purpleAccent-500",
    title: "Architectural Workflows",
    description:
      "Interactive SVG flow diagrams demonstrating multi-agent orchestration, RAG embeddings, AST parsing, and low-latency audio pipelines.",
  },
  {
    icon: HelpCircle,
    color: "from-amberHighlight-500 to-orangeHighlight-500",
    title: "Real Strategic Dilemmas",
    description:
      "Participate in executive tradeoff polls and challenge scenarios faced by founders during critical pivots and scaling milestones.",
  },
  {
    icon: Award,
    color: "from-purple-600 to-indigo-600",
    title: "Verified Credentials",
    description:
      "Pass rigorous module quizzes with 70%+ mastery and earn shareable digital certificates recognizing your AI strategic literacy.",
  },
];

export function ProjectOverview() {
  return (
    <section className="py-16 md:py-24 border-t border-border/60 bg-navy-50/40 dark:bg-navy-950/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
            Project Overview
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            Why We Built the AI Company Case Library
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Most AI coverage focuses on speculative hype or mathematical papers.
            We study the messy, fascinating commercial realities: how startups acquire proprietary data,
            price inference, overcome tokenization barriers, and build enduring economic moats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full border-border/80 bg-card hover:border-electric-500/50 hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div
                      className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center text-white mb-5 shadow-sm`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
