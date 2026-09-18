"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Testimonials"
          description="Read experiences from the interior designers, boutique hotel partners, and retailers who trust Archita Creation for high-standard linens."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-accent/20 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-8 rounded-3xl relative flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-secondary/20 mb-6">
                  <Quote className="w-10 h-10 fill-current" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? "text-secondary fill-current"
                          : "text-luxury-dark/10 dark:text-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Copy */}
                <p className="font-sans text-xs sm:text-sm text-luxury-dark/80 dark:text-luxury-light/80 leading-relaxed font-light mb-8 italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-4 border-t border-luxury-dark/5 dark:border-white/5 pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary dark:text-secondary-light">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-luxury-dark/50 dark:text-luxury-light/50 font-light mt-0.5 leading-none">
                    {item.role}, <span className="font-semibold text-secondary">{item.company}</span>
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
