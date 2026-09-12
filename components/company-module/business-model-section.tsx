"use client";

import { motion } from "framer-motion";
import { CreditCard, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BusinessModelSectionProps {
  businessModelDescription: string;
  tags?: {
    business_model?: string[];
  };
}

export function BusinessModelSection({
  businessModelDescription,
  tags,
}: BusinessModelSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purpleAccent-500">
        <CreditCard className="h-4 w-4" />
        <span>Section 4 • Monetization Engine</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Business Model & Monetization
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {tags?.business_model?.map((bm) => (
              <Badge key={bm} variant="outline" className="text-xs">
                {bm}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {businessModelDescription}
        </p>
      </Card>
    </motion.section>
  );
}
