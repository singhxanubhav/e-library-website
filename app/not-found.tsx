import Link from "next/link";
import { Search, Compass, BookOpen, ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#5B6CFF]/10 text-[#5B6CFF] border border-[#5B6CFF]/20 shadow-xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-[#5B6CFF] font-bold">
            404 Error • Resource Unmapped
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-foreground">
            Case Study Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The requested AI company module, thematic syllabus, or credential record does not exist in our library index.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white font-semibold">
            <Link href="/case-library">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Case Library
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="pt-6 border-t border-border/60">
          <p className="text-xs text-muted-foreground">Looking for certification?</p>
          <Link
            href="/quiz-certificate"
            className="text-xs text-[#5B6CFF] font-medium hover:underline inline-flex items-center gap-1 mt-1"
          >
            <Award className="w-3.5 h-3.5" />
            Visit Quiz & Certification Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
