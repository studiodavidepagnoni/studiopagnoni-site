/** Padding orizzontale sul contenitore esterno (stesso pattern delle `.section-shell` della home). */
export const layoutGutterXClass = "px-4 sm:px-5 md:px-10";

/**
 * Colonna contenuto centrata nel gutter. Usare dentro un wrapper con `layoutGutterXClass`
 * così header, footer e pagine allineano logo e menu ai bordi delle sezioni (stesso schema della home).
 */
export const layoutContentMaxClass = "mx-auto w-full max-w-[1140px]";

/** URL pubblico (canonical, OG). In CI per GitHub Pages impostare NEXT_PUBLIC_SITE_URL al dominio reale del deploy. */
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studiotecnicopagnoni.it";

export const site = {
  name: "Studio Tecnico Pagnoni",
  legalName: "Studio Tecnico Pagnoni",
  tagline: "Topografia, laser scanner SLAM, progettazione e territorio",
  url: publicSiteUrl,
  email: "studio@pagnoni-s.com",
  /** Recapiti telefonici (due linee). */
  phones: [
    { label: "Arch. Davide Pagnoni", display: "+39 347 357 6510", tel: "+393473576510" },
    { label: "Geom. Sergio Pagnoni", display: "+39 348 231 1092", tel: "+393482311092" },
  ],
  addressLine: "Via Vittorio Emanuele III, 16 — 25046 Cazzago San Martino (BS), fraz. Bornato",
  /** Partita IVA: inserire quando disponibile; se vuota non viene mostrata nel footer. */
  piva: "",
  /** Formspree: creare un form su https://formspree.io e impostare NEXT_PUBLIC_FORMSPREE_ID oppure `formspreeId` qui. Se vuoto, il form usa fallback mailto. */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

export const navItems = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/topografia", label: "Topografia" },
  { href: "/laser-scanner-slam", label: "Laser SLAM" },
  { href: "/progetti", label: "Progetti" },
  { href: "/contatti", label: "Contatti" },
] as const;
