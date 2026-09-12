"use client";

import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function InsightsSection({ keyInsights }: { keyInsights: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
        <Lightbulb className="h-4 w-4" />
        <span>Section 6 • Strategic Playbook</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Key Strategic Insights & Learnings
        </h2>

        <div className="space-y-4">
          {keyInsights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="flex items-start space-x-3.5 rounded-2xl border border-border/70 bg-navy-50/30 dark:bg-navy-900/30 p-4"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-600 dark:text-electric-400 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed font-normal">
                {insight}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
