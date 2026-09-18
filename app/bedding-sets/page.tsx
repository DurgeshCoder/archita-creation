import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "Luxury Bedding Sets",
  description: "Browse curated, coordinated bedding suites: sheets, pillow shams, comforters, and cushions. Match your bedroom aesthetics perfectly.",
};

export default async function BeddingSetsCategory() {
  const beddingSets = await getProductsByCategory("bedding-sets");
  const breadcrumbs = [{ name: "Collections", href: "/collections" }, { name: "Bedding Sets" }];

  return (
    <>
      <PageHeader
        title="Complete Bedding Sets"
        breadcrumbs={breadcrumbs}
        bgImage="/images/bedding_sets_category.jpg"
      />
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {beddingSets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beddingSets.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-luxury-dark/40 py-20">Coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
