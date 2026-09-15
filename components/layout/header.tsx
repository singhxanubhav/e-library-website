"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Sparkles,
  Menu,
  LogOut,
  User as UserIcon,
  Award,
  ChevronRight,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-library", label: "Case Library" },
  { href: "/learn", label: "Learn" },
  { href: "/ai-business-lab", label: "AI Business Lab" },
  { href: "/insights", label: "Insights" },
  { href: "/quiz-certificate", label: "Quiz & Certificate" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-2.5 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-navy-800 via-electric-600 to-purpleAccent-500 text-white shadow-sm transition-shadow group-hover:shadow-glow">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
              AI Case Library
            </span>
            <span className="-mt-1 text-[10px] font-medium tracking-wide text-electric-600 dark:text-electric-400">
              LEARNING EXPERIENCE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-1 lg:flex" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy-50 text-navy-800 dark:bg-navy-800 dark:text-white"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <ThemeToggle />

          {/* Primary Action Button */}
          <Link href="/case-library" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              size="sm"
              className="rounded-xl px-3.5 py-2 text-xs font-semibold sm:text-sm"
            >
              Explore Companies
            </Button>
          </Link>

          {/* Auth State Awareness */}
          {status === "loading" ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center space-x-2 rounded-full ring-offset-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2"
                  aria-label="User profile menu"
                >
                  <Avatar className="h-9 w-9 border-2 border-electric-500/30">
                    <AvatarFallback>
                      {getInitials(session.user.name || "Learner")}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {getInitials(session.user.name || "Learner")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {session.user.name || "Learner"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <Badge variant="electric" className="text-[10px] uppercase font-bold tracking-wider">
                    {session.user.role || "Learner"}
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/quiz-certificate" className="flex items-center cursor-pointer">
                    <Award className="mr-2 h-4 w-4 text-amberHighlight-500" />
                    <span>My Certificates</span>
                  </Link>
                </DropdownMenuItem>
                {(session.user.role === "admin" || session.user.role === "editor") && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center cursor-pointer text-electric-600 dark:text-electric-400 font-semibold">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Suite</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center space-x-1 sm:flex">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-xl">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-navy-800 text-white dark:bg-electric-500"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6">
              <SheetHeader className="text-left pb-4 border-b border-border">
                <SheetTitle className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>AI Case Library</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-2 py-6">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-navy-50 text-navy-800 dark:bg-navy-800 dark:text-white"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  );
                })}

                {(session?.user?.role === "admin" || session?.user?.role === "editor") && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold bg-electric-500/10 text-electric-600 dark:text-electric-400 border border-electric-500/20"
                  >
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Admin Control Panel</span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Link>
                )}
              </div>

              <div className="pt-4 border-t border-border flex flex-col space-y-3">
                <Link
                  href="/case-library"
                  onClick={() => setMobileOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full justify-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore Companies
                  </Button>
                </Link>

                {!session?.user ? (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      <Button variant="default" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-destructive"
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
