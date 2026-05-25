"use client";

import { resetCookieConsent } from "@/components/layout/CookieBanner";
import { fontSans } from "@/lib/fonts";
import { ui } from "@/lib/ui";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetCookieConsent}
      className={`${fontSans.className} ${ui.btnGhostOnDark}`}
    >
      Rivedi preferenze cookie
    </button>
  );
}
