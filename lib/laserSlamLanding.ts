/** Contenuti landing commerciale `/laser-scanner-slam`. */

export const laserSlamLanding = {
  eyebrow: "Laser scanner mobile",
  h1: "Rilievi laser SLAM",
  introLead:
    "Documentazione rapida indoor e outdoor, nuvole di punti georiferite e as-built per edifici, capannoni, impianti e terreni — meno passaggi in cantiere, base metrica pronta per progetto e BIM.",
  instrumentNote:
    "Piattaforma mobile CHCNAV RS10: GNSS RTK, LiDAR e SLAM visuale integrati per continuità tra esterni, interni e zone senza segnale satellitare.",

  sectors: [
    {
      title: "Edilizia e ristrutturazioni",
      body: "Rilievi completi prima di progettare: piante, sezioni e quote da nuvola densa, utili per ridurre varianti e incomprensioni in cantiere.",
    },
    {
      title: "Industria e logistica",
      body: "Capannoni, magazzini e stabilimenti: acquisizione in movimento su grandi superfici, documentazione as-built e verifica ingombri.",
    },
    {
      title: "Impianti e spazi tecnici",
      body: "Corridoi MEP, sale macchine, passaggi e interferenze: geometria completa dove il rilievo tradizionale è lento o incompleto.",
    },
    {
      title: "Patrimonio e immobili storici",
      body: "Interni articolati e facciate: scansione continua con controlli in campo sulla copertura della nuvola.",
    },
    {
      title: "Topografia integrata",
      body: "Collegamento a GNSS RTK e stazione totale per allineare il modello 3D a coordinate di progetto, catasto e cantiere.",
    },
  ] as const,

  deliverables: [
    { format: "E57 / LAS / LAZ", use: "Nuvola di punti georiferita, archivio e scambio con altri software" },
    { format: "DWG / DXF", use: "Piante, sezioni e quotature per progettisti e imprese" },
    { format: "IFC / RVT", use: "Modello BIM o mesh di riferimento, quando la commessa lo richiede" },
    { format: "PDF / report", use: "Sintesi metrica, sezioni estratte e materiali per committente e cantiere" },
  ] as const,

  workflow: [
    {
      step: "01",
      title: "Brief e sopralluogo",
      body: "Definiamo obiettivo (as-built, ristrutturazione, interferenze), superficie indicativa e formati di consegna. Se utile, sopralluogo per pianificare percorsi e accessi.",
    },
    {
      step: "02",
      title: "Acquisizione SLAM in campo",
      body: "Scansione mobile con RS10: controllo in tempo reale su copertura e continuità indoor/outdoor, con integrazione RTK dove serve.",
    },
    {
      step: "03",
      title: "Elaborazione e QA",
      body: "Allineamento, pulizia nuvola, controlli metrici e confronto con eventuali rilievi topografici di supporto.",
    },
    {
      step: "04",
      title: "Restituzione",
      body: "Consegna negli formati concordati (nuvola, CAD, BIM) con documentazione comprensibile anche per chi non usa quotidianamente il 3D.",
    },
  ] as const,

  comparison: {
    headers: ["Aspetto", "Scanner mobile SLAM (RS10)", "Scanner statico terrestre"],
    rows: [
      ["Modalità", "Acquisizione in movimento, percorsi continui", "Stazioni multiple, tempi di setup per ogni posizione"],
      ["Indoor / outdoor", "Transizione integrata sulla stessa sessione", "Spesso strumenti o passaggi separati"],
      ["Tempi in campo", "Ridotti su volumi estesi e layout complessi", "Più passaggi, più fermi operativi"],
      ["Copertura", "Controllo copertura in tempo reale in campo", "Dipende dalla pianificazione delle stazioni"],
      ["Quando preferirlo", "Edifici, capannoni, impianti, terreni, as-built rapidi", "Dettaglio millimetrico su piccole aree fisse"],
    ],
  } as const,

  faq: [
    {
      q: "Che precisione posso aspettarmi?",
      a: "In condizioni operative dichiarate dal costruttore, la piattaforma RS10 indica fino a circa 5 cm in misura assoluta combinando RTK, laser e SLAM visuale. La precisione effettiva dipende da ambiente, estensione e obiettivo della commessa: in preventivo definiamo tolleranze e metodo di controllo.",
    },
    {
      q: "Quanto tempo serve in campo?",
      a: "Dipende da metratura, accessibilità e livello di dettaglio. Su un capannone logistico di circa 8.000 m², indicativamente una giornata di acquisizione può coprire l’intero volume utile, con tempi di elaborazione successivi concordati in offerta.",
    },
    {
      q: "Quanto costa un rilievo SLAM?",
      a: "Il preventivo è sempre su misura: superficie, numero di piani, formati richiesti (solo nuvola vs piante CAD/BIM) e distanza incidono sul costo. Contattaci con zona e obiettivo: rispondiamo con una proposta indicativa senza impegno.",
    },
    {
      q: "Posso avere solo la nuvola di punti?",
      a: "Sì. Possiamo consegnare E57/LAS georiferiti, oppure affiancare restituzione grafica (DWG) o modello BIM se serve al tuo progettista.",
    },
    {
      q: "Operate fuori provincia di Brescia?",
      a: "Sì. Sede a Cazzago San Martino (BS); programmiamo commesse in Lombardia e, per rilievi SLAM, anche nel Nord Italia.",
    },
  ] as const,

  caseStudyTeaser: {
    title: "Esempio di progetto",
    subtitle: "Capannone logistico — documentazione as-built con RS10",
    href: "/progetti/rilievi-digitalizzazione/capannone-logistico-slam-rs10",
    steps: [
      { label: "Campo", caption: "Acquisizione SLAM su due livelli" },
      { label: "Nuvola", caption: "Geometria densa georiferita" },
      { label: "Elaborati", caption: "Piante e sezioni per progetto" },
    ],
  },
} as const;
