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
   * Calibra il letter-spacing del wordmark "Studio Pagnoni" per portarne la
   * larghezza ≈ alla tagline sotto, così bordi sx (Studio↔Topografia) e dx
   * (Pagnoni↔SLAM) coincidono pixel-perfect.
   *
   * Approccio iterativo: i browser possono aggiungere letter-spacing anche dopo
   * l'ultimo glyph (e/o gestire kerning + subpixel diversi), quindi una formula
   * chiusa "naïf" può lasciare 1-2px di errore. Misuriamo, applichiamo, poi
   * correggiamo il delta. Converge in 1-2 cicli.
   */
  const calibrateBrandTracking = useCallback(() => {
    const brand = brandLineRef.current;
    const tagline = taglineRef.current;
    if (!brand || !tagline) return;
    brand.style.letterSpacing = "0px";
    const taglineW = tagline.getBoundingClientRect().width;
    if (taglineW <= 1) return;
    const text = brand.textContent ?? "";
    const gaps = Math.max(text.length - 1, 1);
    let spacing = 0;
    for (let i = 0; i < 4; i++) {
      const w = brand.getBoundingClientRect().width;
      const delta = taglineW - w;
      if (Math.abs(delta) < 0.5) break;
      spacing = Math.max(0, spacing + delta / gaps);
      brand.style.letterSpacing = `${spacing}px`;
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const textEl = brandTextRef.current;
    const markEl = brandMarkRef.current;
    if (!textEl) return;
    const ro = new ResizeObserver(() => syncBrandMark());
    ro.observe(textEl);
    if (markEl) ro.observe(markEl);
    syncBrandMark();
    void document.fonts.ready.then(syncBrandMark);
    return () => ro.disconnect();
  }, [syncBrandMark]);

  useLayoutEffect(() => {
    calibrateBrandTracking();
    // I Google Font (Sora) caricano async → ricalibriamo a font ready.
    void document.fonts?.ready.then(calibrateBrandTracking);
    // Su resize cambiano i breakpoint Tailwind del wordmark/tagline → ricalibra.
    const onResize = () => calibrateBrandTracking();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calibrateBrandTracking]);

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

  const headerSurface = scrolled ? "bg-[var(--header-surface-scrolled)]" : "bg-[var(--header-surface)]";

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] border-b border-[var(--header-border)] transition-colors duration-200 ${headerSurface} shadow-[0_1px_0_rgba(0,0,0,0.35)] backdrop-blur-xl`}
      >
        <div className={layoutGutterXClass}>
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
                {/* brightness-[1.75] schiarisce il teal #0f766e → ~#1acfc1 sull'header dark, senza alterare l'hue. Stesso trattamento nel footer (sfondo scuro), chi-siamo resta col color naturale (sfondo chiaro). */}
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG marchio */}
                <img
                  src="/logo-mark.svg?v=15"
                  alt=""
                  width={616}
                  height={616}
                  className="h-full w-full object-contain opacity-[0.96] brightness-[1.75] transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </div>
              {/* Brand "Studio Pagnoni" mixed case font-medium come l'hero. Il letter-spacing è calibrato a runtime via calibrateBrandTracking() per portare la width ≈ tagline; items-end mantiene il bordo destro allineato. */}
              <div ref={brandTextRef} className="flex min-w-0 flex-col items-end gap-y-1.5 sm:gap-y-2">
                <span
                  ref={brandLineRef}
                  className={`${fontDisplay.className} text-[1.1rem] font-medium leading-none text-[var(--header-text)] sm:text-[1.35rem] md:text-[1.6rem]`}
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
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--green-border-muted)] bg-[var(--card)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
        <ReadingProgressBar />
      </header>

      <div
        id="mobile-nav"
        className={`fixed bottom-0 right-0 top-[4.75rem] z-[999] flex w-[min(100%,22rem)] flex-col border-l border-[var(--green-border-muted)] bg-[var(--card)] shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className={`flex flex-1 flex-col overflow-y-auto pt-4 ${layoutGutterXClass}`}>
          <p className={`${fontDisplay.className} text-base font-medium text-[var(--foreground)]`}>{site.name}</p>
          <p className={`${fontSans.className} mb-4 mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--green-ink-muted)]`}>Menu</p>
          <ul className="flex flex-col gap-0.5 pb-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${fontSans.className} block border-b border-[var(--green-border-muted)] py-4 text-lg font-medium text-[var(--foreground)] transition hover:text-[var(--primary-mid)]`}
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
        className={`fixed inset-0 z-[998] bg-[#0c0a09]/40 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
