/** FAQ per pagine servizi (copy + JSON-LD FAQPage). */

export type FaqItem = { readonly q: string; readonly a: string };

export const topografiaFaq = [
  {
    q: "Quanto costa un rilievo topografico?",
    a: "Il preventivo dipende da estensione, accessibilità, tipo di elaborato (solo punti, planimetria quotata, volumetrie, tracciamenti) e distanza dalla sede. Indicando località e finalità (frazionamento, cantiere, progetto) rispondiamo con una proposta indicativa senza impegno.",
  },
  {
    q: "Quali sono i tempi di consegna?",
    a: "Per rilievi di media estensione in provincia di Brescia, campo e restituzione base (punti e planimetria) si collocano spesso nell’ordine di pochi giorni lavorativi dopo l’acquisizione; volumetrie complesse o integrazioni SLAM richiedono tempi concordati in offerta.",
  },
  {
    q: "In quali zone operate?",
    a: "Interventi rapidi in Franciacorta e provincia di Brescia (Cazzago San Martino, Erbusco, Iseo, Rovato e comuni limitrofi). Per commesse strutturate programmiamo incarichi in Lombardia e Nord Italia.",
  },
  {
    q: "GNSS RTK o stazione totale: come scegliete?",
    a: "Il GNSS RTK è efficace su aree aperte e per inquadramenti; la stazione totale resta centrale per dettaglio, cantieri e zone con segnale satellitare critico. La metodologia segue precisione richiesta, accessi e uso finale degli elaborati.",
  },
  {
    q: "Quando conviene affiancare il laser scanner SLAM?",
    a: "Quando servono geometrie dense di edifici, capannoni o impianti oltre al rilievo del terreno. Il topografico ancorra coordinate e controlli; lo SLAM documenta volumi interni e as-built. Vedi la pagina dedicata ai rilievi laser SLAM.",
  },
] as const satisfies readonly FaqItem[];

export const serviziFaq = [
  {
    q: "Quali servizi offre lo Studio Tecnico Pagnoni?",
    a: "Architettura e progettazione, topografia e rilievi planoaltimetrici, laser scanner SLAM e nuvole di punti, progettazione del verde, urbanistica e pratiche edilizie, coordinamento sicurezza cantieri (CSP/CSE) e assistenza tecnica. La parte strutturale è coordinata con professionisti esterni quando serve.",
  },
  {
    q: "Quanto costa un rilievo?",
    a: "Ogni incarico è quotato su misura: metratura, strumenti (GNSS, stazione totale, SLAM), formati di consegna e distanza incidono sul costo. Per una stima rapida usa il modulo contatti indicando zona e obiettivo.",
  },
  {
    q: "Quali tempi di consegna posso aspettarmi?",
    a: "Dipende da complessità e output (punti, DWG, nuvola E57, pratica edilizia). In preventivo definiamo calendario di campo e consegna elaborati; per urgenze in provincia di Brescia valutiamo finestre compatibili con la pianificazione.",
  },
  {
    q: "Coprite solo la Franciacorta?",
    a: "La sede è a Cazzago San Martino (BS): priorità a Franciacorta e provincia di Brescia. Eseguiamo anche commesse in Lombardia e, per rilievi SLAM e topografia strutturata, nel Nord Italia.",
  },
  {
    q: "Fate anche pratiche edilizie e sicurezza in cantiere?",
    a: "Sì: urbanistica, sanatorie, SCIA/CILA dove previste, oltre a CSP e CSE. Il rilievo metrico resta la base quando serve allineare progetto, regolarizzazione e cantiere.",
  },
] as const satisfies readonly FaqItem[];
