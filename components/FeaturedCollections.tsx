"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Our Signature Collections"
          subtitle="Artisan Weaves"
          description="Explore our masterfully curated textile collections, where historic block-printing meets modern Italian embroideries and Giza cotton weaves."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative h-[380px] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Collection Image */}
              <Image
                src={col.image}
                alt={`${col.name} Bedding Collection`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content Panel */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase mb-2">
                  {col.theme}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-wide text-white mb-3">
                  {col.name}
                </h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed font-light line-clamp-2 max-w-xs mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {col.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                  <Link
                    href={`/collections?search=${encodeURIComponent(col.name)}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white group-hover:text-secondary transition-colors"
                  >
                    View Collection
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
