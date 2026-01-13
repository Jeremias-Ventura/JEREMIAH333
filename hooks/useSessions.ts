'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { FocusSession } from '@/types/session'

export function useSessions(limit = 10) {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('focus_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(limit)

      if (error) {
        setError(error.message)
      } else {
        setSessions(data as FocusSession[])
      }

      setLoading(false)
    }

    fetchSessions()

    // Optional: Subscribe to realtime updates
    const supabase = createClient()
    const channel = supabase
      .channel('sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'focus_sessions' },
        () => {
          fetchSessions()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [limit])

  return { sessions, loading, error }
}
