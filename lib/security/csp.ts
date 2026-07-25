/**
 * CSP condivisa: next.config (Node), meta tag Pages, public/_headers.
 * frame-ancestors / HSTS / X-Frame-Options funzionano solo come header HTTP
 * (Cloudflare/Netlify), non via <meta>.
 */

export function buildContentSecurityPolicy(options?: { dev?: boolean; forMeta?: boolean }): string {
  const dev = options?.dev === true;
  const forMeta = options?.forMeta === true;

  const directives = [
    ...(forMeta ? [] : ["frame-ancestors 'self'"]),
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io",
    "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com",
    "media-src 'self'",
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    dev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/"
      : "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    dev ? "connect-src 'self' ws: wss: https://formspree.io" : "connect-src 'self' https://formspree.io",
    "frame-src 'self' https://maps.google.com https://www.google.com https://*.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

/** Limiti campi form contatti (anti-spam payload). */
export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  city: 120,
  message: 4000,
  companyHoneypot: 200,
} as const;

export const PRIVACY_CONSENT_VERSION = "privacy-policy-2026" as const;

/** Tempo minimo (ms) prima che l’invio sia accettato — filtra bot istantanei. */
export const CONTACT_MIN_ELAPSED_MS = 2800;
