import type { SlamLandingContent } from "@/lib/content/laserSlamLanding";
import { imageAlt } from "@/lib/config/seo";
import { stockImages } from "@/lib/media/assetPaths";
import { stockImage } from "@/lib/media/mediaPath";

const deliverables = [
  { format: "E57 / LAS / LAZ", use: "Georeferenced point cloud for archive, checks and Scan-to-BIM." },
  { format: "DWG / DXF", use: "Plans, sections and elevations for design and site." },
  { format: "BIM support", use: "Point-cloud base and coordination for existing-condition models." },
  { format: "Field report", use: "Coverage notes, tolerances and delivery checklist." },
] as const;

const workflow = [
  {
    title: "Brief and access",
    body: "We define objective, outputs and site constraints before mobilisation.",
  },
  {
    title: "Mobile capture",
    body: "SLAM paths indoor/outdoor with on-site coverage checks before closing the survey.",
  },
  {
    title: "Processing",
    body: "Registration, cleaning and georeferencing aligned to the agreed coordinate frame.",
  },
  {
    title: "Delivery",
    body: "E57/DWG/BIM and notes ready for design, facility or construction teams.",
  },
] as const;

const comparison = {
  headers: ["Topic", "Mobile SLAM", "Static scanner"] as const,
  rows: [
    ["Speed on large volumes", "High — continuous paths", "Lower — many stations"],
    ["Indoor / outdoor continuity", "Strong", "Weaker without many setups"],
    ["Millimetre detail on small areas", "Good for as-built / design", "Often preferred"],
    ["Typical use", "Buildings, sheds, plant rooms", "Fine detail on fixed spots"],
  ] as const,
};

