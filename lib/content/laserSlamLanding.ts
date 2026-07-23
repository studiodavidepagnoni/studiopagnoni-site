/** Contenuti pagina servizio `/laser-scanner-slam` e landing geo Brescia / Lombardia. */

export type SlamFaqItem = { readonly q: string; readonly a: string };

export type SlamSector = { readonly title: string; readonly body: string };

export type SlamDeliverable = { readonly format: string; readonly use: string };

export type SlamWorkflowStep = {
  readonly step: string;
  readonly title: string;
  readonly body: string;
};

export type SlamLandingContent = {
  readonly path: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
  };
  readonly introHeading: string;
  readonly introLead: string;
  readonly instrumentNote: string;
  readonly sectorsIntro: string;
  readonly sectors: readonly SlamSector[];
  readonly areaHeading: string;
  readonly areaBody: string;
  readonly areaPlaces: readonly string[];
  readonly projectsIntro: string;
  readonly deliverables: readonly SlamDeliverable[];
  readonly workflow: readonly SlamWorkflowStep[];
  readonly comparison: {
    readonly headers: readonly [string, string, string];
    readonly rows: readonly (readonly [string, string, string])[];
  };
  readonly faq: readonly SlamFaqItem[];
  readonly ctaHeading: string;
  readonly ctaBody: string;
  readonly jsonLd: {
    readonly serviceName: string;
    readonly alternateNames: readonly string[];
    readonly serviceDescription: string;
    readonly webpageDescription: string;
    readonly breadcrumbName: string;
    readonly areaServed: readonly {
      readonly type: "AdministrativeArea" | "City" | "Place";
      readonly name: string;
    }[];
  };
};

const sharedDeliverables = [
  { format: "E57 / LAS / LAZ", use: "Nuvola di punti georiferita, archivio e scambio con altri software" },
  { format: "DWG / DXF", use: "Piante, sezioni e quotature per progettisti e imprese" },
  { format: "IFC / RVT", use: "Modello BIM o mesh di riferimento, quando la commessa lo richiede" },
  { format: "PDF / report", use: "Sintesi metrica, sezioni estratte e materiali per committente e cantiere" },
] as const satisfies readonly SlamDeliverable[];

const sharedComparison = {
  headers: ["Aspetto", "Scanner mobile SLAM (RS10)", "Scanner statico terrestre"] as const,
  rows: [
    ["Modalità", "Acquisizione in movimento, percorsi continui", "Stazioni multiple, tempi di setup per ogni posizione"],
    ["Indoor / outdoor", "Transizione integrata sulla stessa sessione", "Spesso strumenti o passaggi separati"],
    ["Tempi in campo", "Ridotti su volumi estesi e layout complessi", "Più passaggi, più fermi operativi"],
    ["Copertura", "Controllo copertura in tempo reale in campo", "Dipende dalla pianificazione delle stazioni"],
    ["Quando preferirlo", "Edifici, capannoni, impianti, terreni, as-built rapidi", "Dettaglio millimetrico su piccole aree fisse"],
  ] as const,
};

const sharedWorkflow = [
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
] as const satisfies readonly SlamWorkflowStep[];

