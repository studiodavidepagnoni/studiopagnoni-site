"use client";

import { useEffect, useRef, useState } from "react";

function computeProgress(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;
  const el = document.documentElement;
  const total = el.scrollHeight - window.innerHeight;
  if (total <= 0) return 1;
  return Math.min(1, Math.max(0, window.scrollY / total));
}

/**
 * Barra di avanzamento lettura (scroll verticale documento).
 * Sotto logo/menu: traccia chiara su chrome; fill gradiente pesca→arancio (stesso linguaggio CTA del sito).
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      pendingRef.current = false;
      setProgress(computeProgress());
    };

    const onScrollOrResize = () => {
      if (pendingRef.current) return;
      pendingRef.current = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScrollOrResize)
        : null;
    ro?.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none w-full shrink-0" aria-hidden>
      <div className="relative h-[2px] w-full overflow-hidden sm:h-px">
        <div className="absolute inset-0 bg-[var(--header-progress-track)]" />
        <div
          className="absolute inset-0 origin-left bg-gradient-to-r from-[color-mix(in_srgb,var(--header-text)_42%,#fde4d2)] via-[var(--header-progress-fill-via)] to-[var(--accent-warm)] shadow-[0_0_12px_color-mix(in_srgb,var(--accent-warm)_35%,transparent)] transition-[transform] duration-150 ease-out will-change-transform motion-reduce:shadow-none motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
