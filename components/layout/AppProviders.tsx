"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const ViewTransitionBridge = dynamic(
  () => import("@/components/layout/ViewTransitionBridge").then((m) => ({ default: m.ViewTransitionBridge })),
  { ssr: false },
);

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ViewTransitionBridge />
      <ScrollReveal />
      {children}
    </MotionConfig>
  );
}
