export interface Database {
  public: {
    Tables: {
      focus_sessions: {
        Row: {
          id: string
          user_id: string
          duration_minutes: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          duration_minutes: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          duration_minutes?: number
          completed_at?: string
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          default_timer_minutes: number
          theme_preference: string | null
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          default_timer_minutes?: number
          theme_preference?: string | null
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          default_timer_minutes?: number
          theme_preference?: string | null
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

