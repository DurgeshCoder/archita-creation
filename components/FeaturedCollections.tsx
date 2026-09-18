"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { COLLECTIONS, Collection } from "@/constants";
import SectionTitle from "./SectionTitle";

interface FeaturedCollectionsProps {
  initialCollections?: Collection[];
}

export default function FeaturedCollections({ initialCollections }: FeaturedCollectionsProps) {
  const [collections, setCollections] = useState<Collection[]>(
    initialCollections && initialCollections.length > 0 ? initialCollections : COLLECTIONS
  );

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setCollections(
              active.map((c: any) => ({
                id: c.slug || c.id,
                name: c.name,
                image: c.image || "/images/hero_bedroom.jpg",
                description: c.description || "",
                theme: c.theme || "Luxury",
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Signature Bedding Collections"
          subtitle="Curated Textile Themes"
          description="Explore our masterfully curated suites—where heirloom Rajasthani hand-block prints meet Italian-inspired embroidery and ultra-fine Giza cotton sateens."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col, index) => (
            <motion.div
              key={col.id || col.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
            >
              {/* Collection Image */}
              <Image
                src={col.image || "/images/hero_bedroom.jpg"}
                alt={`${col.name} Luxury Bedding Collection by Archita Creation`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Multi-stage Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Content Panel */}
              <div className="relative z-10 p-7 md:p-8 flex flex-col justify-end text-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 backdrop-blur-md text-secondary-light text-[10px] font-bold uppercase tracking-widest w-fit">
                  <Sparkles className="w-3 h-3" /> {col.theme}
                </span>

                <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-secondary-light transition-colors">
                  {col.name}
                </h3>

                <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light line-clamp-2">
                  {col.description}
                </p>

                <div className="pt-3 border-t border-white/15">
                  <Link
                    href={`/collections?search=${encodeURIComponent(col.name)}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white group-hover:text-secondary transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
