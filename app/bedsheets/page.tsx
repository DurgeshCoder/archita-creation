import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "Premium Bedsheets Collection",
  description: "Browse Giza long-staple cotton bedsheets in high thread counts and elegant sateen and percale weaves. Handcrafted details.",
};

export default async function BedsheetsCategory() {
  const bedsheets = await getProductsByCategory("bedsheets");
  const breadcrumbs = [{ name: "Collections", href: "/collections" }, { name: "Bedsheets" }];

  return (
    <>
      <PageHeader
        title="Premium Bedsheets"
        breadcrumbs={breadcrumbs}
        bgImage="/images/bedsheets_category.jpg"
      />
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {bedsheets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bedsheets.map((product) => (
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
