import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MasonryGallery from "@/components/MasonryGallery";
import { getAllGalleryItems } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Design Gallery & Portfolio",
  description:
    "Browse curated collections of luxury bedroom décor featuring Archita Creation's premium cotton bedsheets, comforters, and dohars.",
};

export default async function Gallery() {
  const items = await getAllGalleryItems();
  const breadcrumbs = [{ name: "Design Gallery" }];

  return (
    <>
      <PageHeader title="Design Gallery" breadcrumbs={breadcrumbs} />
      <MasonryGallery initialItems={items} />
    </>
  );
}
