"use client";

import { useEffect, useState } from "react";
import { CookieChoice } from "./CookieBanner";

const STORAGE_KEY = "cookie_consent_studio_pagnoni";

function readConsent(): CookieChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function MapEmbed() {
  const [consent, setConsent] = useState<CookieChoice | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<CookieChoice>;
      setConsent(ce.detail);
    };
    window.addEventListener("cookie-consent", onCustom as EventListener);
    return () => window.removeEventListener("cookie-consent", onCustom as EventListener);
  }, []);

  const src =
    "https://maps.google.com/maps?q=Via%20Vittorio%20Emanuele%20III%2016,%20Cazzago%20San%20Martino%20BS&t=&z=14&ie=UTF8&iwloc=&output=embed";

  if (consent !== "accepted") {
    return (
      <div
        className="flex min-h-[220px] items-center justify-center rounded-xl border border-[var(--green-border-muted)] bg-[var(--muted)] px-4 text-center text-[0.82rem] text-[var(--copy-body)] sm:min-h-[300px] sm:px-5 sm:text-sm md:min-h-[400px]"
        role="region"
        aria-label="Mappa disattivata fino al consenso cookie"
      >
        <p>
          La mappa Google Maps viene caricata solo se accetti i cookie non strettamente necessari dal banner in basso,
          oppure da privacy policy.
        </p>
      </div>
    );
  }

  return (
    <iframe
      className="h-[220px] w-full rounded-xl border border-[var(--green-border-muted)] shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:h-[300px] md:h-[420px]"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Studio Tecnico Pagnoni — Via Vittorio Emanuele III 16, Cazzago San Martino (BS)"
      src={src}
    />
  );
}
