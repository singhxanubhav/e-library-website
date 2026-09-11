"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Award, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Top Pill Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-electric-500/20 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold text-electric-600 dark:text-electric-400 backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Deep-Dive Strategy & Architecture for Generational Startups</span>
            </div>
          </motion.div>

          {/* Main Space Grotesk Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            AI Company Case Library:{" "}
            <span className="bg-gradient-to-r from-navy-800 via-electric-500 to-purpleAccent-500 bg-clip-text text-transparent dark:from-white dark:via-electric-400 dark:to-purpleAccent-400">
              Learn how AI businesses create value.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal"
          >
            Analyze real-world unit economics, token cost models, competitive data moats,
            and software architectures of leading Indian & global AI companies.
            Solve dilemma polls, complete modules, and earn certified credentials.
          </motion.p>

          {/* 3 Prominent CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full max-w-xl"
          >
            {/* CTA 1: Explore Case Library */}
            <Link href="/case-library" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-2xl px-7 h-13 shadow-glow hover:shadow-lg text-base font-semibold"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Case Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            {/* CTA 2: Start Learning */}
            <Link href="/learn" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto rounded-2xl px-6 h-13 border border-border/80 text-base font-medium"
              >
                <GraduationCap className="mr-2 h-5 w-5 text-electric-500" />
                Start Learning
              </Button>
            </Link>

            {/* CTA 3: Take a Quiz */}
            <Link href="/quiz-certificate" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-2xl px-6 h-13 border-amberHighlight-500/40 hover:bg-amberHighlight-500/10 text-base font-medium text-amberHighlight-600 dark:text-amberHighlight-400"
              >
                <Award className="mr-2 h-5 w-5 text-amberHighlight-500" />
                Take a Quiz
              </Button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md shadow-soft max-w-3xl w-full"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-navy-800 dark:text-white">8+</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">In-Depth Case Studies</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-electric-600 dark:text-electric-400">22+</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Taxonomy Tags</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-purpleAccent-500">100%</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Free & Open Knowledge</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-heading text-amberHighlight-500">Mastery</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Verified Certificates</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
