'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { UserMenu } from '@/components/auth/UserMenu'

export default function Header() {
  const { user, loading } = useAuth()

  return (
    <header className="w-full relative z-50">
      <div className="mx-auto flex max-w-full items-center justify-between px-10 pt-9 mb-0 sm:-mb-20">
        <Link
          href="/"
          className="text-2xl font-regular text-white hover:text-slate-300 transition-colors cursor-pointer relative z-50"
        >
          JEREMIAH33:3
        </Link>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="text-sm text-slate-400">...</div>
          ) : user ? (
            <>
              <UserMenu user={user} />
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-white hover:text-slate-300 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}