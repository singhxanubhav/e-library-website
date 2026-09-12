"use client";

import { motion } from "framer-motion";
import { Sparkles, HelpCircle, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DidYouKnowCard({ funFact }: { funFact?: string | null }) {
  if (!funFact) return null;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amberHighlight-600 dark:text-amberHighlight-400">
        <Flame className="h-4 w-4" />
        <span>Section 7 • Behind The Scenes</span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border-2 border-amberHighlight-500/40 bg-gradient-to-br from-amber-50 via-amberHighlight-500/10 to-orange-50/20 dark:from-amber-950/30 dark:via-amber-900/20 dark:to-navy-950 p-6 sm:p-8 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amberHighlight-500 text-navy-950 font-bold shadow-glow-amber">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-xl font-bold text-foreground">
              Did You Know?
            </h3>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
              {funFact}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
