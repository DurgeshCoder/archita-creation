import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import FeaturedCollections from "@/components/FeaturedCollections";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCategories from "@/components/ProductCategories";
import ManufacturingTimeline from "@/components/ManufacturingTimeline";
import QualityPromise from "@/components/QualityPromise";
import Testimonials from "@/components/Testimonials";
import MasonryGallery from "@/components/MasonryGallery";
import FAQAccordion from "@/components/FAQAccordion";
import BlogPreview from "@/components/BlogPreview";
import CTABanner from "@/components/CTABanner";
import { getAllCategories, getAllCollections } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, collections] = await Promise.all([
    getAllCategories(),
    getAllCollections(),
  ]);

  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturedCollections initialCollections={collections} />
      <ProductCategories initialCategories={categories} />
      <WhyChooseUs />
      <ManufacturingTimeline />
      <QualityPromise />
      <Testimonials />
      <MasonryGallery />
      <FAQAccordion />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
