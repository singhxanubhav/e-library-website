"use client";

import { motion } from "framer-motion";
import { Cpu, ArrowRight, Layers, Sparkles, Database, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyData } from "@/types";

export function SolutionDiagram({ company }: { company: CompanyData }) {
  // Dynamically tailor diagram nodes to company techniques
  const technique = company.tags?.technique?.[0] || "generative AI";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
        <Cpu className="h-4 w-4" />
        <span>Section 3 • Technical Architecture</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
          AI-Powered Solution
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
          {company.aiSolutionDescription}
        </p>

        {/* Animated Interactive SVG / Div Workflow Diagram */}
        <div className="rounded-2xl border border-border bg-navy-950/90 dark:bg-navy-900/90 p-6 text-white shadow-inner">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center space-x-2 text-xs font-semibold text-electric-400">
              <Sparkles className="h-4 w-4" />
              <span>System Execution Architecture Pipeline</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Flow Simulation
            </span>
          </div>

          {/* Workflow Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Input Ingestion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <Database className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                1. Ingestion
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Raw Input Data</h4>
              <p className="text-xs text-slate-400 mt-1">
                Audio streams, codebase AST, or unstructured enterprise text
              </p>
            </motion.div>

            {/* Step 2: Context Retrieval & Tokenization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-xl border border-electric-500/40 bg-electric-500/10 p-4 text-center relative"
            >
              <div className="h-10 w-10 rounded-xl bg-electric-500/30 text-electric-300 flex items-center justify-center mb-3">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-electric-400">
                2. Processing
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                Token & Context Vector
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Custom tokenizer, embedding retrieval, and grounding index
              </p>
            </motion.div>

            {/* Step 3: Domain Foundation Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col items-center justify-center rounded-xl border border-purpleAccent-500/40 bg-purpleAccent-500/10 p-4 text-center relative shadow-glow"
            >
              <div className="h-10 w-10 rounded-xl bg-purpleAccent-500/30 text-purpleAccent-300 flex items-center justify-center mb-3">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purpleAccent-400">
                3. Inference Engine
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                Domain AI Model
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Fine-tuned transformer weights, reasoning speculative decoding
              </p>
            </motion.div>

            {/* Step 4: Deterministic Action & Response */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                4. Delivery
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                Verified Output
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero-hallucination citations, audio stream, or multi-file diff
              </p>
            </motion.div>
          </div>

          {/* Animated Connecting SVG Pulse Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center space-x-3 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>End-to-End Latency: <strong className="text-white font-mono">{company.tractionMetrics?.stats?.[2]?.value || "<250ms"}</strong></span>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
