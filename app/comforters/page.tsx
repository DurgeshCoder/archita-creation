import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/data-service";

export const metadata: Metadata = {
  title: "Luxury Comforters Collection",
  description: "Explore our collection of fluffy, hypoallergenic down-alternative comforters. Designed with box-stitch panels for even warmth distribution.",
};

export default async function ComfortersCategory() {
  const comforters = await getProductsByCategory("comforters");
  const breadcrumbs = [{ name: "Collections", href: "/collections" }, { name: "Comforters" }];

  return (
    <>
      <PageHeader
        title="Luxury Comforters"
        breadcrumbs={breadcrumbs}
        bgImage="/images/comforters_category.jpg"
      />
      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {comforters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comforters.map((product) => (
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
