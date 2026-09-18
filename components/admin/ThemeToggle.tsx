"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative flex items-center justify-between w-18 h-8 px-1.5 rounded-full bg-neutral-200/90 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-colors shadow-inner cursor-pointer"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <Sun className="w-3.5 h-3.5 text-amber-500 z-10 ml-0.5" />
      <Moon className="w-3.5 h-3.5 text-secondary-light z-10 mr-0.5" />
      
      {/* Sliding indicator */}
      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 shadow-md transform transition-transform duration-200 flex items-center justify-center ${
          isDark ? "left-[34px]" : "left-1"
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-secondary fill-secondary" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500 fill-amber-500" />
        )}
      </span>
    </button>
  );
}
