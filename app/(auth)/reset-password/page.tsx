"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2, AlertCircle, Key } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetFormValues) => {
    if (!token) {
      setServerError("Reset token is missing from the URL.");
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      const json = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setServerError(json.error || "Failed to update password.");
      }
    } catch (e) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#5B6CFF]/10 rounded-full blur-2xl pointer-events-none" />

      <CardHeader className="space-y-2 text-center pb-6">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center mb-2">
          <Key className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold font-display tracking-tight text-foreground">
          Create New Password
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Please enter and confirm your updated secure credentials.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {serverError && (
          <div className="flex items-center gap-2 p-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs space-y-2">
              <div className="flex items-center justify-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Password Successfully Updated!</span>
              </div>
              <p className="text-muted-foreground">
                Your credentials have been securely stored. Redirecting you to sign in...
              </p>
            </div>
            <Button asChild className="w-full rounded-xl bg-[#5B6CFF] text-white">
              <Link href="/login">Sign In Now</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold">
                New Password (min 8 characters)
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 rounded-xl bg-secondary/40"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 rounded-xl bg-secondary/40"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#5B6CFF] hover:bg-[#5B6CFF]/90 text-white font-semibold"
            >
              {isLoading ? "Saving New Password..." : "Update Password"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <React.Suspense fallback={<div className="text-center text-xs text-muted-foreground">Loading reset form...</div>}>
          <ResetPasswordForm />
        </React.Suspense>
      </motion.div>
    </div>
  );
}
