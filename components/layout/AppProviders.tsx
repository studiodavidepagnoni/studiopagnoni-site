"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { HERO_VIDEO_MEDIA_QUERY } from "@/lib/utils/useClientMedia";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

const ViewTransitionBridge = dynamic(
  () => import("@/components/layout/ViewTransitionBridge").then((m) => ({ default: m.ViewTransitionBridge })),
  { ssr: false },
);

const ScrollReveal = dynamic(
  () => import("@/components/ScrollReveal").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false },
);

export function AppProviders({ children }: { children: ReactNode }) {
  const [motionFx, setMotionFx] = useState(false);
  const [viewTransitions, setViewTransitions] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(HERO_VIDEO_MEDIA_QUERY).matches;

    const cancelScrollReveal = scheduleIdle(() => setMotionFx(true), desktop ? 4500 : 8000);

    let vtTimer: ReturnType<typeof setTimeout> | undefined;
    if (desktop) {
      vtTimer = globalThis.setTimeout(() => setViewTransitions(true), 6000);
    }

    const onScroll = () => {
      if (window.scrollY > 120) setMotionFx(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelScrollReveal();
      if (vtTimer !== undefined) globalThis.clearTimeout(vtTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {viewTransitions ? <ViewTransitionBridge /> : null}
      {motionFx ? <ScrollReveal /> : null}
      {children}
    </>
  );
}
