"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  Eye,
  Edit3,
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
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AlertModal } from "@/components/ui/alert-modal";

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ open: boolean; message: string; title?: string; variant?: "error" | "success" }>({
    open: false,
    message: "",
  });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    authorName: "Jigyasa Sharma",
    readingTimeMin: "6",
    contentMd: "",
  });

  const loadInsights = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/insights");
      if (res.ok) {
        const data = await res.json();
        setInsights(data.insights || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.contentMd) {
      setAlertInfo({ open: true, message: "Title, slug, and markdown content are required fields.", title: "Missing Information", variant: "error" });
      return;
    }

    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setOpenCreate(false);
        setForm({
          title: "",
          slug: "",
          authorName: "Jigyasa Sharma",
          readingTimeMin: "6",
          contentMd: "",
        });
        setPreviewMode(false);
        loadInsights();
        setAlertInfo({ open: true, message: "Insight article published successfully!", title: "Published", variant: "success" });
      } else {
        const err = await res.json();
        setAlertInfo({ open: true, message: err.error || "Failed to publish article.", variant: "error" });
      }
    } catch (err) {
      console.error(err);
      setAlertInfo({ open: true, message: "Network error occurred while publishing.", variant: "error" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/insights?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInsights((prev) => prev.filter((i) => i.id !== deleteTargetId && i.slug !== deleteTargetId));
        setDeleteTargetId(null);
      } else {
        setAlertInfo({ open: true, message: "Failed to delete insight article.", variant: "error" });
      }
    } catch (e) {
      console.error(e);
      setAlertInfo({ open: true, message: "Network error occurred while deleting.", variant: "error" });
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = insights.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Editorial Insights CMS
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish deep architectural breakdowns, industry memos, and economic analyses.
          </p>
        </div>

        <Button
          onClick={() => setOpenCreate(true)}
          className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl bg-card"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadInsights}
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
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((item) => (
                <tr key={item.id || item.slug} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.slug}</p>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{item.authorName}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{item.readingTimeMin} min</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{item.publishedDate}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTargetId(item.id || item.slug)}
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

      {/* Add Article Dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display">New Editorial Article</DialogTitle>
            <DialogDescription className="text-xs">
              Write insightful technical and business analysis in standard markdown.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Title *</label>
                <Input
                  required
                  placeholder="e.g. Navigating Model Distillation & MoEs in 2026"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setForm({ ...form, title, slug: form.slug || slug });
                  }}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Slug *</label>
                <Input
                  required
                  placeholder="e.g. navigating-model-distillation-moes-2026"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Author Name</label>
                <Input
                  placeholder="e.g. Dr. Jigyasa & Antigravity Editorial"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Reading Time (Min)</label>
                <Input
                  type="number"
                  placeholder="6"
                  value={form.readingTimeMin}
                  onChange={(e) => setForm({ ...form, readingTimeMin: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Markdown Editor / Preview Tabs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Article Content (Markdown) *
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={previewMode ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => setPreviewMode(false)}
                    className="rounded-lg h-7 text-xs px-2.5"
                  >
                    <Edit3 className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button
                    type="button"
                    variant={previewMode ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode(true)}
                    className="rounded-lg h-7 text-xs px-2.5"
                  >
                    <Eye className="w-3 h-3 mr-1" /> Preview
                  </Button>
                </div>
              </div>

              {previewMode ? (
                <div className="w-full min-h-[220px] max-h-[350px] overflow-y-auto rounded-xl border border-input bg-card p-4 text-xs prose dark:prose-invert">
                  <ReactMarkdown>
                    {form.contentMd || "*No markdown content yet. Type something in the Edit tab.*"}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  rows={10}
                  required
                  placeholder="## The Architecture Frontier&#10;&#10;Explain the unit economics, inference latency tradeoffs, and engineering breakthroughs..."
                  value={form.contentMd}
                  onChange={(e) => setForm({ ...form, contentMd: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>

            <DialogFooter className="pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setOpenCreate(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-[#5B6CFF] text-white hover:bg-[#5B6CFF]/90">
                Publish Article
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation & Alert Modals */}
      <ConfirmDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Delete Insight Article"
        description="Are you sure you want to permanently delete this research article? This will remove it from the public Insights directory."
        confirmText="Delete Article"
        isLoading={deleteLoading}
        onConfirm={confirmDelete}
      />

      <AlertModal
        open={alertInfo.open}
        onOpenChange={(open) => setAlertInfo((prev) => ({ ...prev, open }))}
        title={alertInfo.title}
        message={alertInfo.message}
        variant={alertInfo.variant}
      />
    </div>
  );
}
