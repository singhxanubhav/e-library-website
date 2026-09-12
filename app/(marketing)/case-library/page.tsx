"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, X, BookOpen, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CompanyCard } from "@/components/case-library/company-card";
import { FilterPanel } from "@/components/case-library/filter-panel";
import { CompanyData } from "@/types";

interface FilterState {
  industry: string[];
  technique: string[];
  geography: string[];
  businessModel: string[];
  stage: string[];
}

function CaseLibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search & Filters State
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);
  const [sort, setSort] = React.useState<"name" | "foundingYear" | "stage" | "readingTime">(
    (searchParams.get("sort") as any) || "name"
  );
  const [page, setPage] = React.useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<FilterState>(() => {
    const parseParam = (key: string): string[] => {
      const val = searchParams.get(key);
      return val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
    };
    return {
      industry: parseParam("industry"),
      technique: parseParam("technique"),
      geography: parseParam("geography"),
      businessModel: parseParam("businessModel"),
      stage: parseParam("stage"),
    };
  });

  // Data fetching state
  const [companies, setCompanies] = React.useState<CompanyData[]>([]);
  const [pagination, setPagination] = React.useState({
    total: 0,
    page: 1,
    pageSize: 9,
    totalPages: 1,
  });
  const [loading, setLoading] = React.useState(true);

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch companies when params change
  React.useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const query = new URLSearchParams();
    if (debouncedSearch) query.set("search", debouncedSearch);
    if (sort) query.set("sort", sort);
    query.set("page", page.toString());
    query.set("pageSize", "9");

    if (filters.industry.length > 0) query.set("industry", filters.industry.join(","));
    if (filters.technique.length > 0) query.set("technique", filters.technique.join(","));
    if (filters.geography.length > 0) query.set("geography", filters.geography.join(","));
    if (filters.businessModel.length > 0) query.set("businessModel", filters.businessModel.join(","));
    if (filters.stage.length > 0) query.set("stage", filters.stage.join(","));

    fetch(`/api/companies?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled) {
          setCompanies(data.companies || []);
          if (data.pagination) setPagination(data.pagination);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load companies:", err);
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, sort, page, filters]);

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setPage(1);
    setFilters((prev) => {
      const current = prev[category];
      const exists = current.includes(value);
      return {
        ...prev,
        [category]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      industry: [],
      technique: [],
      geography: [],
      businessModel: [],
      stage: [],
    });
    setSearch("");
    setPage(1);
  };

  const activeFilterCount =
    filters.industry.length +
    filters.technique.length +
    filters.geography.length +
    filters.businessModel.length +
    filters.stage.length;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-electric-600 dark:text-electric-400">
          Case Library
        </span>
        <h1 className="mt-1 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
          AI Company Case Studies
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">
          Search and filter deep-dive case studies by industry sector, AI technique, geographic ecosystem, and monetization model.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card/80 p-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company name, value prop, or problem..."
            className="pl-10 h-10 rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Filter Button */}
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden rounded-xl h-10 space-x-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-800 text-[10px] text-white dark:bg-electric-500">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="p-6">
              <SheetHeader className="text-left pb-3 border-b border-border">
                <SheetTitle>Filter Case Studies</SheetTitle>
              </SheetHeader>
              <div className="py-4 max-h-[60vh] overflow-y-auto">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  activeCount={activeFilterCount}
                />
              </div>
              <div className="pt-3 border-t border-border">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Show Results ({pagination.total})
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as any);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-electric-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="foundingYear">Founding Year (Newest)</option>
              <option value="stage">Funding Stage</option>
              <option value="readingTime">Reading Time (Shortest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter Panel */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              activeCount={activeFilterCount}
            />
          </div>
        </aside>

        {/* Company Grid & Results */}
        <main className="lg:col-span-3 space-y-6">
          {/* Result Count Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium px-1">
            <span>
              Showing <strong className="text-foreground">{companies.length}</strong> of{" "}
              <strong className="text-foreground">{pagination.total}</strong> case studies
            </span>
            {activeFilterCount > 0 && (
              <span>Filtered by {activeFilterCount} dimensions</span>
            )}
          </div>

          {/* Loading Skeleton State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl border border-border p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                  </div>
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-14 w-full rounded" />
                  <div className="flex space-x-2 pt-4">
                    <Skeleton className="h-5 w-14 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : companies.length > 0 ? (
            /* Responsive Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.map((company, index) => (
                <CompanyCard
                  key={company.id || company.slug}
                  company={company}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl border border-border bg-card/60 p-12 text-center shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                No case studies match your filters
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Try loosening your search keywords or clearing selected category filters.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleResetFilters}
                className="mt-6 rounded-xl space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </Button>
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-8 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl"
              >
                Previous
              </Button>
              <span className="text-xs text-muted-foreground px-3">
                Page <strong className="text-foreground">{page}</strong> of{" "}
                <strong className="text-foreground">{pagination.totalPages}</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="rounded-xl"
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function CaseLibraryPage() {
  return (
    <React.Suspense
      fallback={
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <CaseLibraryContent />
    </React.Suspense>
  );
}
