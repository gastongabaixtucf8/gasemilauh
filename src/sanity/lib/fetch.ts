import {client} from './client'

// Simple cached fetch. Content revalidates every 60s, so edits in the
// Studio show up on the site within a minute without a redeploy.
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {revalidate: 60},
  })
}
