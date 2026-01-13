'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { resetPassword } from '@/app/actions/auth'
import { getAuthErrorMessage } from '@/lib/utils/auth-errors'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const result = await resetPassword(email)

      if (result.error) {
        setError(getAuthErrorMessage(result.error))
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <MeteorShowerBackground />

      <div className="relative z-10 max-w-md w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-regular text-white mb-2">
            Reset Password
          </h1>
          <p className="text-slate-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {success ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-center">
                Check your email for reset instructions
              </p>
            </div>

            <Link href="/login">
              <Button variant="primary">Back to login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" loading={loading}>
              Send Reset Link
            </Button>

            <Link href="/login">
              <Button variant="secondary">Back to login</Button>
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
