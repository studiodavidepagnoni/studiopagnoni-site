import type { ReactNode } from "react";
import Link from "next/link";

/** Anno di fondazione dello studio. Cambiare qui se mai dovesse variare la data ufficiale. */
export const STUDIO_FOUNDED_YEAR = 1988;

/** Collaborazioni paesaggistiche in ambito viticolo — copy condiviso su servizi, verde e progetti. */
export const franciacortaPaesaggioViticole =
  "In Franciacorta, importanti collaborazioni di progettazione paesaggistica con realtà vinicole.";

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
      Studio tecnico attivo <strong>dal {STUDIO_FOUNDED_YEAR}</strong> a <strong>Bornato, Cazzago San Martino</strong>. Uniamo{" "}
      <strong>topografia</strong>, <strong>laser scanner SLAM</strong> e pratiche tecniche per trasformare rilievi e territorio in elaborati utilizzabili.
      <br />
      Sergio e Davide Pagnoni seguono ogni commessa con continuità: campagna, controllo dati, restituzione e supporto al progetto.
    </>
  ),
  highlights: [
    { label: "Rilievi GNSS RTK, stazione totale e laser SLAM" },
    { label: "Nuvole di punti, CAD/BIM e documentazione tecnica" },
    { label: "Urbanistica, verde, pratiche e sicurezza cantieri" },
    { label: "Franciacorta, Brescia, Lombardia e Nord Italia" },
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
  "Le attività chiave dello studio: misura del territorio, rilievi 3D, pratiche tecniche e supporto alla progettazione.";

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
    href: "/rilievi-laser-scanner-slam-brescia",
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
  "Tre ambiti rappresentativi: paesaggio viticolo, rilievi e digitalizzazione, edilizia e pratiche tecniche.";

export const progettiIndexIntro =
  "Una selezione di ambiti ricorrenti: paesaggio viticolo, rilievi digitali e pratiche edilizie. Ogni scheda racconta il tipo di problema affrontato, più che un semplice elenco di immagini.";

export const certificationsIntro =
  "Attività svolte da professionisti abilitati, con responsabilità tecnica e rete di specialisti quando la commessa lo richiede.";

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
      Lo <strong>Studio Tecnico Pagnoni</strong> opera <strong>dal {STUDIO_FOUNDED_YEAR}</strong> sul territorio bresciano, tra misura, edilizia e
      progettazione. La continuità con clienti, imprese e altri studi è rimasta la stessa; sono cambiati gli strumenti, dalla stazione totale al GNSS RTK,
      fino al laser scanner SLAM e alla restituzione 3D.
    </>,
    <>
      L&apos;identità attuale nasce dall&apos;incontro tra la precisione del geometra e lo sguardo dell&apos;architetto: rilievo, regole urbanistiche,
      pratiche edilizie e progetto vengono letti come parti della stessa commessa, non come passaggi isolati.
    </>,
    <>
      L&apos;investimento sulla <strong>strumentazione geomatica</strong> risponde a una richiesta concreta: ridurre incertezza e tempi morti. GPS, stazione
      totale e <strong>laser scanner SLAM</strong> permettono di consegnare basi metriche utilizzabili da progettisti, imprese e committenti.
    </>,
    <>
      Nel settore del <strong>verde</strong> collaboriamo con agronomi di fiducia per interventi su vigneti, parchi e percorsi. In{" "}
      <strong>Franciacorta</strong>, importanti collaborazioni di progettazione paesaggistica con realtà vinicole, nel rispetto delle esigenze
      paesaggistiche e produttive.
    </>,
  ],
};
