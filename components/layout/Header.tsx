'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isTimerRunning ? 0 : 1,
        y: isTimerRunning ? -5 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full relative z-50"
      style={{ pointerEvents: isTimerRunning ? 'none' : 'auto' }}
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
    </motion.header>
  )
}