"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  HelpCircle,
  Award,
  ArrowUpRight,
  Sparkles,
  Layers,
  FileText,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminStats {
  counts: {
    totalUsers: number;
    totalCompanies: number;
    totalThemes: number;
    totalQuizzes: number;
    totalInsights: number;
    totalAttempts: number;
    totalCertificates: number;
  };
  recentAttempts: Array<{
    id: string;
    scorePercent: number;
    passed: boolean;
    createdAt: string;
    user: { name: string; email: string };
    quiz: { title: string; type: string };
  }>;
  recentCertificates: Array<{
    id: string;
    verificationId: string;
    learnerName: string;
    completionDate: string;
  }>;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error("Failed to load admin stats:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Platform Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time analytics, curriculum health, user attempts, and credential issuances.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadStats}
          className="rounded-xl flex items-center gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Learners */}
        <Card className="rounded-2xl border border-border p-5 bg-card/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
              Learners
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-display text-foreground">
              {stats?.counts.totalUsers ?? "—"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Active registered accounts</p>
          </div>
        </Card>

        {/* Company Modules */}
        <Card className="rounded-2xl border border-border p-5 bg-card/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
              Case Modules
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-display text-foreground">
              {stats?.counts.totalCompanies ?? "—"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Published deep-dives</p>
          </div>
        </Card>

        {/* Quiz Attempts */}
        <Card className="rounded-2xl border border-border p-5 bg-card/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
              Quiz Attempts
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-display text-foreground">
              {stats?.counts.totalAttempts ?? "—"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Total evaluations logged</p>
          </div>
        </Card>

        {/* Certificates */}
        <Card className="rounded-2xl border border-border p-5 bg-card/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
              Certificates
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-display text-foreground">
              {stats?.counts.totalCertificates ?? "—"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Conferred executive credentials</p>
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/companies"
          className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-primary/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Manage Companies</p>
              <p className="text-xs text-muted-foreground">Add or edit case modules</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        <Link
          href="/admin/themes"
          className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-primary/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#8B5CF6]" />
            <div>
              <p className="text-sm font-semibold text-foreground">Thematic Tracks</p>
              <p className="text-xs text-muted-foreground">Organize learning tracks</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        <Link
          href="/admin/quizzes"
          className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-primary/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <p className="text-sm font-semibold text-foreground">Manage Quizzes</p>
              <p className="text-xs text-muted-foreground">Edit questions & scenarios</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        <Link
          href="/admin/insights"
          className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-primary/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-foreground">Insights CMS</p>
              <p className="text-xs text-muted-foreground">Publish editorial articles</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      </div>

      {/* Activity Streams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quiz Attempts */}
        <Card className="rounded-3xl border border-border bg-card/60 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-bold font-display">Recent Evaluations</CardTitle>
            <CardDescription className="text-xs">Live assessment submissions from scholars</CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border/60">
            {stats?.recentAttempts.map((att) => (
              <div key={att.id} className="py-3 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{att.user?.name || "Scholar"}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[140px] sm:max-w-xs">
                    {att.quiz?.title || "Quiz"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <Badge
                    className={
                      att.passed
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs"
                        : "bg-rose-500/20 text-rose-400 border-rose-500/30 text-xs"
                    }
                  >
                    {att.scorePercent}% {att.passed ? "Passed" : "Retake"}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {new Date(att.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Certificates Issued */}
        <Card className="rounded-3xl border border-border bg-card/60 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-bold font-display">Recent Credentials Issued</CardTitle>
            <CardDescription className="text-xs">Verifiable credentials awarded to graduates</CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border/60">
            {stats?.recentCertificates.map((cert) => (
              <div key={cert.id} className="py-3 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{cert.learnerName}</p>
                  <Link
                    href={`/verify/${cert.verificationId}`}
                    target="_blank"
                    className="text-xs font-mono text-[#5B6CFF] hover:underline truncate block"
                  >
                    {cert.verificationId}
                  </Link>
                </div>
                <div className="text-right shrink-0">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                    Conferred
                  </Badge>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {new Date(cert.completionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
