"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroHomePlaceholder } from "@/components/hero/HeroHomePlaceholder";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const HeroHome = dynamic(() => import("@/components/hero/HeroHome").then((m) => ({ default: m.HeroHome })), {
  ssr: false,
  loading: () => <HeroHomePlaceholder />,
});

export function HeroHomeDeferred() {
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const timeout = 800;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => setEnhance(true), { timeout });
    } else {
      timeoutId = globalThis.setTimeout(() => setEnhance(true), timeout);
    }

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return enhance ? <HeroHome /> : <HeroHomePlaceholder />;
}
