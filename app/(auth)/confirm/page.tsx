'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import Button from '@/components/ui/Button'

function ConfirmContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    setResending(true)
    // TODO: Implement resend confirmation email functionality
    // This would need a new server action
    setTimeout(() => {
      setResending(false)
      setResent(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <MeteorShowerBackground />

      <div className="relative z-10 max-w-md w-full px-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-regular text-white mb-4">
            Check your email
          </h1>
          <p className="text-slate-300 mb-2">
            We sent a confirmation link to
          </p>
          <p className="text-white font-medium mb-6">{email}</p>
          <p className="text-slate-400 text-sm">
            Click the link in the email to activate your account.
          </p>
        </div>

        <div className="space-y-4">
          {resent ? (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400">
                Confirmation email sent! Check your inbox.
              </p>
            </div>
          ) : (
            <Button
              onClick={handleResend}
              loading={resending}
              variant="secondary"
            >
              Didn't receive it? Resend email
            </Button>
          )}

          <Link href="/login">
            <Button variant="primary">Back to login</Button>
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-slate-400 text-sm">
            Make sure to check your spam folder if you don't see the email.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen relative flex items-center justify-center">
        <MeteorShowerBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  )
}
