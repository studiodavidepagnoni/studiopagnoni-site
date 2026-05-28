"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ViewTransitionBridge = dynamic(
  () => import("@/components/layout/ViewTransitionBridge").then((m) => ({ default: m.ViewTransitionBridge })),
  { ssr: false },
);

const ScrollReveal = dynamic(
  () => import("@/components/ScrollReveal").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false },
);

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ViewTransitionBridge />
      <ScrollReveal />
      {children}
    </>
  );
}
