"use client";

import { useEffect, useRef, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { homeStats, type HomeStat } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/utils/useClientMedia";

function useInViewOnce<T extends Element>(margin = "-80px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver !== "function") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: margin, threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, margin]);

  return { ref, inView };
}

function Counter({
  target,
  suffix,
  reduced,
  active,
}: {
  target: number;
  suffix: string;
  reduced: boolean;
  active: boolean;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    const duration = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - (1 - p) ** 3;
      setV(Math.floor(target * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced]);

  if (reduced) {
    return (
      <span className={`${fontDisplay.className} text-3xl font-medium text-[var(--foreground)] sm:text-4xl md:text-5xl`}>
        {target}
        {suffix}
      </span>
    );
  }

  /** Fuori viewport non animiamo: mostriamo il valore finale (evita “0+” fintanto che `active` è false). */
  const frozen = !active;
  const shown = frozen ? target : target <= 0 ? v : Math.max(1, v);

  return (
    <span className={`${fontDisplay.className} text-3xl font-medium text-[var(--foreground)] sm:text-4xl md:text-5xl tabular-nums`}>
      {shown}
      {suffix}
    </span>
  );
}

function StatBlock({ stat, reduced, active }: { stat: HomeStat; reduced: boolean; active: boolean }) {
  if (stat.mode === "n") {
    return (
      <>
        <Counter target={stat.value} suffix={stat.suffix} reduced={reduced} active={active} />
        <p
          className={`${fontSans.className} mt-3 whitespace-pre-line text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--green-ink-muted)] sm:text-sm`}
        >
          {stat.label}
        </p>
      </>
    );
  }
  return (
    <>
      <p className={`${fontDisplay.className} text-lg font-medium leading-snug text-[var(--foreground)] sm:text-xl md:text-2xl`}>{stat.title}</p>
      <p className={`${fontSans.className} mt-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--green-ink-muted)] sm:text-sm`}>
        {stat.subtitle}
      </p>
    </>
  );
}

export function StatsSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      ref={ref}
      className="home-section-break surface-inverted lazy-section overflow-x-hidden border-y border-[var(--green-border-muted)] px-4 py-14 sm:px-5 sm:py-20 md:px-10"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-[1140px]">
        <div className="home-section-intro mb-8 sm:mb-12">
          <p className={`${fontSans.className} section-kicker`}>Perché noi</p>
          <h2 id="stats-heading" className={`${fontDisplay.className} section-title home-section-title reveal-title`}>
            Metodo e presenza sul campo
          </h2>
          <div className="home-section-rule mt-4" aria-hidden />
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--green-border-muted)] sm:grid-cols-2 lg:grid-cols-4">
          {homeStats.map((stat, idx) => (
            <div key={idx} className="reveal-block bg-[var(--card)] px-4 py-8 text-center sm:px-6 sm:py-10">
              <StatBlock stat={stat} reduced={reduced} active={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
