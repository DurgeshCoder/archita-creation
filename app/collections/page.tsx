import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import CollectionsBrowser from "@/components/CollectionsBrowser";

export const metadata: Metadata = {
  title: "Bedding Collections",
  description: "Explore our luxurious collections of long-staple cotton bedsheets, fluffy AC blankets, down comforters, and traditional multi-layer dohars.",
};

export default function Collections() {
  return (
    <>
      <PageHeader title="Bedding Collections" breadcrumbs={[{ name: "Collections" }]} />
      <section className="py-20 bg-white dark:bg-luxury-dark">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-20 text-center text-xs tracking-wider uppercase font-semibold text-luxury-dark/40">
              Loading Luxury Browser...
            </div>
          }
        >
          <CollectionsBrowser />
        </Suspense>
      </section>
    </>
  );
}
