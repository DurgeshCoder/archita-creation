import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/constants";

export const metadata: Metadata = {
  title: "AC Blankets Collection",
  description: "Browse our collection of lightweight, soft fleece AC blankets. Velvety texture designed to keep you cozy under the central cooling.",
};

export default function BlanketsCategory() {
  const blankets = PRODUCTS.filter((p) => p.category === "blankets");
  const breadcrumbs = [{ name: "Collections", href: "/collections" }, { name: "Blankets" }];

  return (
    <>
      <PageHeader
        title="AC Blankets"
        breadcrumbs={breadcrumbs}
        bgImage="/images/blankets_category.jpg"
      />
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {blankets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blankets.map((product) => (
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
