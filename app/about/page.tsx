import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { Eye, Target, Compass, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Achtia Creation's rich textile manufacturing heritage, our mission of sleep comfort, and our high-end weaving mills in Panipat.",
};

export default function About() {
  const breadcrumbs = [{ name: "About Us" }];

  const values = [
    {
      title: "Artisanal Vision",
      desc: "Merging historic Rajasthani hand block-printing and heritage embroideries with contemporary bedroom geometry.",
      icon: Compass,
    },
    {
      title: "Uncompromising Audit",
      desc: "Strict three-tier check policies examining thread counts, reactive color bounds, and stitch tensile scores.",
      icon: ShieldCheck,
    },
    {
      title: "Ethical Manufacturing",
      desc: "operating under Zero Liquid Discharge (ZLD) norms, recycling 90% water and ensuring fair living wages.",
      icon: Heart,
    },
  ];

  return (
    <>
      <PageHeader title="Our Story & Heritage" breadcrumbs={breadcrumbs} />

      {/* Story Section */}
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image */}
          <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero_bedroom.jpg"
              alt="Achtia Creation Bedding Manufacturing Suite"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          {/* Right Column: Copy */}
          <div className="flex flex-col space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Established Textile House
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary dark:text-secondary-light">
              Crafting Sleep Sanctuaries Since 1998
            </h2>
            <p className="font-sans text-sm md:text-base text-luxury-dark/70 dark:text-luxury-light/70 leading-relaxed font-light">
              Deep in the heart of India&apos;s textile capital, Panipat, Achtia Creation was founded with a singular, clear mandate: to end the compromise between high-durability fabrics and sensory luxury. What began as a modest weaving studio with four handlooms has evolved into a state-of-the-art production ecosystem supplying linens to luxury boutique hotels, retailers, and private homes globally.
            </p>
            <p className="font-sans text-sm text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed font-light">
              Our weaving mills combine high-precision electronic airjet looms with the irreplaceable wisdom of master tailors and block printers. We source certified Giza long-staple cotton fibers, finishing them with organic silk-protein processes to achieve a drape and hand-feel that transforms sleep into a nightly retreat.
            </p>
            <div className="flex items-center space-x-6 pt-4 border-t border-luxury-dark/5 dark:border-white/5">
              <div>
                <div className="text-3xl font-bold font-serif text-secondary">15+</div>
                <div className="text-[10px] text-luxury-dark/50 dark:text-luxury-light/50 tracking-wider uppercase mt-1">
                  Years of Experience
                </div>
              </div>
              <div className="border-l border-luxury-dark/10 dark:border-white/10 pl-6">
                <div className="text-3xl font-bold font-serif text-secondary">10k+</div>
                <div className="text-[10px] text-luxury-dark/50 dark:text-luxury-light/50 tracking-wider uppercase mt-1">
                  Happy Households
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 bg-accent/20 dark:bg-luxury-dark/40 border-y border-luxury-dark/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white dark:bg-luxury-dark/60 p-8 md:p-12 rounded-3xl border border-luxury-dark/5 dark:border-white/5 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-secondary/5 flex items-center justify-center text-primary dark:text-secondary">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary dark:text-secondary-light">
              Our Vision
            </h3>
            <p className="font-sans text-xs md:text-sm text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed font-light">
              To be recognized globally as the standard for luxury home textiles, nurturing skin health and sleep hygiene by making sustainable, certified long-staple linen accessible to every homeowner and designer.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-luxury-dark/60 p-8 md:p-12 rounded-3xl border border-luxury-dark/5 dark:border-white/5 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-secondary/5 flex items-center justify-center text-primary dark:text-secondary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary dark:text-secondary-light">
              Our Mission
            </h3>
            <p className="font-sans text-xs md:text-sm text-luxury-dark/60 dark:text-luxury-light/60 leading-relaxed font-light">
              To design, weave, and inspect every bedsheet, comforter, and blanket with precision craftsmanship. We aim to support organic cotton farmers, apply eco-friendly printing, and maintain transparent business relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure & Quality */}
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-6 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Facility Capabilities
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary dark:text-secondary-light">
              Our Manufacturing Infrastructure
            </h2>
            <p className="font-sans text-sm text-luxury-dark/70 dark:text-luxury-light/70 leading-relaxed font-light">
              Spanning over 50,000 square feet, our integrated textile facility houses high-speed electronic airjet looms, digital rotary printing units, custom embroidery machinery, and clean packaging bays. By managing the supply chain from yarn procurement to final inspection, we ensure total consistency.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-4">
              {values.map((val, index) => {
                const Icon = val.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-secondary/10 rounded-xl text-secondary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-primary dark:text-secondary-light">
                        {val.title}
                      </h4>
                      <p className="text-xs text-luxury-dark/50 dark:text-luxury-light/50 font-light mt-1">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl lg:order-1">
            <Image
              src="/images/bedsheets_category.jpg"
              alt="Achtia Creation Quality Inspecting Room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>
    </>
  );
}
