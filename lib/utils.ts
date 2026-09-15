import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

export function getInitials(name: string): string {
  if (!name) return "AI";
  // Remove text in parentheses/brackets e.g. "Jigyasa (Founder)" -> "Jigyasa"
  const cleaned = name.replace(/\s*[\(\[\{].*?[\)\]\}]\s*/g, " ").trim();
  // Extract alphanumeric tokens
  const words = cleaned
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  if (words.length === 0) {
    const rawAlpha = name.replace(/[^a-zA-Z0-9]/g, "");
    return rawAlpha.substring(0, 2).toUpperCase() || "AI";
  }

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
