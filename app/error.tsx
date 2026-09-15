"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-xl">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-rose-500 font-bold">
            500 Error • Runtime Exception
          </p>
          <h1 className="text-3xl font-extrabold font-display text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our telemetry has logged this event. You can attempt to recover the session state or return to the main case library.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-muted-foreground/80 bg-secondary/50 p-2 rounded-xl">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white font-semibold"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/case-library">
              <Home className="w-4 h-4 mr-2" />
              Return to Cases
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
