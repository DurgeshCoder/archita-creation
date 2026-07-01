import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppCall from "@/components/WhatsAppCall";
import BackToTop from "@/components/BackToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Achtia Creation - Luxury Bedding & Home Furnishing",
    default: "Achtia Creation | Premium Bedding Collections & Luxury Giza Sheets",
  },
  description: "Discover Achtia Creation's premium bedding collections: 100% Giza cotton bedsheets, comforters, AC blankets, and hand-block dohars. Crafted for luxury and sleep comfort.",
  keywords: [
    "premium bedsheets",
    "luxury bedding India",
    "Giza cotton sheets",
    "comforters",
    "AC blankets",
    "dohars",
    "Panipat textile manufacturer",
    "Achtia Creation"
  ],
  authors: [{ name: "Achtia Creation" }],
  creator: "Achtia Creation",
  publisher: "Achtia Creation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.achtiacreation.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Achtia Creation | Premium Bedding Collections & Giza Sheets",
    description: "Experience the pinnacle of bedroom comfort with Achtia Creation's hand-block dohars, sateen sheets, and cozy microfiber comforters.",
    url: "https://www.achtiacreation.com",
    siteName: "Achtia Creation",
    images: [
      {
        url: "/images/hero_bedroom.jpg",
        width: 1200,
        height: 630,
        alt: "Achtia Creation Luxury Bedroom Bedding Suite",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achtia Creation | Luxury Bedding & Home Furnishings",
    description: "Discover premium Giza sheets, quilts, AC blankets, and designer dohars handcrafted in India.",
    images: ["/images/hero_bedroom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-luxury-dark text-luxury-dark dark:text-luxury-light">
        <Navbar />
        <main className="flex-grow pt-[73px] lg:pt-[81px]">
          {children}
        </main>
        <Footer />
        <WhatsAppCall />
        <BackToTop />
      </body>
    </html>
  );
}
