"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieBanner = dynamic(
  () => import("@/components/layout/CookieBanner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false },
);

/** Banner dopo lo scroll (non sul primo frame hero) o dopo 12s se si resta in cima. */
export function CookieBannerDeferred() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;

    const reveal = () => setShow(true);
    const timeoutId = window.setTimeout(reveal, 12_000);

    const onScroll = () => {
      if (window.scrollY < 200) return;
      reveal();
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  if (!show) return null;
  return <CookieBanner />;
}
