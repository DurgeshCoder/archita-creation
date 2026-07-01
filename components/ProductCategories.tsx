"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ProductCategories() {
  const categories = [
    {
      name: "Bedsheets",
      href: "/bedsheets",
      image: "/images/bedsheets_category.jpg",
      description: "Made from premium long-staple cotton in high thread count sateen and percale. Rest in cool, silky smooth luxury.",
    },
    {
      name: "Comforters",
      href: "/comforters",
      image: "/images/comforters_category.jpg",
      description: "Plush, cloud-like down alternative duvets with box-stitch quilting for consistent year-round sleeping comfort.",
    },
    {
      name: "AC Blankets",
      href: "/blankets",
      image: "/images/blankets_category.jpg",
      description: "Featherlight, anti-pilling fleece blankets that offer cozy, velvety warmth in air-conditioned environments.",
    },
    {
      name: "Dohars",
      href: "/dohars",
      image: "/images/dohars_category.jpg",
      description: "Authentic Rajasthani hand-block print designs layered between soft mulmul cotton and warm cotton flannel.",
    },
    {
      name: "Bedding Sets",
      href: "/bedding-sets",
      image: "/images/bedding_sets_category.jpg",
      description: "Complete coordinated bed styling suites containing sheet sets, shams, comforter, and decorative cushion cases.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Product Categories"
          subtitle="Achtia Offerings"
          description="Tailored bedding collections crafted for diverse sensory preferences and seasonal transitions, bringing boutique hotel luxury home."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            // Make the bedding sets category span full-width on large screens for visual balance
            const isFullWidth = index === 4;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group bg-accent/20 dark:bg-luxury-dark/40 rounded-3xl overflow-hidden border border-luxury-dark/5 dark:border-white/5 flex flex-col justify-between ${
                  isFullWidth ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Category Image */}
                  <div className="relative h-[250px] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-750 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Context Panel */}
                  <div className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-primary dark:text-secondary-light mb-3">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-xs text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed font-light mb-4">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary dark:text-secondary hover:text-secondary-dark transition-colors group/btn"
                  >
                    Explore Category
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
