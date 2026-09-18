"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Star, Award } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stats = [
    { label: "Signature Collections", value: "20+", icon: Award },
    { label: "Premium Designs", value: "100+", icon: Star },
    { label: "Premium Quality Fabric", value: "100%", icon: ShieldCheck },
    { label: "All India Insured Delivery", value: "Free", icon: Truck },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bedroom.jpg"
          alt="Luxury Bedroom Bedding Set by Archita Creation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/95 via-luxury-dark/75 to-luxury-dark/50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-luxury-dark to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Copy */}
        <motion.div
          className="lg:col-span-8 text-white flex flex-col space-y-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary">
            <span>The Premium Textile House</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white"
          >
            Transform Every <br />
            <span className="text-secondary font-medium italic">Bedroom</span> Into Luxury
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-white/80 max-w-xl font-light leading-relaxed"
          >
            Discover beautifully crafted premium bedsheets, comforters and blankets designed with exceptional quality, timeless elegance and unmatched comfort.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/collections"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-secondary/20 flex items-center group"
            >
              Explore Collections
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Stats Panel */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-8 rounded-3xl border border-luxury-dark/10 dark:border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-luxury-dark/40">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
            <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-white mb-6 tracking-wide">
              Archita Promise
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex items-start space-x-4 border-b border-luxury-dark/5 dark:border-white/5 pb-4 last:border-b-0 last:pb-0">
                    <div className="p-2 bg-primary/10 dark:bg-secondary/15 rounded-xl text-primary dark:text-secondary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-bold font-serif text-primary dark:text-white">{stat.value}</div>
                      <div className="text-xs text-luxury-dark/65 dark:text-white/60 tracking-wider uppercase font-light mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer text-white/50 hover:text-white transition-colors duration-300">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2">Scroll Down</span>
        <div className="w-[1.5px] h-8 bg-white/20 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
