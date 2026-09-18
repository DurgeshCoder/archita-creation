"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionTitle from "./SectionTitle";

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  highlight?: string;
  _count?: { products: number };
}

interface ProductCategoriesProps {
  initialCategories?: CategoryItem[];
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    name: "Luxury Bedsheets",
    slug: "bedsheets",
    image: "/images/archita_bedding_02.jpg",
    highlight: "400 - 1000 Thread Count",
    description: "Crafted from 100% long-staple Giza cotton with a lustrous sateen or crisp percale weave. Exceptionally breathable, silky, and shrink-resistant.",
  },
  {
    name: "Microfiber Comforters",
    slug: "comforters",
    image: "/images/archita_bedding_17.jpg",
    highlight: "Down-Alternative Loft",
    description: "Hypoallergenic box-stitched duvets engineered with ultra-fine microfibers for even thermal warmth in all seasons.",
  },
  {
    name: "AC & Winter Blankets",
    slug: "blankets",
    image: "/images/archita_bedding_23.jpg",
    highlight: "Featherweight Coral Fleece",
    description: "Velvety soft, anti-pilling microfleece blankets offering cozy, breathable warmth in air-conditioned and winter environments.",
  },
  {
    name: "Handcrafted Dohars",
    slug: "dohars",
    image: "/images/archita_bedding_15.jpg",
    highlight: "Triple-Layer Pure Mulmul",
    description: "Authentic wooden hand-block prints encased between two layers of organic mulmul cotton and a gentle middle flannel layer.",
  },
  {
    name: "Complete Bedding Sets",
    slug: "bedding-sets",
    image: "/images/archita_bedding_26.jpg",
    highlight: "Master Bedroom Suites",
    description: "Coordinated 5-piece and 7-piece master suites containing flat sheets, fitted sheets, pillow shams, and decorative cushion cases.",
  },
];

export default function ProductCategories({ initialCategories }: ProductCategoriesProps) {
  const [categories, setCategories] = useState<CategoryItem[]>(
    initialCategories && initialCategories.length > 0 ? initialCategories : DEFAULT_CATEGORIES
  );

  useEffect(() => {
    // If initialCategories wasn't provided or empty, or client updates, fetch from API
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setCategories(active);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-neutral-50/70 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Explore by Category"
          subtitle="Precision Textile Lines"
          description="Engineered for distinct sensory preferences, sleep temperatures, and interior styles—from silky Giza sheets to traditional Sanganeri dohars."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const isLastOdd =
              categories.length % 3 === 1 && index === categories.length - 1;
            const highlightText =
              cat.highlight ||
              (cat._count?.products ? `${cat._count.products} Designs Available` : "Premium Quality");

            const imgSrc = cat.image || "/images/hero_bedroom.jpg";

            return (
              <motion.div
                key={cat.slug || cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isLastOdd ? "lg:col-span-3 md:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Category Image */}
                  <div className="relative h-[260px] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={imgSrc}
                      alt={`${cat.name} by Archita Creation`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-secondary-light" />
                      {highlightText}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-7 space-y-2.5">
                    <h3 className="font-serif text-2xl font-bold text-luxury-dark dark:text-luxury-light group-hover:text-secondary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light line-clamp-3">
                      {cat.description || "Mastercrafted with high-density textile fibers, breathable finish, and exquisite tailoring."}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-secondary hover:text-secondary-dark transition-colors group/btn"
                  >
                    <span>View {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
