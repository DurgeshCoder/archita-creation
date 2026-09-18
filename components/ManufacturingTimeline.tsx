"use client";

import { motion } from "framer-motion";
import { MANUFACTURING_TIMELINE } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function ManufacturingTimeline() {
  return (
    <section className="py-24 bg-neutral-50/70 dark:bg-neutral-900/40 border-y border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Manufacturing Craftsmanship"
          subtitle="Our Weaving Journey"
          description="From combed raw staple cotton to final hand-inspected packing, every stage adheres to rigorous luxury textile standards."
        />

        <div className="relative border-l-2 border-secondary/30 ml-4 md:ml-12 pl-8 md:pl-16 space-y-10 max-w-4xl mx-auto py-2">
          {MANUFACTURING_TIMELINE.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Step indicator node */}
              <div className="absolute -left-[45px] md:-left-[81px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-secondary flex items-center justify-center text-[11px] font-bold text-secondary shadow-md group-hover:bg-secondary group-hover:text-white transition-all">
                {item.step}
              </div>

              {/* Step content */}
              <div className="bg-white dark:bg-neutral-900 p-6 md:p-7 rounded-3xl border border-neutral-200/70 dark:border-neutral-800 shadow-xs group-hover:shadow-md transition-shadow">
                <h3 className="font-serif text-lg md:text-xl font-bold text-luxury-dark dark:text-luxury-light mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
