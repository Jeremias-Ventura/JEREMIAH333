'use client'

import { motion } from 'framer-motion'
import { Clock, Target, TrendingUp, Flame } from 'lucide-react'
import type { SessionStats } from '@/types/session'

interface InsightsCardProps {
  stats: SessionStats
  delay?: number
}

export function InsightsCard({ stats, delay = 0 }: InsightsCardProps) {
  const insights = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}`,
      color: 'text-orange-400',
    },
    {
      icon: Clock,
      label: 'Average Session',
      value: `${stats.averageSessionLength} min`,
      color: 'text-blue-400',
    },
    {
      icon: Target,
      label: 'Longest Session',
      value: `${stats.longestSession} min`,
      color: 'text-purple-400',
    },
    {
      icon: TrendingUp,
      label: 'Total Sessions',
      value: stats.totalSessions.toString(),
      color: 'text-green-400',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col"
    >
      <span className="text-slate-400 text-xs uppercase tracking-widest mb-6 block font-light">
        Insights
      </span>
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: delay + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`${insight.color} opacity-60`}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-light">
                  {insight.label}
                </p>
                <p className="text-slate-200 text-lg font-light mt-0.5">
                  {insight.value}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

