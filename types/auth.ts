import { User, AuthError } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Extended user properties if needed
}

export type OAuthProvider = 'google'
export type AuthMethod = 'oauth' | 'email'

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: Error | null
}

export interface AuthResponse {
  error: string | null
  success: boolean
}

export interface EmailAuthResponse extends AuthResponse {
  needsConfirmation?: boolean
}

export { AuthError }
