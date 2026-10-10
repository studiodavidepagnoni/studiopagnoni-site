/** Override testo hero (IT fornisce image/alt); chiavi = path senza `/en`. */
export const pageHeroesEn: Record<
  string,
  Partial<{ eyebrow: string; title: string; lede: string; alt: string }>
> = {
  "/chi-siamo": {
    eyebrow: "The practice",
    title: "About us",
  },
  "/architettura-franciacorta": {
    eyebrow: "Design · Franciacorta",
    title: "Architecture in Franciacorta",
    lede: "From concept to building procedures. Studio Architettura Pagnoni, Bornato / Cazzago San Martino (BS).",
  },
  "/servizi": {
    eyebrow: "What we do",
    title: "Architecture and surveying services",
    lede: "Architecture, topography, SLAM laser scanning, landscape, planning and technical support since 1988.",
  },
  "/topografia": {
    eyebrow: "Surveying · Geometra",
    title: "Surveying and topography in Franciacorta",
    lede: "Surveyor (geometra) in Franciacorta: land splits, boundaries and field surveys with GNSS RTK and total station. Bornato, Cazzago San Martino (BS).",
  },
  "/rilievi-laser-scanner-slam-brescia": {
    eyebrow: "SLAM laser scanning · Brescia",
    title: "SLAM laser surveys in Brescia",
    lede: "Point clouds and as-built documentation for architectural design across the province of Brescia and Franciacorta.",
  },
  "/rilievi-laser-scanner-slam-lombardia": {
    eyebrow: "SLAM laser scanning · Lombardy",
    title: "SLAM laser surveys in Lombardy",
    lede: "Mobile 3D scanning for architecture, industrial buildings and plant rooms across Lombardy, based in Brescia.",
  },
  "/rilievi-3d-per-studi-di-architettura": {
    eyebrow: "For architecture practices",
    title: "3D surveys for architecture studios",
    lede: "We handle the survey; you keep the design. Point clouds, DWG and as-built packages ready to use — Brescia and Franciacorta.",
  },
  "/laser-scanner-slam": {
    eyebrow: "Mobile laser scanning",
    title: "SLAM laser surveys",
    lede: "Point clouds and as-built documentation for architectural design, buildings, sheds and plant rooms — CHCNAV RS10.",
  },
  "/progetti": {
    eyebrow: "Case studies",
    title: "Projects and case studies",
    lede: "Recent digital surveys in Franciacorta and the province of Brescia.",
  },
  "/contatti": {
    eyebrow: "Contact",
    title: "Contact and quotations",
    lede: "Site visits and quotes for architecture, surveying and SLAM laser scanning in Franciacorta and the province of Brescia.",
  },
  "/privacy-policy": {
    eyebrow: "GDPR · Italy · 2026",
    title: "Privacy policy and cookies",
  },
};
