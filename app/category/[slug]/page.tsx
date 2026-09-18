import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory, getAllCategories } from "@/lib/data-service";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Archita Creation",
    };
  }

  return {
    title: `${category.name} Collection`,
    description:
      category.description ||
      `Explore premium ${category.name} from Archita Creation. Luxury textiles engineered for exceptional comfort.`,
  };
}

export default async function DynamicCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);
  const breadcrumbs = [
    { name: "Collections", href: "/collections" },
    { name: category.name },
  ];

  return (
    <>
      <PageHeader
        title={category.name}
        breadcrumbs={breadcrumbs}
        bgImage={category.image || "/images/hero_bedroom.jpg"}
      />

      <section className="py-20 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {category.description && (
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {category.description}
              </p>
            </div>
          )}

          {products.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
                  Showing {products.length} {products.length === 1 ? "Product" : "Products"}
                </span>
                <Link
                  href="/collections"
                  className="text-xs font-semibold uppercase tracking-wider text-secondary hover:text-secondary-dark transition-colors inline-flex items-center"
                >
                  View Full Catalog <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 p-12 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-luxury-dark dark:text-luxury-light mb-2">
                Designs Coming Soon
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-light">
                Our artisans are currently preparing new collections for {category.name}. Check out our other luxury ranges in the meantime.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Browse All Collections
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
