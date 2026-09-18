"use client";

import { MessageSquare, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    "Hello Archita Creation, I would like to explore your luxury bedding catalogue and wholesale pricing."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-20 bg-neutral-50/70 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-neutral-900 via-primary-dark to-neutral-900 p-8 md:p-14 text-white shadow-xl border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl flex flex-col space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest w-fit border border-secondary/30">
              <Sparkles className="w-3 h-3" /> Retail & Hospitality Sourcing
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to Upgrade Your Bedroom Experience?
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
              Whether you need single premium sheet sets for your home or bulk custom linens for a boutique hotel, our Panipat desk is ready to assist.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto shrink-0">
            {/* WhatsApp CTA */}
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 mr-2 fill-current" />
              Inquire on WhatsApp
            </Link>

            {/* Request Catalogue */}
            <Link
              href="/contact?ref=catalogue"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request Catalogue
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
