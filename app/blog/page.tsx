import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import BlogBrowser from "@/components/BlogBrowser";

export const metadata: Metadata = {
  title: "Insights & Guides | Archita Creation Journal",
  description: "Discover luxury bedding style strategies, Giza cotton weaves explanation, thread count buying hacks, and linen care guides from our textile consultants.",
};

export default function BlogIndex() {
  return (
    <>
      <PageHeader title="Archita Insights Journal" breadcrumbs={[{ name: "Blog" }]} />
      <section className="py-20 bg-white dark:bg-luxury-dark">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-20 text-center text-xs tracking-wider uppercase font-semibold text-luxury-dark/40">
              Loading Insights Library...
            </div>
          }
        >
          <BlogBrowser />
        </Suspense>
      </section>
    </>
  );
}
