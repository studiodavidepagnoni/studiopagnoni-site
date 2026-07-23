"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { withBasePath } from "@/lib/utils/basePath";
import { fontNav, fontSans } from "@/lib/fonts";
import { isHomePath } from "@/lib/utils/isHomePath";
import { isNavItemActive } from "@/lib/utils/navActive";
import { resolveStaticPageHero } from "@/lib/config/pageHeroConfig";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/config/site";

/** Scroll: menu principale si nasconde con slide progressivo (home e pagine interne). */
const HEADER_HIDE_RANGE_PX = 140;
const HEADER_HIDE_START_PX = 8;
const PAGE_HERO_OVERLAY_TAIL_PX = 72;
/** Fallback finché non misuriamo `[data-page-hero]` (evita header opaco al primo paint). */
const PAGE_HERO_OVERLAY_FALLBACK_PX = 360;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const headerRootRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileNavRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const menuTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wasMenuOpenRef = useRef(false);
  const [pageHeroOverlayEnd, setPageHeroOverlayEnd] = useState(0);

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

  useEffect(() => {
    let frameId: number | null = null;
    const updateScrollY = () => {
      frameId = null;
      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrollY);
    };

    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const staticPageHero = !isHome ? resolveStaticPageHero(pathname) : null;
  const hasDynamicProjectHero = !isHome && Boolean(pathname?.startsWith("/progetti/"));
  const hasPageHero = Boolean(staticPageHero) || hasDynamicProjectHero;

  useEffect(() => {
    if (!hasPageHero) {
      setPageHeroOverlayEnd(0);
      return;
    }

    let frameId: number | null = null;
    const measure = () => {
      frameId = null;
      const el = document.querySelector("[data-page-hero]");
      if (!el) {
        setPageHeroOverlayEnd(0);
        return;
      }
      const height = el.getBoundingClientRect().height;
      setPageHeroOverlayEnd(Math.max(0, Math.round(height - PAGE_HERO_OVERLAY_TAIL_PX)));
    };
    const schedule = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("resize", schedule, { passive: true });
    const heroEl = document.querySelector("[data-page-hero]");
    const observer =
      heroEl && typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (heroEl && observer) observer.observe(heroEl);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [pathname, hasPageHero]);

  const hideProgress = clamp01((scrollY - HEADER_HIDE_START_PX) / HEADER_HIDE_RANGE_PX);
  const overlayScrollEnd =
    pageHeroOverlayEnd > 0 ? pageHeroOverlayEnd : hasPageHero ? PAGE_HERO_OVERLAY_FALLBACK_PX : 0;
  const isOverlay =
    hideProgress < 1 && (isHome || (hasPageHero && scrollY < overlayScrollEnd));
  const headerHidden = hideProgress >= 1;

  useEffect(() => {
    if (hideProgress > 0.12 && open) setOpen(false);
  }, [hideProgress, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      return Array.from(nav.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => {
        if (el.hasAttribute("disabled")) return false;
        // Evita offsetWidth/Height (forced reflow): checkVisibility quando c’è, altrimenti tutti i candidati.
        if (typeof el.checkVisibility === "function") {
          return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
        }
        return true;
      });
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

  // Altezza header → CSS var una sola volta (ResizeObserver). Non ricalcolare a ogni hideProgress/scroll:
  // altrimenti getBoundingClientRect in useLayoutEffect forza reflow sul critical path.
  useEffect(() => {
    const root = document.documentElement;
    const headerEl = headerRootRef.current;
    if (!headerEl || typeof ResizeObserver === "undefined") {
      root.style.setProperty("--site-header-offset", "5rem");
      return;
    }

    let frameId: number | null = null;
    const apply = () => {
      frameId = null;
      const height = headerEl.getBoundingClientRect().height;
      if (height <= 0) return;
      root.style.setProperty("--site-header-offset", `${Math.round(height)}px`);
    };
    const schedule = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(apply);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(headerEl);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      root.style.removeProperty("--site-header-offset");
    };
  }, []);

  const headerSurface = "bg-[var(--header-surface-scrolled)]";
  const headerPosition = "fixed inset-x-0 top-0";
  const headerChrome = isOverlay
    ? "border-0 bg-[linear-gradient(180deg,rgba(4,10,9,0.62)_0%,rgba(4,10,9,0.2)_40%,rgba(4,10,9,0)_88%)] shadow-none"
    : `border-b border-[var(--header-border)] ${headerSurface} shadow-[0_10px_32px_rgba(0,0,0,0.14)]`;

  const headerHideStyle: CSSProperties = {
    transform: `translate3d(0, ${-hideProgress * 100}%, 0)`,
    opacity: 1 - hideProgress * 0.92,
    pointerEvents: hideProgress >= 1 ? "none" : "auto",
    visibility: hideProgress >= 1 ? "hidden" : "visible",
  };

  const navLinkClass = `${fontNav.className} site-nav-link site-nav-link--header inline-flex items-center px-3 py-1 text-[16px] font-bold uppercase leading-[28px] tracking-normal text-[var(--header-nav-text)]`;
  const mobileNavLinkClass = `${fontNav.className} site-nav-link site-nav-link--mobile flex min-h-[48px] items-center border-b border-[var(--header-border)] py-2 text-[16px] font-bold uppercase leading-[28px] tracking-normal text-[var(--header-nav-text)] touch-manipulation`;

  const menuButtonClass = isOverlay
    ? "border-white/22 bg-white/[0.06] hover:bg-white/[0.1]"
    : "border-[var(--header-border)] bg-[var(--header-control-bg)]";

  return (
    <>
      <header
        ref={headerRootRef}
        data-header-overlay={isOverlay ? "true" : undefined}
        aria-hidden={headerHidden}
        style={headerHideStyle}
        className={`${headerPosition} z-[1000] flex flex-col pt-[env(safe-area-inset-top,0px)] will-change-transform transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${headerChrome}`}
      >
        <div
          className={`${layoutGutterXClass} max-md:ps-[max(1rem,env(safe-area-inset-left,0px))] max-md:pe-[max(1rem,env(safe-area-inset-right,0px))]`}
        >
          <div className={`flex min-h-[72px] items-center justify-between gap-3 py-2 sm:min-h-[84px] md:min-h-[96px] ${layoutContentMaxClass}`}>
            <Link
              href="/"
              className="group flex min-w-0 max-w-[min(100%,25.3rem)] shrink items-center sm:max-w-[29.9rem] md:max-w-[34.5rem]"
              aria-label={`${site.name} — home`}
              title={`${site.name} — home`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- lockup SVG (icona + wordmark) */}
              <img
                src={`${withBasePath("/logo-lockup.svg")}?v=22`}
                alt=""
                width={1485}
                height={300}
                fetchPriority="low"
                decoding="async"
                className="site-brand-lockup-img h-[3.91rem] w-auto max-w-full object-contain object-left sm:h-[4.6rem] md:h-[5.06rem]"
                aria-hidden
              />
            </Link>

            <nav
              className="site-header-nav hidden h-[3.91rem] shrink-0 items-center sm:h-[4.6rem] md:flex md:h-[5.06rem]"
              aria-label="Menu principale"
            >
              <ul className="site-header-nav__list flex h-full flex-wrap items-center justify-end gap-y-2">
                {navItems.map((item, index) => {
                  const active = isNavItemActive(pathname, item.href);
                  const isLast = index === navItems.length - 1;
                  return (
                    <li key={item.href} className="flex h-full items-center">
                      <Link
                        href={item.href}
                        className={`${navLinkClass}${isLast ? " site-nav-link--last" : ""}${active ? " site-nav-link--active" : ""}`}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              className={`flex min-h-[48px] min-w-[48px] shrink-0 touch-manipulation flex-col items-center justify-center gap-1.5 rounded-md border md:hidden ${menuButtonClass}`}
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
          <p className={`${fontSans.className} mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--header-text-muted)]`}>
            Menu
          </p>
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              const active = isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstMobileNavRef : undefined}
                    href={item.href}
                    className={`${mobileNavLinkClass}${active ? " site-nav-link--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {open ? (
        <button
          type="button"
          aria-label="Chiudi menu"
          tabIndex={-1}
          className="fixed inset-0 z-[998] touch-manipulation bg-[rgba(2,8,7,0.54)] motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none md:hidden opacity-100"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
