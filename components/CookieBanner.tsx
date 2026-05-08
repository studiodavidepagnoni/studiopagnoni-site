"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/site";
import { ui } from "@/lib/ui";

const STORAGE_KEY = "cookie_consent_studio_pagnoni";

export type CookieChoice = "accepted" | "rejected";

function getStored(): CookieChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStored() === null);
  }, []);

  const persist = useCallback((choice: CookieChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      const d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      const secure = window.location.protocol === "https:" ? ";Secure" : "";
      document.cookie = `${STORAGE_KEY}=${choice};expires=${d.toUTCString()};path=/;SameSite=Lax${secure}`;
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: choice }));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Informativa sui cookie"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-[var(--primary-mid)]/35 bg-[#0c0a09]/98 py-4 text-white shadow-[0_-12px_40px_rgba(15,92,86,0.25)] backdrop-blur-md sm:py-5"
    >
      <div className={layoutGutterXClass}>
        <div className={`flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between ${layoutContentMaxClass}`}>
        <div className="min-w-0 flex-1 text-sm leading-relaxed md:text-base">
          <p className="font-semibold">Cookie e privacy</p>
          <p className="mt-0.5 text-white/95 sm:mt-1">
            Utilizziamo cookie tecnici necessari e, previo consenso, contenuti di terze parti (es. mappe).{" "}
            <Link href="/privacy-policy#cookie" className="underline underline-offset-2 hover:text-white">
              Informativa estesa
            </Link>
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button type="button" className={ui.cookieAccept} onClick={() => persist("accepted")}>
            Accetta
          </button>
          <button type="button" className={ui.cookieReject} onClick={() => persist("rejected")}>
            Rifiuta
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export function resetCookieConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    const secure = window.location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${STORAGE_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
    window.location.reload();
  } catch {
    /* ignore */
  }
}

/** Hook for map iframe: load only if accepted */
export function useCookieConsent(): CookieChoice | null {
  const [c, setC] = useState<CookieChoice | null>(null);

  useEffect(() => {
    const stored = getStored();
    setC(stored);

    const handler = (e: Event) => {
      const ce = e as CustomEvent<CookieChoice>;
      setC(ce.detail);
    };

    window.addEventListener("cookie-consent", handler as EventListener);
    return () => window.removeEventListener("cookie-consent", handler as EventListener);
  }, []);

  return c;
}
