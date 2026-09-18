"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Star, Award, Sparkles, MessageSquare } from "lucide-react";

export default function Hero() {
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    "Hello Archita Creation, I would like to explore your luxury bedding catalogue and wholesale pricing."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const trustHighlights = [
    { label: "Long-Staple Giza Cotton", value: "100%", icon: Award, desc: "Ultra-breathable sateen & percale weaves" },
    { label: "Thread Count Range", value: "400 - 1000 TC", icon: Star, desc: "Silk-protein mercerized luxury finish" },
    { label: "Skin-Safe Certification", value: "OEKO-TEX®", icon: ShieldCheck, desc: "Zero harmful dyes & hypoallergenic" },
    { label: "Panipat Textile Mill", value: "Direct Sourcing", icon: Truck, desc: "Bespoke retail & institutional orders" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 md:py-24 bg-neutral-950">
      {/* Editorial Hero Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bedroom.jpg"
          alt="Archita Creation Luxury Bedroom Bedding Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 scale-102 transition-transform duration-1000"
        />
        {/* Multistage Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-luxury-dark to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Main Headline & Positioning */}
        <motion.div
          className="lg:col-span-7 text-white flex flex-col space-y-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-secondary-light w-fit">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Panipat Heritage Textile House</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight leading-[1.14] text-white"
          >
            Heirloom Bedding, <br className="hidden sm:inline" />
            <span className="text-secondary font-normal italic font-serif">Woven for Timeless</span> Rest.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-xs sm:text-sm md:text-base text-white/85 max-w-xl font-light leading-relaxed"
          >
            Crafted with 100% Giza cotton, Italian-embroidered percales, handcrafted block-print mulmul dohars, and cloud-soft microfiber comforters. Designed to bring world-class boutique hotel luxury home.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/collections"
              className="bg-secondary hover:bg-secondary-dark text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-secondary/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group text-center min-h-[44px]"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-sm transition-all flex items-center justify-center gap-2 min-h-[44px] text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
              <span>Direct WhatsApp Inquiry</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Trust Signals Card */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-7 md:p-8 rounded-3xl border border-white/15 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />
            
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                  The Archita Standard
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Precision textile engineering since inception
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase">
                Certified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustHighlights.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1"
                  >
                    <div className="flex items-center gap-2 text-secondary">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-bold text-luxury-dark dark:text-luxury-light font-serif">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-luxury-dark dark:text-neutral-200 line-clamp-1">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-neutral-500 leading-tight">
                      {stat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-[11px]">Wholesale & Custom Hotel Sizes</span>
              <Link
                href="/contact"
                className="text-secondary font-semibold hover:underline text-[11px]"
              >
                Request Trade Quote →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
