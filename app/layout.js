import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Diagnostic Pathology Lab & Health Checkups`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} provides accurate diagnostic tests, health packages, and doorstep home sample collection. Transparent reporting and verified laboratory care.`,
  keywords: [
    "diagnostic lab",
    "pathology lab",
    "blood test",
    "CBC test",
    "home sample collection",
    site.name,
    site.city,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} | Diagnostic Lab & Health Checkup Centre`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalLaboratory", "LocalBusiness"],
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.pincode,
      addressCountry: "IN",
    },
    openingHours: site.hours,
    areaServed: site.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-mist text-ink font-sans">
        <Header />
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
