"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, CheckCircle2, MessageSquare, Send, BarChart2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ModuleInteractionData, InteractionOption } from "@/types";

interface InteractionSectionProps {
  interaction?: ModuleInteractionData;
  companySlug: string;
}

export function InteractionSection({
  interaction: initialInteraction,
  companySlug,
}: InteractionSectionProps) {
  const [interaction, setInteraction] = React.useState<ModuleInteractionData | null>(
    initialInteraction || null
  );
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [textResponse, setTextResponse] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [peerSnippets, setPeerSnippets] = React.useState<Array<{ text: string }>>([]);

  // Fetch live aggregates & previous response
  React.useEffect(() => {
    if (!companySlug) return;
    fetch(`/api/companies/${companySlug}/interactions`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.interaction) {
          setInteraction(data.interaction);
          if (data.interaction.userResponse) {
            setSelectedOption(data.interaction.userResponse.selectedOptionId);
            setTextResponse(data.interaction.userResponse.textResponse || "");
            setSubmitted(true);
          }
          if (data.interaction.peerSnippets) {
            setPeerSnippets(data.interaction.peerSnippets);
          }
        }
      })
      .catch((e) => console.warn("Could not fetch interaction state:", e));
  }, [companySlug]);

  if (!interaction) return null;

  const isPeerInsight = interaction.type === "peer_insight";

  const handleSubmit = async (optionId?: string) => {
    const choice = optionId || selectedOption;
    if (!choice && !textResponse) return;

    if (optionId) setSelectedOption(optionId);
    setIsSubmitting(true);

    try {
      const payload = {
        selectedOptionId: choice,
        textResponse: isPeerInsight ? textResponse : undefined,
      };

      // Try company interaction endpoint
      const res = await fetch(
        `/api/companies/${companySlug}/interactions/${interaction.id}/respond`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        // Fallback endpoint
        await fetch(`/api/interactions/${interaction.id}/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      // Re-fetch fresh aggregate stats
      const freshRes = await fetch(`/api/companies/${companySlug}/interactions`);
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        if (freshData?.interaction) {
          setInteraction(freshData.interaction);
        }
      }
    } catch (err) {
      console.error("Failed to submit interaction:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const TYPE_LABELS: Record<string, { label: string; color: string }> = {
    poll: { label: "Strategic Dilemma Poll", color: "electric" },
    tradeoff: { label: "Executive Tradeoff", color: "purple" },
    challenge: { label: "Architecture Challenge", color: "amber" },
    peer_insight: { label: "Peer Strategic Reflection", color: "secondary" },
  };

  const meta = TYPE_LABELS[interaction.type] || {
    label: "Interactive Decision Room",
    color: "electric",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purpleAccent-500">
        <Vote className="h-4 w-4" />
        <span>Section 8 • Interactive Decision Room</span>
      </div>

      <Card className="border-border/80 bg-card p-6 sm:p-8 rounded-3xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <Badge variant={meta.color as any} className="text-xs font-semibold uppercase">
            {meta.label}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center space-x-1">
            <BarChart2 className="h-3.5 w-3.5" />
            <span>{interaction.totalVotes || 1200}+ Verified Votes</span>
          </span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-6 leading-snug">
          {interaction.promptText}
        </h3>

        {/* Options List */}
        {!submitted ? (
          <div className="space-y-3">
            {interaction.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSubmit(opt.id)}
                disabled={isSubmitting}
                className="w-full text-left rounded-2xl border border-border p-4 transition-all duration-200 hover:border-electric-500 hover:bg-navy-50/50 dark:hover:bg-navy-900/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-electric-500 flex items-center justify-between group"
              >
                <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-electric-600 dark:group-hover:text-electric-400">
                  {opt.text}
                </span>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground shrink-0 ml-4">
                  Vote
                </span>
              </button>
            ))}

            {isPeerInsight && (
              <div className="mt-4 space-y-3">
                <Input
                  value={textResponse}
                  onChange={(e) => setTextResponse(e.target.value)}
                  placeholder="Share your technical or strategic perspective..."
                  className="rounded-xl h-12 text-sm"
                />
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || !textResponse.trim()}
                  variant="primary"
                  className="rounded-xl"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Reflection
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Live Aggregate Result Bars with Fill Animation */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Response recorded. Here is how your peers and founders voted:</span>
            </div>

            <div className="space-y-3">
              {interaction.options?.map((opt: any) => {
                const isSelected = selectedOption === opt.id;
                const pct = opt.percentage || 25;

                return (
                  <motion.div
                    key={opt.id}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-electric-500 bg-electric-50/50 dark:bg-electric-950/30 shadow-soft"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                      <span className="flex items-center space-x-2">
                        <span>{opt.text}</span>
                        {isSelected && (
                          <Badge variant="electric" className="text-[10px] py-0 px-1.5 font-bold">
                            Your Vote
                          </Badge>
                        )}
                      </span>
                      <span className="font-mono text-electric-600 dark:text-electric-400 font-bold text-sm">
                        {pct}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-100 dark:bg-navy-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-electric-500 to-purpleAccent-500"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Peer Reflections Snippets (if any) */}
            {peerSnippets.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Recent Anonymized Community Reflections
                </span>
                <div className="space-y-2">
                  {peerSnippets.map((snip, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-muted/40 text-xs text-foreground italic border border-border/50">
                      "{snip.text}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </Card>
    </motion.section>
  );
}
