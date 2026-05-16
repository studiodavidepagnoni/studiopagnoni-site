"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ViewTransitionBridge } from "@/components/ViewTransitionBridge";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ViewTransitionBridge />
      <ScrollReveal />
      {children}
    </MotionConfig>
  );
}
