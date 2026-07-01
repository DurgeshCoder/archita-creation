"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string; // Tailwind class like h-[250px] or h-[350px]
}

export default function MasonryGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      title: "Presidential Bedroom Suite Decor",
      category: "Room styling",
      image: "/images/hero_bedroom.jpg",
      aspectRatio: "h-[320px] md:h-[400px]",
    },
    {
      id: "2",
      title: "Folded Excellence Cotton Weave",
      category: "Bedsheets",
      image: "/images/bedsheets_category.jpg",
      aspectRatio: "h-[250px] md:h-[300px]",
    },
    {
      id: "3",
      title: "Royal Palace Jacquard Detail",
      category: "Bedding Sets",
      image: "/images/bedding_sets_category.jpg",
      aspectRatio: "h-[350px] md:h-[450px]",
    },
    {
      id: "4",
      title: "Fluffy Down-Alternative Loft",
      category: "Comforters",
      image: "/images/comforters_category.jpg",
      aspectRatio: "h-[220px] md:h-[280px]",
    },
    {
      id: "5",
      title: "Traditional Floral Dohar Print",
      category: "Dohars",
      image: "/images/dohars_category.jpg",
      aspectRatio: "h-[300px] md:h-[380px]",
    },
    {
      id: "6",
      title: "Anti-Pilling Knit Texture",
      category: "AC Blankets",
      image: "/images/blankets_category.jpg",
      aspectRatio: "h-[280px] md:h-[350px]",
    },
  ];

  return (
    <section className="py-24 bg-accent/15 dark:bg-luxury-dark/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Our Design Gallery"
          subtitle="Aesthetic Portfolio"
          description="Browse curated snapshots of our premium bedding collections and detailed textile grains showing stitch accuracy and fabric softness."
        />

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`break-inside-avoid relative w-full ${item.aspectRatio} rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-[9px] tracking-widest uppercase font-semibold text-secondary mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold tracking-wide">
                  {item.title}
                </h3>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
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
            className="fixed inset-0 z-50 bg-luxury-dark/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain bg-luxury-dark"
              />
            </motion.div>

            <div className="mt-6 text-center text-white max-w-md">
              <span className="text-[10px] tracking-widest uppercase text-secondary font-bold">
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