/** Pagina servizio generica (menu Laser Scanning): `/laser-scanner-slam`. */
export const laserSlamLanding = {
  path: "/laser-scanner-slam",
  metaTitle: "Laser scanner SLAM — architettura, as-built e nuvole di punti",
  metaDescription:
    "Rilievi laser scanner SLAM mobile: nuvole di punti, as-built, DWG e BIM per architettura, capannoni, edifici e impianti. Franciacorta, provincia di Brescia e Lombardia. Preventivo.",
  hero: {
    eyebrow: "Laser scanner mobile",
    title: "Rilievi laser SLAM",
    lede: "Nuvole di punti e as-built per progetto architettonico, edifici, capannoni e impianti — CHCNAV RS10.",
  },
  introHeading: "Laser scanner SLAM: misura 3D prima di progettare",
  introLead:
    "Quando un edificio, un impianto o un capannone devono essere compresi prima di intervenire, il rilievo SLAM riduce i tempi in campo e restituisce una base metrica leggibile: nuvola di punti, as-built, sezioni e supporto a CAD/BIM per architettura e cantiere.",
  instrumentNote:
    "La piattaforma mobile CHCNAV RS10 integra GNSS RTK, LiDAR e SLAM visuale: un flusso continuo tra esterni, interni e zone dove il segnale satellitare non basta.",
  sectorsIntro:
    "Il rilievo SLAM è pensato per studi di progettazione, imprese, facility e committenza che devono decidere su geometrie affidabili dello stato di fatto.",
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
  ],
  areaHeading: "Dove operiamo",
  areaBody:
    "Sede a Cazzago San Martino (BS), in Franciacorta. Interventi rapidi in provincia di Brescia; su programmazione in Lombardia e Nord Italia. Per SEO locale restano le landing dedicate Brescia e Lombardia.",
  areaPlaces: [
    "Franciacorta e provincia di Brescia",
    "Lombardia (su programmazione)",
    "Nord Italia per commesse strutturate",
  ],
  projectsIntro:
    "Esempi di laser scanner SLAM e documentazione 3D: acquisizione in movimento e restituzione operativa.",
  deliverables: sharedDeliverables,
  workflow: sharedWorkflow,
  comparison: sharedComparison,
  faq: [
    {
      q: "Che precisione posso aspettarmi?",
      a: "In condizioni operative dichiarate dal costruttore, la piattaforma RS10 indica fino a circa 5 cm in misura assoluta combinando RTK, laser e SLAM visuale. La precisione effettiva dipende da ambiente, estensione e obiettivo: in preventivo definiamo tolleranze e controlli.",
    },
    {
      q: "Quanto tempo serve in campo su un capannone?",
      a: "Dipende da metratura, accessibilità e dettaglio. Su un capannone logistico di circa 8.000 m², indicativamente una giornata di acquisizione può coprire il volume utile; elaborazione e restituzione seguono il calendario concordato in offerta.",
    },
    {
      q: "Quanto costa un rilievo laser scanner SLAM?",
      a: "Il preventivo è su misura: superficie, piani, formati (solo nuvola vs DWG/BIM) e distanza dalla sede. Scrivici zona e obiettivo: rispondiamo con una proposta indicativa senza impegno.",
    },
    {
      q: "Posso avere solo la nuvola di punti?",
      a: "Sì. Consegnamo E57/LAS/LAZ georiferiti, oppure affianchiamo piante DWG/DXF o modello BIM se serve al tuo progettista o alla direzione lavori.",
    },
    {
      q: "Operate solo in provincia di Brescia?",
      a: "La priorità operativa è Franciacorta e provincia di Brescia. Su programmazione eseguiamo rilievi SLAM in Lombardia e Nord Italia: usa le landing geo o il modulo contatti indicando comune e superficie.",
    },
  ],
  ctaHeading: "Preventivo rilievo laser scanner SLAM",
  ctaBody:
    "Indica località, superficie indicativa e output desiderati (nuvola, DWG, BIM): ti rispondiamo con tempi e preventivo su misura.",
  jsonLd: {
    serviceName: "Rilievi laser scanner SLAM",
    alternateNames: [
      "Laser scanner SLAM",
      "Rilievo laser scanner 3D",
      "Nuvole di punti e as-built",
      "Laser scanning mobile CHCNAV RS10",
    ],
    serviceDescription:
      "Rilievi laser scanner SLAM mobile: nuvole di punti georiferite, as-built, DWG, DXF e supporto BIM per architettura, capannoni, edifici e impianti.",
    webpageDescription:
      "Pagina servizio laser scanner SLAM: documentazione 3D, as-built e base metrica per progetto in Franciacorta, provincia di Brescia e Lombardia.",
    breadcrumbName: "Laser scanner SLAM",
    areaServed: [
      { type: "Place", name: "Franciacorta" },
      { type: "AdministrativeArea", name: "Provincia di Brescia" },
      { type: "AdministrativeArea", name: "Lombardia" },
      { type: "AdministrativeArea", name: "Nord Italia" },
    ],
  },
} as const satisfies SlamLandingContent;

