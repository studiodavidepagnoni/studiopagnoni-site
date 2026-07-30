/** Padding orizzontale sul contenitore esterno (stesso pattern delle `.section-shell` della home). */
export const layoutGutterXClass = "px-4 sm:px-5 md:px-10";

/**
 * Colonna contenuto centrata nel gutter. Usare dentro un wrapper con `layoutGutterXClass`
 * così header, footer e pagine allineano logo e menu ai bordi delle sezioni (stesso schema della home).
 */
export const layoutContentMaxClass = "mx-auto w-full min-w-0 max-w-[1140px]";

/**
 * URL pubblico (canonical, OG, sitemap).
 * GitHub Actions (`.github/workflows/deploy-github-pages.yml`) imposta `NEXT_PUBLIC_SITE_URL` in automatico.
 * Build locale in sottocartella: es. `NEXT_PUBLIC_SITE_URL=https://tuouser.github.io/nome-repo` e
 * `NEXT_PUBLIC_BASE_PATH=/nome-repo` (stesso nome del repo, con slash iniziale).
 */
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopagnoni.com";

/**
 * NAP + orari allineati a Google Business Profile «Studio Architettura Pagnoni».
 * Orari scheda: lun–ven 09:00–18:00 (sab/dom chiuso).
 */
export const site = {
  name: "Studio Architettura Pagnoni",
  /** Marchio in header/footer, title SEO e scheda Google Business. */
  brandName: "Studio Architettura Pagnoni",
  legalName: "Studio Architettura Pagnoni",
  tagline: "Architettura, topografia e laser scanning",
  url: publicSiteUrl,
  email: "studio@pagnoni-s.com",
  /** Recapiti telefonici (due linee). */
  phones: [
    { label: "Architetto Davide Pagnoni", display: "+39 347 357 6510", tel: "+393473576510" },
    { label: "Geometra Sergio Pagnoni", display: "+39 348 231 1092", tel: "+393482311092" },
  ],
  address: {
    streetAddress: "Via Vittorio Emanuele III, 16",
    /** Frazione (utile in scheda Maps / NAP). */
    addressNeighborhood: "Bornato",
    addressLocality: "Cazzago San Martino",
    addressRegion: "BS",
    postalCode: "25046",
    addressCountry: "IT",
  },
  /** Riga unica per footer / contatti (stesso testo della scheda Google). */
  addressLine: "Via Vittorio Emanuele III, 16 — 25046 Bornato, Frazione di Cazzago San Martino (BS)",
  /** Coordinate sede (Bornato / Cazzago San Martino) per LocalBusiness.geo */
  geo: { latitude: 45.59368, longitude: 10.0409 },
  maps: {
    /** Link scheda / ricerca Maps (hasMap + CTA). */
    placeUrl:
      "https://www.google.com/maps/search/?api=1&query=Studio+Architettura+Pagnoni+Via+Vittorio+Emanuele+III+16+Cazzago+San+Martino",
    embedUrl:
      "https://maps.google.com/maps?q=Via%20Vittorio%20Emanuele%20III%2016,%20Cazzago%20San%20Martino%20BS&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  openingHours: {
    /** Schema.org DayOfWeek */
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    slots: [{ opens: "09:00", closes: "18:00" }] as const,
    label: "Lun–Ven 9:00–18:00",
    labelShort: "Lun–Ven 9:00–18:00",
  },
  /** Partita IVA. */
  piva: "04061310985",
  /**
   * Formspree form ID — solo da env (niente ID di default nel bundle).
   * Senza ID il form usa fallback mailto.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ?? "",
  /** reCAPTCHA v2 site key — obbligatorio in prod per anti-spam Formspree. */
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "",
} as const;

export const navItems = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/laser-scanner-slam", label: "Laser Scanning" },
  { href: "/progetti", label: "Progetti" },
  { href: "/contatti", label: "Contatti" },
] as const;
