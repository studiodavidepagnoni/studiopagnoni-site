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
 * Da collocare sotto la riga logo/menu nell’header; larghezza piena.
 * Aggiornamento throttled con requestAnimationFrame.
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
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-[var(--green-border-muted)]" />
        <div
          className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--primary)] via-[var(--primary-mid)] to-[var(--primary)] transition-[transform] duration-150 ease-out will-change-transform motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
