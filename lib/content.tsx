import type { ReactNode } from "react";
import Link from "next/link";

/** Anno di fondazione dello studio. Cambiare qui se mai dovesse variare la data ufficiale. */
export const STUDIO_FOUNDED_YEAR = 1988;

/** Collaborazioni paesaggistiche in ambito viticolo — copy condiviso su servizi, verde e progetti. */
export const franciacortaPaesaggioViticole =
  "In Franciacorta, importanti collaborazioni di progettazione paesaggistica con realtà vinicole.";

export const homeAiSummary = {
  title: "Rilievi laser scanner SLAM e topografia — Franciacorta, Brescia",
  paragraphs: [
    "Studio Tecnico Pagnoni a Cazzago San Martino (BS), frazione Bornato: rilievi con laser scanner SLAM mobile e nuvole di punti georiferite per capannoni, edifici, impianti e cantieri, affiancati da topografia GNSS RTK e stazione totale. Interventi in Franciacorta, provincia di Brescia, Lombardia e Nord Italia per imprese, studi tecnici e committenti strutturati.",
    "Oltre ai rilievi digitali: progettazione del verde (vigneti e territorio collinare), urbanistica e pratiche edilizie, architettura, coordinamento sicurezza cantieri (CSP/CSE) e perizie. Attivi dal 1988.",
    "Per preventivi e sopralluoghi: studio@pagnoni-s.com — Via Vittorio Emanuele III 16, 25046 Cazzago San Martino (BS).",
  ],
} as const;

export type homeChiSiamoBlock = {
  text: ReactNode;
  image: "team" | "cantiere";
};

export const homeChiSiamo: {
  title: string;
  intro: string;
  short: ReactNode;
  highlights: { label: string }[];
  blocks: homeChiSiamoBlock[];
} = {
  title: "Chi siamo",
  intro: "Un team multidisciplinare per territorio, edilizia e rilievi 3D.",
  short: (
    <>
      Attivo <strong>dal {STUDIO_FOUNDED_YEAR}</strong> su <strong>topografia e rilievi geomatici</strong> (GNSS RTK, stazione totale, laser scanner
      SLAM), <strong>progettazione</strong> del verde e architettonica, <strong>urbanistica</strong> e <strong>pratiche edilizie</strong>. Sede nella{" "}
      <strong>frazione Bornato</strong> di <strong>Cazzago San Martino</strong> (provincia di <strong>Brescia</strong>).
      <br />
      Il <strong>Geometra Sergio Pagnoni</strong> e l&apos;<strong>Architetto Davide Pagnoni</strong> seguono ogni commessa con continuità — dalla campagna
      agli elaborati finiti. <strong>In ambito edilizio e urbanistico</strong>:{" "}
      <strong>coordinamento della sicurezza in cantiere</strong> (CSP/CSE), <strong>assistenza immobiliare</strong> e <strong>perizie</strong>.
    </>
  ),
  highlights: [
    { label: "Rilievi GNSS RTK · laser scanner SLAM · stazione totale" },
    { label: "Progettazione verde, architettura, urbanistica e pratiche" },
    { label: "Sicurezza cantieri CSP/CSE · assistenza immobiliare e perizie" },
    { label: "Franciacorta · Valle Trompia · Lombardia e Nord Italia" },
  ],
  blocks: [
    {
      text: (
        <>
          Lo <strong>Studio Tecnico Pagnoni</strong> è uno studio di ingegneria con sede a <strong>Cazzago San Martino</strong> (provincia di{" "}
          <strong>Brescia</strong>, <strong>Franciacorta</strong> e raggio su <strong>Lombardia</strong> e <strong>Nord Italia</strong>):{" "}
          <strong>Geometra Sergio Pagnoni</strong> e <strong>Architetto Davide Pagnoni</strong> lavorano in sinergia su progetti di territorio, edilizia e
          rilievi ad alta precisione. Non svolgiamo <strong>progettazione strutturale</strong>: quando necessario ci avvaliamo di collaboratori esterni,
          in analogia a quanto avviene negli studi di ingegneria strutturale di riferimento, mantenendo il focus su topografia, laser scanner, verde e
          iter autorizzativi.
        </>
      ),
      image: "team",
    },
    {
      text: (
        <>
          Il nostro obiettivo è essere un <strong>punto di riferimento per topografia e laser scanner SLAM</strong> in provincia di Brescia e nel Nord
          Italia, con strumentazione allineata al mercato professionale (GNSS, stazione totale, sistema SLAM) e attenzione alla qualità della
          documentazione tecnica. Operiamo con continuità su <strong>Franciacorta</strong>, <strong>Valle Trompia</strong>, hinterland bresciano e, su
          commessa, in Lombardia e Nord Italia.
        </>
      ),
      image: "cantiere",
    },
  ],
};

