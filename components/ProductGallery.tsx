"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "/images/hero_bedroom.jpg");

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image View */}
      <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-luxury-dark/5 dark:border-white/5 shadow-md bg-accent/15">
        <Image
          src={activeImage}
          alt={`${name} Main View`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                activeImage === img ? "border-secondary scale-102" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
