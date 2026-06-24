/**
 * Prefix an internal path with Astro's configured base (import.meta.env.BASE_URL).
 * - External links (http:, mailto:, tel:, //) and anchors (#) are returned untouched.
 * - At base "/" this is a no-op, so reverting to a root domain (med-vital.de)
 *   only requires changing astro.config — not the link code.
 */
export function withBase(path?: string | null): string {
  if (path == null) return path as unknown as string;
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}