export const homeServiziIntro =
  "Dal rilievo geomatico alla pratica edilizia: strumenti da uso professionale, competenze su piani regolatori e verde, coordinamento sicurezza cantieri (CSP/CSE), assistenza immobiliare e perizie.";

/** Blocco compatto in home (anchor #strumentazione): SLAM come perno operativo, RTK e stazione a supporto */
export const homeStrumentazione: {
  title: string;
  lede: ReactNode;
  items: readonly { label: string; text: string }[];
} = {
  title: "Strumentazione",
  lede: (
    <>
      Il <strong>laser scanner SLAM</strong> mobile è oggi il perno dei nostri rilievi in campo: strumentazione di nuova acquisizione per{" "}
      <strong>nuvole di punti</strong> e <strong>documentazione 3D</strong> rapida su edifici e siti complessi. A supporto restano{" "}
      <strong>GNSS RTK</strong> e <strong>stazione totale</strong> quando la commessa lo richiede.
    </>
  ),
  items: [
    {
      label: "Laser scanner SLAM",
      text: "Acquisizione mobile: percorsi continui, nuvole di punti dense e tracciabilità per restituzioni e modelli 3D.",
    },
    {
      label: "GNSS RTK",
      text: "Coordinate planoaltimetriche per grandi estensioni e punti di dettaglio.",
    },
    {
      label: "Stazione totale",
      text: "Rilievi di dettaglio e cantieri, anche dove il segnale satellitare è critico.",
    },
  ],
};

export const homeServiceCards = [
  {
    kicker: "GNSS · Stazione totale",
    title: "Topografia e rilievi",
    description:
      "Rilievi planoaltimetrici, GNSS RTK, stazione totale, quotature per frazionamenti e cantieri. Precisione e tracciabilità dei dati.",
    href: "/topografia",
  },
  {
    kicker: "Nuvole di punti · RS10",
    title: "Laser scanner SLAM",
    description:
      "Acquisizione rapida di nuvole di punti e documentazione 3D per edifici, complessi industriali e siti estesi.",
    href: "/laser-scanner-slam",
  },
  {
    kicker: "Paesaggio · Vigneti",
    title: "Progettazione del verde",
    description:
      `Vigneti, parchi, strade di montagna, sentieri e boschi, con supporto agronomico. ${franciacortaPaesaggioViticole}`,
    href: "/servizi#verde-paesaggio",
  },
  {
    kicker: "Piani regolatori · Iter",
    title: "Urbanistica e pratiche edilizie",
    description:
      "Sanatorie, interpretazione dei piani regolatori, iter autorizzativi e assistenza nelle pratiche presso gli enti.",
    href: "/servizi#urbanistica-pratiche",
  },
  {
    kicker: "Concept · Consegna",
    title: "Progettazione architettonica",
    description:
      "Progettazione completa dal concept alla consegna, coordinando le discipline e le fasi del processo edilizio.",
    href: "/servizi#architettura",
  },
  {
    kicker: "CSP · CSE · Perizie",
    title: "Sicurezza cantieri e assistenza immobiliare",
    description:
      "Coordinamento della sicurezza in fase di progettazione ed esecuzione (CSP e CSE). Assistenza immobiliare, perizie e consulenze tecniche collegate.",
    href: "/servizi#sicurezza-assistenza",
  },
] as const;

export const homeProgettiIntro =
  "Alcuni ambiti di lavoro rappresentativi: territorio e paesaggio viticolo, digitalizzazione e rilievi, edilizia e pratiche. La galleria verrà aggiornata progressivamente con i progetti più rappresentativi dello studio.";

export const progettiIndexIntro =
  "I lavori sono organizzati per ambito (verde e territorio, rilievi e digitalizzazione, edilizia) per orientare privati, aziende agricole e studi di progettazione.";

export const certificationsIntro =
  "Le attività sono svolte da professionisti abilitati e nel rispetto degli obblighi deontologici e normativi di settore.";

