"use client";

import { useEffect, useRef, useState } from "react";

type VideoFigureProps = {
  mp4: string;
  webm?: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export function VideoFigure({
  mp4,
  webm,
  poster,
  className,
  videoClassName,
  controls = true,
  preload = "none",
}: VideoFigureProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loadSources, setLoadSources] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof IntersectionObserver !== "function") {
      setLoadSources(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setLoadSources(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={
        className ??
        "relative mb-6 aspect-video overflow-hidden rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] pointer-events-auto"
      }
    >
      <video
        className={videoClassName ?? "relative z-10 h-full w-full object-cover pointer-events-auto"}
        controls={controls}
        playsInline
        preload={preload}
        poster={poster}
      >
        {loadSources ? (
          <>
            {webm ? <source src={webm} type="video/webm" /> : null}
            <source src={mp4} type="video/mp4" />
          </>
        ) : null}
      </video>
    </div>
  );
}