/** Landing SEO: provincia di Brescia / Franciacorta. */
export const laserSlamLandingBrescia = {
  path: "/rilievi-laser-scanner-slam-brescia",
  metaTitle: "Laser scanner SLAM Brescia | architettura, as-built e nuvole di punti",
  metaDescription:
    "Rilievo laser scanner SLAM a Brescia e Franciacorta per architettura, as-built, DWG e BIM. Capannoni, edifici, cantine e impianti. Studio Tecnico Pagnoni — preventivo.",
  hero: {
    eyebrow: "Laser scanner SLAM · Brescia",
    title: "Rilievi laser SLAM a Brescia",
    lede: "Nuvole di punti e as-built per progetto architettonico in provincia di Brescia e Franciacorta.",
  },
  introHeading: "Laser scanner SLAM a Brescia: misura 3D prima di progettare",
  introLead:
    "Cerchi un rilievo laser scanner SLAM a Brescia, in Franciacorta o nei comuni della provincia? Documentiamo capannoni, edifici, cantine, impianti e siti produttivi con acquisizione mobile: meno giorni in campo, nuvola di punti densa e base metrica per architettura, as-built, sezioni, CAD e BIM.",
  instrumentNote:
    "Operiamo da Cazzago San Martino (fraz. Bornato) con piattaforma CHCNAV RS10 (GNSS RTK + LiDAR + SLAM visuale): un flusso continuo tra esterni, interni e zone con segnale satellitare debole, tipiche di capannoni e impianti bresciani.",
  sectorsIntro:
    "Il rilievo SLAM a Brescia è pensato per imprese manifatturiere, realtà vinicole in Franciacorta, studi di progettazione e facility che devono decidere su geometrie affidabili.",
  sectors: [
    {
      title: "Capannoni e industria bresciana",
      body: "Stabilimenti, logistica e aree produttive tra Brescia, Valle Trompia e hinterland: scansione in movimento su grandi volumi, verifica ingombri e documentazione as-built.",
    },
    {
      title: "Cantine e immobili in Franciacorta",
      body: "Spazi di produzione, bottiglie e percorsi articolati: rilievo 3D rapido per riqualificazioni, ampliamenti e restituzione utilizzabile da progettisti.",
    },
    {
      title: "Edifici e ristrutturazioni",
      body: "Piante, sezioni e quote da nuvola densa prima di intervenire su residenziale, terziario e patrimonio nel Bresciano.",
    },
    {
      title: "Impianti e spazi tecnici",
      body: "Corridoi MEP, sale macchine e interferenze: geometria completa dove il rilievo tradizionale è lento o incompleto.",
    },
    {
      title: "Topografia + SLAM",
      body: "Integrazione con GNSS RTK e stazione totale per ancorare il modello 3D a coordinate di progetto, catasto e cantiere in provincia di Brescia.",
    },
  ],
  areaHeading: "Dove eseguiamo rilievi SLAM in provincia di Brescia",
  areaBody:
    "Sede operativa a Cazzago San Martino: interventi rapidi in Franciacorta e nella rete dei comuni bresciani. Per preventivi e sopralluoghi contattaci indicando comune e superficie indicativa.",
  areaPlaces: [
    "Brescia città e hinterland",
    "Franciacorta (Erbusco, Adro, Corte Franca, Iseo, Rovato, Cazzago San Martino)",
    "Valle Trompia e comuni limitrofi",
    "Lago d’Iseo e sponda bresciana",
    "Comuni industriali della Bassa Bresciana",
  ],
  projectsIntro:
    "Esempi di laser scanner SLAM e documentazione 3D su siti in ambito bresciano e Franciacorta: acquisizione in movimento e restituzione operativa.",
  deliverables: sharedDeliverables,
  workflow: sharedWorkflow,
  comparison: sharedComparison,
  faq: [
    {
      q: "Fate rilievi laser scanner SLAM a Brescia e in Franciacorta?",
      a: "Sì. È il nostro bacino operativo principale: sede a Cazzago San Martino (BS), interventi su Brescia città, Franciacorta, Valle Trompia, Lago d’Iseo e provincia. Contattaci con comune e obiettivo per tempi e preventivo.",
    },
    {
      q: "Che precisione posso aspettarmi su un rilievo SLAM?",
      a: "In condizioni operative dichiarate dal costruttore, la piattaforma RS10 indica fino a circa 5 cm in misura assoluta combinando RTK, laser e SLAM visuale. La precisione effettiva dipende da ambiente, estensione e obiettivo: in preventivo definiamo tolleranze e controlli.",
    },
    {
      q: "Quanto tempo serve in campo su un capannone a Brescia?",
      a: "Dipende da metratura, accessibilità e dettaglio. Su un capannone logistico di circa 8.000 m², indicativamente una giornata di acquisizione può coprire il volume utile; elaborazione e restituzione seguono il calendario concordato in offerta.",
    },
    {
      q: "Quanto costa un rilievo laser scanner SLAM a Brescia?",
      a: "Il preventivo è su misura: superficie, piani, formati (solo nuvola vs DWG/BIM) e distanza dalla sede. Scrivici zona e obiettivo: rispondiamo con una proposta indicativa senza impegno.",
    },
    {
      q: "Posso avere solo la nuvola di punti?",
      a: "Sì. Consegnamo E57/LAS/LAZ georiferiti, oppure affianchiamo piante DWG/DXF o modello BIM se serve al tuo progettista o alla direzione lavori.",
    },
  ],
  ctaHeading: "Preventivo rilievo SLAM a Brescia",
  ctaBody:
    "Indica comune in provincia di Brescia, superficie indicativa e output desiderati (nuvola, DWG, BIM): ti rispondiamo con tempi e preventivo su misura.",
  jsonLd: {
    serviceName: "Rilievi laser scanner SLAM a Brescia",
    alternateNames: [
      "Laser scanner SLAM Brescia",
      "Rilievo laser scanner 3D Franciacorta",
      "Nuvole di punti e as-built Brescia",
      "Rilievi 3D SLAM provincia di Brescia",
    ],
    serviceDescription:
      "Rilievi laser scanner SLAM mobile a Brescia e Franciacorta: nuvole di punti georiferite, as-built, DWG, DXF e supporto BIM per capannoni, edifici, cantine e impianti.",
    webpageDescription:
      "Landing SEO per richiedere rilievi laser scanner SLAM, nuvole di punti e as-built in provincia di Brescia e Franciacorta.",
    breadcrumbName: "Laser scanner SLAM Brescia",
    areaServed: [
      { type: "AdministrativeArea", name: "Provincia di Brescia" },
      { type: "Place", name: "Franciacorta" },
      { type: "City", name: "Brescia" },
      { type: "City", name: "Cazzago San Martino" },
      { type: "City", name: "Erbusco" },
      { type: "City", name: "Iseo" },
      { type: "City", name: "Rovato" },
    ],
  },
} as const satisfies SlamLandingContent;

