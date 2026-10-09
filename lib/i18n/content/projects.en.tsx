import type { ReactNode } from "react";
import { VideoFigure } from "@/components/content/VideoFigure";
import type {
  CaseStudyKey,
  ProjectArchiveEntry,
  ProjectArea,
  ProjectCasePreview,
} from "@/lib/content/projects";
import { projectAreas } from "@/lib/content/projects";
import { projectMedia } from "@/lib/media/assetPaths";
import { projectAsset, projectVideoAsset } from "@/lib/media/mediaPath";
import { ui } from "@/lib/ui";

const { allevamento: all, cantina: vin, terreno: ter } = projectMedia;
const cover = (dir: string, base: string) => projectAsset(`${dir}/${base}.webp`);
const video = (dir: string, base: string, ext: "mp4" | "webm") => projectVideoAsset(dir, base, ext);

export const projectCategoriesEn: Record<
  ProjectArea,
  {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    intro: ReactNode;
    cases: ProjectCasePreview[];
  }
> = {
  "rilievi-digitalizzazione": {
    metaTitle: "Architecture, surveying and SLAM laser — case studies",
    metaDescription:
      "Case studies in surveying, SLAM laser scanning and metric bases for architectural design in Franciacorta, the province of Brescia and Lombardy.",
    heading: "Surveys and digitisation",
    intro: (
      <>
        <p className={`${ui.body} mb-4`}>
          Surveying underpins design decisions: we use <strong>GPS/GNSS</strong>, <strong>total station</strong> and{" "}
          <strong>SLAM laser scanning</strong> for planimetric/altimetric deliverables, sections, volumes and point-cloud models for
          architecture, industry and construction.
        </p>
        <p className={ui.body}>
          <strong>SLAM</strong> (Simultaneous Localization and Mapping) enables fast capture in complex spaces, with continuous paths that
          produce dense clouds for design, as-built documentation and client communication.
        </p>
      </>
    ),
    cases: [
      {
        slug: "allevamento-appianti-slam",
        title: "Livestock facility — 3D SLAM survey",
        caption: "Livestock · SLAM",
        cover: cover(all.dir, all.cover),
        alt: "3D SLAM survey in a livestock facility — province of Brescia, metric base for design",
        href: "/progetti/rilievi-digitalizzazione/allevamento-appianti-slam",
      },
      {
        slug: "cantina-franciacorta-slam",
        title: "Winery — 3D SLAM survey",
        caption: "Winery · SLAM",
        cover: cover(vin.dir, vin.cover),
        alt: "3D SLAM survey in a winery — Franciacorta, Brescia, support for architecture and plant",
        href: "/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam",
      },
      {
        slug: "rilievo-terreno-erbusco-brescia",
        title: "Plot in Erbusco — SLAM survey",
        caption: "Plot · Erbusco · SLAM",
        cover: cover(ter.dir, ter.cover),
        alt: "3D survey of a plot in Erbusco (BS) — existing conditions for design and landscape",
        href: "/progetti/rilievi-digitalizzazione/rilievo-terreno-erbusco-brescia",
      },
    ],
  },
};

export function listArchivedProjectsEn(): ProjectArchiveEntry[] {
  return projectAreas.flatMap((area) =>
    projectCategoriesEn[area].cases.map((c) => ({
      ...c,
      area,
      areaLabel: projectCategoriesEn[area].heading,
    })),
  );
}

export const featuredProjectsEn = [
  {
    area: "rilievi-digitalizzazione" as const,
    slug: "cantina-franciacorta-slam",
    caption: "Winery in Franciacorta — SLAM",
    cover: cover(vin.dir, vin.cover),
    alt: "3D SLAM survey in a winery — Franciacorta, Brescia, support for architecture and plant",
    href: "/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam",
    label: "SLAM laser",
  },
  {
    area: "rilievi-digitalizzazione" as const,
    slug: "rilievo-terreno-erbusco-brescia",
    caption: "Plot in Erbusco — SLAM survey",
    cover: cover(ter.dir, ter.cover),
    alt: "3D survey of a plot in Erbusco (BS) — existing conditions for design and landscape",
    href: "/progetti/rilievi-digitalizzazione/rilievo-terreno-erbusco-brescia",
    label: "Territory",
  },
  {
    area: "rilievi-digitalizzazione" as const,
    slug: "allevamento-appianti-slam",
    caption: "Livestock facility — 3D SLAM survey",
    cover: cover(all.dir, all.cover),
    alt: "3D SLAM survey in a livestock facility — province of Brescia, metric base for design",
    href: "/progetti/rilievi-digitalizzazione/allevamento-appianti-slam",
    label: "SLAM laser",
  },
];

