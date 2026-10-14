const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Prefixes root-absolute content asset paths with the configured Astro base
 * path so the same content renders correctly both at a domain root and under
 * a sub-path deployment such as GitHub Pages project sites.
 */
export function resolveContentPath(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${basePath}${path}`;
}
