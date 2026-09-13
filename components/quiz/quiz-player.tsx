"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  type: string;
  text: string;
  options: Array<{ id: string; text: string }>;
  sortOrder: number;
}

interface Quiz {
  id: string;
  type: string;
  title: string;
  description: string;
  passingScorePercent: number;
  questions: Question[];
}

interface AttemptResult {
  scorePercent: number;
  passed: boolean;
  passingScorePercent: number;
  totalQuestions: number;
  correctCount: number;
  perQuestion: Array<{
    questionId: string;
    correct: boolean;
    correctOptionId: string;
    explanation: string;
  }>;
}

interface QuizPlayerProps {
  quizId: string;
  companySlug?: string;
  onComplete?: (passed: boolean) => void;
}

export function QuizPlayer({ quizId, companySlug, onComplete }: QuizPlayerProps) {
  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<AttemptResult | null>(null);

  // Fetch quiz details (stripped of answers)
  React.useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetch(`/api/quizzes/${quizId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Quiz not found");
        return res.json();
      })
      .then((data) => {
        if (!isCancelled) {
          setQuiz(data.quiz);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || "Failed to load quiz");
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [quizId]);

  if (loading) {
    return (
      <Card className="rounded-3xl border-border bg-card p-8 animate-pulse text-center">
        <div className="h-6 w-48 bg-muted rounded mx-auto mb-4" />
        <div className="h-4 w-96 bg-muted rounded mx-auto" />
      </Card>
    );
  }

  if (error || !quiz) {
    return (
      <Card className="rounded-3xl border-border bg-card p-6 text-center text-muted-foreground text-sm">
        <HelpCircle className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
        <p>Quiz unavailable at this time.</p>
      </Card>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const totalCount = quiz.questions.length;
  const progressPercent = Math.round((answeredCount / totalCount) * 100);
  const allAnswered = answeredCount === totalCount;

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (result) return; // Locked once submitted
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (!allAnswered || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([qId, optId]) => ({
          questionId: qId,
          selectedOptionId: optId,
        })),
      };

      const res = await fetch(`/api/quizzes/${quiz.id}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        if (onComplete) onComplete(data.passed);
      } else {
        setError(data.error || "Failed to submit attempt");
      }
    } catch (err) {
      setError("Network error while submitting quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card overflow-hidden">
      {/* Quiz Header */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="electric" className="text-xs font-semibold">
            {quiz.type.toUpperCase()} MASTERY EVALUATION
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">
            Passing threshold: <strong className="text-foreground">{quiz.passingScorePercent}%</strong>
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          {quiz.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {quiz.description}
        </p>

        {/* Progress Bar Header */}
        {!result && (
          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>Answered {answeredCount} of {totalCount} questions</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}
      </div>

      {/* Result Card (When submitted) */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`my-6 rounded-2xl p-6 text-center border ${
              result.passed
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                : "border-destructive/30 bg-destructive/10 text-destructive dark:text-red-300"
            }`}
          >
            <div className="flex justify-center mb-3">
              {result.passed ? (
                <div className="h-12 w-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-2xl bg-destructive text-white flex items-center justify-center shadow-lg">
                  <XCircle className="h-7 w-7" />
                </div>
              )}
            </div>

            <h4 className="font-heading text-2xl font-extrabold">
              {result.passed ? "Congratulations! You Passed!" : "Needs Review"}
            </h4>
            <p className="mt-1 text-sm opacity-90">
              You scored <strong className="text-lg">{result.scorePercent}%</strong> ({result.correctCount}/{result.totalQuestions} correct). Required: {result.passingScorePercent}%.
            </p>

            <div className="mt-4 flex justify-center space-x-3">
              <Button
                variant={result.passed ? "secondary" : "outline"}
                size="sm"
                onClick={handleRetake}
                className="rounded-xl space-x-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Quiz</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions List (All-at-once) */}
      <div className="divide-y divide-border/60">
        {quiz.questions.map((question, qIdx) => {
          const selectedOption = answers[question.id];
          const qResult = result?.perQuestion.find(
            (p) => p.questionId === question.id
          );

          return (
            <div key={question.id} className="py-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-base font-semibold text-foreground leading-snug">
                  <span className="font-heading text-electric-600 dark:text-electric-400 mr-2">
                    {qIdx + 1}.
                  </span>
                  {question.text}
                </h4>

                {qResult && (
                  <Badge
                    variant={qResult.correct ? "success" : "destructive"}
                    className="shrink-0 text-[11px]"
                  >
                    {qResult.correct ? "Correct" : "Incorrect"}
                  </Badge>
                )}
              </div>

              {/* Options Radio Cards */}
              <div className="space-y-2">
                {question.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = qResult?.correctOptionId === opt.id;
                  const isWrongSelection = qResult && isSelected && !qResult.correct;

                  let borderStyle = "border-border";
                  let bgStyle = "bg-background";

                  if (result) {
                    if (isCorrect) {
                      borderStyle = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200";
                    } else if (isWrongSelection) {
                      borderStyle = "border-destructive bg-destructive/10 text-destructive";
                    }
                  } else if (isSelected) {
                    borderStyle = "border-electric-500 bg-electric-50/50 dark:bg-electric-950/30";
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={!!result}
                      onClick={() => handleSelectOption(question.id, opt.id)}
                      className={`w-full text-left rounded-2xl border p-3.5 transition-all text-xs sm:text-sm font-medium flex items-center justify-between group ${borderStyle} ${bgStyle} ${
                        !result && "hover:border-electric-500/70 hover:bg-muted/40"
                      }`}
                    >
                      <span className="flex-1 pr-3">{opt.text}</span>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-electric-500 bg-electric-500 text-white"
                            : "border-muted-foreground/40 group-hover:border-foreground"
                        }`}
                      >
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {qResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-xl bg-navy-50/70 dark:bg-navy-900/60 p-3.5 text-xs text-muted-foreground border border-border space-y-1"
                >
                  <p className="font-semibold text-foreground flex items-center space-x-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amberHighlight-500" />
                    <span>Explanation:</span>
                  </p>
                  <p className="leading-relaxed">{qResult.explanation}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!result && (
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            {!allAnswered
              ? `Please answer all questions before submitting (${totalCount - answeredCount} remaining)`
              : "All questions answered! Click submit to calculate your score."}
          </span>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className="w-full sm:w-auto rounded-2xl px-8 h-12 text-base font-semibold"
          >
            {isSubmitting ? "Calculating Score..." : "Submit Quiz"}
            {!isSubmitting && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      )}
    </Card>
  );
}
