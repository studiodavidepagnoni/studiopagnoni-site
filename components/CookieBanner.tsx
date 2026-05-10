"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { clearCookiePrefs, loadCookiePrefs, saveCookiePrefs, type CookiePrefs } from "@/lib/cookieConsent";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/site";

export type { CookiePrefs };

const btnOutline =
  "inline-flex min-h-[48px] w-full flex-1 items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)] sm:w-auto sm:min-w-[9.5rem]";

const btnPrimary =
  "inline-flex min-h-[48px] w-full flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-[#04100e] shadow-[0_8px_28px_rgba(45,212,191,0.25)] transition hover:bg-[var(--primary-mid)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/55 sm:w-auto sm:min-w-[11rem]";

const btnAccent =
  "inline-flex min-h-[48px] w-full flex-1 items-center justify-center rounded-full bg-[var(--accent-warm)] px-6 text-sm font-semibold text-[#0a0a0a] shadow-[0_8px_28px_rgba(234,88,12,0.2)] transition hover:bg-[#ea7a3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)]/50 sm:w-auto sm:min-w-[10rem]";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [embeds, setEmbeds] = useState(false);

  useEffect(() => {
    setVisible(loadCookiePrefs() === null);
  }, []);

  const persist = useCallback((prefs: CookiePrefs) => {
    saveCookiePrefs(prefs);
    setVisible(false);
    window.dispatchEvent(new CustomEvent<CookiePrefs>("cookie-consent", { detail: prefs }));
  }, []);

  const handleNecessaryOnly = useCallback(() => {
    setEmbeds(false);
    persist({ embeds: false });
  }, [persist]);

  const handleAcceptAll = useCallback(() => {
    setEmbeds(true);
    persist({ embeds: true });
  }, [persist]);

  const handleSaveChoices = useCallback(() => {
    persist({ embeds });
  }, [embeds, persist]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[10000] px-3 pb-3 pt-2 sm:px-4 sm:pb-5 sm:pt-3"
    >
      <div
        className={`pointer-events-auto mx-auto max-w-[960px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0e0d]/92 shadow-[0_-24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(45,212,191,0.08)_inset] backdrop-blur-2xl sm:rounded-3xl`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_20%_0%,rgba(45,212,191,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(234,88,12,0.08),transparent_50%)]"
          aria-hidden
        />
        <div className={`relative ${layoutGutterXClass} py-5 sm:py-6`}>
          <div className={layoutContentMaxClass}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--primary-mid)]/35 bg-[var(--primary)]/10 text-[var(--primary-mid)]"
                    aria-hidden
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p
                      id="cookie-banner-title"
                      className={`${fontDisplay.className} text-lg font-medium tracking-tight text-white sm:text-xl`}
                    >
                      Privacy e cookie
                    </p>
                    <p
                      id="cookie-banner-desc"
                      className={`${fontSans.className} mt-1.5 text-[0.9rem] leading-relaxed text-white/78 sm:text-[0.95rem]`}
                    >
                      Usiamo cookie strettamente necessari. Per caricare <strong className="font-semibold text-white/92">Google Maps</strong> sulla
                      pagina Contatti servono contenuti di terze parti: puoi accettarli, rifiutarli o decidere con l&apos;interruttore qui sotto.{" "}
                      <Link
                        href="/privacy-policy#cookie"
                        className="font-semibold text-[var(--primary-mid)] underline decoration-[var(--primary)]/40 underline-offset-[3px] transition hover:text-[var(--primary)]"
                      >
                        Informativa completa
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className={`${fontSans.className} text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--primary-mid)]`}>
                        Facoltativo · basato su consenso
                      </p>
                      <p className={`${fontSans.className} mt-1 text-[0.92rem] font-medium text-white/88`}>Mappe e contenuti incorporati (Google)</p>
                      <p className={`${fontSans.className} mt-0.5 text-[0.8rem] leading-snug text-white/55`}>
                        Disattivato di default. Senza consenso resta un placeholder al posto della mappa.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={embeds}
                      aria-label={embeds ? "Disattiva incorporamenti Google Maps" : "Attiva incorporamenti Google Maps"}
                      onClick={() => setEmbeds((v) => !v)}
                      className={`relative mx-auto h-[34px] w-[58px] shrink-0 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)] sm:mx-0 ${
                        embeds ? "bg-[var(--primary)]" : "bg-white/15"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 h-[26px] w-[26px] rounded-full bg-white shadow-md transition-transform duration-300 ${
                          embeds ? "translate-x-6" : "translate-x-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`${fontSans.className} flex w-full shrink-0 flex-col gap-2.5 lg:w-[min(100%,20rem)]`}>
                <button type="button" className={btnPrimary} onClick={handleSaveChoices}>
                  Salva preferenze
                </button>
                <button type="button" className={btnAccent} onClick={handleAcceptAll}>
                  Accetta tutto
                </button>
                <button type="button" className={btnOutline} onClick={handleNecessaryOnly}>
                  Solo necessari
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function resetCookieConsent() {
  try {
    clearCookiePrefs();
    window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
    window.location.reload();
  } catch {
    /* ignore */
  }
}

/** Hook per componenti che dipendono dal consenso agli incorporamenti (es. iframe mappe). */
export function useCookieConsent(): CookiePrefs | null {
  const [prefs, setPrefs] = useState<CookiePrefs | null>(null);

  useEffect(() => {
    setPrefs(loadCookiePrefs());

    const onChoice = (e: Event) => {
      const ce = e as CustomEvent<CookiePrefs>;
      if (ce.detail && typeof ce.detail.embeds === "boolean") setPrefs(ce.detail);
    };

    window.addEventListener("cookie-consent", onChoice as EventListener);
    return () => window.removeEventListener("cookie-consent", onChoice as EventListener);
  }, []);

  return prefs;
}
