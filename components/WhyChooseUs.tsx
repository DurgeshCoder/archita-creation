"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Paintbrush,
  Sun,
  Maximize,
  Heart,
  Wind,
  Compass,
  ShieldCheck,
  Award,
  Scissors,
  Cpu,
  Leaf,
  LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/constants";
import SectionTitle from "./SectionTitle";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Layers: Layers,
  Paintbrush: Paintbrush,
  Sun: Sun,
  Maximize: Maximize,
  Heart: Heart,
  Wind: Wind,
  Compass: Compass,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Scissors: Scissors,
  Cpu: Cpu,
  Leaf: Leaf,
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-accent/20 dark:bg-luxury-dark/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Why Choose Achtia Creation"
          subtitle="Uncompromising Quality"
          description="Crafting more than just fabrics—we build sleeping environments designed to nurture skin health, retain colors, and deliver absolute tactile bliss."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white dark:bg-luxury-dark/50 border border-luxury-dark/5 dark:border-white/5 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-secondary/20 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-secondary/5 flex items-center justify-center text-primary dark:text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light mb-3 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
