"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = ".reveal-title, .reveal-block, .reveal-faint, .reveal-block-solid";
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

function markPending(el: HTMLElement) {
  if (!el.classList.contains("is-revealed")) el.classList.add("reveal-pending");
}

function revealItems(root: ParentNode) {
  const items = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  items.forEach((el, index) => {
    if (el.classList.contains("is-revealed")) return;
    el.classList.remove("reveal-pending");
    el.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, STAGGER_CAP_MS)}ms`);
    requestAnimationFrame(() => {
      el.classList.add("is-revealed");
    });
  });
  if (root instanceof HTMLElement) root.classList.add("is-revealed");
}

export function ScrollReveal() {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (prefersReducedMotion()) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealItems(entry.target);
          sectionObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (!el.classList.contains("is-revealed")) {
            el.classList.remove("reveal-pending");
            el.style.setProperty("--reveal-delay", "0ms");
            requestAnimationFrame(() => el.classList.add("is-revealed"));
          }
          itemObserver.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const bind = () => {
      document.querySelectorAll<HTMLElement>(SECTION_ROOT_SELECTOR).forEach((section) => {
        if (section.classList.contains("is-revealed")) return;
        if (isBelowFold(section)) {
          section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(markPending);
          sectionObserver.observe(section);
          return;
        }
        revealItems(section);
      });

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.classList.contains("is-revealed")) return;
        if (el.closest("[data-hero-motion]")) return;
        if (el.closest(SECTION_ROOT_SELECTOR)) return;
        if (isBelowFold(el)) {
          markPending(el);
          itemObserver.observe(el);
          return;
        }
        el.style.setProperty("--reveal-delay", "0ms");
        el.classList.add("is-revealed");
      });
    };

    bind();

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduced = () => {
      if (!reducedMq.matches) return;
      sectionObserver.disconnect();
      itemObserver.disconnect();
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        el.classList.add("is-revealed");
      });
    };
    reducedMq.addEventListener("change", onReduced);

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
      reducedMq.removeEventListener("change", onReduced);
    };
  }, [pathname, hydrated]);

  return null;
}
