import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review Achtia Creation's business conditions, wholesale billing contracts, shipment agreements, and design copyrights.",
};

export default function TermsOfService() {
  return (
    <>
      <PageHeader title="Terms of Service" breadcrumbs={[{ name: "Terms & Conditions" }]} />

      <section className="py-24 bg-white dark:bg-luxury-dark font-sans text-sm font-light text-luxury-dark/80 dark:text-white/80 leading-relaxed">
        <div className="max-w-3xl mx-auto px-6">
          <p className="mb-6">
            Welcome to the digital showroom of <strong>Achtia Creation</strong>. By using this website, requesting digital design catalogs, or placing orders via our enquiry desks, you agree to comply with the terms and conditions outlined below.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            1. Intellectual Property & Design Protection
          </h2>
          <p className="mb-6">
            All content on this storefront—including photographic bedding setups, Giza sateen weaves visual specs, and hand-block floral print motifs (like the Clay Craft and Mughal collections)—is the sole intellectual property of Achtia Creation. Unauthorized replication, printing duplication, or resale under a different brand name is strictly prohibited and subject to legal action under Indian copyright laws.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            2. Wholesale & Enquiry Estimates
          </h2>
          <p className="mb-6">
            Pricing displayed or shared via our catalog estimates are valid for 30 calendar days from the date of estimate issuance. Bulk order dispatch cycles, bespoke monogram embroideries, and custom size tailoring schedules will be finalized individually via written Proforma Invoice documents.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            3. Logistics & Delivery Agreements
          </h2>
          <p className="mb-6">
            We offer All-India insured shipping. While we make every effort to meet estimated delivery dates, shipments can experience delays due to carrier transit delays, regional holidays, or custom border checks (for export cargo). Risk of loss transfers to the customer upon delivery confirmation by our courier logs.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            4. Claims & Quality Returns
          </h2>
          <p className="mb-6">
            Any manufacturing anomalies (weaving slubs, size variance exceeding +/- 1 inch, or color stains) must be reported to our quality support desk within 7 calendar days of box delivery. Returned linen items must be unwashed, unused, and packed in original luxury slide boxes.
          </p>

          <div className="border-t border-luxury-dark/10 dark:border-white/10 pt-8 mt-12 text-xs text-luxury-dark/40 dark:text-white/40">
            Last Updated: June 30, 2026. For questions regarding wholesale contracts, contact legal@achtiacreation.com.
          </div>
        </div>
      </section>
    </>
  );
}
