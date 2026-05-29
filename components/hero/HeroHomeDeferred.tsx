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
 * Mobile/tablet: poster AVIF/WebP statico (zero bundle hero).
 * Desktop: carousel+video solo dopo interazione o fallback idle tardivo.
 */
export function HeroHomeDeferred() {
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(HERO_VIDEO_MEDIA_QUERY);
    if (!desktop.matches) return;

    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      setEnhance(true);
    };

    const cancelIdle = scheduleIdle(load, 10_000);

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
