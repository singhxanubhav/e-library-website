"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Activity, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TractionMetrics } from "@/types";

export function TractionMetricsSection({ metrics }: { metrics: TractionMetrics }) {
  const stats = metrics?.stats || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        <BarChart3 className="h-4 w-4" />
        <span>Section 5 • Scale & Growth</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Traction & Operational Metrics
        </h2>

        {/* Primary 4-Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="rounded-2xl border border-border bg-navy-50/50 dark:bg-navy-900/40 p-4">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-xs font-semibold uppercase">Revenue Run-Rate</span>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              {metrics.arr || "Confidential"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-navy-50/50 dark:bg-navy-900/40 p-4">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-xs font-semibold uppercase">Active Users / Devs</span>
              <Users className="h-4 w-4 text-electric-500" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              {metrics.users || "High Volume"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-navy-50/50 dark:bg-navy-900/40 p-4">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-xs font-semibold uppercase">Inference / Volume</span>
              <Activity className="h-4 w-4 text-purpleAccent-500" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              {metrics.queries || "Enterprise Scale"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-navy-50/50 dark:bg-navy-900/40 p-4">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-xs font-semibold uppercase">Growth Velocity</span>
              <TrendingUp className="h-4 w-4 text-amberHighlight-500" />
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground text-emerald-600 dark:text-emerald-400">
              {metrics.growth || "+100% YoY"}
            </p>
          </div>
        </div>

        {/* Detailed Qualitative Stats Breakdown */}
        {stats.length > 0 && (
          <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Performance Indicators & Efficiency Ratios
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-background border border-border p-3.5"
                >
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.section>
  );
}
