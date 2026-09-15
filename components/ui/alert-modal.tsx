"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  variant?: "error" | "success" | "info";
}

export function AlertModal({
  open,
  onOpenChange,
  title,
  message,
  variant = "error",
}: AlertModalProps) {
  const defaultTitle =
    variant === "error"
      ? "Action Failed"
      : variant === "success"
      ? "Success"
      : "Notice";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] sm:max-w-sm rounded-2xl sm:rounded-3xl p-6">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                variant === "error"
                  ? "bg-rose-500/15 text-rose-500 border border-rose-500/20"
                  : variant === "success"
                  ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                  : "bg-electric-500/15 text-electric-600 border border-electric-500/20"
              }`}
            >
              {variant === "error" ? (
                <AlertCircle className="w-5 h-5" />
              ) : variant === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <DialogTitle className="text-base font-bold font-display text-foreground">
              {title || defaultTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-3">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl bg-primary text-primary-foreground"
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
