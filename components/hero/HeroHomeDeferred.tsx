"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroHomePlaceholder } from "@/components/hero/HeroHomePlaceholder";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

const HeroHome = dynamic(() => import("@/components/hero/HeroHome").then((m) => ({ default: m.HeroHome })), {
  ssr: false,
  loading: () => <HeroHomePlaceholder />,
});

/**
 * Poster AVIF/WebP statico come LCP, poi hero interattivo.
 * Mobile: video singolo (3° slide). Desktop: carousel completo.
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

    const cancelIdle = scheduleIdle(load, 500);

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
