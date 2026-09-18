"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLECTIONS } from "@/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [categoryList, setCategoryList] = useState<Array<{ name: string; href: string; desc: string }>>([
    { name: "Luxury Bedsheets", href: "/category/bedsheets", desc: "400-1000 TC Giza & Percale" },
    { name: "Microfiber Comforters", href: "/category/comforters", desc: "Hypoallergenic all-season duvets" },
    { name: "AC & Winter Blankets", href: "/category/blankets", desc: "Featherweight coral fleece" },
    { name: "Handcrafted Dohars", href: "/category/dohars", desc: "Pure mulmul & Sanganeri block print" },
    { name: "Complete Bedding Sets", href: "/category/bedding-sets", desc: "Curated 5 & 7-piece master suites" },
  ]);
  const [collectionList, setCollectionList] = useState<any[]>(COLLECTIONS);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme setup
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Fetch dynamic categories and collections from database
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setCategoryList(
              active.map((c: any) => ({
                name: c.name,
                href: `/category/${c.slug}`,
                desc: c.description || "Luxury home textile collection",
              }))
            );
          }
        }
      })
      .catch(() => {});

    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setCollectionList(active);
          }
        }
      })
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections", hasMega: true },
    { name: "Products", href: "#", hasSub: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-secondary to-primary z-50 transition-all duration-150"
        style={{ width: "0%" }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-luxury-dark/95 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/10 shadow-sm py-3.5"
            : "bg-white/80 dark:bg-luxury-dark/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/10 py-4.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-md shadow-secondary/20 shrink-0 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-primary dark:text-secondary-light group-hover:text-secondary transition-colors">
                Archita Creation
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                Luxury Bedding & Linens
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasMega) {
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      href="/collections"
                      className={cn(
                        "flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                        pathname.startsWith("/collections")
                          ? "text-secondary font-bold"
                          : "text-luxury-dark/80 dark:text-neutral-200 hover:text-secondary dark:hover:text-secondary"
                      )}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all duration-200 opacity-0 invisible translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto flex gap-6">
                      <div className="w-2/5 border-r border-neutral-200 dark:border-neutral-800 pr-6 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Designer Themes
                          </span>
                          <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light">
                            Signature Collections
                          </h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                            Meticulously engineered long-staple cotton and heirloom block-print suites designed for exquisite bedroom comfort.
                          </p>
                        </div>
                        <Link
                          href="/collections"
                          className="inline-flex items-center text-xs font-semibold text-secondary hover:text-secondary-dark uppercase tracking-wider group/cta mt-4"
                        >
                          View All Collections <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/cta:translate-x-1" />
                        </Link>
                      </div>

                      <div className="w-3/5 grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-1">
                        {collectionList.map((col) => (
                          <Link
                            key={col.id || col.name}
                            href={`/collections?search=${encodeURIComponent(col.name)}`}
                            className="flex flex-col p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group/item"
                          >
                            <span className="font-semibold text-xs text-luxury-dark dark:text-neutral-200 group-hover/item:text-secondary transition-colors line-clamp-1">
                              {col.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                              {col.theme || col.description || "Luxury Collection"}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.hasSub) {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={cn(
                        "flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                        "text-luxury-dark/80 dark:text-neutral-200 hover:text-secondary dark:hover:text-secondary cursor-pointer"
                      )}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Products Submenu */}
                    <div className="absolute top-full left-0 w-64 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all duration-200 opacity-0 invisible translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto space-y-1 max-h-[380px] overflow-y-auto">
                      {categoryList.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex flex-col px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group/sub"
                        >
                          <span className="text-xs font-semibold text-luxury-dark dark:text-neutral-200 group-hover/sub:text-secondary transition-colors">
                            {sub.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 line-clamp-1">
                            {sub.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-secondary font-bold"
                      : "text-luxury-dark/80 dark:text-neutral-200 hover:text-secondary dark:hover:text-secondary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Theme Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-luxury-dark dark:text-luxury-light transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
              aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mounted ? (
                theme === "light" ? (
                  <Moon className="w-4 h-4 text-neutral-700" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Request Catalogue CTA */}
            <Link
              href="/contact?ref=catalogue"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-full uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Request Catalogue
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-luxury-dark dark:text-luxury-light transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-luxury-dark dark:text-luxury-light"
              aria-label="Open menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="fixed inset-0 top-[65px] z-50 bg-white dark:bg-luxury-dark shadow-2xl lg:hidden overflow-y-auto px-6 py-8 flex flex-col justify-between animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href === "#" ? "/collections" : link.href}
                    className={cn(
                      "block px-3 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors",
                      pathname === link.href
                        ? "bg-secondary text-white"
                        : "text-luxury-dark dark:text-luxury-light hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Categories Links */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Product Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categoryList.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-medium text-luxury-dark dark:text-neutral-200"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3 mt-8">
              <a
                href="tel:+919795872419"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-secondary hover:text-secondary-dark"
              >
                <Phone className="w-3.5 h-3.5" /> Call Specialist: +91 97958 72419
              </a>
              <Link
                href="/contact?ref=catalogue"
                className="block text-center py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                Request Catalogue
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
