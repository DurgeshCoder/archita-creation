"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, Filter } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  image: string;
  aspectRatio: string;
}

export default function MasonryGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      title: "Presidential Bedroom Suite Decor",
      category: "Master Bedroom",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_01.jpg",
      aspectRatio: "h-[320px] md:h-[400px]",
    },
    {
      id: "2",
      title: "Folded Excellence Cotton Sateen Weave",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_07.jpg",
      aspectRatio: "h-[250px] md:h-[300px]",
    },
    {
      id: "3",
      title: "Royal Palace Jacquard Detail",
      category: "Bedding Sets",
      categoryKey: "bedding-sets",
      image: "/images/archita_bedding_12.jpg",
      aspectRatio: "h-[350px] md:h-[450px]",
    },
    {
      id: "4",
      title: "Fluffy Down-Alternative Loft",
      category: "Comforters",
      categoryKey: "comforters",
      image: "/images/archita_bedding_18.jpg",
      aspectRatio: "h-[220px] md:h-[280px]",
    },
    {
      id: "5",
      title: "Traditional Floral Mulmul Dohar Print",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_14.jpg",
      aspectRatio: "h-[300px] md:h-[380px]",
    },
    {
      id: "6",
      title: "Anti-Pilling Coral Fleece Texture",
      category: "AC Blankets",
      categoryKey: "blankets",
      image: "/images/archita_bedding_22.jpg",
      aspectRatio: "h-[280px] md:h-[350px]",
    },
    {
      id: "7",
      title: "Italian Monogram Embroidered Percale",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "/images/archita_bedding_06.jpg",
      aspectRatio: "h-[320px] md:h-[380px]",
    },
    {
      id: "8",
      title: "Handcrafted Sanganeri Indigo Dohar",
      category: "Dohars",
      categoryKey: "dohars",
      image: "/images/archita_bedding_08.jpg",
      aspectRatio: "h-[260px] md:h-[320px]",
    },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.categoryKey === activeFilter
  );

  const filterTabs = [
    { key: "all", label: "All Works" },
    { key: "bedsheets", label: "Bedsheets" },
    { key: "comforters", label: "Comforters" },
    { key: "blankets", label: "AC Blankets" },
    { key: "dohars", label: "Dohars" },
    { key: "bedding-sets", label: "Bedding Sets" },
  ];

  return (
    <section className="py-24 bg-neutral-50/70 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Textile Design Gallery"
          subtitle="Visual Craftsmanship"
          description="Browse detailed snapshots of our luxury cotton weaves, stitch accuracy, plush loft, and traditional hand-block impressions."
        />

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-secondary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`break-inside-avoid relative w-full ${item.aspectRatio} rounded-3xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/60 dark:border-neutral-800`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-[10px] tracking-widest uppercase font-bold text-secondary-light mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold tracking-wide">
                  {item.title}
                </h3>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/20"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain bg-neutral-950"
              />
            </motion.div>

            <div className="mt-5 text-center text-white max-w-md">
              <span className="text-[11px] tracking-widest uppercase text-secondary font-bold">
                {selectedItem.category}
              </span>
              <h4 className="font-serif text-lg font-bold mt-1">
                {selectedItem.title}
              </h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
