import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MasonryGallery from "@/components/MasonryGallery";

export const metadata: Metadata = {
  title: "Design Gallery & Portfolio",
  description: "Browse curated collections of luxury bedroom décor featuring Archita Creation's premium cotton bedsheets, comforters, and dohars.",
};

export default function Gallery() {
  const breadcrumbs = [{ name: "Design Gallery" }];

  return (
    <>
      <PageHeader title="Design Gallery" breadcrumbs={breadcrumbs} />
      <MasonryGallery />
    </>
  );
}
