/**
 * Preferenze cookie / contenuti terzi (GDPR, principio di accountability).
 * Solo `embeds` è configurabile dall'utente; il resto è strettamente necessario al sito.
 */

import { basePath } from "@/lib/utils/basePath";

const LEGACY_STORAGE_KEY = "cookie_consent_studio_pagnoni";

/** Path cookie: rispetta sottocartella GitHub Pages, non tutto l'origin github.io. */
function cookiePath(): string {
  return basePath ? `${basePath.replace(/\/$/, "")}/` : "/";
}

export const COOKIE_PREFS_STORAGE_KEY = "studio_pagnoni_cookie_prefs_v2";

/** Cookie tecnico di mirror (durata max 12 mesi): valore "1" = incorporamenti consentiti, "0" = solo necessari. */
export const COOKIE_MIRROR_NAME = "studio_pagnoni_cp";

export type CookiePrefs = {
  embeds: boolean;
};

type StoredPrefsV2 = CookiePrefs & { v: 2; updatedAt: number };

export function loadCookiePrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_STORAGE_KEY);
    if (raw) {
      const j = JSON.parse(raw) as Partial<StoredPrefsV2>;
      if (j?.v === 2 && typeof j.embeds === "boolean") return { embeds: j.embeds };
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === "accepted") return { embeds: true };
    if (legacy === "rejected") return { embeds: false };
  } catch {
    /* ignore */
  }
  return null;
}

export function embedsConsentGranted(): boolean {
  return loadCookiePrefs()?.embeds === true;
}

export function saveCookiePrefs(prefs: CookiePrefs): void {
  const payload: StoredPrefsV2 = { v: 2, embeds: prefs.embeds, updatedAt: Date.now() };
  try {
    localStorage.setItem(COOKIE_PREFS_STORAGE_KEY, JSON.stringify(payload));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }

  try {
    const d = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    const secure = window.location.protocol === "https:" ? ";Secure" : "";
    const val = prefs.embeds ? "1" : "0";
    document.cookie = `${COOKIE_MIRROR_NAME}=${val};expires=${d.toUTCString()};path=${cookiePath()};SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
}

export function clearCookiePrefs(): void {
  try {
    localStorage.removeItem(COOKIE_PREFS_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    const secure = window.location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${COOKIE_MIRROR_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${cookiePath()};SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
}
