import type { ReactNode } from "react";
import { withBasePath } from "@/lib/basePath";
import { franciacortaPaesaggioViticole } from "@/lib/content";
import { ui } from "@/lib/ui";

const a = (name: string) => withBasePath(`/assets/stock/${name}`);

export const projectAreas = ["territorio-verde", "rilievi-digitalizzazione", "edilizia-urbanistica"] as const;
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
  "territorio-verde": {
    metaTitle: "Progetti territorio, verde e paesaggio viticolo",
    metaDescription:
      "Progettazione del verde, vigneti e percorsi in Franciacorta e Lombardia — Studio Tecnico Pagnoni, Cazzago San Martino (BS). Provincia di Brescia e Nord Italia.",
    heading: "Territorio e paesaggio",
    intro: (
      <>
        <p className={`${ui.body} mb-4`}>
          Progettazione e modellazione del verde su diversi contesti: <strong>vigneti</strong>, <strong>parchi</strong>,{" "}
          <strong>strade di montagna</strong>, <strong>sentieri</strong> e interventi di riqualificazione forestale, con il supporto di agronomi di
          fiducia quando il progetto richiede competenze specifiche.
        </p>
        <p className={ui.body}>{franciacortaPaesaggioViticole}</p>
      </>
    ),
    cases: [
      {
        slug: "vigneti-e-paesaggio-franciacorta",
        title: "Vigneti e paesaggio — Franciacorta",
        caption: "Vigneti e paesaggio",
        cover: a("survey-site.jpg"),
        alt: "Progettazione vigneti e aree verdi in Franciacorta — Studio Tecnico Pagnoni",
        href: "/progetti/territorio-verde/vigneti-e-paesaggio-franciacorta",
      },
    ],
  },
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
        slug: "capannone-logistico-slam-rs10",
        title: "Capannone logistico — as-built SLAM RS10",
        caption: "Capannone logistico · SLAM",
        cover: a("chi-siamo-slam-hero.jpg"),
        alt: "Rilievo laser SLAM in capannone logistico — acquisizione con CHCNAV RS10",
        href: "/progetti/rilievi-digitalizzazione/capannone-logistico-slam-rs10",
      },
      {
        slug: "rilievi-gnss-e-slam",
        title: "Rilievi GNSS, stazione totale e SLAM",
        caption: "Rilievi e laser SLAM",
        cover: a("gnss-rtk-quarry.jpg"),
        alt: "Servizi di rilievo topografico e laser scanner SLAM — Brescia e Nord Italia",
        href: "/progetti/rilievi-digitalizzazione/rilievi-gnss-e-slam",
      },
      {
        slug: "as-built-impianti-e-interferenze",
        title: "As-built e controllo interferenze — impianti",
        caption: "As-built e interferenze",
        cover: a("survey-instrument-field.jpg"),
        alt: "Rilievo as-built e verifica interferenze su impianti — nuvola di punti e restituzione",
        href: "/progetti/rilievi-digitalizzazione/as-built-impianti-e-interferenze",
      },
      {
        slug: "volumetrie-e-movimento-terra",
        title: "Volumetrie e misure di cantiere",
        caption: "Volumetrie e cantiere",
        cover: a("analysis-dashboard.jpg"),
        alt: "Rilievi per volumetrie, scavi e controllo avanzamento lavori",
        href: "/progetti/rilievi-digitalizzazione/volumetrie-e-movimento-terra",
      },
    ],
  },
  "edilizia-urbanistica": {
    metaTitle: "Urbanistica, architettura e pratiche edilizie",
    metaDescription:
      "Urbanistica, progettazione architettonica, sanatorie e pratiche edilizie — Studio Tecnico Pagnoni, Cazzago San Martino (BS).",
    heading: "Edilizia e urbanistica",
    intro: (
      <>
        <p className={`${ui.body} mb-4`}>
          Affianchiamo privati e imprese in <strong>progettazione architettonica</strong>, interpretazione dei <strong>piani regolatori</strong>,{" "}
          <strong>sanatorie</strong> e pratiche presso gli enti, con attenzione alle norme locali e alle esigenze del committente.
        </p>
        <p className={ui.body}>
          Coordiniamo inoltre la <strong>sicurezza di cantiere</strong> (CSP/CSE) e offriamo <strong>assistenza immobiliare</strong>, perizie e
          consulenze tecniche correlate.
        </p>
      </>
    ),
    cases: [
      {
        slug: "iter-edilizio-e-sicurezza",
        title: "Iter edilizio e coordinamento sicurezza",
        caption: "Pratiche e sicurezza",
        cover: a("technical-docs.jpg"),
        alt: "Urbanistica e pratiche edilizie — geometra e architetto Cazzago San Martino",
        href: "/progetti/edilizia-urbanistica/iter-edilizio-e-sicurezza",
      },
      {
        slug: "rilievo-per-ristrutturazione",
        title: "Rilievo e restituzione per ristrutturazione",
        caption: "Ristrutturazioni",
        cover: a("pointcloud-data.jpg"),
        alt: "Rilievo e restituzione per ristrutturazione — piante e sezioni da nuvola di punti",
        href: "/progetti/edilizia-urbanistica/rilievo-per-ristrutturazione",
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
    slug: "capannone-logistico-slam-rs10",
    caption: "Capannone logistico — as-built SLAM",
    cover: a("chi-siamo-slam-hero.jpg"),
    alt: "Rilievo laser SLAM RS10 in capannone — acquisizione sul campo",
    href: "/progetti/rilievi-digitalizzazione/capannone-logistico-slam-rs10",
    label: "Laser SLAM · RS10",
  },
  {
    area: "rilievi-digitalizzazione",
    slug: "rilievi-gnss-e-slam",
    caption: "SLAM in movimento + GNSS",
    cover: a("gnss-rtk-quarry.jpg"),
    alt: "Rilievi SLAM in movimento e georeferenziazione GNSS — nuvola di punti",
    href: "/progetti/rilievi-digitalizzazione/rilievi-gnss-e-slam",
    label: "Laser SLAM · GNSS",
  },
  {
    area: "rilievi-digitalizzazione",
    slug: "as-built-impianti-e-interferenze",
    caption: "As-built e interferenze",
    cover: a("survey-instrument-field.jpg"),
    alt: "Rilievo as-built e controllo interferenze — impianti e spazi tecnici",
    href: "/progetti/rilievi-digitalizzazione/as-built-impianti-e-interferenze",
    label: "As-Built 3D",
  },
  {
    area: "rilievi-digitalizzazione",
    slug: "volumetrie-e-movimento-terra",
    caption: "Volumetrie e cantiere",
    cover: a("analysis-dashboard.jpg"),
    alt: "Volumetrie e misure di cantiere — controllo avanzamento lavori",
    href: "/progetti/rilievi-digitalizzazione/volumetrie-e-movimento-terra",
    label: "Volumetrie",
  },
  {
    area: "edilizia-urbanistica",
    slug: "rilievo-per-ristrutturazione",
    caption: "Ristrutturazioni",
    cover: a("technical-docs.jpg"),
    alt: "Rilievo e restituzione per ristrutturazione — piante e sezioni",
    href: "/progetti/edilizia-urbanistica/rilievo-per-ristrutturazione",
    label: "Edilizia",
  },
  {
    area: "territorio-verde",
    slug: "vigneti-e-paesaggio-franciacorta",
    caption: "Paesaggio viticolo",
    cover: a("survey-site.jpg"),
    alt: "Territorio e paesaggio viticolo — Franciacorta",
    href: "/progetti/territorio-verde/vigneti-e-paesaggio-franciacorta",
    label: "Verde · Paesaggio",
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
  "territorio-verde/vigneti-e-paesaggio-franciacorta": {
    metaTitle: "Vigneti e paesaggio — Franciacorta",
    metaDescription:
      "Progettazione del verde e modellazione paesaggistica in ambito viticolo — collaborazioni in Franciacorta, Studio Tecnico Pagnoni.",
    heading: "Vigneti, parchi e modellazione del verde",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Progettiamo interventi sul territorio agricolo e forestale che richiedono equilibrio tra <strong>produttività</strong>,{" "}
          <strong>paesaggio</strong> e <strong>normativa</strong>: filari, parchi, viabilità rurale e percorsi escursionistici, anche in coordinamento
          con figure agronomiche per le scelte tecniche e vegetazionali.
        </p>
        <p className={ui.body}>{franciacortaPaesaggioViticole}</p>
      </>
    ),
    gallery: [
      { src: a("survey-site.jpg"), alt: "Rilievi sul territorio — operazioni sul campo" },
      { src: a("topography-tool.jpg"), alt: "Strumentazione e rilievi topografici" },
      { src: a("analysis-dashboard.jpg"), alt: "Sintesi e restituzione dati — elaborati" },
    ],
  },
  "rilievi-digitalizzazione/capannone-logistico-slam-rs10": {
    metaTitle: "Capannone logistico — rilievo as-built SLAM RS10",
    metaDescription:
      "Caso studio: documentazione as-built di capannone logistico con laser scanner SLAM mobile CHCNAV RS10 — nuvola di punti, piante e sezioni. Commessa anonimizzata, hinterland bresciano.",
    heading: "Capannone logistico — documentazione as-built con RS10",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          <strong>Commessa anonimizzata</strong> — hinterland bresciano, 2025. Un&apos;impresa di logistica doveva aggiornare la documentazione metrica
          di un <strong>capannone di circa 8.200 m²</strong> su due livelli (area operativa e uffici tecnici) prima di interventi su impianti e layout
          interno. Obiettivo: base 3D affidabile per progettisti e direzione lavori, senza fermare l&apos;attività oltre le finestre concordate.
        </p>
        <p className={`${ui.body} mb-4`}>
          In <strong>una giornata di acquisizione</strong> con <strong>CHCNAV RS10</strong> abbiamo coperto percorsi continui tra area esterna di
          manovra, corpo capannone e zone ufficio, con controllo in tempo reale sulla copertura della nuvola. Il rilievo topografico di supporto con{" "}
          <strong>GNSS RTK</strong> ha ancorato il modello al sistema di riferimento del committente.
        </p>
        <p className={`${ui.body} mb-4`}>
          In elaborazione: allineamento, pulizia della nuvola e estrazione di <strong>piante quote</strong> e <strong>sezioni</strong> sui livelli
          principali. Consegna in <strong>E57</strong> per archivio interno, <strong>DWG</strong> per lo studio di progettazione e sintesi PDF per la
          direzione impianti.
        </p>
        <p className={ui.body}>
          <strong>Esito:</strong> riduzione dei rilievi manuali in quota, individuazione anticipata di interferenze tra passerelle e nuovi percorsi
          previsti, e un unico riferimento geometrico condiviso tra impresa, progettista e facility. I materiali fotografici di questa pagina sono
          placeholder: verranno sostituiti con immagini reali della commessa.
        </p>
      </>
    ),
    gallery: [
      {
        src: a("chi-siamo-slam-hero.jpg"),
        alt: "Fase 1 — Acquisizione SLAM in capannone: operatore con scanner mobile RS10",
      },
      {
        src: a("pointcloud-data.jpg"),
        alt: "Fase 2 — Nuvola di punti georiferita del capannone logistico",
      },
      {
        src: a("design-drawings.jpg"),
        alt: "Fase 3 — Piante e sezioni da nuvola di punti per progetto impianti",
      },
    ],
  },
  "rilievi-digitalizzazione/rilievi-gnss-e-slam": {
    metaTitle: "Rilievi GNSS e laser scanner SLAM",
    metaDescription:
      "Servizi di topografia professionale e rilievo laser SLAM per nuvole di punti e documentazione 3D — Cazzago San Martino (BS), Franciacorta, provincia di Brescia e Nord Italia.",
    heading: "Rilievi geomatici e laser scanner SLAM",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Eseguiamo rilievi <strong>planoaltimetrici</strong> con <strong>GNSS RTK</strong> e <strong>stazione totale</strong> per cantieri,
          frazionamenti, volumetrie e redazione di mappe di sintesi. Il <strong>laser scanner SLAM</strong> integra la misura tradizionale con
          acquisizioni dense in tempi ridotti, particolarmente utili per edifici complessi, impianti industriali e siti estesi.
        </p>
        <p className={ui.body}>
          I risultati possono essere esportati per software CAD/BIM, elaborazioni fotogrammetriche e controllo delle interferenze progetto-realtà,
          a supporto di progettisti e imprese.
        </p>
      </>
    ),
    gallery: [
      { src: a("gnss-rtk-quarry.jpg"), alt: "GNSS RTK su treppiede — misura e controllo" },
      { src: a("gnss-rover-worker.jpg"), alt: "GNSS RTK rover — posizionamento e misure in campo" },
      { src: a("total-station-field.jpg"), alt: "Stazione totale — misure e tracciamenti" },
      { src: a("pointcloud-data.jpg"), alt: "Dati 3D e nuvola di punti — elaborazione" },
      { src: a("survey-site.jpg"), alt: "Rilievo e operazioni sul campo" },
    ],
  },
  "rilievi-digitalizzazione/as-built-impianti-e-interferenze": {
    metaTitle: "As-built e controllo interferenze",
    metaDescription:
      "Rilievo as-built con nuvola di punti per impianti e ambienti tecnici: base affidabile per verifiche e coordinamento progetto-realtà.",
    heading: "As-built, impianti e verifica interferenze",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Quando gli spazi sono densi di elementi (impianti, passaggi, strutture), un rilievo tradizionale rischia di lasciare “zone grigie”. La
          scansione <strong>SLAM</strong> consente di acquisire rapidamente una base completa.
        </p>
        <p className={ui.body}>
          La nuvola di punti viene pulita e organizzata per una restituzione che supporta <strong>verifiche di ingombro</strong>, as-built e
          comunicazione chiara tra progettisti e impresa.
        </p>
      </>
    ),
    gallery: [
      { src: a("handheld-slam-road.jpg"), alt: "Handheld SLAM 3D — acquisizione in movimento" },
      { src: a("survey-site.jpg"), alt: "Rilievo as-built sul campo — acquisizione" },
      { src: a("pointcloud-data.jpg"), alt: "Geometrie e controllo interferenze — dati 3D" },
      { src: a("analysis-dashboard.jpg"), alt: "Coordinamento e restituzione — elaborazione" },
    ],
  },
  "rilievi-digitalizzazione/volumetrie-e-movimento-terra": {
    metaTitle: "Volumetrie e misure di cantiere",
    metaDescription:
      "Rilievi per volumetrie, scavi e controllo avanzamento lavori: acquisizione rapida e restituzioni utili per computi e stati di avanzamento.",
    heading: "Volumetrie, scavi e controllo di cantiere",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Nei cantieri servono dati rapidi e confrontabili: superfici, quote, volumi e controlli puntuali. In base al contesto integriamo{" "}
          <strong>GNSS RTK</strong> e acquisizioni <strong>SLAM</strong> per ridurre tempi e passaggi.
        </p>
        <p className={ui.body}>
          Il risultato è una base misurabile per <strong>computi volumetrici</strong>, verifiche di avanzamento e report comprensibili anche per chi
          non lavora ogni giorno con dati 3D.
        </p>
      </>
    ),
    gallery: [
      { src: a("survey-site.jpg"), alt: "Cantiere e movimento terra — rilievi" },
      { src: a("topography-tool.jpg"), alt: "Misure e squadra sul campo" },
      { src: a("analysis-dashboard.jpg"), alt: "Report e sintesi volumetrica" },
    ],
  },
  "edilizia-urbanistica/iter-edilizio-e-sicurezza": {
    metaTitle: "Urbanistica, pratiche edilizie e sicurezza cantieri",
    metaDescription:
      "Sanatorie, piani regolatori, progettazione architettonica, CSP e CSE — Studio Tecnico Pagnoni, Cazzago San Martino (BS).",
    heading: "Pratiche edilizie, urbanistica e sicurezza",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Supportiamo i clienti nelle <strong>istanze edilizie</strong> e nelle interpretazioni degli strumenti urbanistici locali, incluse le
          <strong> sanatorie</strong> quando la normativa consente il percorso di regolarizzazione. La progettazione architettonica copre le fasi
          necessarie al completamento dell&apos;iter autorizzativo e alla realizzazione dell&apos;opera.
        </p>
        <p className={ui.body}>
          In fase di realizzazione affianchiamo committenti e imprese con il <strong>coordinamento per la sicurezza</strong> (CSP in progettazione, CSE
          in esecuzione) e con consulenze per stime, perizie e assistenza nelle pratiche immobiliari.
        </p>
      </>
    ),
    gallery: [
      { src: a("technical-docs.jpg"), alt: "Documentazione tecnica e tavole" },
      { src: a("design-drawings.jpg"), alt: "Tavole e progettazione edilizia" },
      { src: a("survey-site.jpg"), alt: "Cantiere e coordinamento lavori" },
    ],
  },
  "edilizia-urbanistica/rilievo-per-ristrutturazione": {
    metaTitle: "Rilievo per ristrutturazione",
    metaDescription:
      "Rilievo e restituzione per ristrutturazioni: base affidabile per piante, sezioni e decisioni progettuali, riducendo incertezze e varianti.",
    heading: "Rilievo e restituzione per ristrutturazioni",
    body: (
      <>
        <p className={`${ui.body} mb-4`}>
          Prima di progettare serve una base solida. Il rilievo supporta decisioni su spazi, ingombri e quote, riducendo imprevisti in fase di
          cantiere.
        </p>
        <p className={ui.body}>
          In funzione del caso, la scansione <strong>SLAM</strong> integra la misura tradizionale e consente una restituzione ordinata per piante,
          sezioni e confronto tra stato di fatto e progetto.
        </p>
      </>
    ),
    gallery: [
      { src: a("topography-tool.jpg"), alt: "Rilievo e misure — base per ristrutturazione" },
      { src: a("technical-docs.jpg"), alt: "Documentazione e tavole — restituzione" },
      { src: a("pointcloud-data.jpg"), alt: "Elaborazione digitale da nuvola di punti" },
    ],
  },
};

export function getCaseStudyKey(area: ProjectArea, slug: string): CaseStudyKey | null {
  const k = `${area}/${slug}` as CaseStudyKey;
  return k in projectCaseStudies ? k : null;
}
