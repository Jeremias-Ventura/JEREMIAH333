'use client'

import { LoginButton } from '@/components/auth/LoginButton'
import EmailLoginForm from '@/components/auth/EmailLoginForm'
import AuthDivider from '@/components/auth/AuthDivider'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <MeteorShowerBackground />

      <div className="relative z-10 max-w-md w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-regular text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400">Sign in to track your focus sessions</p>
        </div>

        <div className="space-y-6">
          <EmailLoginForm />

          <AuthDivider />

          <LoginButton provider="google" />
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-white hover:underline"
            >
              Sign Up
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
