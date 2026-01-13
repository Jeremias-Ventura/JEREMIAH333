'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  delay?: number;
  gradient?: 'blue' | 'purple' | 'green' | 'none';
  trend?: 'up' | 'down' | 'neutral';
}

function MiniChart({ trend, gradient, isZero }: { trend?: 'up' | 'down' | 'neutral'; gradient?: 'blue' | 'purple' | 'green' | 'none'; isZero?: boolean }) {
  const width = 100
  const height = 50
  const padding = 6
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Generate points based on trend with natural variation
  const points = 12
  const pointSpacing = chartWidth / (points - 1)
  
  let pathData = ''
  for (let i = 0; i < points; i++) {
    const x = padding + i * pointSpacing
    const progress = i / (points - 1)
    let baseY
    
    // If value is zero, make a straight line at the bottom
    if (isZero) {
      baseY = padding + chartHeight - 2 // Straight line near bottom
    } else if (trend === 'up') {
      // Upward trend: start low, end high with wavy variation
      baseY = padding + chartHeight - (progress * chartHeight * 0.65) - chartHeight * 0.2
      // Add natural wavy variation
      const wave = Math.sin(progress * Math.PI * 2.5) * (chartHeight * 0.08)
      const noise = Math.sin(progress * Math.PI * 4) * (chartHeight * 0.04)
      baseY += wave + noise
    } else if (trend === 'down') {
      // Downward trend: start high, end low with wavy variation
      baseY = padding + chartHeight * 0.2 + (progress * chartHeight * 0.65)
      // Add natural wavy variation
      const wave = Math.sin(progress * Math.PI * 2.5) * (chartHeight * 0.08)
      const noise = Math.sin(progress * Math.PI * 4) * (chartHeight * 0.04)
      baseY -= wave + noise
    } else {
      // Neutral: wavy line around middle
      const wave = Math.sin(progress * Math.PI * 3) * (chartHeight * 0.15)
      const noise = Math.sin(progress * Math.PI * 5) * (chartHeight * 0.06)
      baseY = padding + chartHeight / 2 + wave + noise
    }
    
    // Ensure y stays within bounds
    const y = Math.max(padding, Math.min(padding + chartHeight, baseY))
    
    if (i === 0) {
      pathData += `M ${x} ${y}`
    } else {
      pathData += ` L ${x} ${y}`
    }
  }

  const gradientColors = {
    blue: '#60a5fa',
    purple: '#a78bfa',
    green: '#4ade80',
    none: '#94a3b8',
  }

  const color = gradient && gradient !== 'none' ? gradientColors[gradient] : gradientColors.none

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}

export function StatCard({ 
  label, 
  value, 
  subValue, 
  delay = 0,
  gradient = 'none',
  trend
}: StatCardProps) {
  const gradientClasses = {
    blue: 'from-blue-500/10 to-transparent',
    purple: 'from-purple-500/10 to-transparent',
    green: 'from-green-500/10 to-transparent',
    none: '',
  }

  // Check if value is zero (handle both string and number formats)
  const isZero = typeof value === 'string' 
    ? value.includes('0h 0m') || value === '0h' || value === '0'
    : value === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 flex flex-col items-start justify-center backdrop-blur-sm relative overflow-hidden group hover:border-slate-700/50 transition-colors"
    >
      {gradient !== 'none' && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity`} />
      )}
      
      {/* Mini Chart */}
      <MiniChart trend={trend} gradient={gradient} isZero={isZero} />
      
      <span className="text-slate-400 text-xs uppercase tracking-widest font-light mb-3">
        {label}
      </span>
      
      <span className="text-4xl md:text-5xl text-slate-100 font-light tracking-tight mb-2 text-left">
        {value}
      </span>
      {subValue && (
        <span className="text-slate-500 text-xs font-light italic text-left">
          {subValue}
        </span>
      )}
    </motion.div>
  );
}

