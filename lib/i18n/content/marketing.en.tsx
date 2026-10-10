import type { ReactNode } from "react";
import { STUDIO_FOUNDED_YEAR } from "@/lib/content";

export const homeChiSiamoEn = {
  title: "About us",
  short: (
    <>
      Architecture practice active <strong>since {STUDIO_FOUNDED_YEAR}</strong> in{" "}
      <strong>Bornato, Cazzago San Martino (BS)</strong>. We combine architecture, surveying, SLAM laser
      scanning and technical procedures to turn design, field surveys and territory into usable deliverables.
      <br />
      Every brief is followed end to end: fieldwork, data checks, documentation and design support.
    </>
  ) as ReactNode,
  shortMobile: (
    <>
      Architecture practice since {STUDIO_FOUNDED_YEAR} in Bornato, Franciacorta.
      <br />
      Architecture, surveying and SLAM laser scanning — from site capture to working drawings.
    </>
  ) as ReactNode,
  highlights: [
    {
      label: "Architecture: concept, design and coordination of disciplines",
      labelMobile: "Architecture and design coordination",
    },
    {
      label: "GNSS RTK, total station and SLAM laser surveys",
      labelMobile: "GNSS, total station and SLAM surveys",
    },
    {
      label: "Point clouds, CAD/BIM and technical documentation",
      labelMobile: "Point clouds, CAD and BIM",
    },
    {
      label: "Planning, landscape, procedures and site safety · Franciacorta and Northern Italy",
      labelMobile: "Procedures, safety and territory",
    },
  ],
};

export const homeStrumentazioneEn = {
  title: "Equipment",
  lede: (
    <>
      Mobile <strong>SLAM laser scanning</strong> is the backbone of our site surveys: current hardware for
      point clouds and fast 3D documentation of buildings and complex sites. GNSS RTK and total station remain
      available when the brief requires them.
    </>
  ) as ReactNode,
  items: [
    {
      label: "SLAM laser scanner",
      text: "Mobile capture: continuous paths, dense point clouds and traceability for drawings and 3D models.",
    },
    {
      label: "GNSS RTK",
      text: "Planimetric and altimetric coordinates for large areas and control points.",
    },
    {
      label: "Total station",
      text: "Detail surveys and construction sites, including where satellite signal is weak.",
    },
  ],
};

export const serviceGroupsEn = [
  {
    id: "architettura",
    kicker: "Concept · Design · Delivery",
    title: "Architecture",
    description:
      "Full architectural design: from concept to construction drawings, coordinating surveys, planning and site works. Arch. Davide Pagnoni follows the building process alongside measurement and statutory procedures.",
    points: [
      "Concept, preliminary and detailed/construction design for new builds, extensions and renovations.",
      "Coordination with surveying and SLAM laser scanning when a reliable as-built metric base is required.",
      "Alignment with planning constraints and building procedures; structural design by trusted external engineers.",
    ],
    href: "/architettura-franciacorta",
    cta: "Explore architecture",
  },
  {
    id: "topografia-rilievi",
    kicker: "Surveying · Geometra",
    title: "Surveying",
    description:
      "Geometra surveying in Franciacorta: plan and height surveys for subdivisions, sites and boundary checks. GNSS RTK and total station for traceable acquisitions.",
    points: [
      "Plan and height surveys for design, construction and technical disputes.",
      "Support for expert reports and valuations when measuring existing conditions is part of the brief.",
    ],
    href: "/topografia",
    cta: "Explore surveying",
  },
  {
    id: "laser-slam",
    kicker: "Point clouds · RS10",
    title: "SLAM laser scanning",
    description:
      "3D documentation of buildings, sheds and plant rooms with dense point clouds: as-built, sections, CAD/BIM and checks in contained timeframes.",
    points: [
      "Mobile indoor/outdoor capture along continuous paths.",
      "Integration with topographic controls where project coordinates are required.",
    ],
    href: "/laser-scanner-slam",
    cta: "Explore SLAM laser scanning",
  },
  {
    id: "verde-paesaggio",
    kicker: "Landscape · Vineyards",
    title: "Landscape design",
    description:
      "Landscape design and modelling for vineyards, parks, mountain roads, trails and regeneration schemes, including agronomic support where needed.",
    points: [
      "In Franciacorta, established landscape design collaborations with wine estates.",
    ],
    href: "/servizi#verde-paesaggio",
    cta: null as string | null,
  },
  {
    id: "urbanistica-pratiche",
    kicker: "Planning · Procedures",
    title: "Planning and building procedures",
    description:
      "Reading of planning instruments, regularisations and building procedures with document coordination towards public authorities.",
    points: [
      "Reading of municipal and supra-municipal plans.",
      "Regularisations where statutory requirements are met.",
      "Building procedures (SCIA, CILA, permits where applicable).",
    ],
    href: "/servizi#urbanistica-pratiche",
    cta: null as string | null,
  },
  {
    id: "sicurezza-assistenza",
    kicker: "CSP · CSE · Reports",
    title: "Site safety and technical advice",
    description:
      "Site safety coordination and technical advice linked to property, expert reports and consultancy.",
    points: [
      "Safety coordination in design and construction phases (CSP and CSE).",
      "Property advice, expert reports, valuations and technical consultancy.",
    ],
    href: "/servizi#sicurezza-assistenza",
    cta: null as string | null,
  },
] as const;

