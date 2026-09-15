import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  LayoutDashboard,
  Building2,
  Layers,
  HelpCircle,
  FileText,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session || (role !== "admin" && role !== "editor")) {
    redirect("/login?callbackUrl=/admin");
  }

  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/companies", label: "Companies", icon: Building2 },
    { href: "/admin/themes", label: "Themes & Tracks", icon: Layers },
    { href: "/admin/quizzes", label: "Quizzes", icon: HelpCircle },
    { href: "/admin/insights", label: "Insights CMS", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card/60 backdrop-blur-md p-4 flex flex-col md:justify-between shrink-0">
        <div className="space-y-4 md:space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold font-display text-base tracking-tight text-foreground">
                  AI Case Library
                </span>
                <Badge
                  className={
                    role === "admin"
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/30 text-[10px]"
                      : "bg-[#5B6CFF]/20 text-[#5B6CFF] border-[#5B6CFF]/30 text-[10px]"
                  }
                >
                  {role.toUpperCase()}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">Control Panel</p>
            </div>

            {/* Quick exit on mobile */}
            <Link
              href="/case-library"
              className="md:hidden text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 p-1.5 rounded-lg border border-border"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Exit</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 pb-1 md:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 md:gap-3 px-3 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors shrink-0 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Exit (Desktop) */}
        <div className="hidden md:block pt-6 mt-6 border-t border-border space-y-3">
          <div className="p-3 rounded-2xl bg-secondary/40 border border-border/50">
            <p className="text-xs font-semibold text-foreground truncate">
              {session.user.name || "Administrator"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{session.user.email}</p>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <Link href="/case-library">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Exit to Live Site</span>
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
