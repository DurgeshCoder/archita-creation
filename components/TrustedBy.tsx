import { Building2, Hotel, Sparkles, Store, Users } from "lucide-react";

export default function TrustedBy() {
  const partners = [
    { name: "Boutique Hotels & Resorts", desc: "400-800 TC Hotel Linen Suites", icon: Hotel },
    { name: "Interior Design Studios", desc: "Bespoke Fabric Sourcing", icon: Sparkles },
    { name: "Premium Retail Stockists", desc: "Curated In-Store Linens", icon: Store },
    { name: "Luxury Homeowners", desc: "Direct Retail Delivery", icon: Users },
    { name: "Institutional Exporters", desc: "Bulk Cargo Supply", icon: Building2 },
  ];

  return (
    <section className="py-10 border-y border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500 mb-6">
          Supplying Premium Living Spaces & Hospitality Across India
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-center">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            const isLastOnMobile = i === 4;
            return (
              <div
                key={i}
                className={`p-4 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex flex-col items-center text-center group hover:border-secondary/40 transition-all hover:shadow-xs ${
                  isLastOnMobile ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-serif text-sm font-bold text-luxury-dark dark:text-luxury-light group-hover:text-secondary transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-light mt-0.5">
                  {partner.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
