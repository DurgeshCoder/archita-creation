"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { TESTIMONIALS } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Verified Feedback"
          description="Read reviews from boutique hotel owners, interior design studios, and retail homeowners who rely on Archita Creation linens for supreme comfort."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 p-7 rounded-3xl relative flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                {/* Rating & Quote Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(item.rating)
                            ? "text-secondary fill-current"
                            : "text-neutral-300 dark:text-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-secondary/30 fill-current" />
                </div>

                {/* Review Copy */}
                <p className="font-sans text-xs sm:text-sm text-luxury-dark/80 dark:text-neutral-300 leading-relaxed font-light mb-6 italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-3.5 border-t border-neutral-200/60 dark:border-neutral-800 pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-secondary/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-serif text-sm font-bold text-luxury-dark dark:text-luxury-light">
                      {item.name}
                    </h4>
                    <CheckCircle className="w-3 h-3 text-secondary" />
                  </div>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-none">
                    {item.role} • <span className="font-semibold text-secondary">{item.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
