import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

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
    template: "%s | Archita Creation - Luxury Bedding & Home Furnishing",
    default: "Archita Creation | Premium Bedding Collections & Luxury Giza Sheets",
  },
  description: "Discover Archita Creation's premium bedding collections: 100% Giza cotton bedsheets, comforters, AC blankets, and hand-block dohars. Crafted for luxury and sleep comfort.",
  keywords: [
    "premium bedsheets",
    "luxury bedding India",
    "Giza cotton sheets",
    "comforters",
    "AC blankets",
    "dohars",
    "Panipat textile manufacturer",
    "Archita Creation"
  ],
  authors: [{ name: "Archita Creation" }],
  creator: "Archita Creation",
  publisher: "Archita Creation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.architacreation.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Archita Creation | Premium Bedding Collections & Giza Sheets",
    description: "Experience the pinnacle of bedroom comfort with Archita Creation's hand-block dohars, sateen sheets, and cozy microfiber comforters.",
    url: "https://www.architacreation.com",
    siteName: "Archita Creation",
    images: [
      {
        url: "/images/hero_bedroom.jpg",
        width: 1200,
        height: 630,
        alt: "Archita Creation Luxury Bedroom Bedding Suite",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archita Creation | Luxury Bedding & Home Furnishings",
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
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Archita Creation",
    "url": "https://www.architacreation.com",
    "logo": "https://www.architacreation.com/images/hero_bedroom.jpg",
    "description": "Manufacturers and exporters of premium 100% Giza cotton bedsheets, comforters, AC blankets, and handcrafted dohars.",
    "telephone": "+919795872419",
    "email": "info@architacreation.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Archita House, Indira Nagar",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226016",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/archita_creation_offical"
    ]
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
