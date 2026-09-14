import Link from "next/link";
import { Sparkles, Linkedin, BookOpen, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About | AI Company Case Library",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full bg-electric-500/10 px-3 py-1 text-xs font-semibold text-electric-600 dark:text-electric-400">
          <Sparkles className="h-4 w-4" />
          <span>Research & Methodology</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
          About AI Company Case Library
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          An open educational research initiative curating rigorous case studies on AI business models.
        </p>
      </div>

      <Card className="rounded-3xl border-border bg-card p-8 shadow-soft space-y-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Editorial & Research Methodology
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Every case study in this library is crafted through a multi-step diligence framework:
        </p>
        <ul className="space-y-3 text-sm text-foreground">
          <li className="flex items-start space-x-3">
            <span className="font-bold text-electric-600 dark:text-electric-400">01.</span>
            <span><strong>Regulatory & Capital Filings:</strong> Disclosed funding rounds, investor syndicates, and public registry disclosures.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="font-bold text-electric-600 dark:text-electric-400">02.</span>
            <span><strong>Technical Architecture Verification:</strong> Analysis of published research papers, arXiv preprints, tokenizer vocabularies, and developer API documentation.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="font-bold text-electric-600 dark:text-electric-400">03.</span>
            <span><strong>Unit Economic Stress Testing:</strong> Token input/output cost modeling, estimated GPU depreciation, and gross margin profiles.</span>
          </li>
        </ul>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold">
              JS
            </div>
            <div>
              <p className="font-bold text-sm">Curated with research by Jigyasa</p>
              <p className="text-xs text-muted-foreground">AI Strategy & Product Research</p>
            </div>
          </div>
          <a
            href="https://linkedin.com/in/placeholder-jigyasa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="rounded-xl space-x-2">
              <Linkedin className="h-4 w-4 text-electric-500" />
              <span>Connect on LinkedIn</span>
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
