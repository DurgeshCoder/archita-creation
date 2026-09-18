"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  ExternalLink,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Bedding Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    name: "Collections",
    href: "/admin/collections",
    icon: Sparkles,
  },
  {
    name: "Design Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Inquiries & Orders",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-neutral-900 text-white flex flex-col h-screen border-r border-neutral-800 shrink-0 select-none z-40">
      {/* Brand Header */}
      <div className="p-6 border-b border-neutral-800 shrink-0">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-secondary/20 shrink-0">
            A
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-secondary transition-colors truncate">
              Archita Creation
            </h1>
            <p className="text-[11px] text-neutral-400 font-medium tracking-wider uppercase flex items-center gap-1 truncate">
              <ShieldCheck className="w-3 h-3 text-secondary shrink-0" /> Luxury Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation (Scrollable if screen is short) */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto min-h-0">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
          Management
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-secondary text-white shadow-md shadow-secondary/30 font-semibold"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/80"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-neutral-400"}`} />
                <span className="truncate">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/80 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Theme Toggle & Actions */}
      <div className="p-4 border-t border-neutral-800 space-y-3 shrink-0 bg-neutral-900/90">
        {/* Theme Switcher Row */}
        <div className="flex items-center justify-between px-3 py-2 bg-neutral-950/60 rounded-xl border border-neutral-800">
          <span className="text-xs font-medium text-neutral-400">Theme</span>
          <ThemeToggle />
        </div>

        {/* View Live Store */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" /> View Live Store
          </span>
          <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">
            Live
          </span>
        </Link>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
