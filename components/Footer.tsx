"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Send, Check, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerCategories, setFooterCategories] = useState<Array<{ name: string; href: string }>>([
    { name: "Luxury Bedsheets (400-1000 TC)", href: "/category/bedsheets" },
    { name: "Microfiber Comforters & Duvets", href: "/category/comforters" },
    { name: "AC & Coral Fleece Blankets", href: "/category/blankets" },
    { name: "Handcrafted Mulmul Dohars", href: "/category/dohars" },
    { name: "Master Suite Bedding Sets", href: "/category/bedding-sets" },
  ]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setFooterCategories(
              active.map((c: any) => ({
                name: c.name,
                href: `/category/${c.slug}`,
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Information */}
        <div className="flex flex-col space-y-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary-dark flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              A
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-secondary transition-colors">
                Archita Creation
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                Luxury Bedding & Linens
              </span>
            </div>
          </Link>

          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Premier Indian textile house based in Panipat. We weave, stitch, and export 100% Giza cotton bedsheets, microfiber comforters, AC blankets, and heirloom mulmul dohars.
          </p>

          <div className="flex flex-col space-y-2.5 pt-2 text-xs text-neutral-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>Archita House, Indira Nagar, Lucknow, Uttar Pradesh - 226016, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              <Link href="tel:+919795872419" className="hover:text-secondary transition-colors">
                +91 97958 72419
              </Link>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-secondary shrink-0" />
              <Link href="mailto:info@architacreation.com" className="hover:text-secondary transition-colors">
                info@architacreation.com
              </Link>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-400">
              <Clock className="w-4 h-4 text-secondary shrink-0" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="lg:pl-6">
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-secondary mb-5">
            Bedding Lines
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            {footerCategories.slice(0, 5).map((cat) => (
              <li key={cat.name}>
                <Link href={cat.href} className="hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/collections" className="hover:text-white transition-colors text-secondary font-medium">
                All Signature Collections →
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-secondary mb-5">
            Company
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Our Heritage
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Visual Gallery
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Fabric Care & Sleep Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact & Trade Inquiries
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Sourcing */}
        <div className="flex flex-col space-y-5">
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              Trade & Retail Catalog
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light mb-4">
              Subscribe for seasonal collection releases, hotel sourcing brochures, and fabric care recommendations.
            </p>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-secondary transition-all pr-10"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 aspect-square bg-secondary hover:bg-secondary-dark text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 font-medium">
                Thank you! We have added you to our luxury catalog list.
              </p>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Authorized Admin CMS Login
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <span>© {currentYear} Archita Creation. All rights reserved. Panipat Textile Craftsmanship.</span>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-neutral-300 transition-colors">
            Terms
          </Link>
          <Link href="/sitemap.xml" className="hover:text-neutral-300 transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
