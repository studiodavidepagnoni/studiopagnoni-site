"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const headerSurface = scrolled ? "bg-[var(--header-surface-scrolled)]" : "bg-[var(--header-surface)]";

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] border-b border-[var(--header-border)] transition-colors duration-200 ${headerSurface} shadow-[0_1px_0_rgba(0,0,0,0.35)] backdrop-blur-xl`}
      >
        <div className={layoutGutterXClass}>
          <div className={`flex min-h-[68px] items-center justify-between gap-3 py-2 sm:min-h-[76px] md:min-h-[80px] ${layoutContentMaxClass}`}>
            <Link href="/" className="group flex min-w-0 shrink flex-col leading-tight" title={`${site.name} — home`}>
              <span className={`${fontSans.className} text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--green-ink-muted)] sm:text-[0.7rem]`}>
                Studio
              </span>
              <span className={`${fontDisplay.className} text-[1.5rem] font-medium leading-none text-[var(--foreground)] sm:text-[1.75rem] md:text-[2rem]`}>
                Pagnoni
              </span>
              <span className={`${fontSans.className} mt-1 hidden max-w-[16rem] text-[0.68rem] leading-snug text-[var(--green-ink-muted)] sm:block`}>
                SLAM · GNSS · territorio
              </span>
            </Link>

            <nav className="hidden shrink-0 md:block" aria-label="Menu principale">
              <ul className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 lg:gap-x-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${fontSans.className} relative px-3 py-2 text-[0.9rem] font-medium text-[var(--foreground)]/90 transition after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--primary-mid)] after:transition after:content-[''] hover:text-[var(--primary-mid)] hover:after:scale-x-100`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--green-border-muted)] bg-[var(--card)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-6 bg-[var(--foreground)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
        <ReadingProgressBar />
      </header>

      <div
        id="mobile-nav"
        className={`fixed bottom-0 right-0 top-[4.75rem] z-[999] flex w-[min(100%,22rem)] flex-col border-l border-[var(--green-border-muted)] bg-[var(--card)] shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className={`flex flex-1 flex-col overflow-y-auto pt-4 ${layoutGutterXClass}`}>
          <p className={`${fontSans.className} mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--green-ink-muted)]`}>Menu</p>
          <ul className="flex flex-col gap-0.5 pb-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${fontSans.className} block border-b border-[var(--green-border-muted)] py-4 text-lg font-medium text-[var(--foreground)] transition hover:text-[var(--primary-mid)]`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label="Chiudi menu"
        className={`fixed inset-0 z-[998] bg-[#0c0a09]/40 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
