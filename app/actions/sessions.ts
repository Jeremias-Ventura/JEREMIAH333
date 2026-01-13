'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { FocusSession, SessionStats } from '@/types/session'

// NOTE: Focus sessions are immutable once created.
// Users can only create new sessions, not modify or delete existing ones.
// This is enforced by RLS policies in the database.

export async function createSession(durationMinutes: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Input validation
  if (typeof durationMinutes !== 'number' || isNaN(durationMinutes)) {
    return { error: 'Invalid duration: must be a number' }
  }

  if (durationMinutes < 1 || durationMinutes > 240) {
    return { error: 'Invalid duration: must be between 1 and 240 minutes' }
  }

  if (!Number.isInteger(durationMinutes)) {
    return { error: 'Invalid duration: must be a whole number' }
  }

  const { data, error } = await supabase
    .from('focus_sessions')
    .insert({
      user_id: user.id,
      duration_minutes: durationMinutes,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { data, error: null }
}

export async function getSessions(limit = 10) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { sessions: [], error: 'Not authenticated' }
  }

  // Input validation - constrain to reasonable limits
  if (typeof limit !== 'number' || isNaN(limit)) {
    return { sessions: [], error: 'Invalid limit: must be a number' }
  }

  // Clamp limit between 1 and 1000
  const validatedLimit = Math.min(Math.max(1, Math.floor(limit)), 1000)

  const { data, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })
    .limit(validatedLimit)

  if (error) {
    return { sessions: [], error: error.message }
  }

  return { sessions: data as FocusSession[], error: null }
}

export async function getSessionStats(): Promise<{ stats: SessionStats | null; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { stats: null, error: 'Not authenticated' }
  }

  // Fetch all sessions for the user
  const { data: sessions, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  if (error) {
    return { stats: null, error: error.message }
  }

  const typedSessions = sessions as FocusSession[]

  // Calculate stats
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const todaySessions = typedSessions.filter(
    (s: FocusSession) => new Date(s.completed_at) >= todayStart
  )
  const weekSessions = typedSessions.filter(
    (s: FocusSession) => new Date(s.completed_at) >= weekStart
  )

  // Calculate trends
  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)
  const yesterdayEnd = new Date(todayStart)
  
  const yesterdaySessions = typedSessions.filter(
    (s: FocusSession) => {
      const sessionDate = new Date(s.completed_at)
      return sessionDate >= yesterdayStart && sessionDate < yesterdayEnd
    }
  )
  const yesterdayMinutes = yesterdaySessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0)
  const todayMinutes = todaySessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0)
  
  // Calculate week trend (this week vs last week)
  const lastWeekStart = new Date(weekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)
  const lastWeekEnd = new Date(weekStart)
  
  const lastWeekSessions = typedSessions.filter(
    (s: FocusSession) => {
      const sessionDate = new Date(s.completed_at)
      return sessionDate >= lastWeekStart && sessionDate < lastWeekEnd
    }
  )
  const lastWeekMinutes = lastWeekSessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0)
  const currentWeekMinutes = weekSessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0)

  // Determine trends
  const getTrend = (current: number, previous: number): 'up' | 'down' | 'neutral' => {
    const diff = current - previous
    if (diff > 0) return 'up'
    if (diff < 0) return 'down'
    return 'neutral'
  }

  const stats: SessionStats = {
    totalMinutes: typedSessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0),
    totalSessions: typedSessions.length,
    todayMinutes,
    todaySessions: todaySessions.length,
    weekMinutes: currentWeekMinutes,
    weekSessions: weekSessions.length,
    averageSessionLength: typedSessions.length > 0
      ? Math.round(typedSessions.reduce((sum: number, s: FocusSession) => sum + s.duration_minutes, 0) / typedSessions.length)
      : 0,
    longestSession: typedSessions.length > 0
      ? Math.max(...typedSessions.map((s: FocusSession) => s.duration_minutes))
      : 0,
    currentStreak: calculateStreak(typedSessions),
    todayTrend: getTrend(todayMinutes, yesterdayMinutes),
    weekTrend: getTrend(currentWeekMinutes, lastWeekMinutes),
  }

  return { stats, error: null }
}

function calculateStreak(sessions: FocusSession[]): number {
  if (sessions.length === 0) return 0

  let streak = 0
  const today = new Date()
  let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  for (let i = 0; i < 100; i++) { // Check up to 100 days back
    const dayHasSessions = sessions.some((s) => {
      const sessionDate = new Date(s.completed_at)
      const sessionDay = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate()
      )
      return sessionDay.getTime() === currentDate.getTime()
    })

    if (!dayHasSessions) break

    streak++
    currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
  }

  return streak
}
