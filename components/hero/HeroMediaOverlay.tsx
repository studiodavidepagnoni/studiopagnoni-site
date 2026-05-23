type Props = {
  /** Slide 0: scrim asimmetrico forte sinistra → destra. */
  intro: boolean;
};

export function HeroMediaOverlay({ intro }: Props) {
  return (
    <div
      className={`hero-media__overlay ${intro ? "hero-media__overlay--intro" : "hero-media__overlay--standard"}`}
      aria-hidden
    />
  );
}
