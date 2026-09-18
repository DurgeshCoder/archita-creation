"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppCall from "@/components/WhatsAppCall";
import BackToTop from "@/components/BackToTop";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-luxury-dark dark:text-luxury-light">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[73px] lg:pt-[81px]">
        {children}
      </main>
      <Footer />
      <WhatsAppCall />
      <BackToTop />
    </>
  );
}