/** Landing regionale: Lombardia. */
export const laserSlamLandingLombardia = {
  path: "/rilievi-laser-scanner-slam-lombardia",
  metaTitle: "Laser scanner SLAM Lombardia | architettura, imprese e immobili",
  metaDescription:
    "Rilievo laser scanner SLAM in Lombardia per architettura, as-built e CAD/BIM: capannoni, edifici e impianti. Da Brescia su Milano, Bergamo, Mantova e province. Preventivo.",
  hero: {
    eyebrow: "Laser scanner SLAM · Lombardia",
    title: "Rilievi laser SLAM in Lombardia",
    lede: "Scansione 3D mobile per architettura, capannoni e impianti in Lombardia — base operativa Brescia.",
  },
  introHeading: "Rilievo laser scanner SLAM in Lombardia: copertura regionale",
  introLead:
    "Per commesse in Lombardia il laser scanner SLAM mobile riduce i costi di fermo e i giorni di campo rispetto a campagne statiche su grandi superfici. Documentiamo immobili produttivi, logistici e terziari con nuvole di punti georiferite e restituzione orientata ad architettura, facility e imprese.",
  instrumentNote:
    "Partiamo dalla sede di Cazzago San Martino (BS) con CHCNAV RS10: GNSS RTK, LiDAR e SLAM visuale nello stesso strumento, ideale per siti multi-piano, magazzini e impianti dove indoor e outdoor si alternano nella stessa giornata di rilievo.",
  sectorsIntro:
    "La landing Lombardia è pensata per committenze multi-provincia: studi di progettazione, general contractor, property manager e imprese con sedi distribuite nel Nord Italia.",
  sectors: [
    {
      title: "Logistica e grandi volumi",
      body: "Magazzini, hub e piattaforme distributive in Lombardia: acquisizione continua su layout estesi, layout as-built e controlli di ingombro.",
    },
    {
      title: "Immobili produttivi multi-sito",
      body: "Stabilimenti e linee di produzione in province diverse: metodo ripetibile, formati standard (E57, DWG) e tempi di campagna compressi.",
    },
    {
      title: "Terziario e riqualificazioni",
      body: "Edifici uffici, retail e ristrutturazioni: base 3D per progettazione, quantity e coordinamento discipline.",
    },
    {
      title: "Impianti e facility",
      body: "Sale tecniche, gallerie e interferenze MEP: documentazione densa per manutenzione, revamping e sicurezza.",
    },
    {
      title: "Coordinamento con topografia",
      body: "Quando servono coordinate di progetto o inquadramento catastale, integriamo SLAM con GNSS RTK e stazione totale.",
    },
  ],
  areaHeading: "Province e ambiti di intervento in Lombardia",
  areaBody:
    "Programmiamo rilievi SLAM in Lombardia con pianificazione di viaggio e finestre di accesso. Priorità operativa su province vicine alla sede; per Milano e hinterland valutiamo densità di giornata e logistica di cantiere.",
  areaPlaces: [
    "Provincia di Brescia (base operativa)",
    "Bergamo e hinterland industriale",
    "Mantova, Cremona e asse padano",
    "Milano e hinterland (su programmazione)",
    "Como, Lecco, Varese e area prealpina",
    "Pavia, Lodi e Monza Brianza (su commessa)",
  ],
  projectsIntro:
    "Casi di rilievo laser SLAM e digitalizzazione 3D: metodo trasferibile su siti lombardi di scala analoga. Apri l’archivio progetti per schede e video.",
  deliverables: sharedDeliverables,
  workflow: sharedWorkflow,
  comparison: sharedComparison,
  faq: [
    {
      q: "Eseguite rilievi laser scanner SLAM in tutta la Lombardia?",
      a: "Sì, su programmazione. La sede è in provincia di Brescia: per Bergamo, Mantova, Cremona e hinterland milanese organizziamo campagne dedicate. Indica provincia, comune e superficie per una stima di tempi e costi.",
    },
    {
      q: "Quanto costa un rilievo SLAM in Lombardia rispetto a Brescia?",
      a: "Il costo dipende da superficie, accessi, output e distanza. Fuori provincia di Brescia incidono logistica e giornate di campo; in preventivo evidenziamo la voce viaggio e le eventuali notti, senza sorprese.",
    },
    {
      q: "In quanto tempo potete intervenire a Milano o Bergamo?",
      a: "Le finestre dipendono dal carico di lavoro e dagli accessi del sito. Per urgenze in Lombardia proponiamo la prima disponibilità utile dopo il brief; per siti complessi preferiamo un sopralluogo o un call tecnico prima della scansione.",
    },
    {
      q: "Che output consegnate per studi di progettazione lombardi?",
      a: "Nuvola E57/LAS/LAZ, piante e sezioni DWG/DXF, report PDF e, se richiesto, supporto a modelli IFC/RVT. Allineiamo i formati agli standard del vostro BIM manager o del general contractor.",
    },
    {
      q: "SLAM mobile o scanner statico: cosa consigliate in Lombardia?",
      a: "Su capannoni, magazzini e immobili articolati preferiamo SLAM mobile per tempi e copertura. Lo scanner statico resta utile per dettaglio millimetrico su piccole aree fisse: in brief scegliamo o combiniamo i metodi.",
    },
  ],
  ctaHeading: "Preventivo rilievo SLAM in Lombardia",
  ctaBody:
    "Indica provincia, comune, superficie e formati di consegna: prepariamo un’offerta con tempi di campo e restituzione, inclusa la logistica regionale.",
  jsonLd: {
    serviceName: "Rilievi laser scanner SLAM in Lombardia",
    alternateNames: [
      "Laser scanner SLAM Lombardia",
      "Rilievo laser scanner 3D Lombardia",
      "Nuvole di punti e as-built Lombardia",
      "Rilievi 3D SLAM Nord Italia",
    ],
    serviceDescription:
      "Rilievi laser scanner SLAM mobile in Lombardia: nuvole di punti georiferite, as-built, DWG e supporto BIM per capannoni, magazzini, edifici e impianti su più province.",
    webpageDescription:
      "Landing SEO per richiedere rilievi laser scanner SLAM e documentazione 3D in Lombardia, con base operativa in provincia di Brescia.",
    breadcrumbName: "Laser scanner SLAM Lombardia",
    areaServed: [
      { type: "AdministrativeArea", name: "Lombardia" },
      { type: "AdministrativeArea", name: "Provincia di Brescia" },
      { type: "AdministrativeArea", name: "Provincia di Bergamo" },
      { type: "AdministrativeArea", name: "Provincia di Milano" },
      { type: "AdministrativeArea", name: "Provincia di Mantova" },
      { type: "AdministrativeArea", name: "Provincia di Cremona" },
      { type: "AdministrativeArea", name: "Nord Italia" },
    ],
  },
} as const satisfies SlamLandingContent;
