"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function QuizPlaceholderCard({ companyName }: { companyName: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amberHighlight-500">
        <Award className="h-4 w-4" />
        <span>Section 9 • Module Mastery Quiz</span>
      </div>

      <Card className="relative overflow-hidden rounded-3xl border-2 border-electric-500/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <Badge variant="electric" className="text-xs">
                70% Passing Threshold
              </Badge>
              <span className="text-xs text-slate-400">5 Questions • ~4 Mins</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Ready to test your comprehension of {companyName}?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Verify your grasp of this company’s architecture, pricing tradeoffs, and unit economics.
              Passing unlocks your progress toward the AI Company Case Library Verified Credential.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/quiz-certificate">
              <Button
                variant="primary"
                size="lg"
                className="rounded-2xl px-7 h-12 shadow-glow text-base font-semibold w-full sm:w-auto"
              >
                <span>Take the Quiz</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
