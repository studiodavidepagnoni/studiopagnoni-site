"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";
import { withBasePath } from "@/lib/utils/basePath";
import { fontNav } from "@/lib/fonts";
import { site } from "@/lib/config/site";

const DEFAULT_TITLE = site.brandName;

type SiteBrandLockupProps = {
  className?: string;
  /** Larghezza icona (box quadrato). */
  markSize?: string;
  /** Titolo marchio (reso maiuscolo via CSS). Default: Studio Pagnoni */
  title?: string;
  /** `chrome` = header/footer scuro (site-brand-title); `light` = sezioni chiare */
  tone?: "chrome" | "light";
};

/**
 * Marchio testuale + icona SVG (non logo.png): stesso schema della nav,
 * titolo in Montserrat maiuscolo; tagline tutta nel colore del disegno.
 */
export function SiteBrandLockup({
  className = "",
  markSize = "w-[5.35rem] sm:w-[6rem] md:w-[6.75rem]",
  title = DEFAULT_TITLE,
  tone = "light",
}: SiteBrandLockupProps) {
  const isChrome = tone === "chrome";
  const titleCls = isChrome
    ? `${fontNav.className} site-brand-title whitespace-nowrap text-[1.05rem] font-bold uppercase leading-none tracking-normal sm:text-[1.25rem] md:text-[1.45rem]`
    : `${fontNav.className} site-brand-lockup__title whitespace-nowrap text-[0.95rem] font-bold uppercase leading-none tracking-normal sm:text-[1.1rem] md:text-[1.2rem]`;
  const taglineCls = isChrome
    ? `${fontNav.className} site-brand-tagline flex items-baseline justify-between text-[0.55rem] font-bold uppercase leading-snug sm:text-[0.6rem] md:text-[0.65rem]`
    : `${fontNav.className} site-brand-lockup__tagline flex items-baseline justify-between text-[0.55rem] font-bold uppercase leading-snug sm:text-[0.6rem] md:text-[0.65rem]`;
  const brandLineRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);

  const syncTaglineWidth = useCallback(() => {
    const brandEl = brandLineRef.current;
    const taglineEl = taglineRef.current;
    if (!brandEl || !taglineEl) return;
    const brandWidth = brandEl.getBoundingClientRect().width;
    if (brandWidth <= 1) return;
    taglineEl.style.width = `${Math.round(brandWidth)}px`;
    taglineEl.style.letterSpacing = "0em";
  }, []);

  useLayoutEffect(() => {
    syncTaglineWidth();
    window.addEventListener("resize", syncTaglineWidth);
    void document.fonts.ready.then(syncTaglineWidth);
    return () => window.removeEventListener("resize", syncTaglineWidth);
  }, [syncTaglineWidth]);

  return (
    <Link
      href="/"
      className={`group site-brand-lockup inline-flex max-w-full items-center gap-x-2.5 sm:gap-x-4 ${className}`}
      aria-label={`${site.name} — home`}
      title={`${site.name} — home`}
    >
      <span className={`box-border flex aspect-square shrink-0 items-center justify-center ${markSize}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- marchio vettoriale */}
        <img
          src={`${withBasePath("/logo-mark.svg")}?v=15`}
          alt=""
          width={616}
          height={616}
          fetchPriority="low"
          decoding="async"
          className="site-brand-mark h-full w-full object-contain"
          aria-hidden
        />
      </span>

      <span className="flex min-w-0 flex-col items-start gap-y-1.5 sm:gap-y-2">
        <span ref={brandLineRef} className={titleCls}>
          {title}
        </span>
        <span ref={taglineRef} className={taglineCls}>
          <span>Topografia</span>
          <span className={isChrome ? "site-brand-tagline__sep shrink-0" : "site-brand-lockup__sep shrink-0"} aria-hidden>
            ·
          </span>
          <span>Architettura</span>
          <span className={isChrome ? "site-brand-tagline__sep shrink-0" : "site-brand-lockup__sep shrink-0"} aria-hidden>
            ·
          </span>
          <span>SLAM</span>
        </span>
      </span>
    </Link>
  );
}
