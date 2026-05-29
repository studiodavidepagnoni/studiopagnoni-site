"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleIdle } from "@/lib/utils/scheduleIdle";

const CookieBanner = dynamic(
  () => import("@/components/layout/CookieBanner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false },
);

/** Cookie banner solo dopo scroll significativo o idle lungo. */
export function CookieBannerDeferred() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;

    const reveal = () => setShow(true);
    const cancelIdle = scheduleIdle(reveal, 12_000);

    const onScroll = () => {
      if (window.scrollY < 200) return;
      reveal();
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelIdle();
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  if (!show) return null;
  return <CookieBanner />;
}
