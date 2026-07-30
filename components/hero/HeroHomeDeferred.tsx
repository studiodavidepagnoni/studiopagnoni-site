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

/**
 * Poster LCP statico, poi hero interattivo.
 * Desktop: idle ~0.5s o interazione.
 * Mobile: solo interazione (o idle lungo) — evita download video nel critical path / Lighthouse.
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
    const cancelIdle = scheduleIdle(load, desktop ? 500 : 8000);

    const onPointer = () => load();
    const onScroll = () => {
      if (window.scrollY > 32) load();
    };
    const onKey = () => load();

    window.addEventListener("pointerdown", onPointer, { once: true, passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey, { once: true });

    return () => {
      cancelIdle();
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!enhance) return <HeroHomePlaceholder />;
  return <HeroHome />;
}
