"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Flame,
  BookOpen,
  Award,
  Lock,
  Trash2,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Calendar,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profileData, setProfileData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  // Dialog states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [passwordMsg, setPasswordMsg] = React.useState<{ text: string; error: boolean } | null>(null);
  const [passwordLoading, setPasswordLoading] = React.useState(false);

  // Delete form
  const [deleteConfirm, setDeleteConfirm] = React.useState("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  // Name editing
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [nameVal, setNameVal] = React.useState("");

  // Route protection
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  // Fetch live stats and profile from API
  const loadProfile = React.useCallback(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfileData(data);
        setNameVal(data.profile?.name || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (status === "authenticated") {
      loadProfile();
    }
  }, [status, loadProfile]);

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-8 animate-pulse">
        <div className="h-40 rounded-3xl bg-muted" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  const profile = profileData?.profile || session?.user;
  const stats = profileData?.stats || {
    modulesCompleted: 0,
    themeQuizzesPassed: 0,
    overallQuizAverage: 0,
    currentStreak: 1,
    longestStreak: 1,
  };
  const badges = profileData?.badges || [];

  const handleUpdateName = async () => {
    if (!nameVal.trim()) return;
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameVal.trim() }),
      });
      if (res.ok) {
        setIsEditingName(false);
        loadProfile();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordLoading(true);

    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setPasswordMsg({ text: "Password updated successfully!", error: false });
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordMsg(null);
        }, 1500);
      } else {
        setPasswordMsg({ text: data.error || "Failed to update password", error: true });
      }
    } catch (err) {
      setPasswordMsg({ text: "Network error occurred", error: true });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleteLoading(true);

    try {
      const res = await fetch("/api/profile", { method: "DELETE" });
      if (res.ok) {
        signOut({ callbackUrl: "/" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Profile Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20 border-2 border-electric-500/40 text-2xl font-bold shadow-sm">
              <AvatarFallback className="bg-gradient-to-tr from-navy-800 to-electric-600 text-white">
                {getInitials(profile?.name || "Learner")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      className="h-9 w-48 text-sm"
                    />
                    <Button size="sm" onClick={handleUpdateName}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingName(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                      {profile?.name || "Learner"}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                    >
                      Edit
                    </button>
                  </div>
                )}
                <Badge variant="electric" className="uppercase text-[10px] font-bold">
                  {profile?.role || "Learner"}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{profile?.email}</p>

              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-muted-foreground pt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "2026"}
                </span>
              </div>
            </div>

            {/* Account Settings Actions */}
            <div className="flex flex-row sm:flex-col gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPasswordModalOpen(true)}
                className="rounded-xl space-x-1.5 text-xs"
              >
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Change Password</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
                className="rounded-xl space-x-1.5 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Account</span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 2. Learning Stats Cards (Animated count numbers) */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Learning Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Card className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase">Completed</span>
              <BookOpen className="h-4 w-4 text-electric-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-foreground">
              {stats.modulesCompleted}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Company Modules</p>
          </Card>

          <Card className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase">Themes</span>
              <GraduationCap className="h-4 w-4 text-purpleAccent-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-foreground">
              {stats.themeQuizzesPassed}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Theme Quizzes Passed</p>
          </Card>

          <Card className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase">Quiz Avg</span>
              <Percent className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-foreground text-emerald-600 dark:text-emerald-400">
              {stats.overallQuizAverage}%
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Overall Accuracy</p>
          </Card>

          <Card className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase">Streak</span>
              <Flame className="h-4 w-4 text-amberHighlight-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-amberHighlight-500">
              {stats.currentStreak}d
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Active Days</p>
          </Card>

          <Card className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase">Longest</span>
              <Award className="h-4 w-4 text-blue-500" />
            </div>
            <p className="font-heading text-3xl font-extrabold text-foreground">
              {stats.longestStreak}d
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Record Streak</p>
          </Card>
        </div>
      </div>

      {/* 3. Badges Grid (Earned highlighted, locked grayed out with lock icon) */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Earned Badges & Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b: any) => (
            <Card
              key={b.slug}
              className={`rounded-2xl p-5 border transition-all ${
                b.isEarned
                  ? "border-electric-500/50 bg-electric-50/20 dark:bg-electric-950/20 shadow-soft"
                  : "border-border/60 bg-muted/20 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                    b.isEarned
                      ? "bg-gradient-to-tr from-navy-800 to-electric-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {b.isEarned ? b.icon || "🏆" : <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>

                <Badge
                  variant={b.isEarned ? "success" : "outline"}
                  className="text-[10px]"
                >
                  {b.isEarned ? "Unlocked" : "Locked"}
                </Badge>
              </div>

              <div className="mt-4">
                <h4 className="font-heading font-bold text-sm text-foreground">
                  {b.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Certificates Section (Empty State) */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Verified Certificates
        </h2>
        <Card className="rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-amberHighlight-500/10 text-amberHighlight-500 flex items-center justify-center mx-auto mb-3">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            No Certificates Earned Yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
            Complete at least 5 company module quizzes with a 70%+ score to unlock your official verified credential.
          </p>
        </Card>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new secure password.
            </DialogDescription>
          </DialogHeader>

          {passwordMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                passwordMsg.error
                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                  : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              }`}
            >
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input
                id="current-pw"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-pw">New Password</Label>
              <Input
                id="new-pw"
                type="password"
                placeholder="Min 8 chars, 1 number, 1 special char"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={passwordLoading}>
                {passwordLoading ? "Saving..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Deactivate Account</span>
            </DialogTitle>
            <DialogDescription>
              This action will soft-delete your profile and revoke access. To confirm, type <strong>DELETE</strong> below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE to confirm"
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={deleteConfirm !== "DELETE" || deleteLoading}
                onClick={handleDeleteAccount}
              >
                {deleteLoading ? "Deactivating..." : "Deactivate Account"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
