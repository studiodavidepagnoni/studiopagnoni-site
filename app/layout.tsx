import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/layout/AppProviders";
import { CookieBannerDeferred } from "@/components/layout/CookieBannerDeferred";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeaderDeferred } from "@/components/layout/SiteHeaderDeferred";
import { SiteHeaderShell } from "@/components/layout/SiteHeaderShell";
import { CspMeta } from "@/components/security/CspMeta";
import { withBasePath } from "@/lib/utils/basePath";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { jsonLdGraph, rootMetadata } from "@/lib/config/seo";
import "./globals.css";

/** Notch / home indicator: `viewport-fit=cover` + safe-area in CSS (header, drawer, cookie bar). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...rootMetadata,
  icons: {
    // URL stabili (niente ?v=): Google richiede path favicon stabili.
    // PNG ≥96 prima: Google Search usa raster e raccomanda >48px.
    icon: [
      { url: withBasePath("/icon-96.png"), type: "image/png", sizes: "96x96" },
      { url: withBasePath("/icon-192.png"), type: "image/png", sizes: "192x192" },
      { url: withBasePath("/icon-48.png"), type: "image/png", sizes: "48x48" },
      { url: withBasePath("/favicon.ico"), type: "image/x-icon" },
      { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
    ],
    shortcut: [{ url: withBasePath("/favicon.ico"), type: "image/x-icon" }],
    apple: [{ url: withBasePath("/apple-touch-icon.png"), type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <CspMeta />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontSans.className} antialiased theme-site max-md:overflow-x-clip`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>
        <SiteHeaderShell />
        <SiteHeaderDeferred />
        <AppProviders>
          <CookieBannerDeferred />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
