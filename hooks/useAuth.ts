'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
    setLoading(false)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
        setUser(data.user)
        setLoading(false)
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, refreshUser }
}
