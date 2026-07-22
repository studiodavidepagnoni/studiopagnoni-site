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
  intro: "Sintesi del profilo studio. Biografia, metodo e immagini nella pagina Chi siamo.",
  short: (
    <>
      Studio tecnico attivo <strong>dal {STUDIO_FOUNDED_YEAR}</strong> a <strong>Bornato, Cazzago San Martino</strong>. Uniamo{" "}
      <strong>architettura</strong>, <strong>topografia</strong>, <strong>laser scanner SLAM</strong> e pratiche tecniche per trasformare
      progetto, rilievi e territorio in elaborati utilizzabili.
      <br />
      Lo studio segue ogni commessa con continuità: campagna, controllo dati, restituzione e supporto al progetto.
    </>
  ),
  highlights: [
    { label: "Architettura: concept, progetto e coordinamento delle discipline" },
    { label: "Rilievi GNSS RTK, stazione totale e laser SLAM" },
    { label: "Nuvole di punti, CAD/BIM e documentazione tecnica" },
    { label: "Urbanistica, verde, pratiche e sicurezza cantieri · Franciacorta e Nord Italia" },
  ],
  blocks: [
    {
      text: (
        <>
          Lo <strong>Studio Tecnico Pagnoni</strong> è uno studio di ingegneria con sede a <strong>Cazzago San Martino</strong> (provincia di{" "}
          <strong>Brescia</strong>, <strong>Franciacorta</strong> e raggio su <strong>Lombardia</strong> e <strong>Nord Italia</strong>):{" "}
          <strong>Geometra Sergio Pagnoni</strong> e <strong>Architetto Davide Pagnoni</strong> lavorano in sinergia su progetti di territorio, edilizia e
          rilievi ad alta precisione. Non svolgiamo <strong>progettazione strutturale</strong>: quando necessario ci avvaliamo di collaboratori esterni,
          in analogia a quanto avviene negli studi di ingegneria strutturale di riferimento, mantenendo il focus su architettura, topografia, laser scanner, verde e
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
  "Anteprima degli ambiti principali. Schede, approfondimenti e FAQ nella pagina Servizi.";

/** Blocco compatto in home: SLAM come perno operativo, RTK e stazione a supporto */
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

/** Gruppi servizio: home (anteprima) e pagina Servizi (schede complete).
 * Ordine brand: Architettura → Topografia → Laser Scanning, poi gli altri ambiti. */
export const serviceGroups = [
  {
    id: "architettura",
    kicker: "Concept · Progetto · Consegna",
    title: "Architettura",
    description:
      "Progettazione architettonica completa: dal concept alle tavole esecutive, con coordinamento di rilievi, urbanistica e cantiere. Arch. Davide Pagnoni segue le fasi del processo edilizio in continuità con misura e pratiche.",
    points: [
      "Concept, anteprogetto e progetto definitivo/esecutivo per nuove costruzioni, ampliamenti e ristrutturazioni.",
      "Coordinamento con topografia e laser SLAM quando serve una base metrica affidabile dello stato di fatto.",
      "Allineamento a vincoli urbanistici e pratiche edilizie; strutture affidate a professionisti esterni di fiducia.",
    ],
    href: "/servizi#architettura",
    cta: null,
  },
  {
    id: "topografia-rilievi",
    kicker: "GNSS · Stazione totale",
    title: "Topografia e rilievi",
    description:
      "Rilievi planoaltimetrici per frazionamenti, nuovi insediamenti, cantieri e verifiche di confine. GNSS RTK e stazione totale per acquisizioni tracciabili.",
    points: [
      "Rilievi planoaltimetrici e quotati per progettazione, cantieristica e contenziosi tecnici.",
      "Supporto a perizie e stime quando la misura dello stato di fatto è parte dell’incarico.",
    ],
    href: "/topografia",
    cta: "Approfondisci la topografia",
  },
  {
    id: "laser-slam",
    kicker: "Nuvole di punti · RS10",
    title: "Laser scanner SLAM",
    description:
      "Documentazione 3D di edifici, capannoni e impianti con dense nuvole di punti: as-built, sezioni, CAD/BIM e verifiche in tempi contenuti.",
    points: [
      "Acquisizione mobile indoor/outdoor lungo percorsi continui.",
      "Integrazione con controlli topografici dove servono coordinate di progetto.",
    ],
    href: "/rilievi-laser-scanner-slam-brescia",
    cta: "Approfondisci il laser SLAM",
  },
  {
    id: "verde-paesaggio",
    kicker: "Paesaggio · Vigneti",
    title: "Progettazione del verde",
    description:
      "Progettazione e modellazione del verde per vigneti, parchi, strade di montagna, sentieri e interventi di riqualificazione, anche con supporto agronomico.",
    points: [franciacortaPaesaggioViticole],
    href: "/servizi#verde-paesaggio",
    cta: null,
  },
  {
    id: "urbanistica-pratiche",
    kicker: "Piani regolatori · Iter",
    title: "Urbanistica e pratiche edilizie",
    description:
      "Lettura degli strumenti urbanistici, sanatorie e pratiche edilizie con coordinamento documentale verso gli enti.",
    points: [
      "Lettura dei piani regolatori comunali e sovracomunali.",
      "Sanatorie e regolarizzazioni quando i presupposti normativi sono rispettati.",
      "Pratiche edilizie (SCIA, CILA, permessi dove previsti).",
    ],
    href: "/servizi#urbanistica-pratiche",
    cta: null,
  },
  {
    id: "sicurezza-assistenza",
    kicker: "CSP · CSE · Perizie",
    title: "Sicurezza cantieri e assistenza tecnica",
    description:
      "Coordinamento della sicurezza in cantiere e assistenza tecnica collegata a immobili, perizie e consulenze.",
    points: [
      "Coordinamento della sicurezza in fase di progettazione ed esecuzione (CSP e CSE).",
      "Assistenza immobiliare, perizie, stime e consulenze tecniche.",
    ],
    href: "/servizi#sicurezza-assistenza",
    cta: null,
  },
] as const;

/** Anteprima home: stesse schede, link alla pagina Servizi o alle landing dedicate. */
export const homeServiceCards = serviceGroups.map((group) => ({
  kicker: group.kicker,
  title: group.title,
  description: group.description,
  href: group.href,
}));

export const homeProgettiIntro =
  "Anteprima di tre casi SLAM e topografia. Schede complete, video e dettagli nell’archivio Progetti.";

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
  "Anteprima dei recapiti. Modulo, mappa e FAQ nella pagina Contatti.";

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
