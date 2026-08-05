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
    q: "Quali servizi offre lo Studio Architettura Pagnoni?",
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

export const rilievi3dStudiFaq = [
  {
    q: "Lavorate in subappalto per altri studi tecnici?",
    a: "Sì, è una parte importante della nostra attività: eseguiamo il rilievo 3D e consegniamo gli elaborati al vostro studio, che mantiene il rapporto con il cliente finale. Su richiesta operiamo con riservatezza sull'incarico.",
  },
  {
    q: "In quali formati consegnate?",
    a: "Nuvola di punti E57/LAS/LAZ georiferita, piante e sezioni DWG/DXF, report PDF e, quando richiesto, supporto a modelli IFC/RVT. Concordiamo formati e convenzioni (layer, quote, sistemi di riferimento) prima del rilievo.",
  },
  {
    q: "Quanto costa un rilievo 3D per uno studio di architettura?",
    a: "Dipende da superficie, piani, dettaglio e output richiesti. Per collaborazioni continuative applichiamo condizioni da partner. Inviaci metratura e comune: rispondiamo con una quotazione indicativa in giornata lavorativa.",
  },
  {
    q: "Che tempi avete tra incarico e consegna?",
    a: "In provincia di Brescia il campo si programma in genere entro pochi giorni; l'acquisizione SLAM copre volumi estesi in una giornata. La restituzione dipende dagli elaborati: la nuvola pulita arriva prima, DWG e BIM seguono il calendario concordato.",
  },
  {
    q: "Come verifico la qualità prima di affidarvi un incarico?",
    a: "Scarica la nuvola di punti di esempio in questa pagina e aprila in CloudCompare, Autodesk ReCap o nel tuo software abituale. Al primo incarico consegniamo anche un'anteprima della nuvola prima della restituzione finale.",
  },
] as const satisfies readonly FaqItem[];

export const architetturaFaq = [
  {
    q: "Che servizi di architettura offrite in Franciacorta?",
    a: "Progettazione architettonica dal concept alle tavole esecutive: nuove costruzioni, ampliamenti, ristrutturazioni e interventi su patrimonio esistente. Arch. Davide Pagnoni coordina il processo edilizio in continuità con rilievi, urbanistica e pratiche.",
  },
  {
    q: "Operate solo a Bornato / Cazzago San Martino?",
    a: "La sede è a Bornato, Frazione di Cazzago San Martino, in Franciacorta. Seguiamo incarichi nei comuni della Franciacorta e in provincia di Brescia; per progetti più strutturati valutiamo anche Lombardia.",
  },
  {
    q: "Come integrate rilievo e progetto?",
    a: "Quando serve una base metrica dello stato di fatto affianchiamo topografia (GNSS RTK, stazione totale) e, su edifici o impianti, laser scanner SLAM. Il progetto parte da geometrie affidabili, non da ipotesi.",
  },
  {
    q: "Gestite anche le pratiche edilizie?",
    a: "Sì: lettura degli strumenti urbanistici, pratiche (SCIA, CILA, permessi dove previsti) e supporto documentale verso gli enti. Le strutture, se necessarie, sono coordinate con professionisti esterni di fiducia.",
  },
  {
    q: "Come si richiede un sopralluogo?",
    a: "Tramite il modulo contatti indicando comune, tipo di intervento (nuova costruzione, ristrutturazione, ampliamento) e obiettivo. Rispondiamo con tempi e modalità di sopralluogo senza impegno.",
  },
] as const satisfies readonly FaqItem[];
