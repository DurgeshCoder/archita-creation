"use client";

import { MessageSquare, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    "Hello Achtia Creation, I am interested in viewing your complete luxury bedding catalog. Please share the pricing sheet and catalog PDF."
  );
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-20 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-8 md:p-16 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Decorative shapes */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-xl flex flex-col space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-light">
              Corporate & Retail Orders
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Looking for Premium Bedding Collections?
            </h2>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              Wholesale inquiries, institutional custom sizes, and premium retail catalogue packets are available. Reach our desk immediately.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            {/* WhatsApp CTA */}
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-white/95 text-primary px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center transition-all duration-300 shadow-md hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-[#25D366] fill-[#25D366]" />
              Enquire on WhatsApp
            </Link>

            {/* Request via form */}
            <Link
              href="/contact?ref=catalogue"
              className="bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center transition-colors duration-300"
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
