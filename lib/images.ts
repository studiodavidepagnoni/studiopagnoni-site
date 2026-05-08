/** Path pubblici: cartella `assets/` → `public/assets/` (sync-static). */

const a = (name: string) => `/assets/stock/${name}`;

/** Slide hero: testo ciclico su video fisso. `src` usato solo come fallback mobile. */
export const heroSlides = [
  {
    src: a("gnss-rtk-quarry.jpg"),
    alt: "GNSS RTK sul campo — rilievi geodetici, Studio Tecnico Pagnoni",
    line1: "Topografia e rilievi\u00A03D",
    line2: "scanner SLAM · GNSS · stazione totale",
    body: "Scansione 3D SLAM in movimento e rilievi georeferenziati GNSS: dal campo a nuvole di punti e elaborati pronti per progetto, pratiche e cantiere.",
    ctaHref: "/topografia",
    ctaLabel: "Scopri i rilievi",
  },
  {
    src: a("survey-site.jpg"),
    alt: "Progettazione del verde — vigneti e territorio, Franciacorta",
    line1: "Progettazione\u00A0del\u00A0verde",
    line2: "vigneti · parchi · territorio",
    body: "Vigneti in Franciacorta, parchi, sentieri e strade di montagna: progettazione integrata con supporto agronomico e attenzione al paesaggio colturale.",
    ctaHref: "/servizi#verde-paesaggio",
    ctaLabel: "Verde e paesaggio",
  },
  {
    src: a("technical-docs.jpg"),
    alt: "Pratiche edilizie e urbanistica — geometra Cazzago San Martino",
    line1: "Edilizia e urbanistica",
    line2: "pratiche · sanatorie · cantiere",
    body: "Piani regolatori, sanatorie, iter edilizi e coordinamento sicurezza in cantiere (CSP/CSE): un riferimento unico per committenti privati e aziende.",
    ctaHref: "/servizi#urbanistica-pratiche",
    ctaLabel: "Pratiche edilizie",
  },
  {
    src: a("pointcloud-data.jpg"),
    alt: "Nuvola di punti e dati 3D — rilievi digitali e documentazione tecnica",
    line1: "Nuvola di punti",
    line2: "dalla scansione agli elaborati",
    body: "Acquisizione rapida con laser scanner SLAM, restituzione in formati operativi: nuvole dense, sezioni, CAD e modelli BIM pronti per il progettista.",
    ctaHref: "/laser-scanner-slam",
    ctaLabel: "Laser scanner SLAM",
  },
  {
    src: a("design-drawings.jpg"),
    alt: "Progettazione architettonica — Studio Tecnico Pagnoni",
    line1: "Progettazione architettonica",
    line2: "concept · direzione lavori · BIM",
    body: "Dal concept alla consegna: progettazione completa con coordinamento delle discipline, gestione dell'iter autorizzativo e assistenza in fase esecutiva.",
    ctaHref: "/servizi#architettura",
    ctaLabel: "Architettura",
  },
] as const;

export const homeChiSiamoImages = {
  team: {
    src: a("chi-siamo-slam-hero.jpg"),
    alt: "Operatore con scanner SLAM — nuvola di punti in tempo reale, Studio Tecnico Pagnoni",
  },
  cantiere: {
    src: a("total-station-field.jpg"),
    alt: "Stazione totale in uso sul cantiere — rilievi planoaltimetrici, Brescia",
  },
} as const;

export const chiSiamoPageImage = {
  src: a("handheld-slam-road.jpg"),
  alt: "Handheld SLAM 3D — acquisizione in movimento per rilievi e scansioni",
} as const;

export const projectPreview = [
  {
    href: "/progetti/territorio-verde",
    title: "Territorio e paesaggio",
    caption: "Territorio e paesaggio viticolo",
    image: a("survey-site.jpg"),
    alt: "Rilievi sul territorio e restituzioni — topografia e misure sul campo",
  },
  {
    href: "/progetti/rilievi-digitalizzazione",
    title: "Rilievi e digitalizzazione",
    caption: "Rilievi e digitalizzazione",
    image: a("pointcloud-data.jpg"),
    alt: "Rilievi topografici e laser scanner SLAM — nuvole di punti e rilievi GNSS",
  },
  {
    href: "/progetti/edilizia-urbanistica",
    title: "Edilizia e urbanistica",
    caption: "Edilizia e pratiche",
    image: a("technical-docs.jpg"),
    alt: "Documentazione tecnica ed elaborati — pratiche e iter edilizio",
  },
] as const;
