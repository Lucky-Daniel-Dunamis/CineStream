const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export type PosterSize = 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'

/**
 * Generates a full TMDB image URL, with a fallback placeholder if null.
 */
export function getTmdbImageUrl(
  path: string | null | undefined,
  size: PosterSize | BackdropSize = 'w500'
): string {
  if (!path) {
    // A clean SVG placeholder when no image is available
    return 'https://placehold.co/500x750/1e293b/ffffff?text=No+Image'
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}