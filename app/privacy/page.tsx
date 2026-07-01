import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Achtia Creation protects, encrypts, and handles your wholesale and retail purchase enquiry data.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader title="Privacy Policy" breadcrumbs={[{ name: "Privacy Policy" }]} />
      
      <section className="py-24 bg-white dark:bg-luxury-dark font-sans text-sm font-light text-luxury-dark/80 dark:text-white/80 leading-relaxed">
        <div className="max-w-3xl mx-auto px-6">
          <p className="mb-6">
            At <strong>Achtia Creation</strong>, we hold the privacy of our retail clients, wholesale distributors, and interior designers in the highest regard. This Privacy Policy details how we collect, secure, and handle your data when you visit our website, request catalog assets, or place order enquiries.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect data to provide better services to all users. This information includes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Enquiry Details:</strong> When you submit a form or contact us via WhatsApp, we collect your name, email, phone number, company name, and specific bedding dimensions or collection interests.
            </li>
            <li>
              <strong>Analytics & Usage:</strong> We track anonymous user behaviors (e.g., page viewing durations, design gallery click actions) to optimize page loading speeds and UX layouts.
            </li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            Your collected parameters are utilized strictly to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Dispatch requested physical and digital catalog folders.</li>
            <li>Coordinate shipping details and handle wholesale billing invoicing.</li>
            <li>Analyze product category performance to guide our weaving schedules.</li>
            <li>Keep our partner list notified of upcoming seasonal collection launches.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            3. Third-Party Sharing Restrictions
          </h2>
          <p className="mb-6">
            Achtia Creation never sells, rents, or shares your personal details or corporate specs with third-party advertisers. Data is shared exclusively with our logistics courier partners (to ship order boxes across India) or payment providers under encrypted secure tunnels.
          </p>

          <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light mt-8 mb-4">
            4. Security Standards
          </h2>
          <p className="mb-6">
            Our storefront operates under mandatory SSL encryption. Wholesaler files, custom size matrices, and invoice records are stored in secure firewall-guarded servers to prevent data leaks.
          </p>

          <div className="border-t border-luxury-dark/10 dark:border-white/10 pt-8 mt-12 text-xs text-luxury-dark/40 dark:text-white/40">
            Last Updated: June 30, 2026. For questions regarding privacy policy terms, contact privacy@achtiacreation.com.
          </div>
        </div>
      </section>
    </>
  );
}
