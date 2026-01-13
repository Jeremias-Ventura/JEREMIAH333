import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a mock client that won't break the app
    // This allows the app to work without Supabase configured
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } }
        }),
        signInWithOAuth: async () => ({ data: { url: null }, error: new Error('Supabase not configured') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signUp: async () => ({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: null }),
        updateUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') })
      },
      from: () => ({
        insert: async () => ({ error: null, data: null }),
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: async () => ({ data: [], error: null })
            }),
            single: async () => ({ data: null, error: null })
          }),
          order: () => ({
            limit: async () => ({ data: [], error: null })
          }),
          single: async () => ({ data: null, error: null })
        }),
        update: async () => ({ error: null, data: null }),
        delete: async () => ({ error: null, data: null })
      })
    } as any
  }

  return createBrowserClient(url, key)
}

