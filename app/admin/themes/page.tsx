"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  RefreshCw,
  Search,
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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AlertModal } from "@/components/ui/alert-modal";

export default function AdminThemesPage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ open: boolean; message: string; title?: string; variant?: "error" | "success" }>({
    open: false,
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const loadThemes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/themes");
      if (res.ok) {
        const data = await res.json();
        setThemes(data.themes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThemes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      setAlertInfo({
        open: true,
        title: "Missing Fields",
        message: "Track name and slug are required fields.",
        variant: "error",
      });
      return;
    }

    try {
      const res = await fetch("/api/admin/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setOpenCreate(false);
        setForm({ name: "", slug: "", description: "" });
        loadThemes();
      } else {
        const err = await res.json();
        setAlertInfo({
          open: true,
          title: "Error Creating Track",
          message: err.error || "Failed to create learning track",
          variant: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setAlertInfo({
        open: true,
        title: "Network Error",
        message: "Failed to create track due to a network error.",
        variant: "error",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/admin/themes?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setThemes((prev) => prev.filter((t) => t.id !== deleteTargetId && t.slug !== deleteTargetId));
        setDeleteTargetId(null);
      } else {
        const err = await res.json();
        setAlertInfo({
          open: true,
          title: "Delete Failed",
          message: err.error || "Failed to delete track",
          variant: "error",
        });
      }
    } catch (e) {
      console.error(e);
      setAlertInfo({
        open: true,
        title: "Delete Failed",
        message: "An error occurred while deleting track.",
        variant: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = themes.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Learning Tracks & Themes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curate ordered learning sequences and multi-company thematic tracks.
          </p>
        </div>

        <Button
          onClick={() => setOpenCreate(true)}
          className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Track</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tracks by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl bg-card"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadThemes}
          className="rounded-xl flex items-center gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((theme) => {
          const companyCount =
            theme.themeCompanies?.length ||
            (theme.companies ? theme.companies.length : 0);

          return (
            <div
              key={theme.id || theme.slug}
              className="p-6 rounded-2xl border border-border bg-card/60 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30 text-xs">
                    Curriculum Track
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    {companyCount} Case Modules
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{theme.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="rounded-xl text-xs">
                  <Link href={`/learn/${theme.slug}`} target="_blank">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    Preview Track
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTargetId(theme.id || theme.slug)}
                  className="rounded-xl text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Track Dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display">Create Learning Track</DialogTitle>
            <DialogDescription className="text-xs">
              Group company modules into a cohesive architectural syllabus.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Track Name *</label>
              <Input
                required
                placeholder="e.g. Sovereign AI & National Silicon"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  setForm({ ...form, name, slug: form.slug || slug });
                }}
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Track Slug *</label>
              <Input
                required
                placeholder="e.g. sovereign-ai-national-silicon"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Description</label>
              <textarea
                rows={4}
                placeholder="Explain the curricular focus and architectural takeaways of this track..."
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
                Create Track
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation & Alert Modals */}
      <ConfirmDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Delete Learning Track"
        description="Are you sure you want to permanently delete this learning track? Case modules will remain available individually."
        confirmText="Delete Track"
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
