"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const OUTCOMES = [
  {
    icon: BrainCircuit,
    title: "Identify Genuine Technical Moats",
    description:
      "Differentiate between superficial API wrapper products and companies with defensible AST pipelines, proprietary vernacular tokenizers, and custom data flywheels.",
    skills: ["Context retrieval architectures", "Fine-tuning vs. RAG selection", "Latency & compute constraints"],
  },
  {
    icon: TrendingUp,
    title: "Evaluate Unit Economics & Pricing",
    description:
      "Analyze token input/output margins, seat-based vs. consumption pricing models, and how heavy GPU inference costs affect venture-scale profitability.",
    skills: ["Token gross margin analysis", "Pay-as-you-go vs. enterprise commits", "Inference optimization metrics"],
  },
  {
    icon: Award,
    title: "Earn Certified AI Credentials",
    description:
      "Validate your understanding of modern AI commercialization through rigorous scenario-based case quizzes and earn a verified shareable certificate.",
    skills: ["Case mastery assessment", "Dilemma evaluation scoring", "Permanent verification credential"],
  },
];

export function LearningOutcomes() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
            Educational Impact
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            What You Will Master
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Whether you are an engineer launching an AI venture, a product leader, or an investor conducting technical diligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {OUTCOMES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col rounded-3xl border border-border/80 bg-card p-8 shadow-soft hover:shadow-card hover:border-electric-500/40 transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-navy-800 to-electric-600 text-white mb-6 shadow-sm">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-border/60">
                  {item.skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 text-xs font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-electric-950 p-8 sm:p-12 text-center text-white shadow-card max-w-4xl mx-auto border border-electric-500/30"
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Ready to test your AI business strategy?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Take our scenario-based module quizzes, practice strategic tradeoffs, and earn your verified certificate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/case-library">
              <Button variant="primary" size="lg" className="rounded-2xl px-8 h-12 text-base font-semibold">
                Explore Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quiz-certificate">
              <Button variant="outline" size="lg" className="rounded-2xl px-7 h-12 text-base font-semibold border-white/30 text-white hover:bg-white/10">
                View Certificate Program
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
