import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') // 'signup', 'recovery', or null for OAuth
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Determine redirect based on type
      if (type === 'signup') {
        // Email confirmation successful
        return NextResponse.redirect(`${origin}/dashboard?message=Email confirmed! Welcome to JEREMIAH33:3`)
      } else if (type === 'recovery') {
        // Password reset - redirect to reset password page
        return NextResponse.redirect(`${origin}/reset-password`)
      } else {
        // OAuth or standard callback
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
