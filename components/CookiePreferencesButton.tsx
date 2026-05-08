"use client";

import { resetCookieConsent } from "@/components/CookieBanner";
import { ui } from "@/lib/ui";

export function CookiePreferencesButton() {
  return (
    <button type="button" onClick={resetCookieConsent} className={ui.btnGhostOnDark}>
      Modifica preferenze cookie
    </button>
  );
}

