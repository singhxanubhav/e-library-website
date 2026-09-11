import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-navy-800 text-white shadow-sm hover:bg-navy-700 dark:bg-electric-500 dark:hover:bg-electric-600",
        primary:
          "bg-gradient-to-r from-electric-500 to-purpleAccent-500 text-white shadow-md hover:opacity-95 hover:shadow-glow",
        secondary:
          "bg-navy-50 text-navy-800 hover:bg-navy-100 dark:bg-navy-700 dark:text-navy-100 dark:hover:bg-navy-600",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
        amber:
          "bg-amberHighlight-500 text-navy-950 font-semibold hover:bg-amberHighlight-400 shadow-sm hover:shadow-glow-amber",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-electric-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
