'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signUpWithEmail } from '@/app/actions/auth'
import { getAuthErrorMessage } from '@/lib/utils/auth-errors'
import { useAuthContext } from '@/contexts/AuthContext'

export default function EmailSignUpForm() {
  const router = useRouter()
  const { refreshUser } = useAuthContext()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validatePassword = (pass: string): string | null => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/[A-Za-z]/.test(pass)) {
      return 'Password must contain at least one letter'
    }
    if (!/[0-9]/.test(pass)) {
      return 'Password must contain at least one number'
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)

    try {
      const result = await signUpWithEmail(email, password, displayName)

      if (result.error) {
        setError(getAuthErrorMessage(result.error))
        setLoading(false)
      } else if (result.needsConfirmation) {
        // Show success message and redirect to confirmation page
        setSuccess(true)
        setTimeout(() => {
          router.push(`/confirm?email=${encodeURIComponent(email)}`)
        }, 2000)
        setLoading(false)
      } else {
        // No confirmation needed, redirect to dashboard
        await refreshUser()  // Immediately update auth state
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const getPasswordStrength = (pass: string): { label: string; color: string } => {
    if (pass.length === 0) return { label: '', color: '' }
    if (pass.length < 8) return { label: 'Weak', color: 'text-red-400' }
    if (!/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass)) {
      return { label: 'Fair', color: 'text-yellow-400' }
    }
    if (pass.length >= 12) return { label: 'Strong', color: 'text-green-400' }
    return { label: 'Good', color: 'text-blue-400' }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Display Name (optional)"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        autoComplete="name"
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {password && passwordStrength.label && (
          <p className={`mt-1.5 text-sm ${passwordStrength.color}`}>
            Password strength: {passwordStrength.label}
          </p>
        )}
      </div>

      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-400">
            Account created! Check your email to confirm your account.
          </p>
        </div>
      )}

      <Button type="submit" loading={loading}>
        Create Account
      </Button>
    </form>
  )
}
