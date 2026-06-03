"use client";

import Image from "next/image";
import { fontDisplay, fontSans } from "@/lib/fonts";

type Img = { src: string; alt: string };

type Props = {
  images: Img[];
  activeIndex: number;
  phase: "opening" | "open" | "closing";
  dialogRef: React.RefObject<HTMLDivElement | null>;
  filmstripRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onGo: (delta: number) => void;
  onSelect: (index: number) => void;
  onBackdropTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
};

const thumbRing = "border-[var(--primary-mid)] ring-2 ring-[var(--primary-mid)]/30";

export function ProjectLightboxDialog({
  images,
  activeIndex,
  phase,
  dialogRef,
  filmstripRef,
  onClose,
  onBackdropClick,
  onGo,
  onSelect,
  onBackdropTransitionEnd,
  onTouchStart,
  onTouchEnd,
}: Props) {
  const phaseClass = phase === "closing" ? "is-closing" : phase === "open" ? "is-open" : "";

  return (
    <div
      ref={dialogRef}
      id="project-lightbox-dialog"
      className={`project-lightbox-dialog fixed inset-0 z-[10050] flex w-screen cursor-zoom-out flex-col overflow-hidden bg-[color-mix(in_srgb,var(--surface-chrome)_94%,transparent)] backdrop-blur-xl ${phaseClass}`}
      role="dialog"
      aria-modal="true"
      aria-label="Galleria a schermo intero"
      tabIndex={-1}
      onClick={onBackdropClick}
      onTransitionEnd={onBackdropTransitionEnd}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="project-lightbox-dialog__toolbar relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-[var(--green-border-muted)] bg-[var(--card)]/95 px-3 py-3 sm:px-5 sm:py-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className={`${fontDisplay.className} min-w-0 flex-1 truncate text-sm tracking-wide text-[var(--foreground)]/95 sm:text-base`}>
          {images[activeIndex].alt}
        </p>
        <button
          type="button"
          className={`${fontSans.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)] text-lg leading-none text-[var(--foreground)] transition hover:border-[var(--primary-mid)]/50 hover:bg-[var(--card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45`}
          onClick={onClose}
          aria-label="Chiudi galleria"
        >
          &times;
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto overscroll-contain px-3 py-3 sm:px-6 sm:py-4">
        <div className="project-lightbox-dialog__panel flex w-full max-w-[min(96vw,1200px)] flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="relative w-full rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)]/40 p-2 sm:p-3">
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)]/95 text-xl text-[var(--primary-mid)] transition hover:border-[var(--primary-mid)]/40 motion-reduce:transition-none sm:left-3 sm:h-11 sm:w-11 sm:text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGo(-1);
                  }}
                  aria-label="Immagine precedente"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)]/95 text-xl text-[var(--primary-mid)] transition hover:border-[var(--primary-mid)]/40 motion-reduce:transition-none sm:right-3 sm:h-11 sm:w-11 sm:text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGo(1);
                  }}
                  aria-label="Immagine successiva"
                >
                  &rsaquo;
                </button>
              </>
            ) : null}

            <div className="project-lightbox-dialog__stage relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-xl border border-[var(--green-border-muted)] bg-black/20">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="cursor-zoom-out object-contain"
                sizes="(min-width:768px) min(1100px, 92vw), 96vw"
                priority
              />
            </div>
          </div>

          <p className="sr-only">
            Scorri col dito, usa le frecce o Maiusc piu rotellina per cambiare immagine. Esci con Esc o clic sullo sfondo.
          </p>
        </div>
      </div>

      {images.length > 1 ? (
        <div
          className="project-lightbox-dialog__strip shrink-0 border-t border-[var(--green-border-muted)] bg-[var(--card)]/95 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={filmstripRef}
            className="flex cursor-grab gap-2 overflow-x-auto overscroll-x-contain pb-1 active:cursor-grabbing [scrollbar-width:thin] [scrollbar-color:var(--accent-glow-35)_transparent]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {images.map((img, i) => (
              <button
                key={`strip-${img.src}-${i}`}
                type="button"
                onClick={() => onSelect(i)}
                className={`relative h-[4.25rem] w-[6.5rem] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition sm:h-[4.75rem] sm:w-28 ${
                  i === activeIndex ? thumbRing : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={img.alt || "Seleziona immagine"}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="112px" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
