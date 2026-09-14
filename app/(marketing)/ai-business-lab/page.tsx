"use client";

import * as React from "react";
import { FlaskConical, ArrowRightLeft, Filter, BookOpen, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyComparator } from "@/components/lab/company-comparator";
import { FilterExplorer } from "@/components/lab/filter-explorer";
import { ConceptDialogCards } from "@/components/lab/concept-dialog-cards";

export default function AiBusinessLabPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full bg-purpleAccent-500/10 px-3.5 py-1.5 text-xs font-semibold text-purpleAccent-500">
          <FlaskConical className="h-4 w-4" />
          <span>Interactive Strategy Sandbox</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          AI Business Strategy Lab
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Stress-test unit economics, compare startup architectures side-by-side, and explore foundational AI commercialization concepts.
        </p>
      </div>

      {/* Lab Tabs */}
      <Tabs defaultValue="comparator" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="h-12 rounded-2xl p-1 bg-muted/80 border border-border">
            <TabsTrigger value="comparator" className="rounded-xl px-5 space-x-2 text-xs sm:text-sm font-semibold">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Company Comparator</span>
            </TabsTrigger>
            <TabsTrigger value="filter" className="rounded-xl px-5 space-x-2 text-xs sm:text-sm font-semibold">
              <Filter className="h-4 w-4" />
              <span>Filter Explorer</span>
            </TabsTrigger>
            <TabsTrigger value="concepts" className="rounded-xl px-5 space-x-2 text-xs sm:text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>Concept Cards</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="comparator" className="space-y-4">
          <CompanyComparator />
        </TabsContent>

        <TabsContent value="filter" className="space-y-4">
          <FilterExplorer />
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <ConceptDialogCards />
        </TabsContent>
      </Tabs>
    </div>
  );
}
