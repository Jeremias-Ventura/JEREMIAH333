import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a mock client that won't break the app
    // This allows the app to work without Supabase configured
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null })
      },
      from: () => ({
        insert: async () => ({ error: null, data: null })
      })
    } as any
  }

  return createBrowserClient(url, key)
}

