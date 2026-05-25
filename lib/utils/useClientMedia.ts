"use client";

import { useSyncExternalStore } from "react";
import { networkInformation, prefersSaveData } from "@/lib/utils/connection";

/** Desktop con puntatore fine: abilita video hero. */
export const HERO_VIDEO_MEDIA_QUERY = "(min-width: 1025px) and (hover: hover)";

/** Layout compatto (testi, timing Ken Burns). */
export const HERO_MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function subscribeMediaQuery(query: string, onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Valore allineato SSR (snapshot) e client al primo paint — evita hydration mismatch. */
export function useMediaQuery(query: string, serverMatches = false): boolean {
  return useSyncExternalStore(
    (onChange) => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverMatches,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function usePrefersSaveData(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const conn = networkInformation();
      if (!conn?.addEventListener) return () => {};
      conn.addEventListener("change", onChange);
      return () => conn.removeEventListener?.("change", onChange);
    },
    () => prefersSaveData(),
    () => false,
  );
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function usePageVisible(): boolean {
  return useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
}
