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
  return (
    <div
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
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}

