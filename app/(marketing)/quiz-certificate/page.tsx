"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { AlertModal } from "@/components/ui/alert-modal";

interface QuizItem {
  id: string;
  type: string;
  title: string;
  description: string;
  passingScorePercent: number;
  questionCount: number;
  status: "passed" | "failed" | "unattempted";
  bestScore: number | null;
  attemptsCount: number;
  companySlug?: string;
  themeSlug?: string;
}

interface HubStatus {
  user: { id: string; name: string; email?: string } | null;
  stats: {
    totalModules: number;
    completedModulesCount: number;
    themeQuizzesPassedCount: number;
    scenarioPassed: boolean;
    finalPassed: boolean;
    finalBestScore: number;
  };
  eligibility: {
    minModulesRequired: number;
    completedModulesCount: number;
    hasMinModules: boolean;
    hasThemeQuiz: boolean;
    hasFinalQuiz: boolean;
    isEligible: boolean;
  };
  certificate: {
    id: string;
    verificationId: string;
    learnerName: string;
    completionDate: string;
    programName: string;
  } | null;
  quizzes: {
    module: QuizItem[];
    theme: QuizItem[];
    scenario: QuizItem[];
    final: QuizItem[];
  };
}

export default function QuizCertificateHubPage() {
  const router = useRouter();
  const [data, setData] = React.useState<HubStatus | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [generatingCert, setGeneratingCert] = React.useState(false);
  const [activeQuizId, setActiveQuizId] = React.useState<string | null>(null);
  const [activeQuizTitle, setActiveQuizTitle] = React.useState<string>("");
  const [alertInfo, setAlertInfo] = React.useState<{
    open: boolean;
    message: string;
    title?: string;
    variant?: "error" | "success" | "info";
  }>({
    open: false,
    message: "",
  });

  const fetchStatus = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/quiz-certificate/status");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else if (res.status === 401) {
        // Guest mode fallback
        setData({
          user: null,
          stats: {
            totalModules: 8,
            completedModulesCount: 0,
            themeQuizzesPassedCount: 0,
            scenarioPassed: false,
            finalPassed: false,
            finalBestScore: 0,
          },
          eligibility: {
            minModulesRequired: 5,
            completedModulesCount: 0,
            hasMinModules: false,
            hasThemeQuiz: false,
            hasFinalQuiz: false,
            isEligible: false,
          },
          certificate: null,
          quizzes: {
            module: [],
            theme: [],
            scenario: [],
            final: [],
          },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleGenerateCertificate = async () => {
    try {
      setGeneratingCert(true);
      const res = await fetch("/api/certificates/generate", { method: "POST" });
      const json = await res.json();
      if (res.ok && json.certificate) {
        router.push(`/certificate/${json.certificate.id || json.certificate.verificationId}`);
      } else {
        setAlertInfo({
          open: true,
          title: "Certificate Ineligible",
          message: json.error || "Could not generate certificate. Please ensure all completion criteria are met.",
          variant: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setAlertInfo({
        open: true,
        title: "Generation Error",
        message: "An unexpected error occurred while generating your certificate.",
        variant: "error",
      });
    } finally {
      setGeneratingCert(false);
    }
  };

  const handleQuizComplete = () => {
    fetchStatus();
  };

  const calculateOverallProgress = () => {
    if (!data) return 0;
    let score = 0;
    // 5 modules = 40%
    score += Math.min(data.eligibility.completedModulesCount / 5, 1) * 40;
    // theme quiz = 30%
    if (data.eligibility.hasThemeQuiz) score += 30;
    // final quiz = 30%
    if (data.eligibility.hasFinalQuiz) score += 30;
    return Math.round(score);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6CFF]/10 text-[#5B6CFF] text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              Official Credentials & Assessments
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-foreground">
              Quiz & Certification Hub
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
              Validate deep foundational understanding of AI startup moats, simulate real-world executive dilemmas, and earn your verified Executive AI Credential.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStatus}
              className="rounded-xl flex items-center gap-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Status
            </Button>
          </div>
        </div>

        {/* Certificate Eligibility Banner Card */}
        {data && (
          <Card className="rounded-3xl border-2 border-primary/20 bg-card/60 backdrop-blur-md shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F59E0B]/10 via-[#5B6CFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Badge variant="outline" className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30 mb-2">
                    Executive Certification Pathway
                  </Badge>
                  <CardTitle className="text-2xl font-bold font-display">
                    Certificate of AI Startup Mastery
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Complete the 3 milestones below to receive your verifiable digital credential.
                  </CardDescription>
                </div>

                {data.certificate ? (
                  <Button
                    asChild
                    className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20"
                  >
                    <Link href={`/certificate/${data.certificate.id || data.certificate.verificationId}`}>
                      <Award className="w-4 h-4 mr-2" />
                      View Conferred Certificate
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled={!data.eligibility.isEligible || generatingCert}
                    onClick={handleGenerateCertificate}
                    className={`rounded-2xl font-bold shadow-lg transition-all ${
                      data.eligibility.isEligible
                        ? "bg-gradient-to-r from-[#5B6CFF] to-[#8B5CF6] text-white hover:opacity-90 shadow-indigo-500/25"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {generatingCert ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Credential...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {data.eligibility.isEligible ? "Claim Your Certificate" : "Eligibility Incomplete"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Overall Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground uppercase font-mono tracking-wider">Overall Eligibility Progress</span>
                  <span className="text-foreground">{calculateOverallProgress()}%</span>
                </div>
                <Progress value={calculateOverallProgress()} className="h-3 rounded-full bg-secondary" />
              </div>

              {/* 3 Milestone Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Milestone 1 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    data.eligibility.hasMinModules
                      ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                      : "bg-secondary/30 border-border text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-muted-foreground">Milestone 1</span>
                    {data.eligibility.hasMinModules ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    Complete 5+ Case Modules
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Progress: {data.eligibility.completedModulesCount} / {data.eligibility.minModulesRequired} completed
                  </p>
                </div>

                {/* Milestone 2 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    data.eligibility.hasThemeQuiz
                      ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                      : "bg-secondary/30 border-border text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-muted-foreground">Milestone 2</span>
                    {data.eligibility.hasThemeQuiz ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    Pass 1+ Thematic Quiz
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {data.stats.themeQuizzesPassedCount > 0
                      ? `${data.stats.themeQuizzesPassedCount} theme tracks passed`
                      : "0 tracks passed so far"}
                  </p>
                </div>

                {/* Milestone 3 */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    data.eligibility.hasFinalQuiz
                      ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                      : "bg-secondary/30 border-border text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-muted-foreground">Milestone 3</span>
                    {data.eligibility.hasFinalQuiz ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    Pass Capstone Assessment
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {data.stats.finalPassed
                      ? `Passed with ${data.stats.finalBestScore}%`
                      : "Requires 70%+ score to pass"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Catalog Tabs */}
        <div className="space-y-6">
          <Tabs defaultValue="final" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold font-display">Assessment Catalog</h2>
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto p-1.5 bg-secondary/60 rounded-2xl gap-1 w-full sm:w-auto">
                <TabsTrigger value="final" className="rounded-xl text-xs py-2">
                  Capstone Exam ({data?.quizzes?.final?.length || 1})
                </TabsTrigger>
                <TabsTrigger value="scenario" className="rounded-xl text-xs py-2">
                  Scenario Dilemmas ({data?.quizzes?.scenario?.length || 1})
                </TabsTrigger>
                <TabsTrigger value="module" className="rounded-xl text-xs py-2">
                  Case Modules ({data?.quizzes?.module?.length || 8})
                </TabsTrigger>
                <TabsTrigger value="theme" className="rounded-xl text-xs py-2">
                  Thematic Tracks ({data?.quizzes?.theme?.length || 2})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB: Final Assessment */}
            <TabsContent value="final" className="space-y-4">
              {data?.quizzes?.final?.map((quiz) => (
                <Card key={quiz.id} className="rounded-3xl border-2 border-primary/30 p-6 sm:p-8 bg-card/80 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          Official Capstone Certification
                        </Badge>
                        <Badge variant="outline" className="text-xs font-mono">
                          {quiz.questionCount} Questions • 70% Required
                        </Badge>
                        {quiz.status === "passed" && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Passed ({quiz.bestScore}%)
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold font-display text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{quiz.description}</p>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <Button
                        onClick={() => {
                          setActiveQuizId(quiz.id);
                          setActiveQuizTitle(quiz.title);
                        }}
                        size="lg"
                        className="w-full md:w-auto rounded-2xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white font-semibold"
                      >
                        {quiz.status === "passed" ? "Retake Capstone Exam" : "Start Capstone Exam"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* TAB: Scenario Dilemmas */}
            <TabsContent value="scenario" className="space-y-4">
              {data?.quizzes?.scenario?.map((quiz) => (
                <Card key={quiz.id} className="rounded-3xl border border-border p-6 sm:p-8 bg-card/60 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          Executive Simulation
                        </Badge>
                        <Badge variant="outline" className="text-xs font-mono">
                          {quiz.questionCount} Dilemmas
                        </Badge>
                        {quiz.status === "passed" && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            Passed ({quiz.bestScore}%)
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold font-display text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{quiz.description}</p>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <Button
                        onClick={() => {
                          setActiveQuizId(quiz.id);
                          setActiveQuizTitle(quiz.title);
                        }}
                        variant="secondary"
                        size="lg"
                        className="w-full md:w-auto rounded-2xl font-semibold"
                      >
                        Launch Simulation
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* TAB: Module Quizzes */}
            <TabsContent value="module">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.quizzes?.module?.map((quiz) => (
                  <Card key={quiz.id} className="rounded-2xl border border-border/70 p-5 bg-card/60 hover:border-primary/40 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-muted-foreground">
                          {quiz.companySlug || "Case Module"}
                        </span>
                        {quiz.status === "passed" ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            Passed ({quiz.bestScore}%)
                          </Badge>
                        ) : quiz.status === "failed" ? (
                          <Badge variant="destructive" className="text-xs">
                            Retake ({quiz.bestScore}%)
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Not Started
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-base font-bold font-display text-foreground line-clamp-1">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">
                        {quiz.questionCount} Questions
                      </span>
                      <Button
                        onClick={() => {
                          setActiveQuizId(quiz.id);
                          setActiveQuizTitle(quiz.title);
                        }}
                        size="sm"
                        variant="outline"
                        className="rounded-xl text-xs font-medium"
                      >
                        Take Quiz
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB: Theme Tracks */}
            <TabsContent value="theme">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.quizzes?.theme?.map((quiz) => (
                  <Card key={quiz.id} className="rounded-2xl border border-border/70 p-6 bg-card/60 hover:border-primary/40 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30 text-xs">
                          Curriculum Track
                        </Badge>
                        {quiz.status === "passed" && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            Passed ({quiz.bestScore}%)
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg font-bold font-display text-foreground">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">
                        {quiz.questionCount} Questions • 70% Pass Mark
                      </span>
                      <Button
                        onClick={() => {
                          setActiveQuizId(quiz.id);
                          setActiveQuizTitle(quiz.title);
                        }}
                        size="sm"
                        className="rounded-xl text-xs bg-[#5B6CFF] text-white hover:bg-[#5B6CFF]/90"
                      >
                        Take Track Quiz
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Modal Quiz Player */}
        <Dialog open={!!activeQuizId} onOpenChange={(open) => !open && setActiveQuizId(null)}>
          <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-primary/20 bg-card">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold font-display">
                {activeQuizTitle || "Quiz Assessment"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Answer each question carefully. Correct explanations will be provided upon submission.
              </DialogDescription>
            </DialogHeader>

            {activeQuizId && (
              <div className="py-2">
                <QuizPlayer quizId={activeQuizId} onComplete={handleQuizComplete} />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Feedback Alert Modal */}
        <AlertModal
          open={alertInfo.open}
          onOpenChange={(open) => setAlertInfo((prev) => ({ ...prev, open }))}
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
        />
      </div>
    </div>
  );
}
