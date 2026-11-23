import type { ReactNode } from "react";
import Link from "next/link";
import { ui } from "@/lib/ui";

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
  /** Copy home mobile: più corto e leggibile su 375–430px. */
  shortMobile: ReactNode;
  highlights: { label: string; labelMobile?: string }[];
  blocks: homeChiSiamoBlock[];
} = {
  title: "Chi siamo",
  intro: "Architettura, geometra e rilievi dallo stesso studio a Bornato.",
  short: (
    <>
      Studio di architettura attivo <strong>dal {STUDIO_FOUNDED_YEAR}</strong> a{" "}
      <strong>Bornato, Frazione di Cazzago San Martino (BS)</strong>. Uniamo
      architettura, topografia, pratiche catastali e laser scanner SLAM: progetto, misura e documentazione in un solo percorso.
      <br />
      Seguiamo ogni commessa con continuità: campagna, controllo dati, restituzione e supporto al progetto.
    </>
  ),
  shortMobile: (
    <>
      Studio di architettura dal {STUDIO_FOUNDED_YEAR} a Bornato, in Franciacorta.
      <br />
      Architettura, geometra e rilievi 3D: dal campo agli elaborati.
    </>
  ),
  highlights: [
    {
      label: "Architettura: concept, progetto e coordinamento delle discipline",
      labelMobile: "Architettura e coordinamento di progetto",
    },
    {
      label: "Rilievi GNSS RTK, stazione totale e laser SLAM",
      labelMobile: "Rilievi GNSS, stazione totale e SLAM",
    },
    {
      label: "Nuvole di punti, CAD/BIM e documentazione tecnica",
      labelMobile: "Nuvole di punti, CAD e BIM",
    },
    {
      label: "Urbanistica, verde, pratiche e sicurezza cantieri · Franciacorta e Nord Italia",
      labelMobile: "Pratiche, sicurezza e territorio",
    },
  ],
  blocks: [
    {
      text: (
        <>
          Lo <strong>Studio Architettura Pagnoni</strong> è uno studio di architettura con sede a{" "}
          <strong>Bornato, Frazione di Cazzago San Martino</strong> (provincia di{" "}
          <strong>Brescia</strong>, <strong>Franciacorta</strong> e raggio su <strong>Lombardia</strong> e <strong>Nord Italia</strong>):{" "}
          <strong>Geometra Sergio Pagnoni</strong> e <strong>Architetto Davide Pagnoni</strong> lavorano in sinergia su progetti di territorio, edilizia e
          rilievi ad alta precisione. Non svolgiamo <strong>progettazione strutturale</strong>: quando necessario ci avvaliamo di collaboratori esterni,
          mantenendo il focus su architettura, topografia, laser scanner, verde e
          iter autorizzativi.
        </>
      ),
      image: "team",
    },
    {
      text: (
        <>
          Lavoriamo su <strong>architettura, topografia e documentazione 3D</strong> in provincia di Brescia e nel Nord Italia, con GNSS, stazione
          totale e laser scanner SLAM quando la commessa richiede una base metrica densa. Operiamo con continuità su <strong>Franciacorta</strong>,{" "}
          <strong>Valle Trompia</strong>, hinterland bresciano e, su incarico, in Lombardia e Nord Italia.
        </>
      ),
      image: "cantiere",
    },
  ],
};

