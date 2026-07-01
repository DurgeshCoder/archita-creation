import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/constants";

export const metadata: Metadata = {
  title: "Premium Dohars Collection",
  description: "Browse hand-block print Dohars made from organic mulmul cotton encasing a soft flannel layer. Traditional Rajasthani prints.",
};

export default function DoharsCategory() {
  const dohars = PRODUCTS.filter((p) => p.category === "dohars");
  const breadcrumbs = [{ name: "Collections", href: "/collections" }, { name: "Dohars" }];

  return (
    <>
      <PageHeader
        title="Premium Dohars"
        breadcrumbs={breadcrumbs}
        bgImage="/images/dohars_category.jpg"
      />
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {dohars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dohars.map((product) => (
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
