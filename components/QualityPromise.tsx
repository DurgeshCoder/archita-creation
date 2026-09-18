"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function QualityPromise() {
  const promises = [
    "100% Giza & Egyptian Cotton",
    "Fade-Resistant Reactive Dyes",
    "Soft-Protein Luxury Finish",
    "Pre-Shrunk Mechanical Stability",
    "Double-Stitched Fray Resistance",
    "Oeko-Tex Standard 100 Safe",
    "Hypoallergenic Construction",
  ];

  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-light">
            Luxury Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            The Archita <br />Quality Promise
          </h2>
          <p className="font-sans text-sm text-white/70 leading-relaxed font-light">
            Every bedding item is woven, tailored, and inspected under one roof to ensure that your sleep sanctuary is draped in pure, toxic-free perfection.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promises.map((promise, index) => (
            <motion.div
              key={promise}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center space-x-3 bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="font-sans text-sm font-medium text-white">{promise}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
