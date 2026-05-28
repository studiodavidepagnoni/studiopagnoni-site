type VideoFigureProps = {
  mp4: string;
  webm?: string;
  className?: string;
  videoClassName?: string;
  controls?: boolean;
};

export function VideoFigure({ mp4, webm, className, videoClassName, controls = true }: VideoFigureProps) {
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
        preload="metadata"
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}

