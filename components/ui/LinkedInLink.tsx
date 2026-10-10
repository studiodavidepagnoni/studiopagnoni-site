import { fontSans } from "@/lib/fonts";
import { site } from "@/lib/config/site";

function LinkedInMark({ className = "h-[1.05rem] w-[1.05rem]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type LinkedInLinkProps = {
  /** Solo icona (footer); oppure icona + testo (contatti). */
  variant?: "icon" | "text";
  className?: string;
  label?: string;
};

export function LinkedInLink({
  variant = "text",
  className = "",
  label = "LinkedIn",
}: LinkedInLinkProps) {
  const base =
    variant === "icon"
      ? `${fontSans.className} inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[var(--primary-mid)] transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40`
      : `${fontSans.className} inline-flex min-h-[44px] items-center gap-2.5 font-semibold text-[var(--primary-mid)] underline decoration-[var(--green-border)] underline-offset-2 transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40`;

  return (
    <a
      href={site.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer me"
      className={`${base} ${className}`.trim()}
      aria-label={variant === "icon" ? "Studio Architettura Pagnoni su LinkedIn" : undefined}
    >
      <LinkedInMark />
      {variant === "text" ? <span>{label}</span> : null}
    </a>
  );
}
