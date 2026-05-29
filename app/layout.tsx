import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/layout/AppProviders";
import { CookieBannerDeferred } from "@/components/layout/CookieBannerDeferred";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeaderDeferred } from "@/components/layout/SiteHeaderDeferred";
import { SiteHeaderShell } from "@/components/layout/SiteHeaderShell";
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
