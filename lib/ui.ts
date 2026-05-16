const btnBase =
  "touch-no-hover-lift inline-flex min-h-[48px] touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-base font-semibold tracking-[0.01em] transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:transform-none sm:min-h-[44px] sm:text-sm";

/** CTA primario — .btn-cta-primary in globals.css (segnale mint on-brand). */
const btnPrimaryFill = `${btnBase} btn-cta-primary focus-visible:outline-none`;

export const ui = {
  pageBg: "bg-[var(--background)]",

  sectionSurfaceBase: "bg-[var(--background)]",
  sectionSurfaceMuted: "bg-[var(--muted)]",

  cardMedia:
    "interactive-card overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]",

  pageEyebrow: "section-kicker mb-3",
  pageTitleRule: "home-section-rule mb-8 sm:mb-10",
  innerCard: "frost-card p-5 sm:p-7 md:p-10",

  proseLink:
    "font-semibold text-[var(--primary-mid)] underline decoration-[var(--green-border)] underline-offset-2 transition-colors hover:text-[var(--foreground)]",

  body: "copy-rhythm text-[0.98rem] text-[var(--copy-body)] sm:text-[1.05rem]",
  bodyMuted: "text-[0.98rem] text-[var(--green-ink-muted)] sm:text-[1.05rem]",

  pageTitle: "section-title text-[1.85rem] text-[var(--foreground)] sm:text-4xl md:text-5xl",
  caseStudyTitle: "section-title text-[1.65rem] text-[var(--foreground)] sm:text-3xl md:text-4xl",
  sectionHeadingAccent: "section-title text-2xl text-[var(--foreground)]",
  gallerySectionTitle: "section-title text-xl text-[var(--foreground)] sm:text-2xl",
  cardHeading: "section-title text-xl text-[var(--foreground)] sm:text-2xl",
  headingBodyGap: "mb-4 sm:mb-5",

  btnPrimary: btnPrimaryFill,

  /** @deprecated Usa btnPrimary */
  btnFooterCta: btnPrimaryFill,

  btnOutline:
    `${btnBase} border border-[var(--green-border)] bg-transparent text-[var(--foreground)] hover:border-[var(--primary-mid)] hover:bg-[var(--card)] focus-visible:outline-[var(--primary)]/45`,

  /** @deprecated Usa btnPrimary */
  btnAccent: btnPrimaryFill,

  /** Hero home: stesso CTA, variante hero */
  btnHeroPrimary: `${btnPrimaryFill} btn-cta-primary--hero w-full text-[0.9375rem] sm:w-auto`,

  btnHeroGhost: `${btnBase} min-h-[52px] w-full border border-[var(--cta-ghost-border)] bg-[linear-gradient(180deg,var(--cta-ghost-bg-top)_0%,var(--cta-ghost-bg-bottom)_100%)] px-9 text-[0.9375rem] text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md [@media(hover:hover)]:hover:border-[color-mix(in_srgb,white_58%,transparent)] [@media(hover:hover)]:hover:bg-[linear-gradient(180deg,color-mix(in_srgb,white_22%,transparent)_0%,color-mix(in_srgb,white_11%,transparent)_100%)] [@media(hover:hover)]:hover:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_14px_32px_rgba(0,0,0,0.34)] [@media(hover:hover)]:hover:-translate-y-px active:translate-y-0 focus-visible:outline-white/50 sm:w-auto`,

  btnGhostOnDark:
    `${btnBase} border border-white/18 bg-transparent text-white hover:bg-white/[0.06] focus-visible:outline-white/35`,

  btnOnDark: `${btnBase} bg-white text-[var(--on-primary-hover)] hover:bg-[color-mix(in_srgb,white_88%,var(--primary-mid))] focus-visible:outline-white/50`,

  cookieAccept: `${btnPrimaryFill} min-h-[48px] flex-1 px-6 sm:flex-none sm:px-8`,

  cookieReject:
    `${btnBase} min-h-[48px] flex-1 border border-white/18 bg-transparent px-5 text-white hover:bg-white/[0.08] focus-visible:outline-white/35 sm:flex-none`,

  inputField:
    "w-full min-h-[48px] rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--green-ink-muted)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary)]/18 max-md:text-base sm:min-h-0",

  footerLink:
    "inline-flex min-h-[48px] touch-manipulation items-center py-2 text-base text-[var(--footer-link)] transition-colors duration-200 hover:text-[var(--footer-link-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45 sm:inline-block sm:min-h-0 sm:text-[0.92rem]",
} as const;
