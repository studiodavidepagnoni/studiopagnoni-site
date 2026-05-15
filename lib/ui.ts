const btnBase =
  "inline-flex min-h-[44px] touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none";

export const ui = {
  pageBg: "bg-[var(--background)]",

  sectionSurfaceBase: "bg-[var(--background)]",
  sectionSurfaceMuted: "bg-[var(--muted)]",

  cardMedia:
    "overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] transition-colors duration-200 hover:border-[var(--green-border)] hover:bg-[var(--elevated)]",

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

  btnPrimary:
    `${btnBase} bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-strong)] focus-visible:outline-[var(--primary-mid)]/45`,

  btnFooterCta:
    `${btnBase} bg-[var(--primary-mid)] text-[#05110f] hover:bg-[var(--primary-mid-strong)] focus-visible:outline-[var(--primary-mid)]/55`,

  btnOutline:
    `${btnBase} border border-[var(--green-border)] bg-transparent text-[var(--foreground)] hover:border-[var(--primary-mid)] hover:bg-[var(--card)] focus-visible:outline-[var(--primary)]/45`,

  btnAccent:
    `${btnBase} bg-[var(--accent-warm)] text-[#0a0a0a] hover:bg-[var(--accent-warm-strong)] focus-visible:outline-[var(--accent-warm)]/45`,

  btnHeroPrimary:
    `${btnBase} min-h-[48px] w-full bg-[var(--accent-warm)] px-8 text-[#0a0a0a] hover:bg-[var(--accent-warm-strong)] focus-visible:outline-[var(--accent-warm)]/45 sm:w-auto`,

  btnHeroGhost:
    `${btnBase} min-h-[48px] w-full border border-white/18 bg-white/[0.03] px-8 text-white hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-white/35 sm:w-auto`,

  btnGhostOnDark:
    `${btnBase} border border-white/18 bg-transparent text-white hover:bg-white/[0.06] focus-visible:outline-white/35`,

  btnOnDark: `${btnBase} bg-white text-[#0a0a0a] hover:bg-stone-200 focus-visible:outline-white/50`,

  cookieAccept:
    `${btnBase} min-h-[48px] flex-1 bg-[var(--primary)] px-6 text-[var(--on-primary)] hover:bg-[var(--primary-strong)] focus-visible:outline-[var(--primary-mid)]/45 sm:flex-none sm:px-8`,

  cookieReject:
    `${btnBase} min-h-[48px] flex-1 border border-white/18 bg-transparent px-5 text-white hover:bg-white/[0.08] focus-visible:outline-white/35 sm:flex-none`,

  inputField:
    "w-full rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--green-ink-muted)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary)]/18",

  footerLink:
    "inline-block py-2 text-[0.92rem] text-[var(--footer-link)] transition-colors duration-200 hover:text-[var(--footer-link-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45",
} as const;
