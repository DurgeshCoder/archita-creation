import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, MessageSquare, ShieldCheck, Award, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/constants";
import PageHeader from "@/components/PageHeader";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static routes at build time for SSG
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${product.name} - Luxury ${product.categoryLabel}`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | Achtia Creation Bedding`,
      description: product.shortDescription,
      url: `https://www.achtiacreation.com/products/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Related products (same category, max 3)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // WhatsApp Enquiry Link
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    `Hello Achtia Creation, I am interested in purchasing or enquiring about the "${product.name}" from your "${product.collection}" (Price: ${product.price}). Please share shipping options and availability details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Structured Schema.org Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map((img) => `https://www.achtiacreation.com${img}`),
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Achtia Creation",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.achtiacreation.com/products/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price.replace("₹", "").replace(",", ""),
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": 18,
    },
  };

  return (
    <>
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHeader
        title={product.name}
        breadcrumbs={[
          { name: "Collections", href: "/collections" },
          { name: product.categoryLabel, href: `/${product.category}` },
          { name: product.name },
        ]}
      />

      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back button */}
          <Link
            href="/collections"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 hover:text-secondary mb-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
          </Link>

          {/* Main Product Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
            {/* Gallery Section */}
            <div className="lg:col-span-6">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Info Section */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  {product.collection}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary dark:text-secondary-light leading-tight mt-1 mb-2">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-secondary fill-current"
                          : "text-luxury-dark/10 dark:text-white/10"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-luxury-dark/50 dark:text-white/50 pl-1 mt-0.5">
                    {product.rating} Rating (18 Verified Customer Reviews)
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-accent/20 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-6 rounded-3xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-luxury-dark/40 dark:text-white/40 tracking-wider uppercase font-medium">
                    Enquiry Catalog Price
                  </span>
                  <div className="text-3xl font-serif font-bold text-primary dark:text-secondary-light mt-0.5">
                    {product.price}
                  </div>
                </div>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center transition-all duration-300 shadow-md hover:scale-102"
                >
                  <MessageSquare className="w-4 h-4 mr-2 fill-current" />
                  Order / Enquire
                </Link>
              </div>

              {/* Long Description */}
              <p className="font-sans text-sm text-luxury-dark/75 dark:text-white/70 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Bullet Features list */}
              <div className="pt-4 border-t border-luxury-dark/5 dark:border-white/5">
                <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light mb-4">
                  Signature Weave Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-luxury-dark/75 dark:text-white/75">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed specifications tabs grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-luxury-dark/10 dark:border-white/10 pt-16 mb-24">
            {/* Specs Table */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-secondary" /> Technical Specifications
              </h3>
              <div className="border border-luxury-dark/5 dark:border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-xs font-sans">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr
                        key={key}
                        className="border-b border-luxury-dark/5 dark:border-white/5 last:border-b-0"
                      >
                        <td className="bg-accent/20 dark:bg-luxury-dark/20 p-4 font-semibold text-primary dark:text-secondary-light w-1/3">
                          {key}
                        </td>
                        <td className="p-4 text-luxury-dark/70 dark:text-white/75">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Package Contents & Care */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-secondary" /> Package Contents
              </h3>
              <ul className="space-y-3 mb-8">
                {product.packageIncludes.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs text-luxury-dark/75 dark:text-white/75">
                    <div className="w-4 h-4 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5 text-[8px] font-bold">
                      {i + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Care Guide */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mb-6 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-secondary" /> Fabric Care Guide
              </h3>
              <ul className="space-y-3 bg-accent/10 dark:bg-luxury-dark/20 border border-luxury-dark/5 dark:border-white/5 p-6 rounded-2xl">
                {product.careInstructions.map((instruction, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs text-luxury-dark/75 dark:text-white/75 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-luxury-dark/10 dark:border-white/10 pt-16">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary dark:text-secondary-light mb-8 text-center">
                Related Premium Linen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
