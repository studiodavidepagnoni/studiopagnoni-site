import type { ReactNode } from "react";
import { VideoFigure } from "@/components/content/VideoFigure";
import { projectAsset } from "@/lib/media/mediaPath";
import { ui } from "@/lib/ui";

const p = (relPath: string) => projectAsset(relPath);

export const projectAreas = ["rilievi-digitalizzazione"] as const;
export type ProjectArea = (typeof projectAreas)[number];

export function isProjectArea(s: string): s is ProjectArea {
  return (projectAreas as readonly string[]).includes(s);
}

export type ProjectCasePreview = {
  slug: string;
  title: string;
  caption: string;
  cover: string;
  alt: string;
  href: string;
};

export type FeaturedProject = {
  area: ProjectArea;
  slug: string;
  caption: string;
  cover: string;
  alt: string;
  href: string;
  label: string;
};

export const projectCategories: Record<
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
    metaTitle: "Rilievi topografici e laser scanner SLAM",
    metaDescription:
      "Rilievi planoaltimetrici GNSS, stazione totale e laser scanner SLAM — documentazione 3D e nuvole di punti in Lombardia.",
    heading: "Rilievi e digitalizzazione",
    intro: (
      <>
        <p className={`${ui.body} mb-4`}>
          Il rilievo è il fondamento delle decisioni progettuali: utilizziamo <strong>GPS/GNSS</strong>, <strong>stazione totale</strong> e{" "}
          <strong>laser scanner SLAM</strong> per restituzioni planoaltimetriche, sezioni, volumi e modelli a nuvola di punti per architettura,
          industria e cantieristica.
        </p>
        <p className={ui.body}>
          La tecnologia <strong>SLAM</strong> (Simultaneous Localization and Mapping) consente acquisizioni rapide in ambienti complessi, con
          traiettorie continua che generano nuvole dense utili per progettazione, as-built e comunicazione con il cliente.
        </p>
      </>
    ),
    cases: [
      {
        slug: "allevamento-appianti-slam",
        title: "Allevamento — rilievo 3D SLAM (Appianti)",
        caption: "Allevamento · SLAM",
        cover: p("appianti/appiani.png"),
        alt: "Rilievo 3D SLAM di ambiente zootecnico — esempio di progetto",
        href: "/progetti/rilievi-digitalizzazione/allevamento-appianti-slam",
      },
      {
        slug: "cantina-franciacorta-slam",
        title: "Azienda vinicola — rilievo 3D SLAM",
        caption: "Azienda vinicola · SLAM",
        cover: p("azienda-vinicola/azienda-vinicola.png"),
        alt: "Rilievo 3D SLAM in azienda vinicola in Franciacorta — esempio di progetto",
        href: "/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam",
      },
      {
        slug: "rilievo-terreno-maddalena-brescia",
        title: "Terreno - Rilievo SLAM",
        caption: "Terreno · SLAM",
        cover: p("terreno/terreno.png"),
        alt: "Rilievo 3D di terreno per stato di fatto — Maddalena, Brescia",
        href: "/progetti/rilievi-digitalizzazione/rilievo-terreno-maddalena-brescia",
      },
    ],
  },
};

