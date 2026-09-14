"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Lock,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { getInitials } from "@/lib/utils";

interface CompanyItem {
  id?: string;
  slug: string;
  name: string;
  hqCountry: string;
  sector: string;
  fundingStage: string;
  valueProposition: string;
  readingTimeMin: number;
  isCompleted: boolean;
}

interface ThemeDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  companies: CompanyItem[];
  quiz?: {
    id: string;
    title: string;
    description: string;
    passingScorePercent: number;
  };
  completedCount: number;
  totalCompanies: number;
  allCompleted: boolean;
}

export default function ThemeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [theme, setTheme] = React.useState<ThemeDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [showQuiz, setShowQuiz] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;
    fetch(`/api/themes/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Theme not found");
        return res.json();
      })
      .then((data) => {
        setTheme(data.theme);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-6 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded-xl" />
        <div className="h-44 rounded-3xl bg-muted" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!theme) {
    return notFound();
  }

  const completionPercent = Math.round(
    (theme.completedCount / theme.totalCompanies) * 100
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-20">
      {/* Top Breadcrumb */}
      <div>
        <Link href="/learn" className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          <span>Back to All Learning Tracks</span>
        </Link>
      </div>

      {/* Theme Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-3xl border border-border/80 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-10 shadow-card">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="electric" className="text-xs font-bold">
                THEMATIC CURRICULUM
              </Badge>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <BookOpen className="h-4 w-4 text-electric-400" />
                <span>{theme.totalCompanies} Case Studies</span>
              </div>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              {theme.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {theme.description}
            </p>

            {/* Track Progress Bar */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>
                  Track Progress: <strong>{theme.completedCount} of {theme.totalCompanies} modules completed</strong>
                </span>
                <span className="font-mono font-bold text-electric-400">{completionPercent}%</span>
              </div>
              <Progress value={completionPercent} className="h-2 bg-white/10" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Ordered Syllabus Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Curriculum Sequence
          </h2>
          <span className="text-xs text-muted-foreground">
            Complete in order for optimal comprehension
          </span>
        </div>

        <div className="space-y-3">
          {theme.companies.map((company, idx) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <Link href={`/company/${company.slug}`}>
                <Card className="rounded-2xl border border-border p-5 hover:border-electric-500/60 hover:shadow-soft transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      {/* Status Icon */}
                      <div className="shrink-0">
                        {company.isCompleted ? (
                          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-mono font-bold text-xs border border-border group-hover:border-electric-500">
                            0{idx + 1}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-heading font-bold text-base text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400 transition-colors">
                            {company.name}
                          </h3>
                          {company.isCompleted && (
                            <Badge variant="success" className="text-[10px] py-0 px-1.5">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 max-w-xl">
                          {company.valueProposition}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{company.readingTimeMin}m</span>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-xl h-9 px-3">
                        <span className="text-xs">Study</span>
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Theme Quiz CTA Section */}
      <div className="pt-6 border-t border-border">
        {!showQuiz ? (
          <Card className="rounded-3xl border-2 border-electric-500/30 bg-card p-6 sm:p-8 shadow-card text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-navy-800 to-electric-600 text-white shadow-glow">
              <Award className="h-7 w-7" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 mb-2">
                {theme.allCompleted ? (
                  <Badge variant="success" className="text-xs space-x-1">
                    <Unlock className="h-3 w-3 mr-1" />
                    <span>Prerequisites Met • Ready for Certification</span>
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs space-x-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>Recommended: Complete all {theme.totalCompanies} case studies first</span>
                  </Badge>
                )}
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Take the {theme.name} Mastery Quiz
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-1">
                Pass this multi-company scenario evaluation (70%+ threshold) to validate your mastery and earn the Theme Master credential badge.
              </p>
            </div>

            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="rounded-2xl px-8 h-12 text-base font-semibold"
              >
                <span>Launch Theme Quiz</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Theme Mastery Assessment
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuiz(false)}
                className="text-xs"
              >
                Close Assessment
              </Button>
            </div>
            <QuizPlayer
              quizId={theme.quiz?.id || `quiz-theme-${theme.slug.split("-")[0]}`}
              onComplete={(passed) => {
                if (passed) {
                  // Reload progress
                  fetch(`/api/themes/${slug}`)
                    .then((r) => r.json())
                    .then((d) => setTheme(d.theme));
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
