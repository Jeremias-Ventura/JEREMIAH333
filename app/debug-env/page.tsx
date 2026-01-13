'use client'

export default function DebugEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Environment Variables Debug</h1>

        <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl">
          <div>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
            <p className="text-slate-300 mt-1 font-mono text-sm break-all">
              {supabaseUrl || '❌ NOT SET'}
            </p>
          </div>

          <div>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
            <p className="text-slate-300 mt-1 font-mono text-sm">
              {hasAnonKey ? '✅ SET (hidden for security)' : '❌ NOT SET'}
            </p>
          </div>

          <div>
            <strong>NEXT_PUBLIC_SITE_URL:</strong>
            <p className="text-slate-300 mt-1 font-mono text-sm break-all">
              {siteUrl || '❌ NOT SET'}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <strong>Status:</strong>
            <p className="text-lg mt-2">
              {supabaseUrl && hasAnonKey && siteUrl ? (
                <span className="text-green-400">✅ All environment variables are set!</span>
              ) : (
                <span className="text-red-400">❌ Environment variables missing in production</span>
              )}
            </p>
          </div>

          {(!supabaseUrl || !hasAnonKey) && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">
                <strong>Fix:</strong> Go to Vercel Dashboard → Settings → Environment Variables
                and add the missing variables. Then redeploy.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
