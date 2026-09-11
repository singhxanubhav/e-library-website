"use client";

import { motion } from "framer-motion";
import { Linkedin, Sparkles, BookOpen, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CreatorSection() {
  return (
    <section className="py-16 md:py-20 border-t border-border/60">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-navy-50/50 to-white dark:from-navy-900/60 dark:to-navy-950/80 p-8 sm:p-12 shadow-card"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Creator Avatar Monogram */}
            <div className="relative shrink-0">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-3xl bg-gradient-to-tr from-navy-800 via-electric-600 to-purpleAccent-500 p-1 shadow-glow flex items-center justify-center text-white">
                <div className="h-full w-full rounded-[22px] bg-navy-950 flex flex-col items-center justify-center text-white">
                  <span className="font-heading text-3xl font-black tracking-tight text-white">
                    JS
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-electric-400 uppercase mt-0.5">
                    Curator
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-amberHighlight-500 text-navy-950 shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
                <span>Curated Research & Synthesis</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                About Jigyasa
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Jigyasa created the **AI Company Case Library** to bridge the gap between academic AI research
                and viable commercial strategy. With a deep passion for the Indian and global startup ecosystems,
                each case study is rigorously synthesized from public regulatory filings, technical documentation,
                founder interviews, and market traction disclosures.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
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
                <span className="text-xs text-muted-foreground flex items-center space-x-1">
                  <span>Built with</span>
                  <Heart className="h-3.5 w-3.5 text-red-500 inline fill-red-500" />
                  <span>for aspiring AI builders</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
