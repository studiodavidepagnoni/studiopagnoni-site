import Link from "next/link";
import { fontDisplay } from "@/lib/fonts";
import { ui } from "@/lib/ui";

type PageClosingCtaProps = {
  id: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageClosingCta({
  id,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageClosingCtaProps) {
  return (
    <section
      className="surface-inverted rounded-2xl border border-[var(--green-border-muted)] p-6 sm:p-10"
      aria-labelledby={id}
    >
      <h2 id={id} className={`${fontDisplay.className} text-2xl font-semibold text-[var(--foreground)] sm:text-3xl`}>
        {title}
      </h2>
      <p className={`${ui.body} mt-4 max-w-[52ch] text-[var(--copy-body)]`}>{description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Link href={primaryHref} className={`${ui.btnPrimary} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}>
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className={ui.btnGhostOnDark}>
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
