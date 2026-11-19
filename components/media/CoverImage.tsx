import { siteImageSrcSet } from "@/lib/media/mediaPath";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/** Cover sito con srcset pre-generato (export statico, senza optimizer Next). */
export function CoverImage({ src, alt, sizes, className = "", loading = "lazy", fetchPriority }: Props) {
  const srcSet = siteImageSrcSet(src);
  const fitClass = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className) ? "" : "object-cover";

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
      className={`absolute inset-0 h-full w-full ${fitClass} ${className}`.trim()}
    />
  );
}
