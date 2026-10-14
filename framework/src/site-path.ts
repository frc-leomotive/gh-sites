const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');

export { basePath as siteBasePath };


/**
 * Prefixes root-absolute site paths with the configured Astro base path so
 * the same site renders correctly both at a domain root and under a
 * sub-path deployment such as GitHub Pages project sites.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${basePath}${path}`;
}

/**
 * Removes the configured Astro base path from a pathname so locale routing
 * helpers work with URLs taken either from routes or from browser locations.
 */
export function stripBasePath(path: string): string {
  if (basePath === '' || !path.startsWith(basePath)) {
    return path;
  }

  const remainder = path.slice(basePath.length);
  return remainder === '' ? '/' : remainder;
}
