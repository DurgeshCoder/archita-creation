"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Droplets,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Factory,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const differentiators = [
    {
      id: "1",
      title: "100% Long-Staple Giza Cotton",
      description: "We source extra-long staple fibers that produce ultra-fine, smooth yarns with higher tensile strength and zero pilling.",
      icon: Award,
    },
    {
      id: "2",
      title: "Silk-Protein Mercerized Finish",
      description: "Fabrics undergo high-tension mercerization for a luxurious soft sheen, enhanced dye uptake, and long-lasting color vibrancy.",
      icon: Sparkles,
    },
    {
      id: "3",
      title: "OEKO-TEX® Certified Safe",
      description: "All reactive dyes and finishing agents are certified non-toxic, hypoallergenic, and gentle for sensitive skin.",
      icon: ShieldCheck,
    },
    {
      id: "4",
      title: "Direct Panipat Mill Pricing",
      description: "Manufactured in-house at our Panipat textile unit, eliminating middlemen to provide boutique luxury at honest wholesale rates.",
      icon: Factory,
    },
    {
      id: "5",
      title: "High Thread Count Density",
      description: "True single-ply 400 to 1000 TC sateen weaves deliver superior breathability and weight without artificial chemical coatings.",
      icon: Layers,
    },
    {
      id: "6",
      title: "Azo-Free Colorfast Dyes",
      description: "Fade-resistant reactive printing ensures your linens maintain their rich hues through dozens of warm machine wash cycles.",
      icon: Droplets,
    },
    {
      id: "7",
      title: "Institutional & Bespoke Sizing",
      description: "Custom stitching for boutique hotels, super king beds, deep mattress pockets (up to 18 inches), and private label orders.",
      icon: CheckCircle2,
    },
    {
      id: "8",
      title: "Dedicated B2B & Retail Support",
      description: "Fast inquiry response via WhatsApp, immediate catalog dispatch, and guaranteed pan-India insured shipping.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Why Choose Archita Creation"
          subtitle="Uncompromising Textile Standards"
          description="We blend decades of Indian textile heritage with modern precision looms to craft bedroom linens that look exquisite and get softer with every wash."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 p-7 rounded-3xl transition-all duration-300 hover:shadow-lg hover:border-secondary/30 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light mb-2.5 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
