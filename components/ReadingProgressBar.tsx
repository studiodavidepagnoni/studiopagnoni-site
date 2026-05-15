"use client";

import { useEffect, useRef, useState } from "react";

function computeProgress(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;
  const root = document.documentElement;
  const total = root.scrollHeight - window.innerHeight;
  if (total <= 0) return 1;
  return Math.min(1, Math.max(0, window.scrollY / total));
}

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      pendingRef.current = false;
      setProgress(computeProgress());
    };

    const schedule = () => {
      if (pendingRef.current) return;
      pendingRef.current = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none w-full shrink-0" aria-hidden>
      <div className="relative h-[2px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[var(--header-progress-track)]" />
        <div
          className="absolute inset-0 origin-left bg-[var(--header-progress-fill)] transition-[transform] duration-150 ease-out will-change-transform motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
