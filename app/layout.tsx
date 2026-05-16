import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/AppProviders";
import { CookieBanner } from "@/components/CookieBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeroRouter } from "@/components/PageHeroRouter";
import { SiteHeader } from "@/components/SiteHeader";
import { withBasePath } from "@/lib/basePath";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { jsonLdGraph, rootMetadata } from "@/lib/seo";
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
    icon: [
      { url: `${withBasePath("/icon.svg")}?v=19`, type: "image/svg+xml" },
      { url: `${withBasePath("/favicon.ico")}?v=19`, type: "image/x-icon" },
    ],
    shortcut: [{ url: `${withBasePath("/icon.svg")}?v=19`, type: "image/svg+xml" }],
    apple: [{ url: `${withBasePath("/icon.svg")}?v=19`, type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontSans.className} antialiased theme-light max-md:overflow-x-clip`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
        <AppProviders>
          <a href="#main-content" className="skip-link">
            Vai al contenuto principale
          </a>
          <SiteHeader />
          <PageHeroRouter />
          <CookieBanner />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
