"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Plus } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function AdminHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: AdminHeaderProps) {
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-8 py-4.5 sticky top-0 z-30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs shrink-0">
      <div>
        <h1 className="font-serif text-2xl font-bold text-luxury-dark dark:text-luxury-light">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Dark / Light Mode Toggler */}
        <ThemeToggle />

        <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />

        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-xl shadow-sm shadow-secondary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>{actionLabel}</span>
          </Link>
        )}

        {/* Admin Profile Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
          <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="text-left pr-1">
            <p className="text-xs font-semibold text-luxury-dark dark:text-luxury-light leading-tight">
              {adminUser?.name || "Archita Admin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
