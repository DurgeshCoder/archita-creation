export default function TrustedBy() {
  const clients = [
    { name: "Luxury Boutique Hotels", desc: "Premium Bed Linen" },
    { name: "Elite Retail Partners", desc: "In-Store Display" },
    { name: "Wholesale Exporters", desc: "Bulk Cargo Supply" },
    { name: "Interior Design Studios", desc: "Bespoke Styling" },
    { name: "Premium Homeowners", desc: "Direct Retail Customers" },
  ];

  return (
    <section className="py-12 border-y border-luxury-dark/5 dark:border-luxury-light/5 bg-accent/30 dark:bg-luxury-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 dark:text-secondary/60 mb-8">
          Trusted Partners Across India
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center text-center">
          {clients.map((client, i) => (
            <div
              key={i}
              className="p-4 flex flex-col justify-center items-center group transition-all duration-300 hover:scale-102"
            >
              <span className="font-serif text-base md:text-lg font-bold text-primary dark:text-secondary group-hover:text-primary-dark dark:group-hover:text-secondary-light transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-luxury-dark/40 dark:text-luxury-light/40 mt-1 font-light">
                {client.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
