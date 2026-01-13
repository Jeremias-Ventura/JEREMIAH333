import { getSessionStats, getSessions } from '@/app/actions/sessions'
import { MotivationalVerse } from '@/components/dashboard/MotivationalVerse'
import { StatCard } from '@/components/dashboard/StatCard'
import { RecentSessions } from '@/components/dashboard/RecentSessions'
import { InsightsCard } from '@/components/dashboard/InsightsCard'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import Link from 'next/link'

export default async function DashboardPage() {
  const { stats } = await getSessionStats()
  const { sessions } = await getSessions(100) // Get many sessions for scrolling

  if (!stats) {
    return <div>Error loading stats</div>
  }

  // Get greeting based on time of day
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-screen relative">
      <MeteorShowerBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Header with greeting */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-slate-100 font-light mb-2">
            {greeting}
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-[0.3em] font-light">
            Your Focus Journey
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Today's Focus"
            value={`${Math.floor(stats.todayMinutes / 60)}h ${stats.todayMinutes % 60}m`}
            subValue={`${stats.todaySessions} session${stats.todaySessions !== 1 ? 's' : ''} today`}
            delay={0.1}
            gradient="blue"
            trend={stats.todayTrend}
          />
          <StatCard
            label="This Week"
            value={`${Math.floor(stats.weekMinutes / 60)}h ${stats.weekMinutes % 60}m`}
            subValue={`${stats.weekSessions} session${stats.weekSessions !== 1 ? 's' : ''} this week`}
            delay={0.2}
            gradient="purple"
            trend={stats.weekTrend}
          />
          <StatCard
            label="Total Focus"
            value={`${Math.floor(stats.totalMinutes / 60)}h`}
            subValue={`${stats.totalSessions} total sessions`}
            delay={0.3}
            gradient="green"
            trend="up"
          />
        </div>

                <MotivationalVerse stats={stats} />


        {/* Insights and Recent Sessions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-1 h-full">
            <InsightsCard stats={stats} delay={0.4} />
          </div>
          <div className="md:col-span-2 h-full">
            <RecentSessions sessions={sessions} delay={0.5} />
          </div>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-light mb-2">
            © 2025 JEREMIAH33:3 • Stay Grounded
          </p>
          <Link 
            href="/about" 
            className="text-slate-600 hover:text-slate-400 text-[10px] uppercase tracking-[0.3em] font-light transition-colors"
          >
            Learn More
          </Link>
        </footer>
      </div>
    </div>
  )
}
