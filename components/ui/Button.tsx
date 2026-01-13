import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  loading = false,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'w-full rounded-2xl px-6 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-white/10 hover:bg-white/20',
    secondary: 'bg-transparent border border-white/20 hover:border-white/30',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
