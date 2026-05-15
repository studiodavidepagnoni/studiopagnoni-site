"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const brandMarkRef = useRef<HTMLDivElement>(null);
  const brandLineRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const headerRootRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileNavRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const menuTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wasMenuOpenRef = useRef(false);
  const [brandMarkPx, setBrandMarkPx] = useState<number>(56);

  const onMobileNavTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!open) return;
      const touch = e.touches[0];
      menuTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [open],
  );

  const onMobileNavTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = menuTouchStartRef.current;
      menuTouchStartRef.current = null;
      if (!open || !start) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (dx > 72 && dx > Math.abs(dy) * 1.2) setOpen(false);
    },
    [open],
  );

  const syncBrandMark = useCallback(() => {
    const textEl = brandTextRef.current;
    const markEl = brandMarkRef.current;
    if (!textEl || !markEl) return;
    const height = textEl.getBoundingClientRect().height;
    if (height <= 1) return;
    const styles = getComputedStyle(markEl);
    const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const borderY = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    setBrandMarkPx(Math.round(height + padY + borderY));
  }, []);

  const calibrateBrandTracking = useCallback(() => {
    const brand = brandLineRef.current;
    const tagline = taglineRef.current;
    if (!brand || !tagline) return;

    const taglineWidth = tagline.getBoundingClientRect().width;
    if (taglineWidth <= 1) return;

    const measureBrand = () => brand.getBoundingClientRect().width;

    brand.style.letterSpacing = "0px";
    const baseWidth = measureBrand();
    if (baseWidth >= taglineWidth - 0.35) {
      brand.style.letterSpacing = "0px";
      return;
    }

    let low = 0;
    let high = 1;
    brand.style.letterSpacing = `${high}px`;
    while (measureBrand() < taglineWidth && high < 32) {
      low = high;
      high = Math.min(32, high * 2);
      brand.style.letterSpacing = `${high}px`;
    }

    if (measureBrand() <= taglineWidth) {
      brand.style.letterSpacing = `${high}px`;
      return;
    }

    for (let i = 0; i < 28; i += 1) {
      const mid = (low + high) / 2;
      brand.style.letterSpacing = `${mid}px`;
      if (measureBrand() <= taglineWidth) low = mid;
      else high = mid;
    }

    brand.style.letterSpacing = `${low}px`;
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

    const observer = new ResizeObserver(apply);
    observer.observe(textEl);
    if (markEl) observer.observe(markEl);
    apply();
    void document.fonts.ready.then(apply);

    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [calibrateBrandTracking, syncBrandMark]);

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

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => firstMobileNavRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const nav = mobileNavRef.current;
    const focusableSelector =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

    const listFocusables = () => {
      if (!nav) return [] as HTMLElement[];
      return Array.from(nav.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetWidth > 0 && el.offsetHeight > 0,
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const list = listFocusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | undefined;
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (wasMenuOpenRef.current && !open) {
      menuButtonRef.current?.focus({ preventScroll: true });
    }
    wasMenuOpenRef.current = open;
  }, [open]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const headerEl = headerRootRef.current;
    if (!headerEl || typeof ResizeObserver === "undefined") {
      root.style.setProperty("--site-header-offset", "5rem");
      return;
    }

    const apply = () => {
      const height = headerEl.getBoundingClientRect().height;
      if (height > 0) root.style.setProperty("--site-header-offset", `${Math.round(height)}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(headerEl);
    window.addEventListener("resize", apply, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--site-header-offset");
    };
  }, []);

  const headerSurface = scrolled ? "bg-[var(--header-surface-scrolled)]" : "bg-[var(--header-surface)]";

  return (
    <>
      <header
        ref={headerRootRef}
        className={`sticky top-0 z-[1000] flex flex-col border-b border-[var(--header-border)] pt-[env(safe-area-inset-top,0px)] transition-colors duration-200 ${headerSurface}`}
      >
        <div
          className={`${layoutGutterXClass} max-md:ps-[max(1rem,env(safe-area-inset-left,0px))] max-md:pe-[max(1rem,env(safe-area-inset-right,0px))]`}
        >
          <div className={`flex min-h-[68px] items-center justify-between gap-3 py-2 sm:min-h-[76px] md:min-h-[80px] ${layoutContentMaxClass}`}>
            <Link
              href="/"
              className="group flex min-w-0 shrink items-center gap-x-2.5 sm:gap-x-4"
              aria-label={`${site.name} — home`}
              title={`${site.name} — home`}
            >
              <div
                ref={brandMarkRef}
                className="box-border flex shrink-0 items-center justify-center"
                style={{ width: brandMarkPx, height: brandMarkPx }}
              >
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

              <div ref={brandTextRef} className="flex min-w-0 flex-col items-start gap-y-1.5 sm:gap-y-2">
                <span
                  ref={brandLineRef}
                  className={`${fontDisplay.className} text-[1.1rem] font-bold uppercase leading-none text-[var(--header-text)] transition-[filter] duration-200 group-hover:brightness-110 group-hover:saturate-110 group-hover:contrast-105 group-hover:drop-shadow-[0_0_14px_color-mix(in_srgb,var(--header-accent)_38%,transparent)] sm:text-[1.35rem] md:text-[1.6rem]`}
                >
                  Studio Pagnoni
                </span>
                <span
                  ref={taglineRef}
                  className={`${fontDisplay.className} text-[0.55rem] font-normal uppercase leading-snug tracking-[0.18em] text-[var(--header-text-muted)] transition-[filter,color] duration-200 group-hover:brightness-110 group-hover:saturate-110 group-hover:text-[color-mix(in_srgb,var(--header-text)_78%,var(--header-text-muted))] group-hover:drop-shadow-[0_0_12px_color-mix(in_srgb,var(--header-accent)_32%,transparent)] sm:text-[0.6rem] sm:tracking-[0.2em] md:text-[0.65rem]`}
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
              ref={menuButtonRef}
              type="button"
              className="flex h-11 w-11 shrink-0 touch-manipulation flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--header-border)] bg-[var(--header-control-bg)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--header-text)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        <div className="w-full shrink-0 border-t border-[var(--header-border)]/55">
          <ReadingProgressBar />
        </div>
      </header>

      <nav
        ref={mobileNavRef}
        id="mobile-nav"
        aria-label="Menu principale"
        aria-hidden={!open}
        inert={!open}
        onTouchStart={onMobileNavTouchStart}
        onTouchEnd={onMobileNavTouchEnd}
        className={`fixed bottom-0 right-0 top-[var(--site-header-offset,5rem)] z-[999] flex w-[min(100%,22rem)] flex-col border-l border-[var(--header-border)] bg-[var(--header-menu-surface)] shadow-[-10px_0_32px_rgba(0,0,0,0.22)] ease-out motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto overscroll-y-contain px-[max(1rem,env(safe-area-inset-left,0px))] pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-5">
          <p className={`${fontDisplay.className} text-base font-medium text-[var(--header-text)]`}>{site.name}</p>
          <p className={`${fontSans.className} mb-5 mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--header-text-muted)]`}>
            Menu
          </p>
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstMobileNavRef : undefined}
                  href={item.href}
                  className={`${fontSans.className} flex min-h-[48px] items-center border-b border-[var(--header-border)] py-2 text-lg font-medium text-[var(--header-text)] transition hover:text-[var(--header-accent)] touch-manipulation`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Chiudi menu"
        tabIndex={-1}
        className={`fixed inset-0 z-[998] touch-manipulation bg-[rgba(2,8,7,0.54)] motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
