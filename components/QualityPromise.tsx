"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export default function QualityPromise() {
  const promises = [
    { title: "100% Giza & Egyptian Cotton", desc: "Pure long-staple single-ply yarns" },
    { title: "Fade-Resistant Reactive Dyes", desc: "Rich colorfastness wash after wash" },
    { title: "Silk-Protein Luxury Finish", desc: "Ultra-smooth, gentle on hair and skin" },
    { title: "Pre-Shrunk Mechanical Stability", desc: "Guaranteed size retention after laundering" },
    { title: "Double-Stitched Hem Lines", desc: "High tensile seams preventing fraying" },
    { title: "OEKO-TEX® Standard 100", desc: "Certified free from harmful chemicals" },
    { title: "Hypoallergenic Construction", desc: "Safe for sensitive skin and allergy sufferers" },
    { title: "Deep Pocket Mattress Fit", desc: "Accommodates mattresses up to 18 inches" },
  ];

  return (
    <section className="py-20 bg-neutral-900 text-white overflow-hidden relative border-y border-neutral-800">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Luxury Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            The Archita Quality Guarantee
          </h2>
          <p className="font-sans text-sm text-neutral-300 leading-relaxed font-light">
            Every sheet, quilt, dohar, and comforter is woven, tailored, and inspected under our roof in Panipat to ensure your bedroom is draped in durable, toxic-free perfection.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="flex items-start space-x-3 bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-white">{promise.title}</h4>
                <p className="text-[11px] text-neutral-400 font-light mt-0.5">{promise.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
