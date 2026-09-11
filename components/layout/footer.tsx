import * as React from "react";
import Link from "next/link";
import { Sparkles, Linkedin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-navy-950 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Mission Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-electric-500 to-purpleAccent-500 text-white shadow-glow">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                AI Case Library
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Deconstructing the business models, technical architectures, unit economics,
              and strategic moats of generational AI startups worldwide.
            </p>
            <div className="mt-6 flex items-center space-x-3">
              <a
                href="https://linkedin.com/in/placeholder-jigyasa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-electric-500 hover:text-white"
              >
                <Linkedin className="h-4 w-4 text-electric-400" />
                <span>Curated by Jigyasa</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/case-library" className="text-slate-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-slate-300 hover:text-white transition-colors">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="/ai-business-lab" className="text-slate-300 hover:text-white transition-colors">
                  AI Business Lab
                </Link>
              </li>
              <li>
                <Link href="/quiz-certificate" className="text-slate-300 hover:text-white transition-colors">
                  Quizzes & Certs
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-slate-300 hover:text-white transition-colors">
                  Industry Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Tag Category: Industries */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              Industries
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>Enterprise SaaS</li>
              <li>Consumer AI</li>
              <li>FinTech & Wealth</li>
              <li>LegalTech & Regs</li>
              <li>HealthTech</li>
              <li>Developer Tools</li>
            </ul>
          </div>

          {/* Tag Category: Techniques */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Techniques
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>Generative Audio & TTS</li>
              <li>Domain-Tuned LLMs</li>
              <li>Code Agents & Speculative AST</li>
              <li>Sovereign Tokenizers</li>
              <li>Retrieval Augmented Gen</li>
              <li>Speech-to-Text Coaching</li>
            </ul>
          </div>

          {/* Tag Category: Models & Geographies */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              Markets & Models
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>India Ecosystem (🇮🇳)</li>
              <li>United States (🇺🇸)</li>
              <li>Europe & UK (🇬🇧/🇪🇺)</li>
              <li>API Consumption</li>
              <li>Enterprise Licensing</li>
              <li>Freemium PLG</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} AI Company Case Library. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Source & Methodology
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
