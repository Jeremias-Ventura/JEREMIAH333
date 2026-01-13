export interface FocusSession {
  id: string
  user_id: string
  duration_minutes: number
  completed_at: string
  created_at: string
}

export interface SessionStats {
  totalMinutes: number
  totalSessions: number
  todayMinutes: number
  todaySessions: number
  weekMinutes: number
  weekSessions: number
  averageSessionLength: number
  longestSession: number
  currentStreak: number
  todayTrend?: 'up' | 'down' | 'neutral'
  weekTrend?: 'up' | 'down' | 'neutral'
}