/** Blocco compatto in home: SLAM come perno operativo, RTK e stazione a supporto */
export const homeStrumentazione: {
  title: string;
  lede: ReactNode;
  items: readonly { label: string; text: string }[];
} = {
  title: "Strumentazione",
  lede: (
    <>
      Il <strong>laser scanner SLAM</strong> mobile è oggi il perno dei nostri rilievi in campo: strumentazione di nuova acquisizione per
      nuvole di punti e documentazione 3D rapida su edifici e siti complessi. A supporto restano GNSS RTK e stazione totale quando la
      commessa lo richiede.
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

/** Gruppi servizio: pagina Servizi (sezioni complete) e anteprima home.
 * Ordine brand: Architettura → Topografia → Catasto/divisioni → Laser → altri ambiti. */
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
    href: "/architettura-franciacorta",
    cta: "Architetto in Franciacorta e Brescia",
  },
  {
    id: "topografia-rilievi",
    kicker: "Topografia · Geometra",
    title: "Topografia e rilievi",
    description:
      "Rilievi planoaltimetrici del geometra in Franciacorta: cantieri, planimetrie quotate e base metrica per progetto. GNSS RTK e stazione totale per acquisizioni tracciabili.",
    points: [
      "Rilievi planoaltimetrici e quotati per progettazione, cantieristica e contenziosi tecnici.",
      "Tracciamenti di cantiere, quote e controlli geometrici in fase di esecuzione.",
      "Supporto a perizie e stime quando la misura dello stato di fatto è parte dell’incarico.",
    ],
    href: "/topografia",
    cta: "Geometra e topografia a Brescia",
  },
  {
    id: "pratiche-geometra",
    kicker: "Catasto · Divisioni · Successioni",
    title: "Catasto, divisioni e confini",
    description:
      "Aggiornamenti catastali, frazionamenti, successioni immobiliari e verifica dei confini: rilievo e documentazione dello stato di fatto, in coordinamento con notaio ed eredi.",
    points: [
      "Divisioni catastali e frazionamenti di terreni e fabbricati, con planimetrie e atti di aggiornamento.",
      "Successioni immobiliari e divisioni ereditarie: rilievo, ripartizione quote e aggiornamenti catastali.",
      "DOCFA, variazioni di consistenza, tipi mappali e allineamento tra stato di fatto e catasto.",
      "Verifica e accertamento di confine, suddivisioni e supporto tecnico su contenziosi di confine.",
    ],
    href: "/servizi#pratiche-geometra",
    cta: null,
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
      "Elaborati per as-built, verifiche dimensionali e base metrica di progetto.",
    ],
    href: "/laser-scanner-slam",
    cta: "Laser scanner SLAM a Brescia",
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

/** Anteprima home: quattro ambiti principali (ordine brand), non l’elenco completo. */
const homeServicePreviewIds = ["architettura", "topografia-rilievi", "laser-slam", "verde-paesaggio"] as const;

export const homeServiceCards = homeServicePreviewIds.map((id) => {
  const group = serviceGroups.find((g) => g.id === id)!;
  return {
    id: group.id,
    title: group.title,
    description: group.description,
    href: group.href,
    cta: group.cta,
  };
});

export const certifications = [
  {
    title: "Architettura",
    text: "Dal concept alle tavole esecutive, con pratiche edilizie e coordinamento di progetto e cantiere.",
  },
  {
    title: "Geometra e topografia",
    text: "Rilievi GNSS e stazione totale, frazionamenti, confini e aggiornamenti catastali.",
  },
  {
    title: "Urbanistica e sicurezza",
    text: "Lettura degli strumenti urbanistici, pratiche edilizie e coordinamento CSP/CSE in cantiere.",
  },
  {
    title: "Documentazione 3D",
    text: "Laser scanner SLAM, nuvole di punti e base metrica per progetto e as-built.",
  },
] as const;

export const zoneContent = {
  title: "Dove operiamo",
  heading: "Franciacorta, provincia di Brescia e Nord Italia",
};

export const zoneDescription = (
  <>
    La sede a <strong>Bornato, Frazione di Cazzago San Martino</strong> è strategica per interventi in <strong>Franciacorta</strong>, Valle Trompia, Lago
    d&apos;Iseo e provincia di <strong>Brescia</strong>. Seguiamo commesse in Lombardia e, per tipologia di lavoro, in tutto il Nord Italia.
  </>
);

export const zoneFooter = (
  <>
    Per tempi e disponibilità sul vostro territorio{" "}
    <Link href="/contatti" className={ui.proseLink}>
      contattateci
    </Link>
    . Servizi di{" "}
    <Link href="/architettura-franciacorta" className={ui.proseLink}>
      architetto in Franciacorta
    </Link>
    ,{" "}
    <Link href="/topografia" className={ui.proseLink}>
      geometra a Brescia
    </Link>{" "}
    e rilievi{" "}
    <Link href="/rilievi-laser-scanner-slam-brescia" className={ui.proseLink}>
      laser scanner SLAM in provincia di Brescia
    </Link>{" "}
    e in{" "}
    <Link href="/rilievi-laser-scanner-slam-lombardia" className={ui.proseLink}>
      Lombardia
    </Link>
    . Per studi e geometri:{" "}
    <Link href="/rilievi-3d-per-studi-di-architettura" className={ui.proseLink}>
      rilievi 3D in outsourcing
    </Link>
    .
  </>
);

export const homeFacts = [
  { title: "Dal 1988", text: "Studio a Bornato, in Franciacorta" },
  { title: "Architettura e geometra", text: "Dalla misura al progetto, nello stesso studio" },
  { title: "Territorio", text: "Franciacorta, Brescia e Nord Italia" },
] as const;

export const chiSiamoPage = {
  title: "Chi siamo",
  paragraphs: [
    <>
      Lo <strong>Studio Architettura Pagnoni</strong> opera <strong>dal {STUDIO_FOUNDED_YEAR}</strong> in Franciacorta, a Bornato (Cazzago San Martino,
      BS). Il perimetro principale è la <strong>progettazione architettonica</strong> e le pratiche connesse, con l&apos;
      <strong>Arch. Davide Pagnoni</strong>. Accanto al progetto, il <strong>Geom. Sergio Pagnoni</strong> rafforza lo studio come{" "}
      <strong>geometra in Franciacorta</strong>: topografia, frazionamenti, confini e pratiche catastali.
    </>,
    <>
      Accanto al progetto, lo studio gestisce topografia, rilievi e documentazione 3D quando servono una base metrica affidabile dello stato di fatto.
      Strumentazione e metodi si sono aggiornati nel tempo (dalla stazione totale al GNSS RTK, fino al laser scanner SLAM), mantenendo lo stesso
      approccio: una sola lettura della commessa, dalla misura alla consegna.
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
