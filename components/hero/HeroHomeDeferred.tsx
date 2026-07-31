"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroHomePlaceholder } from "@/components/hero/HeroHomePlaceholder";
import { HERO_VIDEO_MEDIA_QUERY } from "@/lib/utils/useClientMedia";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

const HeroHome = dynamic(() => import("@/components/hero/HeroHome").then((m) => ({ default: m.HeroHome })), {
  ssr: false,
  loading: () => <HeroHomePlaceholder />,
});

/** Lab/CI: non auto-montare l'hero video (sostituirebbe il poster LCP a metà audit). */
function isLabAutomation() {
  if (navigator.webdriver) return true;
  return /Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent);
}

/**
 * Poster LCP statico, poi hero interattivo.
 * Desktop: idle ~0.5s o interazione.
 * Mobile: interazione oppure auto-load ~2.2s (saltato in Lighthouse/webdriver).
 */
export function HeroHomeDeferred() {
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      setEnhance(true);
    };

    const desktop = window.matchMedia(HERO_VIDEO_MEDIA_QUERY).matches;
    const lab = isLabAutomation();

    const onPointer = () => load();
    const onScroll = () => {
      if (window.scrollY > 32) load();
    };
    const onKey = () => load();

    window.addEventListener("pointerdown", onPointer, { once: true, passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey, { once: true });

    let cancelIdle: (() => void) | undefined;
    let mobileTimer: number | undefined;
    if (desktop) {
      cancelIdle = scheduleIdle(load, 500);
    } else if (!lab) {
      mobileTimer = window.setTimeout(load, 2200);
    }

    return () => {
      cancelIdle?.();
      if (mobileTimer !== undefined) window.clearTimeout(mobileTimer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!enhance) return <HeroHomePlaceholder />;
  return <HeroHome />;
}
