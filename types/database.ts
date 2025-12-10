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
    }
  }
}