export const certifications = [
  {
    title: "Urbanistica",
    text: "Lettura di piani regolatori e strumenti urbanistici, pratiche edilizie e sanatorie dove applicabili, coordinamento documentale con gli enti.",
  },
  {
    title: "Sicurezza cantieri",
    text: "Coordinamento della sicurezza in fase di progettazione ed esecuzione (CSP e CSE).",
  },
  {
    title: "Topografia e geomatica",
    text: "Utilizzo di strumentazione GNSS, stazione totale e laser scanner SLAM per rilievi certificabili e documentazione digitale.",
  },
  {
    title: "Rete di specialisti",
    text: "Network di professionisti qualificati: collaborazione con agronomi per gli interventi sul verde e con ingegneri per gli aspetti strutturali, in funzione delle specifiche della commessa.",
  },
] as const;

export const zoneContent = {
  title: "Dove operiamo",
  heading: "Franciacorta, provincia di Brescia e Nord Italia",
};

export const zoneDescription = (
  <>
    La sede in <strong>frazione Bornato</strong> (Cazzago San Martino) è strategica per interventi in{" "}
    <strong>Franciacorta</strong>, <strong>Valle Trompia</strong>, <strong>Lago d&apos;Iseo</strong> e provincia di{" "}
    <strong>Brescia</strong>. Seguiamo commesse in <strong>Lombardia</strong> e, per tipologia di lavoro, in tutto il{" "}
    <strong>Nord Italia</strong>.
  </>
);

export const zoneFooter = (
  <>
    Per verificare tempi e disponibilità sul vostro territorio{" "}
    <Link
      href="/contatti"
      className="font-semibold text-[var(--primary-mid)] underline decoration-[var(--green-border)] underline-offset-2 transition hover:text-[var(--foreground)]"
    >
      contattateci
    </Link>
    : il servizio di topografia e laser scanner può essere programmato anche fuori provincia.
  </>
);

export const contattiIntro =
  "Per preventivi su rilievi, laser scanner SLAM, progettazione del verde, pratiche edilizie, sicurezza cantieri (CSP/CSE), assistenza immobiliare e perizie, scriveteci o chiamate: vi risponderà direttamente il team dello studio.";

/** Statistiche home: numeri animati o blocchi descrittivi. */
export type HomeStat =
  | { mode: "n"; value: number; suffix: string; label: string }
  | { mode: "t"; title: string; subtitle: string };

const yearsActive = Math.max(0, new Date().getFullYear() - STUDIO_FOUNDED_YEAR);

export const homeStats: HomeStat[] = [
  {
    mode: "n",
    value: yearsActive,
    suffix: "+",
    label: `Anni di attività\n· dal ${STUDIO_FOUNDED_YEAR}`,
  },
  { mode: "t", title: "Team multidisciplinare", subtitle: "Topografia · Architettura · CSP/CSE · perizie" },
  { mode: "t", title: "GNSS · Stazione totale · SLAM", subtitle: "Linea strumentale per rilievi professionali" },
  { mode: "t", title: "Franciacorta · Brescia", subtitle: "Radicamento locale e commesse nel Nord Italia" },
];

export const chiSiamoPage = {
  title: "Chi siamo",
  paragraphs: [
    <>
      Lo <strong>Studio Tecnico Pagnoni</strong> opera <strong>dal {STUDIO_FOUNDED_YEAR}</strong>: oltre trent&apos;anni di lavoro sul territorio
      bresciano, tra topografia, edilizia e progettazione. Una continuità di rapporti con clienti, aziende e altri studi, portata avanti oggi con un
      aggiornamento costante di metodi e strumentazione — dalla stazione totale al GPS RTK, fino al laser scanner SLAM e alla modellazione 3D.
    </>,
    <>
      L&apos;identità attuale dello studio si fonda sull&apos;incontro tra la competenza del geometra nella misura del territorio, delle regole
      urbanistiche e delle pratiche edilizie, e la visione dell&apos;architetto nella progettazione integrata degli spazi e del paesaggio costruito:
      due sguardi complementari sulla stessa commessa, dal rilievo all&apos;elaborato finale.
    </>,
    <>
      Il nostro investimento sulla <strong>strumentazione geomatica</strong> (GPS, stazione totale, <strong>laser scanner SLAM</strong>) risponde
      alla richiesta di clienti e progettisti che cercano rilievi rapidi, misure affidabili e modelli utilizzabili in progettazione e restituzione
      grafica.
    </>,
    <>
      Nel settore del <strong>verde</strong> collaboriamo con agronomi di fiducia per interventi su vigneti, parchi e percorsi. In{" "}
      <strong>Franciacorta</strong>, importanti collaborazioni di progettazione paesaggistica con realtà vinicole, nel rispetto delle esigenze
      paesaggistiche e produttive.
    </>,
  ],
};
