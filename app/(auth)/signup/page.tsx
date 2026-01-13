'use client'

import { LoginButton } from '@/components/auth/LoginButton'
import EmailSignUpForm from '@/components/auth/EmailSignUpForm'
import AuthDivider from '@/components/auth/AuthDivider'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12">
      <MeteorShowerBackground />

      <div className="relative z-10 max-w-md w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-regular text-white mb-2">
            Create Account
          </h1>
          <p className="text-slate-400">Start tracking your focus sessions</p>
        </div>

        <div className="space-y-6">
          <EmailSignUpForm />

          <AuthDivider />

          <LoginButton provider="google" />
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-white hover:underline"
            >
              Sign In
            </Link>
          </p>
          <Link
            href="/"
            className="block text-slate-400 hover:text-white transition-colors text-sm"
          >
            Continue without signing in
          </Link>
        </div>
      </div>
    </div>
  )
}
