"use client";

import { motion } from "framer-motion";
import { MANUFACTURING_TIMELINE } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function ManufacturingTimeline() {
  return (
    <section className="py-24 bg-accent/10 dark:bg-luxury-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Manufacturing Excellence"
          subtitle="Our Craft Process"
          description="A behind-the-scenes look at the technical standards and artisanal skills that bring each Achtia Creation textile to life."
        />

        <div className="relative border-l-2 border-primary/20 dark:border-secondary/20 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 max-w-4xl mx-auto py-4">
          {MANUFACTURING_TIMELINE.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Step indicator node */}
              <div className="absolute -left-[44px] md:-left-[80px] top-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white dark:bg-luxury-dark border-2 border-secondary flex items-center justify-center text-[10px] md:text-xs font-bold text-primary dark:text-secondary shadow-md group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                {item.step}
              </div>

              {/* Step content */}
              <div className="bg-white dark:bg-luxury-dark/60 p-6 md:p-8 rounded-3xl border border-luxury-dark/5 dark:border-white/5 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary dark:text-secondary-light mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-luxury-dark/60 dark:text-luxury-light/60 font-light leading-relaxed">
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
