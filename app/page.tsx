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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturedCollections />
      <ProductCategories />
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
