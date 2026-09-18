"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    `Hello Archita Creation, I am interested in purchasing or enquiring about the "${product.name}" from your "${product.collection}". Please share pricing and stock availability.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        {/* Product Image Panel */}
        <div className="relative h-[280px] w-full overflow-hidden bg-accent/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-primary/95 text-white text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-full">
            {product.categoryLabel}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <span className="text-[10px] text-secondary font-semibold uppercase tracking-widest">
            {product.collection}
          </span>
          <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light leading-snug mt-1 mb-2 hover:text-secondary transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-secondary fill-current"
                    : "text-luxury-dark/10 dark:text-white/10"
                }`}
              />
            ))}
            <span className="text-[10px] text-luxury-dark/50 dark:text-luxury-light/50 pl-1 mt-0.5">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <p className="font-sans text-xs text-luxury-dark/60 dark:text-luxury-light/60 font-light leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Pricing & CTA Panel */}
      <div className="px-6 pb-6 pt-4 border-t border-luxury-dark/5 dark:border-white/5 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-luxury-dark/40 dark:text-luxury-light/40 font-light uppercase tracking-wider">
            Premium Price
          </span>
          <span className="text-lg font-serif font-bold text-primary dark:text-secondary-light">
            {product.price}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* View Details */}
          <Link
            href={`/products/${product.id}`}
            className="bg-accent hover:bg-accent-dark dark:bg-white/5 dark:hover:bg-white/10 text-primary dark:text-white py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-center flex items-center justify-center transition-all duration-300"
          >
            Details
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>

          {/* WhatsApp Enquiry */}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-center flex items-center justify-center transition-all duration-300 shadow-sm"
          >
            <MessageSquare className="w-3 h-3 mr-1 fill-current" />
            Enquire
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
