"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "module",
    passingScorePercent: "70",
  });

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/quizzes");
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data.quizzes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      alert("Title is required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setOpenCreate(false);
        setForm({ title: "", description: "", type: "module", passingScorePercent: "70" });
        loadQuizzes();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    try {
      const res = await fetch(`/api/admin/quizzes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = quizzes.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Manage Assessments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure module quizzes, thematic tracks, scenario simulations, and capstone exams.
          </p>
        </div>

        <Button
          onClick={() => setOpenCreate(true)}
          className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Assessment</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl bg-card"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadQuizzes}
          className="rounded-xl flex items-center gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
          <thead className="bg-secondary/40 text-xs font-mono uppercase text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Questions</th>
              <th className="py-3 px-4">Pass Mark</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-secondary/20 transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-foreground">{quiz.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                    {quiz.description}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant="outline"
                    className={
                      quiz.type === "final"
                        ? "bg-primary/10 text-primary border-primary/30 text-xs uppercase"
                        : quiz.type === "scenario"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs uppercase"
                        : quiz.type === "theme"
                        ? "bg-purple-500/10 text-purple-500 border-purple-500/30 text-xs uppercase"
                        : "bg-secondary text-muted-foreground text-xs uppercase"
                    }
                  >
                    {quiz.type}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-xs font-mono">{quiz.questionCount || 0}</td>
                <td className="py-3 px-4 text-xs font-mono font-semibold">
                  {quiz.passingScorePercent}%
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <Button asChild variant="ghost" size="sm" className="rounded-lg h-8 px-2 text-xs">
                    <Link href="/quiz-certificate">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Hub
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(quiz.id)}
                    className="rounded-lg h-8 px-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add Quiz Dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="w-[95vw] sm:max-w-lg rounded-3xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display">Create Assessment</DialogTitle>
            <DialogDescription className="text-xs">
              Configure assessment parameters and passing criteria.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Assessment Title *</label>
              <Input
                required
                placeholder="e.g. Advanced Agentic Routing Dilemmas"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="module">Module Quiz</option>
                  <option value="theme">Theme Track</option>
                  <option value="scenario">Scenario Simulation</option>
                  <option value="final">Capstone Final</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Pass Score (%)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={form.passingScorePercent}
                  onChange={(e) => setForm({ ...form, passingScorePercent: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Detailed instructions and learning objectives..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-input bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <DialogFooter className="pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setOpenCreate(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-[#5B6CFF] text-white hover:bg-[#5B6CFF]/90">
                Save Assessment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
