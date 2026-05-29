import { projectCoverSrcSet } from "@/lib/media/mediaPath";

type Props = {
  cover: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/** Immagine progetto con srcset pre-generato (export statico, senza optimizer Next). */
export function ProjectCoverImage({ cover, alt, sizes, className = "", loading = "lazy", fetchPriority }: Props) {
  const srcSet = projectCoverSrcSet(cover);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset manuale per asset statici ottimizzati
    <img
      src={cover}
      srcSet={srcSet || undefined}
      alt={alt}
      sizes={sizes}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
    />
  );
}
