import { buildContentSecurityPolicy } from "@/lib/security/csp";

/** CSP via meta: applicata anche su GitHub Pages (dove gli header HTTP non esistono). */
export function CspMeta() {
  const content = buildContentSecurityPolicy({
    forMeta: true,
    dev: process.env.NODE_ENV !== "production",
  });

  return <meta httpEquiv="Content-Security-Policy" content={content} />;
}
