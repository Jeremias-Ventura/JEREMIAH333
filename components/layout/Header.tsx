'use client'

import Link from 'next/link'
import { useAuthContext } from '@/contexts/AuthContext'
import { useTimerContext } from '@/contexts/TimerContext'
import { UserMenu } from '@/components/auth/UserMenu'
import { useState, useEffect } from 'react'

export default function Header() {
  const { user, loading } = useAuthContext()
  const { isTimerRunning } = useTimerContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header
      className={`w-full relative z-50 transition-opacity duration-300 ease-in-out ${
        isTimerRunning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="mx-auto flex max-w-full items-center justify-between px-10 pt-9 mb-0 sm:-mb-20">
        <Link
          href="/"
          className="text-2xl font-regular text-white hover:text-slate-300 transition-colors cursor-pointer relative z-50"
        >
          JEREMIAH33:3
        </Link>

        <div className="flex items-center gap-4">
          {!mounted || loading ? (
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