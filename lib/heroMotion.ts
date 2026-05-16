/** Easing tipo Revolution Slider / fade-in dal basso (riferimento dronesurveying.co.uk). */
export const HERO_EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const HERO_EASE_IN = [0.4, 0, 0.2, 1] as const;

export function heroMotionVariants(reduced: boolean) {
  if (reduced) {
    const still = { opacity: 1, y: 0, scaleX: 1 };
    return {
      container: {
        hidden: still,
        show: still,
        exit: still,
      },
      item: {
        hidden: still,
        show: still,
        exit: still,
      },
      line: {
        hidden: still,
        show: still,
        exit: still,
      },
      media: {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
        exit: { opacity: 1 },
      },
    };
  }

  return {
    container: {
      hidden: {},
      show: {
        transition: { staggerChildren: 0.14, delayChildren: 0.1 },
      },
      exit: {
        transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" },
      },
    },
    item: {
      hidden: { opacity: 0, y: 36 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.05, ease: HERO_EASE_OUT },
      },
      exit: {
        opacity: 0,
        y: -18,
        transition: { duration: 0.38, ease: HERO_EASE_IN },
      },
    },
    line: {
      hidden: { opacity: 0, scaleX: 0 },
      show: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.9, ease: HERO_EASE_OUT },
      },
      exit: {
        opacity: 0,
        scaleX: 0.6,
        transition: { duration: 0.28, ease: HERO_EASE_IN },
      },
    },
    media: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 1.35, ease: HERO_EASE_OUT } },
      exit: { opacity: 0, transition: { duration: 0.85, ease: HERO_EASE_IN } },
    },
  };
}
