import type { AuthError } from '@/types/auth'

export function getAuthErrorMessage(error: AuthError | string): string {
  const errorMessage = typeof error === 'string' ? error : error.message

  // Map common Supabase auth errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email or password is incorrect',
    'Email not confirmed': 'Please confirm your email before signing in. Check your inbox for the confirmation link.',
    'User already registered': 'An account with this email already exists. Please sign in instead.',
    'Password should be at least 6 characters': 'Password must be at least 8 characters long',
    'Email link is invalid or has expired': 'This link has expired. Please request a new one.',
    'Invalid email': 'Please enter a valid email address',
    'For security purposes, you can only request this once every 60 seconds': 'Please wait a minute before requesting another email',
  }

  // Check for exact matches
  if (errorMap[errorMessage]) {
    return errorMap[errorMessage]
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.includes(key)) {
      return value
    }
  }

  // Default fallback
  return errorMessage || 'An error occurred. Please try again.'
}
