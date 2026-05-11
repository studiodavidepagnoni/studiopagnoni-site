"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const brandMarkRef = useRef<HTMLDivElement>(null);
  const brandLineRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const headerRootRef = useRef<HTMLElement | null>(null);
  const [brandMarkPx, setBrandMarkPx] = useState<number>(56);

  /** Lato del quadrato (border-box): altezza testo + padding/bordo, così il disegno interno non resta più piccolo delle scritte. */
  const syncBrandMark = useCallback(() => {
    const textEl = brandTextRef.current;
    const markEl = brandMarkRef.current;
    if (!textEl || !markEl) return;
    const h = textEl.getBoundingClientRect().height;
    if (h <= 1) return;
    const cs = getComputedStyle(markEl);
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    setBrandMarkPx(Math.round(h + padY + borderY));
  }, []);

  /**
   * Calibra il letter-spacing del wordmark visivo «Studio Pagnoni» (maiuscole via CSS)
   * alla larghezza della tagline: non deve MAI superarla (evita overflow a destra).
   * Ricerca binaria su letter-spacing — il modello lineare (delta/gaps) sovrastimava.
   */
  const calibrateBrandTracking = useCallback(() => {
    const brand = brandLineRef.current;
    const tagline = taglineRef.current;
    if (!brand || !tagline) return;

    const taglineW = tagline.getBoundingClientRect().width;
    if (taglineW <= 1) return;

    const measureBrand = () => brand.getBoundingClientRect().width;

    brand.style.letterSpacing = "0px";
    const w0 = measureBrand();
    if (w0 >= taglineW - 0.35) {
      brand.style.letterSpacing = "0px";
      return;
    }

    let lo = 0;
    let hi = 1;
    brand.style.letterSpacing = `${hi}px`;
    while (measureBrand() < taglineW && hi < 32) {
      lo = hi;
      hi = Math.min(32, hi * 2);
      brand.style.letterSpacing = `${hi}px`;
    }
    if (measureBrand() <= taglineW) {
      brand.style.letterSpacing = `${hi}px`;
      return;
    }

    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2;
      brand.style.letterSpacing = `${mid}px`;
      if (measureBrand() <= taglineW) lo = mid;
      else hi = mid;
    }
    brand.style.letterSpacing = `${lo}px`;
  }, []);

  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const textEl = brandTextRef.current;
    const markEl = brandMarkRef.current;
    if (!textEl) return;
    const apply = () => {
      syncBrandMark();
      calibrateBrandTracking();
    };
    const ro = new ResizeObserver(apply);
    ro.observe(textEl);
    if (markEl) ro.observe(markEl);
    apply();
    void document.fonts.ready.then(apply);
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [syncBrandMark, calibrateBrandTracking]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  /** Altezza sticky header (logo/nav + barra progresso) → drawer mobile sotto la barra intera. */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const el = headerRootRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      root.style.setProperty("--site-header-offset", "5rem");
      return;
    }
    const apply = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) root.style.setProperty("--site-header-offset", `${Math.round(h)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--site-header-offset");
    };
  }, []);

  const headerSurface = scrolled ? "bg-[var(--header-surface-scrolled)]" : "bg-[var(--header-surface)]";

  return (
    <>
      <header
        ref={headerRootRef}
        className={`sticky top-0 z-[1000] flex flex-col border-b border-[var(--header-border)] transition-colors duration-200 ${headerSurface} backdrop-blur-xl`}
      >
        <div className={`shrink-0 shadow-[0_1px_0_var(--accent-glow-14)] ${layoutGutterXClass}`}>
          <div className={`flex min-h-[68px] items-center justify-between gap-3 py-2 sm:min-h-[76px] md:min-h-[80px] ${layoutContentMaxClass}`}>
            <Link
              href="/"
              className="group flex min-w-0 shrink items-center gap-x-2.5 sm:gap-x-4"
              aria-label={`${site.name} — home`}
              title={`${site.name} — home`}
            >
              {/* Container quadrato (lato = altezza testo). L'asset SVG è già square con icona centrata, quindi nessuna cornice/padding. */}
              <div
                ref={brandMarkRef}
                className="box-border flex shrink-0 items-center justify-center"
                style={{ width: brandMarkPx, height: brandMarkPx }}
              >
                {/* Filtri schiariti sul chrome scuro; hover leggermente più luminoso. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG marchio */}
                <img
                  src="/logo-mark.svg?v=15"
                  alt=""
                  width={616}
                  height={616}
                  className="h-full w-full object-contain opacity-100 brightness-[2.55] saturate-[1.22] contrast-[1.08] drop-shadow-[0_0_14px_color-mix(in_srgb,var(--header-accent)_38%,transparent)] transition-[filter] duration-200 group-hover:brightness-[2.85] group-hover:saturate-[1.28] group-hover:drop-shadow-[0_0_18px_color-mix(in_srgb,var(--header-accent)_48%,transparent)]"
                  aria-hidden
                />
              </div>
              {/* Wordmark in maiuscolo (CSS); letter-spacing impostato da calibrateBrandTracking ≈ larghezza tagline. */}
              <div ref={brandTextRef} className="flex min-w-0 flex-col items-start gap-y-1.5 sm:gap-y-2">
                <span
                  ref={brandLineRef}
                  className={`${fontDisplay.className} text-[1.1rem] font-bold uppercase leading-none text-[var(--header-text)] sm:text-[1.35rem] md:text-[1.6rem]`}
                >
                  Studio Pagnoni
                </span>
                <span
                  ref={taglineRef}
                  className={`${fontDisplay.className} text-[0.55rem] font-normal uppercase leading-snug tracking-[0.18em] text-[var(--header-text-muted)] sm:text-[0.6rem] sm:tracking-[0.2em] md:text-[0.65rem]`}
                >
                  Topografia · Architettura · SLAM
                </span>
              </div>
            </Link>

            <nav className="hidden shrink-0 md:block" aria-label="Menu principale">
              <ul className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 lg:gap-x-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${fontSans.className} relative px-3 py-2 text-[0.9rem] font-medium text-[var(--header-text)]/90 transition after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--header-accent)] after:transition after:content-[''] hover:text-[var(--header-accent)] hover:after:scale-x-100`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--header-border)] bg-[var(--header-control-bg)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="w-full shrink-0 border-t border-[var(--header-border)]/55">
          <ReadingProgressBar />
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed bottom-0 right-0 top-[var(--site-header-offset,5rem)] z-[999] flex w-[min(100%,22rem)] flex-col border-l border-[var(--header-border)] bg-[var(--header-menu-surface)] shadow-[-12px_0_40px_color-mix(in_srgb,var(--surface-chrome)_58%,transparent)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className={`flex flex-1 flex-col overflow-y-auto pt-4 ${layoutGutterXClass}`}>
          <p className={`${fontDisplay.className} text-base font-medium text-[var(--header-text)]`}>{site.name}</p>
          <p className={`${fontSans.className} mb-4 mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--header-text-muted)]`}>Menu</p>
          <ul className="flex flex-col gap-0.5 pb-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${fontSans.className} block border-b border-[var(--header-border)] py-4 text-lg font-medium text-[var(--header-text)] transition hover:text-[var(--header-accent)]`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label="Chiudi menu"
        className={`fixed inset-0 z-[998] bg-[color-mix(in_srgb,var(--surface-chrome)_52%,transparent)] transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
