import { stockImageSrcSet } from "@/lib/media/mediaPath";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/** Immagine stock con srcset pre-generato (export statico, senza optimizer Next). */
export function StockCoverImage({ src, alt, sizes, className = "", loading = "lazy", fetchPriority }: Props) {
  const srcSet = stockImageSrcSet(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset manuale per asset statici ottimizzati
    <img
      src={src}
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
