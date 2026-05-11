import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders";
import { CookieBanner } from "@/components/CookieBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

const ogImage = "/assets/stock/pointcloud-data.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      // Cache-bust to avoid "old favicon" in aggressive browser caches.
      { url: "/icon.svg?v=16", type: "image/svg+xml" },
      { url: "/favicon.ico?v=14", type: "image/x-icon" },
    ],
    shortcut: [{ url: "/icon.svg?v=16", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg?v=16", type: "image/svg+xml" }],
  },
  title: {
    default: "Studio Tecnico Pagnoni — Topografia, laser SLAM, Bornato (BS)",
    template: `%s — ${site.name}`,
  },
  description:
    "Geometra e architetto a Bornato (Cazzago San Martino, Brescia): topografia e rilievi GNSS, laser scanner SLAM, progettazione del verde, urbanistica e pratiche edilizie. Franciacorta, Brescia, Lombardia e Nord Italia.",
  keywords: [
    "topografo Brescia",
    "rilievo topografico Bornato",
    "rilievo topografico Cazzago San Martino",
    "geometra topografo Franciacorta",
    "laser scanner SLAM Lombardia",
    "rilievo laser scanner 3D",
    "nuvola di punti edifici",
    "GNSS RTK rilievo",
    "progettazione verde vigneti",
    "studio tecnico geometra architetto BS",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Topografia professionale, laser scanner SLAM e progettazione del territorio dalla sede di Bornato (Cazzago San Martino, Brescia).",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#051e1b" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description:
    "Servizi di topografia, laser scanner SLAM, progettazione del verde, urbanistica e pratiche edilizie. Sede a Cazzago San Martino (BS), frazione Bornato.",
  url: site.url,
  email: site.email,
  telephone: site.phones.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Vittorio Emanuele III, 16",
    addressLocality: "Cazzago San Martino",
    addressRegion: "BS",
    postalCode: "25046",
    addressCountry: "IT",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Lombardia" },
    { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontSans.className} antialiased theme-light`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppProviders>
          <a href="#main-content" className="skip-link">
            Vai al contenuto principale
          </a>
          <SiteHeader />
          <CookieBanner />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
