"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Search,
  Trash2,
  ExternalLink,
  Edit,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
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

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    slug: "",
    sector: "Enterprise AI",
    founders: "",
    foundingYear: "2023",
    hqCity: "San Francisco",
    hqCountry: "United States",
    valueProposition: "",
    readingTimeMin: "7",
    isFeatured: false,
  });

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/companies");
      if (res.ok) {
        const data = await res.json();
        setCompanies(data.companies || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      alert("Name and slug are required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setOpenCreate(false);
        setForm({
          name: "",
          slug: "",
          sector: "Enterprise AI",
          founders: "",
          foundingYear: "2023",
          hqCity: "San Francisco",
          hqCountry: "United States",
          valueProposition: "",
          readingTimeMin: "7",
          isFeatured: false,
        });
        loadCompanies();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create company");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create company");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company module?")) return;
    try {
      const res = await fetch(`/api/admin/companies?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.sector?.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Manage Companies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, update, and manage case study modules across sectors and geographies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setOpenCreate(true)}
            className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by company name, sector, or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl bg-card"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadCompanies}
          className="rounded-xl flex items-center gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Companies Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/40 text-xs font-mono uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Headquarters</th>
                <th className="py-3 px-4">Founded</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((company) => (
                <tr key={company.id || company.slug} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-foreground">{company.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{company.slug}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">
                      {company.sector || "AI"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {company.hqCity}, {company.hqCountry}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono">{company.foundingYear}</td>
                  <td className="py-3 px-4">
                    {company.isFeatured ? (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
                        Featured
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">Standard</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-lg h-8 px-2 text-xs"
                    >
                      <Link href={`/company/${company.slug}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Preview
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(company.id || company.slug)}
                      className="rounded-lg h-8 px-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No companies found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display">Add New AI Company</DialogTitle>
            <DialogDescription className="text-xs">
              Fill in the architectural profile and business model for the case study.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Company Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Anthropic"
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
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  URL Slug *
                </label>
                <Input
                  required
                  placeholder="e.g. anthropic"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Sector
                </label>
                <Input
                  placeholder="e.g. Foundation Models / Safety"
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Founders
                </label>
                <Input
                  placeholder="e.g. Dario Amodei, Daniela Amodei"
                  value={form.founders}
                  onChange={(e) => setForm({ ...form, founders: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Headquarters City
                </label>
                <Input
                  placeholder="e.g. San Francisco"
                  value={form.hqCity}
                  onChange={(e) => setForm({ ...form, hqCity: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Country
                </label>
                <Input
                  placeholder="e.g. United States"
                  value={form.hqCountry}
                  onChange={(e) => setForm({ ...form, hqCountry: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Founding Year
                </label>
                <Input
                  type="number"
                  placeholder="2021"
                  value={form.foundingYear}
                  onChange={(e) => setForm({ ...form, foundingYear: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Estimated Reading Time (Min)
                </label>
                <Input
                  type="number"
                  placeholder="7"
                  value={form.readingTimeMin}
                  onChange={(e) => setForm({ ...form, readingTimeMin: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Value Proposition
              </label>
              <Input
                placeholder="High-steerability frontier language models with constitutional AI guardrails"
                value={form.valueProposition}
                onChange={(e) => setForm({ ...form, valueProposition: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="rounded text-[#5B6CFF] focus:ring-[#5B6CFF]"
              />
              <label htmlFor="isFeatured" className="text-xs font-medium text-foreground cursor-pointer">
                Feature on homepage carousel and library hero
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setOpenCreate(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-[#5B6CFF] text-white hover:bg-[#5B6CFF]/90">
                Save & Publish Company
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
