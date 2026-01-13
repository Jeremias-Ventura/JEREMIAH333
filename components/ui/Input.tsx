import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export default function Input({ error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`
          w-full rounded-xl bg-white/10 border px-4 py-3 text-white
          placeholder:text-slate-400 transition-all
          focus:outline-none focus:ring-2 focus:ring-white/20
          ${error ? 'border-red-500/50' : 'border-white/20'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
