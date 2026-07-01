"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Build FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      {/* Schema.org FAQ JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Answers & Advice"
          description="Everything you need to know about Giza cotton Staple, Thread Count, Sateen Percale structures, and washing guides."
        />

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-luxury-dark/10 dark:border-white/10 pb-4 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base md:text-lg font-bold text-primary dark:text-secondary-light group-hover:text-secondary transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className="ml-4 w-6 h-6 rounded-full bg-primary/5 dark:bg-secondary/5 group-hover:bg-secondary flex items-center justify-center text-primary dark:text-secondary group-hover:text-white shrink-0 transition-all duration-300">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-xs md:text-sm text-luxury-dark/70 dark:text-luxury-light/70 font-light leading-relaxed pr-6 pb-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
