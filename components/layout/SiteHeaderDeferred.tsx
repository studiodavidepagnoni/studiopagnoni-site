"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

/** Header interattivo solo da tablet/desktop — non usare hover (in CI headless è sempre true). */
const DESKTOP_HEADER_MEDIA_QUERY = "(min-width: 768px)";

const SiteHeader = dynamic(
  () => import("@/components/layout/SiteHeader").then((m) => ({ default: m.SiteHeader })),
  { ssr: false },
);

/** Desktop: header interattivo dopo idle. Mobile: resta SiteHeaderShell (zero JS). */
export function SiteHeaderDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_HEADER_MEDIA_QUERY);
    if (!desktop.matches) return;

    return scheduleIdle(() => {
      if (!window.matchMedia(DESKTOP_HEADER_MEDIA_QUERY).matches) return;
      setReady(true);
    }, 3500);
  }, []);

  useEffect(() => {
    const shell = document.getElementById("site-header-shell");
    if (!shell) return;
    shell.hidden = ready;
  }, [ready]);

  if (!ready) return null;
  return <SiteHeader />;
}