export const projectCaseStudiesEn: Record<
  CaseStudyKey,
  {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    body: ReactNode;
    gallery: { src: string; alt: string }[];
  }
> = {
  "rilievi-digitalizzazione/allevamento-appianti-slam": {
    metaTitle: "Livestock facility — 3D SLAM survey in the province of Brescia",
    metaDescription:
      "Case study: SLAM laser scanning in a livestock environment for as-built documentation and a metric base for design and works. Province of Brescia, Lombardy.",
    heading: "Livestock facility — 3D SLAM survey in an operational setting",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          In a livestock context, documenting existing conditions must be fast and readable: routes, clearances, service areas and technical
          passages. <strong>SLAM laser scanning</strong> enables continuous capture indoors, cutting time on site and repeat visits.
        </p>
        <p className={`${ui.body} mb-6`}>
          Typical outputs: a <strong>point cloud</strong> for archive and exchange, extracted sections/plans, and support material for works and
          checks. The video shows a 3D scan path captured on the move.
        </p>
        <VideoFigure
          mp4={video(all.dir, all.video, "mp4")}
          webm={video(all.dir, all.video, "webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--card)]"
        />
        <p className={ui.body}>
          Where the scan must tie to design coordinates or control points, we integrate <strong>GNSS RTK</strong> and total station as needed.
        </p>
      </>
    ),
    gallery: [{ src: cover(all.dir, all.cover), alt: "3D SLAM survey in a livestock facility — province of Brescia" }],
  },
  "rilievi-digitalizzazione/cantina-franciacorta-slam": {
    metaTitle: "Winery in Franciacorta — 3D SLAM survey for architecture and plant",
    metaDescription:
      "Case study: SLAM laser scanning in a Franciacorta winery (Brescia) for as-built, layout and support to architectural and plant design.",
    heading: "Winery — 3D SLAM scanning in Franciacorta",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          3D survey in a wine-production setting: production and service spaces, routes, clearances and plant rooms.{" "}
          <strong>SLAM</strong> capture allows continuous scanning with coverage checks — useful when a shared metric base is needed before
          layout or plant changes.
        </p>
        <p className={`${ui.body} mb-6`}>
          The survey was carried out at one of the leading wine estates in <strong>Franciacorta</strong>.
        </p>
        <VideoFigure
          mp4={video(vin.dir, vin.video, "mp4")}
          webm={video(vin.dir, vin.video, "webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--card)]"
          videoClassName="relative z-10 h-full w-full object-cover object-[center_60%] pointer-events-auto"
        />
        <p className={ui.body}>
          Possible deliverables: cloud in <strong>E57/LAS</strong>, CAD extractions (DWG/DXF) and, when required, support for BIM workflows.
        </p>
      </>
    ),
    gallery: [{ src: cover(vin.dir, vin.cover), alt: "3D SLAM survey in a winery — Franciacorta, province of Brescia" }],
  },
  "rilievi-digitalizzazione/rilievo-terreno-erbusco-brescia": {
    metaTitle: "Plot in Erbusco (BS) — SLAM survey for design and landscape",
    metaDescription:
      "Case study: 3D scan of a plot in Erbusco (BS), Franciacorta, for existing conditions, agronomic support and landscape design.",
    heading: "Plot in Erbusco — SLAM survey",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          3D scan of a plot in <strong>Erbusco (BS)</strong>, Franciacorta, as a base for{" "}
          <strong>existing-condition survey</strong> ahead of agronomic works and <strong>landscape design</strong>.
        </p>
        <p className={`${ui.body} mb-6`}>
          Goal: a readable metric picture of slopes, banks, vegetation and site limits, integrable with technical drawings (sections, contours,
          design sheets) and optional topographic checks.
        </p>
        <VideoFigure
          mp4={video(ter.dir, ter.video, "mp4")}
          webm={video(ter.dir, ter.video, "webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--card)]"
        />
        <p className={ui.body}>
          Depending on the brief, we deliver a 3D cloud or CAD drawings with levels, sections and a short summary.
        </p>
      </>
    ),
    gallery: [{ src: cover(ter.dir, ter.cover), alt: "3D survey of a plot in Erbusco (BS) — existing conditions for design" }],
  },
};
