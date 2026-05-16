"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { HERO_EASE_OUT } from "@/lib/heroMotion";
import { homeServiceCards } from "@/lib/content";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 52,
    scale: 0.94,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: HERO_EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const accentVariants = {
  hidden: { scaleX: 0, opacity: 0.15 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.95, ease: HERO_EASE_OUT, delay: 0.14 },
  },
};

const still = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
const stillAccent = { scaleX: 1, opacity: 1 };

export function HomeServiceCards() {
  const reduced = !!useReducedMotion();
  const item = reduced ? { hidden: still, visible: still } : cardVariants;
  const accent = reduced ? { hidden: stillAccent, visible: stillAccent } : accentVariants;
  const grid = reduced ? { hidden: {}, visible: {} } : gridVariants;

  return (
    <motion.div
      className="service-cards-grid grid gap-4 sm:gap-5 lg:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px 18% 0px" }}
      variants={grid}
    >
      {homeServiceCards.map((card) => (
        <motion.article
          key={card.title}
          variants={item}
          className="service-card service-card--enter frost-card group flex flex-col p-5 sm:p-6"
        >
          <motion.span className="service-card__accent-line" variants={accent} aria-hidden />
          <p className={`${fontSans.className} section-kicker mb-3`}>{card.kicker}</p>
          <h3 className={`${fontDisplay.className} mb-2 text-[1.2rem] font-semibold leading-snug text-[var(--foreground)] sm:text-xl`}>
            {card.title}
          </h3>
          <p className="copy-rhythm mb-5 flex-1 text-[0.92rem] text-[var(--copy-body)] sm:text-[0.98rem]">{card.description}</p>
          <Link
            href={card.href}
            className={`${fontSans.className} service-card__cta mt-auto inline-flex min-h-[48px] touch-manipulation items-center gap-2 text-base font-semibold text-[var(--primary-mid)] transition [@media(hover:hover)]:group-hover:text-[var(--foreground)] sm:min-h-[44px] sm:text-sm`}
          >
            Approfondisci
            <span
              className="service-card__cta-arrow text-[1.1em] leading-none transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
