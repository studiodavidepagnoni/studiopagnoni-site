"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CookiePrefs } from "@/lib/cookieConsent";
import { embedsConsentGranted, saveCookiePrefs } from "@/lib/cookieConsent";
import { fontSans } from "@/lib/fonts";
import { ui } from "@/lib/ui";

export function MapEmbed() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(embedsConsentGranted());

    const onConsent = (e: Event) => {
      const ce = e as CustomEvent<CookiePrefs>;
      if (ce.detail && typeof ce.detail.embeds === "boolean") setShowMap(ce.detail.embeds);
    };

    window.addEventListener("cookie-consent", onConsent as EventListener);
    return () => window.removeEventListener("cookie-consent", onConsent as EventListener);
  }, []);

  const grantEmbedsAndShow = useCallback(() => {
    const prefs: CookiePrefs = { embeds: true };
    saveCookiePrefs(prefs);
    setShowMap(true);
    window.dispatchEvent(new CustomEvent<CookiePrefs>("cookie-consent", { detail: prefs }));
  }, []);

  const src =
    "https://maps.google.com/maps?q=Via%20Vittorio%20Emanuele%20III%2016,%20Cazzago%20San%20Martino%20BS&t=&z=13&ie=UTF8&iwloc=&output=embed";

  if (!showMap) {
    return (
      <div
        className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-[var(--green-border-muted)] bg-[var(--muted)] px-5 py-8 text-center sm:min-h-[300px] sm:gap-5 sm:px-6 md:min-h-[400px]"
        role="region"
        aria-label="Mappa Google Maps: consenso richiesto"
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--green-border-muted)] bg-[var(--card)] text-[var(--primary-mid)]"
          aria-hidden
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-5 8-10V5l-8-3-8 3v7c0 5 8 10 8 10z" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="max-w-[36ch] space-y-2">
          <p className={`${fontSans.className} text-[0.82rem] leading-relaxed text-[var(--copy-body)] sm:text-sm`}>
            Per privacy <strong className="font-semibold text-[var(--foreground)]">non carichiamo Google Maps</strong> finché non acconsenti agli
            incorporamenti di terze parti (cookie/policy Google possono essere attivati).
          </p>
          <p className={`${fontSans.className} text-[0.78rem] leading-snug text-[var(--green-ink-muted)] sm:text-[0.8rem]`}>
            Se avevi scelto &quot;Solo necessari&quot; o salvato il banner con la mappa spenta, qui resta il riquadro vuoto fino a un nuovo consenso.
          </p>
        </div>
        <div className="flex w-full max-w-xs flex-col items-stretch gap-2 sm:max-w-sm">
          <button type="button" className={`${fontSans.className} ${ui.btnPrimary} w-full`} onClick={grantEmbedsAndShow}>
            Carica la mappa Google
          </button>
          <p className={`${fontSans.className} text-[0.72rem] leading-snug text-[var(--green-ink-muted)]`}>
            Preferenze salvate sul dispositivo. Dettagli in{" "}
            <Link href="/privacy-policy#cookie" className="font-semibold text-[var(--primary-mid)] underline underline-offset-2 hover:text-[var(--primary)]">
              Privacy e cookie
            </Link>
            .
          </p>
        </div>
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
