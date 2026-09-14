"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, BookOpen, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThemeItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  companyCount: number;
  progressPercent: number;
  completedCount: number;
  quiz?: { id: string; title: string };
}

export default function LearnPage() {
  const [themes, setThemes] = React.useState<ThemeItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    fetch("/api/themes")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setThemes(data.themes || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full bg-electric-500/10 px-3.5 py-1.5 text-xs font-semibold text-electric-600 dark:text-electric-400">
          <GraduationCap className="h-4 w-4" />
          <span>Curated Learning Pathways</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Master AI Business Strategy by Theme
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Follow structured sequences of case studies grouped by strategic domain. Complete all modules in a track to unlock the comprehensive Theme Mastery Quiz.
        </p>
      </div>

      {/* Grid of Theme Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme, idx) => {
            const radius = 20;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset =
              circumference - (theme.progressPercent / 100) * circumference;

            return (
              <motion.div
                key={theme.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex"
              >
                <Card className="flex flex-col justify-between w-full rounded-3xl border-border/80 bg-card hover:border-electric-500/50 hover:shadow-card transition-all overflow-hidden">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-navy-800 to-electric-600 text-white flex items-center justify-center font-heading font-black text-lg shadow-sm">
                        0{idx + 1}
                      </div>

                      {/* Small Circular Progress Ring */}
                      <div className="relative flex items-center justify-center shrink-0">
                        <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            className="stroke-muted"
                            strokeWidth="3.5"
                            fill="transparent"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            className="stroke-electric-500 transition-all duration-700 ease-out"
                            strokeWidth="3.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-bold font-mono text-foreground">
                          {theme.progressPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        {theme.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5 text-electric-500" />
                      <span>
                        {theme.completedCount} of {theme.companyCount} modules completed
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-3 border-t border-border/60 bg-muted/20 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {theme.companyCount} Case Studies
                    </span>
                    <Link href={`/learn/${theme.slug}`}>
                      <Button variant="primary" size="sm" className="rounded-xl text-xs space-x-1 font-semibold">
                        <span>Explore Track</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
