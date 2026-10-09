import type { Locale } from "@/lib/i18n/config";

export type UiMessages = {
  skipToContent: string;
  nav: {
    about: string;
    services: string;
    laserScanning: string;
    projects: string;
    contact: string;
  };
  navAria: string;
  openMenu: string;
  closeMenu: string;
  footerBlurb: string;
  footerContactCta: string;
  footerNavAria: string;
  footerOffice: string;
  footerHours: string;
  privacy: string;
  cookie: {
    body: string;
    necessary: string;
    acceptAll: string;
    preferences: string;
  };
  cta: {
    requestSurvey: string;
    discoverServices: string;
    learnMore: string;
    viewProject: string;
    contactUs: string;
    requestQuote: string;
    archiveProjects: string;
  };
  form: {
    name: string;
    email: string;
    subject: string;
    city: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    privacyNote: string;
  };
  map: {
    consentTitle: string;
    consentBody: string;
    loadMap: string;
  };
  langSwitchAria: string;
  langIt: string;
  langEn: string;
};

export const messages: Record<Locale, UiMessages> = {
  it: {
    skipToContent: "Vai al contenuto principale",
    nav: {
      about: "Chi siamo",
      services: "Servizi",
      laserScanning: "Laser Scanning",
      projects: "Progetti",
      contact: "Contatti",
    },
    navAria: "Menu principale",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    footerBlurb:
      "Studio di architettura attivo tra Franciacorta, provincia di Brescia e Nord Italia per topografia, laser scanner SLAM, progettazione e pratiche edilizie.",
    footerContactCta: "Contattaci",
    footerNavAria: "Link del sito",
    footerOffice: "Sede",
    footerHours: "Orari",
    privacy: "Privacy",
    cookie: {
      body: "Cookie necessari al sito e, solo con il consenso, servizi di terze parti (mappe e protezione antispam).",
      necessary: "Solo necessari",
      acceptAll: "Accetta tutto",
      preferences: "Preferenze cookie",
    },
    cta: {
      requestSurvey: "Richiedi un sopralluogo",
      discoverServices: "Scopri i servizi",
      learnMore: "Approfondisci",
      viewProject: "Vedi il progetto",
      contactUs: "Contattaci",
      requestQuote: "Richiedi preventivo",
      archiveProjects: "Archivio progetti",
    },
    form: {
      name: "Nome e cognome",
      email: "Email",
      subject: "Oggetto",
      city: "Comune / località",
      message: "Messaggio",
      send: "Invia messaggio",
      sending: "Invio in corso…",
      success: "Messaggio inviato. Vi risponderemo al più presto.",
      error: "Invio non riuscito. Riprovate o scrivete a studio@pagnoni-s.com.",
      required: "Campo obbligatorio",
      privacyNote: "Inviando il modulo accettate la nostra informativa privacy.",
    },
    map: {
      consentTitle: "Mappa Google",
      consentBody: "Per mostrare la mappa carichiamo contenuti da Google. Serve il consenso ai cookie di terze parti.",
      loadMap: "Mostra la mappa",
    },
    langSwitchAria: "Lingua",
    langIt: "IT",
    langEn: "EN",
  },
  en: {
    skipToContent: "Skip to main content",
    nav: {
      about: "About",
      services: "Services",
      laserScanning: "Laser Scanning",
      projects: "Projects",
      contact: "Contact",
    },
    navAria: "Main menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    footerBlurb:
      "Architecture practice serving Franciacorta, the province of Brescia and Northern Italy — surveying, SLAM laser scanning, design and building procedures.",
    footerContactCta: "Contact us",
    footerNavAria: "Site links",
    footerOffice: "Office",
    footerHours: "Hours",
    privacy: "Privacy",
    cookie: {
      body: "Essential cookies keep the site working. Third-party services (maps and spam protection) load only with your consent.",
      necessary: "Essential only",
      acceptAll: "Accept all",
      preferences: "Cookie preferences",
    },
    cta: {
      requestSurvey: "Request a site visit",
      discoverServices: "Explore services",
      learnMore: "Learn more",
      viewProject: "View project",
      contactUs: "Contact us",
      requestQuote: "Request a quote",
      archiveProjects: "Project archive",
    },
    form: {
      name: "Full name",
      email: "Email",
      subject: "Subject",
      city: "Town / location",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. We will get back to you shortly.",
      error: "Could not send. Please try again or email studio@pagnoni-s.com.",
      required: "Required field",
      privacyNote: "By submitting this form you accept our privacy notice.",
    },
    map: {
      consentTitle: "Google Map",
      consentBody: "Showing the map loads content from Google and requires consent for third-party cookies.",
      loadMap: "Show map",
    },
    langSwitchAria: "Language",
    langIt: "IT",
    langEn: "EN",
  },
};

export function t(locale: Locale): UiMessages {
  return messages[locale];
}

export const navHrefs = [
  { key: "about" as const, href: "/chi-siamo" },
  { key: "services" as const, href: "/servizi" },
  { key: "laserScanning" as const, href: "/laser-scanner-slam" },
  { key: "projects" as const, href: "/progetti" },
  { key: "contact" as const, href: "/contatti" },
];
