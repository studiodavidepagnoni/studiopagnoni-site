"use client";

import dynamic from "next/dynamic";

export const StatsSection = dynamic(
  () => import("./StatsSection").then((m) => ({ default: m.StatsSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-[14rem] border-y border-[var(--green-border-muted)] bg-[var(--card)]" aria-hidden />,
  },
);
