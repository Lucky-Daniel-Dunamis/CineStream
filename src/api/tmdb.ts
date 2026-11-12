const BASE_URL = 'https://api.themoviedb.org/3'

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const query = new URLSearchParams({ language: 'en-US' })
  for (const [key, value] of Object.entries(params)) {
    query.set(key, String(value))
  }

  const token = (import.meta.env.VITE_TMDB_TOKEN ?? '').trim()
  const res = await fetch(`${BASE_URL}${path}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

