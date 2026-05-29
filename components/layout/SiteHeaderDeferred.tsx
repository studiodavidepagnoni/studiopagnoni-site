"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HERO_VIDEO_MEDIA_QUERY } from "@/lib/utils/useClientMedia";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

const SiteHeader = dynamic(
  () => import("@/components/layout/SiteHeader").then((m) => ({ default: m.SiteHeader })),
  { ssr: false },
);

/** Desktop: header interattivo dopo idle. Mobile: resta SiteHeaderShell (zero JS). */
export function SiteHeaderDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(HERO_VIDEO_MEDIA_QUERY);
    if (!desktop.matches) return;

    return scheduleIdle(() => setReady(true), 3500);
  }, []);

  useEffect(() => {
    const shell = document.getElementById("site-header-shell");
    if (!shell) return;
    shell.hidden = ready;
  }, [ready]);

  if (!ready) return null;
  return <SiteHeader />;
}
