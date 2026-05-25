"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isHomePath } from "@/lib/utils/isHomePath";
import { normalizePathname } from "@/lib/utils/normalizePathname";

/**
 * Intercetta i click su link interni e usa document.startViewTransition
 * quando disponibile (Chrome 111+, Edge) per transizioni tra pagine meno brusche.
 * Rispetta prefers-reduced-motion (navigazione immediata senza VT).
 */
export function ViewTransitionBridge() {
  const router = useRouter();

  useEffect(() => {
    const nav = (href: string) => {
      router.push(href);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const start = e.target instanceof Element ? e.target : (e.target as Node).parentElement;
      const anchor = start?.closest("a[href]");
      if (!anchor) return;

      if (anchor.hasAttribute("data-no-view-transition")) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) return;

      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const pathQuery = `${url.pathname}${url.search}`;
      const here = `${window.location.pathname}${window.location.search}`;
      if (pathQuery === here && url.hash) return;

      e.preventDefault();
      const dest = `${url.pathname}${url.search}${url.hash}`;

      const go = () => nav(dest);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
      /** Verso home: niente VT — evita che la bandiera della pagina precedente resti sopra al video. */
      const skipViewTransition = isHomePath(normalizePathname(url.pathname));

      if (!reduced && !skipViewTransition && typeof doc.startViewTransition === "function") {
        doc.startViewTransition(go);
      } else {
        go();
      }
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [router]);

  return null;
}
