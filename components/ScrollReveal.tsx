"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const REVEAL_CHILD_SELECTOR = ".reveal-title, .reveal-block, .reveal-faint, .reveal-block-solid";
/** Esclude hero home (`data-hero-motion`) — animato da framer-motion, non da ScrollReveal. */
const SECTION_ROOT_SELECTOR = "section.lazy-section, [data-hero-intro]:not([data-hero-motion])";

const STAGGER_MS = 72;
const STAGGER_CAP_MS = 480;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isBelowFold(el: Element) {
  return el.getBoundingClientRect().top > window.innerHeight * 0.94;
}

function revealSection(section: HTMLElement) {
  if (section.classList.contains("is-revealed")) return;
  section.classList.add("is-revealed");

  const items = section.querySelectorAll<HTMLElement>(REVEAL_CHILD_SELECTOR);
  items.forEach((el, index) => {
    if (el.classList.contains("is-revealed")) return;
    el.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, STAGGER_CAP_MS)}ms`);
    requestAnimationFrame(() => el.classList.add("is-revealed"));
  });
}

function resetRevealClasses() {
  document.documentElement.classList.remove("reveal-ready");
  document.querySelectorAll<HTMLElement>(SECTION_ROOT_SELECTOR).forEach((section) => {
    section.classList.remove("is-revealed");
  });
  document.querySelectorAll<HTMLElement>(REVEAL_CHILD_SELECTOR).forEach((el) => {
    el.classList.remove("is-revealed");
    el.style.removeProperty("--reveal-delay");
  });
}

/** Dopo hydration completa — non toccare il DOM prima. */
function afterFullHydration(cb: () => void) {
  const run = () => window.setTimeout(cb, 120);
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => run(), { timeout: 600 });
  } else if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}

export function ScrollReveal() {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    let cancelled = false;
    let sectionObserver: IntersectionObserver | null = null;
    let itemObserver: IntersectionObserver | null = null;

    const start = () => {
      if (cancelled) return;

      resetRevealClasses();

      if (prefersReducedMotion()) {
        document.querySelectorAll<HTMLElement>(REVEAL_CHILD_SELECTOR).forEach((el) => {
          el.classList.add("is-revealed");
        });
        document.querySelectorAll<HTMLElement>(SECTION_ROOT_SELECTOR).forEach((section) => {
          section.classList.add("is-revealed");
        });
        return;
      }

      document.documentElement.classList.add("reveal-ready");

      sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            revealSection(entry.target as HTMLElement);
            sectionObserver?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
      );

      itemObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            if (!el.classList.contains("is-revealed")) {
              el.style.setProperty("--reveal-delay", "0ms");
              requestAnimationFrame(() => el.classList.add("is-revealed"));
            }
            itemObserver?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );

      document.querySelectorAll<HTMLElement>(SECTION_ROOT_SELECTOR).forEach((section) => {
        if (section.classList.contains("is-revealed")) return;
        if (isBelowFold(section)) {
          sectionObserver?.observe(section);
          return;
        }
        revealSection(section);
      });

      document.querySelectorAll<HTMLElement>(REVEAL_CHILD_SELECTOR).forEach((el) => {
        if (el.classList.contains("is-revealed")) return;
        if (el.closest("[data-hero-motion]")) return;
        if (el.closest(SECTION_ROOT_SELECTOR)) return;
        if (isBelowFold(el)) {
          itemObserver?.observe(el);
          return;
        }
        el.style.setProperty("--reveal-delay", "0ms");
        el.classList.add("is-revealed");
      });
    };

    afterFullHydration(start);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduced = () => {
      if (!reducedMq.matches) return;
      sectionObserver?.disconnect();
      itemObserver?.disconnect();
      document.querySelectorAll<HTMLElement>(REVEAL_CHILD_SELECTOR).forEach((el) => {
        el.classList.add("is-revealed");
      });
    };
    reducedMq.addEventListener("change", onReduced);

    return () => {
      cancelled = true;
      sectionObserver?.disconnect();
      itemObserver?.disconnect();
      reducedMq.removeEventListener("change", onReduced);
      resetRevealClasses();
    };
  }, [pathname, hydrated]);

  return null;
}
