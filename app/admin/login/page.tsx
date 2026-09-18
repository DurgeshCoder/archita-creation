"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please check your credentials.");
      }

      // Successful login
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail("admin@architacreation.com");
    setPassword("admin12345");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-4 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-primary-dark text-white font-serif font-bold text-3xl shadow-xl shadow-secondary/20 mb-4 ring-1 ring-white/20">
            A
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
            Archita Creation
          </h1>
          <p className="text-xs uppercase tracking-widest text-secondary font-semibold mt-1">
            Executive Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold text-white">Sign In</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Enter your authorized credentials to manage collections, products, and categories.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/50 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@architacreation.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-semibold text-sm rounded-xl shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Log In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="text-xs text-secondary hover:text-secondary-light font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Demo Credentials</span>
            </button>
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="text-center mt-6 flex items-center justify-center gap-1.5 text-neutral-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-secondary/70" />
          <span>Protected with 256-bit Encrypted Admin Session</span>
        </div>
      </div>
    </div>
  );
}
