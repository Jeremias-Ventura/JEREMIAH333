export const AUTH_CONFIG = {
  providers: ['google'] as const,
  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  cookieName: 'jeremiah33-auth',
}

export const PROTECTED_ROUTES = ['/dashboard']
export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/confirm',
  '/auth/callback',
]
export const PUBLIC_ROUTES = ['/', '/about']