export const certificationsEn = [
  {
    title: "Architecture",
    text: "Architectural design from concept to construction drawings: preliminary, detailed and construction stages, building procedures and coordination of design and site disciplines.",
  },
  {
    title: "Planning",
    text: "Reading of planning instruments, building procedures and regularisations where applicable, with document coordination with public authorities.",
  },
  {
    title: "Site safety",
    text: "Safety coordination in design and construction phases (CSP and CSE).",
  },
  {
    title: "Surveying and geomatics",
    text: "Use of GNSS, total station and SLAM laser scanning for certifiable surveys and digital documentation.",
  },
  {
    title: "Specialist network",
    text: "Qualified network: collaboration with agronomists for landscape work and engineers for structural aspects, according to the brief.",
  },
];

export const chiSiamoPageEn = {
  paragraphs: [
    `Studio Architettura Pagnoni is an architecture and surveying practice based in Bornato, Cazzago San Martino (BS), in Franciacorta. Active since ${STUDIO_FOUNDED_YEAR}, Geometra Sergio Pagnoni and Architetto Davide Pagnoni work together on territory, buildings and high-precision surveys.`,
    "We do not provide structural design in-house: when required we involve trusted external engineers, keeping our focus on architecture, surveying, laser scanning, landscape and statutory procedures.",
    "Our aim is to be a reliable reference for architecture, surveying and SLAM laser scanning in the province of Brescia and Northern Italy — with professional equipment (GNSS, total station, SLAM) and careful technical documentation. We work continuously across Franciacorta, Valle Trompia, the Brescia hinterland and, by appointment, across Lombardy and Northern Italy.",
  ],
};

export const homeZoneEn = {
  title: "Where we work",
  subtitle: "Franciacorta, province of Brescia and Northern Italy",
  footer:
    "For timing and availability in your area, get in touch. Explore SLAM laser surveys in the province of Brescia and Lombardy, or the surveying page. For architecture practices and firms we also offer outsourced 3D surveys.",
};

export const homeProcessEn = {
  title: "From field to deliverables",
  steps: [
    {
      kicker: "Capture",
      title: "SLAM on the move",
      body: "Continuous capture in complex spaces: corridors, plant rooms, dense volumes.",
    },
    {
      kicker: "Metric control",
      title: "GNSS and network",
      body: "RTK georeferencing and plan/height checks with defined tolerances.",
    },
    {
      kicker: "Delivery",
      title: "Deliverables",
      body: "Point cloud, sections, CAD/BIM and drawings ready for site and client.",
    },
  ],
};

export const homeCertsEn = {
  title: "Professional capabilities",
};

export const homeContactEn = {
  title: "Contact",
  email: "Email",
  phone: "Phone",
  office: "Office",
  formTitle: "Let’s talk about your project",
  formLede: "Site visit, quotation or technical advice: write to us for an initial assessment.",
};