/** English content for `/en/laser-scanner-slam`. */
export const laserSlamLandingEn = {
  path: "/laser-scanner-slam",
  metaTitle: "SLAM laser scanning — as-built and point clouds",
  metaDescription:
    "SLAM laser surveys: point clouds, as-built and CAD/BIM for architecture and industrial buildings. Franciacorta and Brescia. Request a quote.",
  hero: {
    eyebrow: "Mobile laser scanning",
    title: "SLAM laser surveys",
    lede: "Point clouds and as-built documentation for architectural design, buildings, sheds and plant rooms — CHCNAV RS10.",
  },
  introHeading: "SLAM laser scanning: measure in 3D before you design",
  introLead:
    "Before you design or renovate, you need to know how the building or shed really is. With SLAM laser surveying we measure spaces quickly and accurately, and deliver plans, sections and 3D data ready for designers and site teams.",
  instrumentNote:
    "We use a handheld instrument (CHCNAV RS10) that works outdoors and indoors — even where GPS is weak — so one visit can document the whole site.",
  introImage: {
    src: stockImage(stockImages.strumentiGeometraArchitetto),
    alt: imageAlt("Survey and laser equipment — surveyor and architect in the office", {
      service: "slam",
    }),
  },
  instrumentPoints: [
    "GNSS RTK, LiDAR and visual SLAM on one platform: a single instrument from outdoors to indoors.",
    "Outdoor / indoor continuity and areas with weak satellite signal (SFix rover).",
    "Real-time SLAM: coverage checks on site before closing the survey.",
    "Up to about 320,000 points/s, 360° field of view, compact unit (~1.9 kg), IP64.",
  ],
  instrumentImage: {
    src: stockImage(stockImages.chcnavRs10),
    alt: imageAlt("CHCNAV RS10 SLAM laser scanner on transport case", {
      service: "slam",
    }),
  },
  sectorsIntro:
    "SLAM surveying is built for design studios, contractors, facility teams and clients who need reliable geometry of existing conditions.",
  sectors: [
    {
      title: "Buildings and renovations",
      body: "Full surveys before design: plans, sections and levels from a dense cloud — fewer variations and misunderstandings on site.",
    },
    {
      title: "Industry and logistics",
      body: "Sheds, warehouses and plants: mobile capture over large floorplates, as-built documentation and clearance checks.",
    },
    {
      title: "Plant rooms and technical spaces",
      body: "MEP corridors, machine rooms, routes and clashes: complete geometry where traditional survey is slow or incomplete.",
    },
    {
      title: "Heritage and historic property",
      body: "Complex interiors and façades: continuous scanning with on-site coverage checks.",
    },
    {
      title: "Integrated surveying",
      body: "Links to GNSS RTK and total station so the 3D model aligns with design, cadastral and site coordinates.",
    },
  ],
  areaHeading: "Where we work",
  areaBody:
    "Office in Cazzago San Martino (BS), Franciacorta. Rapid response across the province of Brescia; by appointment in Lombardy and Northern Italy. See also the local landing pages.",
  areaPlaces: [
    "Franciacorta and province of Brescia",
    "Lombardy (by appointment)",
    "Northern Italy for structured briefs",
  ],
  relatedLandings: [
    { label: "SLAM laser surveys in Brescia", href: "/rilievi-laser-scanner-slam-brescia" },
    { label: "SLAM laser surveys in Lombardy", href: "/rilievi-laser-scanner-slam-lombardia" },
    { label: "3D surveys for architecture studios", href: "/rilievi-3d-per-studi-di-architettura" },
  ],
  projectsIntro: "Examples of SLAM laser scanning and 3D documentation: mobile capture and working deliverables.",
  deliverables,
  workflow,
  comparison,
  faq: [
    {
      q: "How much does a SLAM laser survey cost?",
      a: "Quotations vary by case (area, floors, access, travel and delivery formats). As a guide, for a flat of about 100 m² on a single floor, survey plus drawings and report is around €1,000. Tell us location and objective for a no-obligation proposal.",
    },
    {
      q: "What accuracy can I expect?",
      a: "In the manufacturer’s stated operating conditions, the RS10 platform indicates around 5 cm absolute accuracy combining RTK, laser and visual SLAM. Actual accuracy depends on environment, extent and objective: we define tolerances and checks in the quotation.",
    },
    {
      q: "How long on site for a warehouse?",
      a: "It depends on floor area, access and detail. On a logistics shed of about 8,000 m², one day of capture can cover the useful volume; processing and delivery follow the schedule agreed in the offer.",
    },
    {
      q: "Can I receive only the point cloud?",
      a: "Yes. We deliver georeferenced E57/LAS/LAZ as a stand-alone product. If the designer needs plans or a model, we add DWG/DXF or BIM support in the same commission.",
    },
    {
      q: "Do you work only in the province of Brescia?",
      a: "Franciacorta and the province of Brescia are our primary area. By appointment we also survey in Lombardy and Northern Italy — see the dedicated pages or give town and area in the contact form.",
    },
    {
      q: "How does mobile SLAM compare with a static scanner?",
      a: "Mobile SLAM (RS10) cuts time and setup on buildings, sheds and continuous indoor/outdoor paths. A static scanner remains preferable for millimetre detail on small fixed areas. In the brief we choose or combine methods to suit the objective.",
    },
  ],
  ctaHeading: "Quote for a SLAM laser survey",
  ctaBody:
    "Share location, approximate area and required outputs (cloud, DWG, BIM): we reply with timing and a tailored quotation.",
  jsonLd: {
    serviceName: "SLAM laser surveys",
    alternateNames: [
      "SLAM laser scanning",
      "3D laser survey",
      "Point clouds and as-built",
      "Mobile laser scanning CHCNAV RS10",
    ],
    serviceDescription:
      "Mobile SLAM laser surveys: georeferenced point clouds, as-built, DWG, DXF and BIM support for architecture, sheds, buildings and plant rooms.",
    webpageDescription:
      "Service page for SLAM laser scanning: 3D documentation, as-built and metric base for design in Franciacorta, province of Brescia and Lombardy.",
    breadcrumbName: "SLAM laser scanning",
    areaServed: [
      { type: "Place", name: "Franciacorta" },
      { type: "AdministrativeArea", name: "Province of Brescia" },
      { type: "AdministrativeArea", name: "Lombardy" },
      { type: "AdministrativeArea", name: "Northern Italy" },
    ],
  },
} as const satisfies SlamLandingContent;
