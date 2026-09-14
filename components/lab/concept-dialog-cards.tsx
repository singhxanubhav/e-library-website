"use client";

import * as React from "react";
import { Sparkles, Layers, BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONCEPT_TERMS, ConceptTerm } from "@/lib/lab-data";

function ConceptSvgDiagram({ type }: { type: ConceptTerm["svgType"] }) {
  switch (type) {
    case "flywheel":
      return (
        <svg viewBox="0 0 280 140" className="w-full h-36 bg-navy-950 rounded-2xl p-2">
          {/* Circular Orbit */}
          <circle cx="140" cy="70" r="48" fill="none" stroke="#5B6CFF" strokeWidth="2" strokeDasharray="6 4" />
          {/* Nodes */}
          <circle cx="140" cy="22" r="16" fill="#0B132B" stroke="#5B6CFF" strokeWidth="2" />
          <text x="140" y="26" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Usage</text>

          <circle cx="188" cy="70" r="16" fill="#0B132B" stroke="#8B5CF6" strokeWidth="2" />
          <text x="188" y="74" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Data</text>

          <circle cx="140" cy="118" r="16" fill="#0B132B" stroke="#F59E0B" strokeWidth="2" />
          <text x="140" y="122" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Retrain</text>

          <circle cx="92" cy="70" r="16" fill="#0B132B" stroke="#10B981" strokeWidth="2" />
          <text x="92" y="74" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Moat</text>
        </svg>
      );
    case "rag":
      return (
        <svg viewBox="0 0 280 140" className="w-full h-36 bg-navy-950 rounded-2xl p-2">
          <rect x="20" y="45" width="60" height="50" rx="8" fill="#1E293B" stroke="#5B6CFF" strokeWidth="2" />
          <text x="50" y="68" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">User Query</text>
          <text x="50" y="80" fill="#94A3B8" fontSize="7" textAnchor="middle">Runtime</text>

          <path d="M82 70 L118 70" stroke="#5B6CFF" strokeWidth="2" markerEnd="url(#arrow)" />

          <rect x="120" y="25" width="65" height="40" rx="8" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
          <text x="152" y="45" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Vector DB</text>
          <text x="152" y="55" fill="#94A3B8" fontSize="7" textAnchor="middle">RAG Context</text>

          <rect x="120" y="75" width="65" height="40" rx="8" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
          <text x="152" y="95" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Weights</text>
          <text x="152" y="105" fill="#94A3B8" fontSize="7" textAnchor="middle">Fine-Tuning</text>

          <path d="M187 70 L218 70" stroke="#10B981" strokeWidth="2" />

          <rect x="220" y="45" width="50" height="50" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <text x="245" y="73" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Cited</text>
          <text x="245" y="83" fill="#6EE7B7" fontSize="7" textAnchor="middle">Output</text>
        </svg>
      );
    case "speculative":
      return (
        <svg viewBox="0 0 280 140" className="w-full h-36 bg-navy-950 rounded-2xl p-2">
          {/* Draft model */}
          <rect x="30" y="30" width="85" height="35" rx="6" fill="#1E293B" stroke="#5B6CFF" strokeWidth="1.5" />
          <text x="72" y="48" fill="#93C5FD" fontSize="8" fontWeight="bold" textAnchor="middle">Draft 1B Model</text>
          <text x="72" y="58" fill="#64748B" fontSize="7" textAnchor="middle">Drafts 4 tokens</text>

          {/* Verification model */}
          <rect x="30" y="75" width="85" height="35" rx="6" fill="#1E293B" stroke="#8B5CF6" strokeWidth="1.5" />
          <text x="72" y="93" fill="#C4B5FD" fontSize="8" fontWeight="bold" textAnchor="middle">Target 70B Model</text>
          <text x="72" y="103" fill="#64748B" fontSize="7" textAnchor="middle">1 Parallel Check</text>

          {/* Output Tokens */}
          <path d="M120 70 L150 70" stroke="#10B981" strokeWidth="2" />
          <rect x="155" y="50" width="105" height="40" rx="8" fill="#022C22" stroke="#10B981" strokeWidth="1.5" />
          <text x="207" y="71" fill="#6EE7B7" fontSize="9" fontWeight="bold" textAnchor="middle">2.8x Faster</text>
          <text x="207" y="81" fill="#94A3B8" fontSize="7" textAnchor="middle">Tokens Streamed</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 280 140" className="w-full h-36 bg-navy-950 rounded-2xl p-2">
          <circle cx="80" cy="70" r="32" fill="#1E293B" stroke="#5B6CFF" strokeWidth="2" />
          <text x="80" y="74" fill="#93C5FD" fontSize="9" fontWeight="bold" textAnchor="middle">Concept</text>

          <path d="M115 70 L165 70" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2" />

          <circle cx="200" cy="70" r="32" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <text x="200" y="74" fill="#6EE7B7" fontSize="9" fontWeight="bold" textAnchor="middle">Outcome</text>
        </svg>
      );
  }
}

export function ConceptDialogCards() {
  const [selectedTerm, setSelectedTerm] = React.useState<ConceptTerm | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            Strategic Concept Explainer Cards
          </h3>
          <p className="text-xs text-muted-foreground">
            Click any term to inspect its technical definition and hand-drawn architecture micro-diagram
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CONCEPT_TERMS.map((term) => (
          <button
            key={term.slug}
            onClick={() => setSelectedTerm(term)}
            className="text-left rounded-2xl border border-border bg-card p-4 hover:border-electric-500/60 hover:shadow-soft transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
                {term.category}
              </span>
              <h4 className="font-heading font-bold text-sm text-foreground mt-1 group-hover:text-electric-600 dark:group-hover:text-electric-400 transition-colors">
                {term.title}
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                {term.summary}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground group-hover:text-foreground">
              <span>View Diagram</span>
              <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={!!selectedTerm} onOpenChange={(open) => !open && setSelectedTerm(null)}>
        {selectedTerm && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="electric" className="text-[10px] font-bold uppercase">
                  {selectedTerm.category}
                </Badge>
              </div>
              <DialogTitle className="font-heading text-xl font-bold">
                {selectedTerm.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Hand-crafted SVG Diagram */}
              <ConceptSvgDiagram type={selectedTerm.svgType} />

              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Strategic Mechanism
                </h5>
                <p className="text-sm text-foreground leading-relaxed">
                  {selectedTerm.explanation}
                </p>
              </div>

              <div className="rounded-xl bg-navy-50/70 dark:bg-navy-900/60 p-3.5 border border-border">
                <span className="text-[11px] font-bold uppercase text-electric-600 dark:text-electric-400">
                  Real-World Implementation:
                </span>
                <p className="text-xs text-foreground mt-0.5 leading-relaxed">
                  {selectedTerm.example}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
