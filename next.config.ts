import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isStaticExport = process.env.STATIC_EXPORT === "1";
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  compiler: {
    removeConsole: isDev ? false : { exclude: ["error", "warn"] },
  },
  experimental: {
    // Workaround for intermittent Windows dev manifest issues in Next devtools segment explorer.
    devtoolSegmentExplorer: false,
    optimizePackageImports: ["react", "react-dom"],
  },
  poweredByHeader: false,
  images: {
    // In dev, avoid Next image optimizer flakiness with remote hosts on Windows networks.
    ...(isDev ? { unoptimized: true } : {}),
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
};

if (isStaticExport) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (raw && raw !== "/") {
    nextConfig.basePath = raw.startsWith("/") ? raw : `/${raw}`;
  }
} else {
  nextConfig.headers = async () => [
    {
      source: "/assets/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
        },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "base-uri 'self'",
            "frame-ancestors 'self'",
            "form-action 'self' https://formspree.io",
            "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com",
            "media-src 'self'",
            "font-src 'self' data: https://fonts.gstatic.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // In dev Next.js (React Refresh / HMR) richiede 'unsafe-eval' per ricompilare i moduli al volo.
            // In produzione resta rigido a 'self' + 'unsafe-inline'.
            isDev
              ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
              : "script-src 'self' 'unsafe-inline'",
            // In dev consentiamo il websocket HMR di Next.
            isDev
              ? "connect-src 'self' ws: wss: https://formspree.io"
              : "connect-src 'self' https://formspree.io",
            "frame-src 'self' https://maps.google.com https://www.google.com https://*.google.com",
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    },
    {
      source: "/:path*",
      headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }],
    },
  ];

  nextConfig.redirects = async () => [
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/laser-scanner-slam", destination: "/rilievi-laser-scanner-slam-brescia", permanent: true },
    { source: "/laser-scanner-slam-brescia", destination: "/rilievi-laser-scanner-slam-brescia", permanent: true },
    { source: "/laser-scanner-slam-lombardia", destination: "/rilievi-laser-scanner-slam-lombardia", permanent: true },
    { source: "/rilievi-laser-scanner-slam", destination: "/rilievi-laser-scanner-slam-brescia", permanent: true },
    { source: "/chi-siamo.html", destination: "/chi-siamo", permanent: true },
    { source: "/servizi-studio-progettazione.html", destination: "/servizi", permanent: true },
    {
      source: "/progettazione-strutture-brescia-contatti.html",
      destination: "/contatti",
      permanent: true,
    },
    { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
    { source: "/villa-acciaio-veneto.html", destination: "/progetti", permanent: true },
    { source: "/capannone-erbusco.html", destination: "/progetti", permanent: true },
    { source: "/superstudio-village.html", destination: "/progetti", permanent: true },
    { source: "/superstudio-maxi.html", destination: "/progetti", permanent: true },
  ];
}

export default nextConfig;
