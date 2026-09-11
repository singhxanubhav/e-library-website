import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-navy-800 text-white hover:bg-navy-700 dark:bg-electric-500 dark:hover:bg-electric-600",
        secondary:
          "border-transparent bg-navy-100 text-navy-800 dark:bg-navy-700 dark:text-navy-100",
        outline: "text-foreground border-border",
        electric:
          "border-transparent bg-electric-50 text-electric-600 dark:bg-electric-950/60 dark:text-electric-300 border-electric-200 dark:border-electric-800",
        purple:
          "border-transparent bg-purple-50 text-purpleAccent-500 dark:bg-purple-950/60 dark:text-purpleAccent-400 border-purple-200 dark:border-purple-800",
        amber:
          "border-transparent bg-amber-50 text-amberHighlight-600 dark:bg-amber-950/60 dark:text-amberHighlight-400 border-amber-200 dark:border-amber-800",
        success:
          "border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
        destructive:
          "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
