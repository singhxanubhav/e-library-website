"use client";

import { motion } from "framer-motion";
import { AlertOctagon, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProblemSection({ problemText }: { problemText: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-destructive">
        <AlertOctagon className="h-4 w-4" />
        <span>Section 2 • Market Friction</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
          The Problem They Solve
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {problemText}
          </p>
        </div>
      </Card>
    </motion.section>
  );
}
