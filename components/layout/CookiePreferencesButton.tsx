"use client";

import { resetCookieConsent } from "@/components/layout/CookieBanner";
import { fontSans } from "@/lib/fonts";
import { ui } from "@/lib/ui";

export function CookiePreferencesButton({ label = "Rivedi preferenze cookie" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={resetCookieConsent}
      className={`${fontSans.className} ${ui.btnOutline} inline-flex min-h-[44px] items-center`}
    >
      {label}
    </button>
  );
}