/**
 * Progetti in evidenza per HOME: stile “feed” pulito, pochi testi.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    area: "rilievi-digitalizzazione",
    slug: "cantina-franciacorta-slam",
    caption: "Azienda vinicola in Franciacorta — SLAM",
    cover: p("azienda-vinicola/azienda-vinicola.png"),
    alt: "Rilievo 3D SLAM in azienda vinicola in Franciacorta — esempio di progetto",
    href: "/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam",
    label: "Laser SLAM",
  },
  {
    area: "rilievi-digitalizzazione",
    slug: "rilievo-terreno-maddalena-brescia",
    caption: "Terreno — rilievo SLAM",
    cover: p("terreno/terreno.png"),
    alt: "Rilievo 3D di terreno per stato di fatto — Maddalena, Brescia",
    href: "/progetti/rilievi-digitalizzazione/rilievo-terreno-maddalena-brescia",
    label: "Territorio",
  },
  {
    area: "rilievi-digitalizzazione",
    slug: "allevamento-appianti-slam",
    caption: "Allevamento — rilievo 3D SLAM",
    cover: p("appianti/appiani.png"),
    alt: "Rilievo 3D SLAM di ambiente zootecnico — esempio di progetto",
    href: "/progetti/rilievi-digitalizzazione/allevamento-appianti-slam",
    label: "Laser SLAM",
  },
];

export type CaseStudyKey = `${ProjectArea}/${string}`;

export const projectCaseStudies: Record<
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
    metaTitle: "Allevamento — rilievo 3D SLAM (Appianti)",
    metaDescription:
      "Caso studio (da validare): rilievo 3D con laser scanner SLAM in ambiente zootecnico per documentazione as-built e base metrica operativa. Provincia di Brescia.",
    heading: "Allevamento — rilievo 3D SLAM in ambiente operativo",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          In un contesto di allevamento, la documentazione dello stato di fatto deve essere rapida e leggibile: percorsi, ingombri, aree di servizio e
          passaggi tecnici. Il rilievo con <strong>laser scanner SLAM</strong> consente acquisizione continua negli ambienti, riducendo tempi in campo e
          riprese.
        </p>
        <p className={`${ui.body} mb-6`}>
          Output tipici: <strong>nuvola di punti</strong> per archivio e scambio, estrazione di sezioni/piante, e materiali di supporto per
          interventi e verifiche. Il video in pagina mostra una traccia di scansione 3D acquisita in movimento.
        </p>
        <VideoFigure
          mp4={p("appianti/appiani-registrazione.mp4")}
          webm={p("appianti/appiani-registrazione.webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)]"
        />
        <p className={ui.body}>
          Se serve collegare la scansione a coordinate di progetto o a punti di controllo, integriamo con <strong>GNSS RTK</strong> e stazione totale
          in base al contesto.
        </p>
      </>
    ),
    gallery: [{ src: p("appianti/appiani.png"), alt: "Anteprima rilievo 3D SLAM — ambiente di allevamento" }],
  },
  "rilievi-digitalizzazione/cantina-franciacorta-slam": {
    metaTitle: "Azienda vinicola — rilievo 3D SLAM in Franciacorta",
    metaDescription:
      "Caso studio (da validare): scansione 3D con laser scanner SLAM in azienda vinicola in Franciacorta per documentazione as-built e base metrica per impianti e layout.",
    heading: "Azienda vinicola — scansione 3D SLAM in Franciacorta",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Rilievo 3D in ambito vinicolo: spazi di produzione e servizio, percorsi, ingombri e aree tecniche. L&apos;acquisizione <strong>SLAM</strong>{" "}
          permette una scansione continua con controllo della copertura, utile quando serve una base metrica condivisa prima di modifiche a layout o
          impianti.
        </p>
        <p className={`${ui.body} mb-6`}>
          Il rilievo è stato svolto presso una delle realtà vinicole più importanti del territorio della <strong>Franciacorta</strong>.
        </p>
        <VideoFigure
          mp4={p("azienda-vinicola/azienda-vinicola.cropped.mp4")}
          webm={p("azienda-vinicola/azienda-vinicola.cropped.webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)]"
          videoClassName="relative z-10 h-full w-full object-cover object-[center_60%] pointer-events-auto"
        />
        <p className={ui.body}>
          Consegne possibili: nuvola in <strong>E57/LAS</strong>, estrazioni CAD (DWG/DXF) e, quando richiesto, supporto a flussi BIM.
        </p>
      </>
    ),
    gallery: [
      { src: p("azienda-vinicola/azienda-vinicola.png"), alt: "Rilievo 3D SLAM — azienda vinicola in Franciacorta (anteprima)" },
    ],
  },
  "rilievi-digitalizzazione/rilievo-terreno-maddalena-brescia": {
    metaTitle: "Terreno - Rilievo SLAM",
    metaDescription:
      "Caso studio (da validare): scansione 3D di terreno a Brescia (zona Maddalena) per rilievo dello stato di fatto a supporto di interventi agronomici e progettazione del paesaggio.",
    heading: "Terreno - Rilievo SLAM",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Scansione 3D di un terreno in area urbana (Brescia, zona Maddalena) come base per <strong>rilievo dello stato di fatto</strong> in vista di
          interventi agronomici e di <strong>progettazione del paesaggio</strong>.
        </p>
        <p className={`${ui.body} mb-6`}>
          Obiettivo: una rappresentazione metrica leggibile di pendenze, scarpate, vegetazione e limiti dell&apos;area, integrabile con elaborati tecnici
          (sezioni, curve di livello, tavole di progetto) e con eventuali controlli topografici.
        </p>
        <VideoFigure
          mp4={p("terreno/terreno.mp4")}
          webm={p("terreno/terreno.webm")}
          className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)]"
        />
        <p className={ui.body}>
          In base alle esigenze, il rilievo può essere restituito come nuvola 3D oppure come elaborati CAD con quote, sezioni e sintesi.
        </p>
      </>
    ),
    gallery: [{ src: p("terreno/terreno.png"), alt: "Anteprima rilievo 3D di terreno — Brescia, Maddalena" }],
  },
};

export function getCaseStudyKey(area: ProjectArea, slug: string): CaseStudyKey | null {
  const k = `${area}/${slug}` as CaseStudyKey;
  return k in projectCaseStudies ? k : null;
}
