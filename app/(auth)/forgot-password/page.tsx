"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [successInfo, setSuccessInfo] = React.useState<{ message: string; resetUrl?: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessInfo(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok) {
        setSuccessInfo(json);
      } else {
        setServerError(json.error || "Failed to process request.");
      }
    } catch (e) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#5B6CFF]/10 rounded-full blur-2xl pointer-events-none" />

          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold font-display tracking-tight text-foreground">
              Recover Password
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Enter your verified email to generate a secure password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {serverError && (
              <div className="flex items-center gap-2 p-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {successInfo ? (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center justify-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instructions Dispatched</span>
                  </div>
                  <p className="text-muted-foreground">{successInfo.message}</p>
                </div>

                {successInfo.resetUrl && (
                  <div className="p-3 bg-secondary/50 rounded-xl border border-border text-left">
                    <p className="text-[11px] font-mono text-muted-foreground uppercase mb-1">
                      Demo Recovery Link (Local Mode):
                    </p>
                    <Link
                      href={successInfo.resetUrl}
                      className="text-xs font-mono text-[#5B6CFF] hover:underline break-all"
                    >
                      {successInfo.resetUrl}
                    </Link>
                  </div>
                )}

                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Account Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="scholar@aicasehub.com"
                      className="pl-9 rounded-xl bg-secondary/40"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-500">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white font-semibold"
                >
                  {isLoading ? "Generating Link..." : "Send Reset Instructions"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Remember your password? Sign in
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
