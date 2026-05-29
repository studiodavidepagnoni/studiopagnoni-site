"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieBanner = dynamic(
  () => import("@/components/layout/CookieBanner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false },
);

/** Carica il banner cookie dopo il primo paint (riduce JS critico su PageSpeed). */
export function CookieBannerDeferred() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const mount = () => setShow(true);

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(mount, { timeout: 2500 });
    } else {
      timeoutId = globalThis.setTimeout(mount, 1200);
    }

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  if (!show) return null;
  return <CookieBanner />;
}
