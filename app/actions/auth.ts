'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AUTH_CONFIG } from '@/lib/auth/config'
import type { OAuthProvider, EmailAuthResponse, AuthResponse } from '@/types/auth'

export async function signInWithOAuth(provider: OAuthProvider) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: AUTH_CONFIG.redirectTo,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    return { user: null, error: error.message }
  }

  return { user, error: null }
}

// Email/Password Authentication Actions

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<EmailAuthResponse> {
  const supabase = await createClient()

  // Basic validation
  if (!email || !password) {
    return { error: 'Email and password are required', success: false }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters', success: false }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: displayName || '',
      },
      emailRedirectTo: `${AUTH_CONFIG.redirectTo}?type=signup`,
    },
  })

  if (error) {
    return { error: error.message, success: false }
  }

  // Check if email confirmation is required
  const needsConfirmation = data.user && !data.session

  return {
    error: null,
    success: true,
    needsConfirmation,
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!email || !password) {
    return { error: 'Email and password are required', success: false }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { error: null, success: true }
}

export async function resetPassword(email: string): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!email) {
    return { error: 'Email is required', success: false }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { error: null, success: true }
}

export async function updatePassword(newPassword: string): Promise<AuthResponse> {
  const supabase = await createClient()

  if (!newPassword) {
    return { error: 'Password is required', success: false }
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters', success: false }
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { error: null, success: true }
}
