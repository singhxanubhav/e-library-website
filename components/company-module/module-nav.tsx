import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModuleNavProps {
  prevCompany: { slug: string; name: string } | null;
  nextCompany: { slug: string; name: string } | null;
}

export function ModuleNav({ prevCompany, nextCompany }: ModuleNavProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t border-border">
      <Link href="/case-library" className="w-full sm:w-auto">
        <Button variant="outline" className="rounded-xl space-x-2 w-full sm:w-auto">
          <BookOpen className="h-4 w-4" />
          <span>Back to Case Library</span>
        </Button>
      </Link>

      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
        {prevCompany && (
          <Link href={`/company/${prevCompany.slug}`}>
            <Button variant="ghost" size="sm" className="rounded-xl space-x-1 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Prev: {prevCompany.name}</span>
            </Button>
          </Link>
        )}

        {nextCompany && (
          <Link href={`/company/${nextCompany.slug}`}>
            <Button variant="primary" size="sm" className="rounded-xl space-x-1.5 text-xs font-semibold">
              <span>Next: {nextCompany.name}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
