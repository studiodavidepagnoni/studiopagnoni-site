"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fontSans } from "@/lib/fonts";
import { getLocaleFromPathname, withLocalePrefix } from "@/lib/i18n/paths";
import { t } from "@/lib/i18n/messages";
import { clearCookiePrefs, loadCookiePrefs, saveCookiePrefs, type CookiePrefs } from "@/lib/privacy/cookieConsent";
import { ui } from "@/lib/ui";

export type { CookiePrefs };

export function CookieBanner() {
  const locale = getLocaleFromPathname(usePathname());
  const copy = t(locale);
  const [visible, setVisible] = useState(false);
  const [embeds, setEmbeds] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisible(loadCookiePrefs() === null);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const node = document.createElement("div");
    node.setAttribute("data-cookie-banner-root", "");
    document.body.appendChild(node);
    setPortalNode(node);
    return () => {
      setPortalNode(null);
      node.remove();
    };
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

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleNecessaryOnly();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, handleNecessaryOnly]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("cookie-banner-visible");
      document.documentElement.style.removeProperty("--cookie-banner-space");
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.classList.remove("cookie-banner-visible");
      document.documentElement.style.removeProperty("--cookie-banner-space");
      return;
    }

    document.body.classList.add("cookie-banner-visible");
    const el = bannerRef.current;
    if (!el) return;

    const apply = () => {
      document.documentElement.style.setProperty(
        "--cookie-banner-space",
        `${Math.ceil(el.getBoundingClientRect().height)}px`,
      );
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible, customize, portalNode]);

  if (!visible || !portalNode) return null;

  return createPortal(
    <div
      ref={bannerRef}
      role="region"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[10000] border-t border-white/12 bg-[color-mix(in_srgb,var(--surface-chrome)_94%,transparent)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5 sm:py-3.5"
    >
      <div className={`mx-auto flex max-w-[1140px] flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 ${fontSans.className}`}>
        <div className="min-w-0 flex-1">
          <p id="cookie-banner-title" className="sr-only">
            {copy.privacy}
          </p>
          <p id="cookie-banner-desc" className="text-[0.82rem] leading-snug text-white/80 sm:text-[0.88rem]">
            {copy.cookie.body}{" "}
            <Link
              href={`${withLocalePrefix("/privacy-policy", locale)}#cookie`}
              className="font-semibold text-[var(--primary-mid)] underline decoration-[var(--primary)]/40 underline-offset-[3px] hover:text-[var(--primary)]"
            >
              {copy.privacy}
            </Link>
            {" · "}
            <button
              type="button"
              className="font-semibold text-white/88 underline decoration-white/25 underline-offset-[3px] hover:text-white"
              aria-expanded={customize}
              onClick={() => setCustomize((v) => !v)}
            >
              {customize
                ? locale === "en"
                  ? "Hide options"
                  : "Nascondi opzioni"
                : locale === "en"
                  ? "Customise"
                  : "Personalizza"}
            </button>
          </p>
          {customize ? (
            <div className="mt-2.5 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <p className="text-[0.8rem] leading-snug text-white/78">Contenuti Google (Maps e reCAPTCHA)</p>
              <button
                type="button"
                role="switch"
                aria-checked={embeds}
                aria-label={
                  embeds
                    ? "Disattiva contenuti Google (Maps e reCAPTCHA)"
                    : "Attiva contenuti Google (Maps e reCAPTCHA)"
                }
                onClick={() => setEmbeds((v) => !v)}
                className={`relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)] ${
                  embeds ? "bg-[var(--primary)]" : "bg-white/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-[24px] w-[24px] rounded-full bg-white shadow-md transition-transform duration-300 ${
                    embeds ? "translate-x-5" : "translate-x-0"
                  }`}
                  aria-hidden
                />
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex w-full shrink-0 gap-2 sm:w-auto sm:justify-end">
          {customize ? (
            <button type="button" className={`${ui.cookieReject} text-sm`} onClick={handleSaveChoices}>
              Salva
            </button>
          ) : (
            <button type="button" className={`${ui.cookieReject} text-sm`} onClick={handleNecessaryOnly}>
              {copy.cookie.necessary}
            </button>
          )}
          <button type="button" className={`${ui.cookieAccept} text-sm`} onClick={handleAcceptAll}>
            {copy.cookie.acceptAll}
          </button>
        </div>
      </div>
    </div>,
    portalNode,
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
