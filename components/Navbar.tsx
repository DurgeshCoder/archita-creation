"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLECTIONS } from "@/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update scroll progress indicator width
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close mobile drawer on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Collections", href: "/collections", hasMega: true },
    { name: "Products", href: "#", hasSub: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const productCategories = [
    { name: "Bedsheets", href: "/bedsheets" },
    { name: "Comforters", href: "/comforters" },
    { name: "AC Blankets", href: "/blankets" },
    { name: "Dohars", href: "/dohars" },
    { name: "Complete Bedding Sets", href: "/bedding-sets" },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div id="scroll-progress" />

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "glass-nav shadow-lg py-4"
            : "bg-transparent py-4 lg:py-6 border-b border-white/10"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start leading-none group"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase transition-colors duration-300 text-primary dark:text-secondary group-hover:text-secondary-dark">
              Archita
            </span>
            <span className="font-sans text-xs md:text-sm tracking-[0.25em] text-luxury-dark/60 dark:text-luxury-light/60 uppercase pl-0.5 mt-0.5">
              Creation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasMega) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                  >
                    <button
                      className={cn(
                        "flex items-center text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary py-2",
                        isActive ? "text-secondary" : "text-luxury-dark dark:text-luxury-light"
                      )}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Mega Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 w-[800px] p-8 rounded-2xl glass-panel shadow-2xl transition-all duration-300 opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto flex gap-8",
                      )}
                    >
                      <div className="w-1/3 border-r border-luxury-dark/10 dark:border-luxury-light/10 pr-6 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-primary dark:text-secondary mb-2">
                            Signature Collections
                          </h3>
                          <p className="text-xs text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed mb-4">
                            Explore our meticulously crafted bedding themes, designed to elevate your sleep.
                          </p>
                        </div>
                        <Link
                          href="/collections"
                          className="inline-flex items-center text-xs font-semibold text-secondary hover:text-secondary-dark uppercase tracking-wider"
                        >
                          View All Collections →
                        </Link>
                      </div>
                      <div className="w-2/3 grid grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
                        {COLLECTIONS.map((col) => (
                          <Link
                            key={col.id}
                            href={`/collections?search=${encodeURIComponent(col.name)}`}
                            className="flex flex-col p-2.5 rounded-lg hover:bg-primary/5 dark:hover:bg-secondary/5 transition-colors group/col"
                          >
                            <span className="font-medium text-sm text-luxury-dark dark:text-luxury-light group-hover/col:text-secondary transition-colors">
                              {col.name}
                            </span>
                            <span className="text-xs text-luxury-dark/50 dark:text-luxury-light/50 line-clamp-1 mt-0.5">
                              {col.theme}
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
                      className="flex items-center text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary py-2 text-luxury-dark dark:text-luxury-light"
                    >
                      {link.name}
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-56 p-4 rounded-xl glass-panel shadow-xl transition-all duration-300 opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col space-y-2">
                      {productCategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-3 py-2 rounded-lg text-sm text-luxury-dark dark:text-luxury-light hover:bg-primary/5 dark:hover:bg-secondary/5 hover:text-secondary transition-colors"
                        >
                          {sub.name}
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
                    "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary py-2",
                    isActive ? "text-secondary font-semibold" : "text-luxury-dark dark:text-luxury-light"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Dark Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-secondary/5 text-luxury-dark dark:text-luxury-light transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            {/* Request Catalogue CTA */}
            <Link
              href="/contact?ref=catalogue"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Request Catalogue
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Dark Mode Switch (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-secondary/5 text-luxury-dark dark:text-luxury-light transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-secondary/5 text-luxury-dark dark:text-luxury-light transition-colors"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={cn(
            "fixed inset-0 top-[73px] z-40 bg-white dark:bg-luxury-dark shadow-2xl transition-all duration-500 lg:hidden overflow-y-auto px-6 py-8 flex flex-col justify-between",
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasMega) {
                return (
                  <div key={link.name} className="flex flex-col space-y-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-luxury-dark/40 dark:text-luxury-light/40">
                      Collections
                    </span>
                    <Link
                      href="/collections"
                      className="text-lg font-medium text-luxury-dark dark:text-luxury-light hover:text-secondary pl-2"
                    >
                      View All Collections
                    </Link>
                    <div className="grid grid-cols-1 gap-2 pl-4 border-l border-primary/25 mt-1">
                      {COLLECTIONS.slice(0, 4).map((col) => (
                        <Link
                          key={col.id}
                          href={`/collections?search=${encodeURIComponent(col.name)}`}
                          className="text-sm text-luxury-dark/70 dark:text-luxury-light/70 hover:text-secondary"
                        >
                          {col.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              if (link.hasSub) {
                return (
                  <div key={link.name} className="flex flex-col space-y-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-luxury-dark/40 dark:text-luxury-light/40">
                      Product Categories
                    </span>
                    <div className="grid grid-cols-1 gap-2 pl-4 border-l border-primary/25 mt-1">
                      {productCategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-base text-luxury-dark/70 dark:text-luxury-light/70 hover:text-secondary"
                        >
                          {sub.name}
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
                    "text-xl font-medium tracking-wide uppercase transition-colors hover:text-secondary",
                    isActive ? "text-secondary font-bold" : "text-luxury-dark dark:text-luxury-light"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-luxury-dark/10 dark:border-luxury-light/10 flex flex-col space-y-4">
            <Link
              href="tel:+919795872419"
              className="flex items-center text-sm text-luxury-dark/70 dark:text-luxury-light/70 hover:text-secondary justify-center py-2"
            >
              <Phone className="w-4 h-4 mr-2 text-secondary" />
              Call Specialist: +91 97958 72419
            </Link>
            <Link
              href="/contact?ref=catalogue"
              className="bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors w-full"
            >
              Request Catalogue
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
