"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEEDED_ARTICLES } from "@/lib/insights-data";
import { getInitials } from "@/lib/utils";

export default function InsightsPage() {
  const [articles, setArticles] = useState<any[]>(SEEDED_ARTICLES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const res = await fetch("/api/insights");
        if (res.ok) {
          const data = await res.json();
          if (data.insights && data.insights.length > 0) {
            setArticles(data.insights);
          }
        }
      } catch (e) {
        console.error("Failed to load insights:", e);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full bg-electric-500/10 px-3.5 py-1.5 text-xs font-semibold text-electric-600 dark:text-electric-400">
          <Newspaper className="h-4 w-4" />
          <span>Strategic Research & Analysis</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          AI Industry Insights
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Deep-dive analyses exploring token gross margins, venture capital economics, and non-Western foundational AI ecosystems.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, idx) => {
          const author = article.author || article.authorName || "Editorial Team";
          const initials = getInitials(author);

          return (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Link href={`/insights/${article.slug}`} className="flex w-full">
                <Card className="flex flex-col justify-between w-full rounded-3xl border border-border/80 bg-card hover:border-electric-500/60 hover:shadow-card transition-all overflow-hidden group">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(article.tags || ["Insight"]).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{article.readingTimeMin} min</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </CardHeader>

                  <CardFooter className="p-5 sm:p-6 pt-3 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-navy-800 text-white flex items-center justify-center text-[10px] font-bold">
                        {initials}
                      </div>
                      <span>{author} • {article.publishedDate}</span>
                    </div>

                    <span className="font-semibold text-electric-600 dark:text-electric-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                      Read Article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
