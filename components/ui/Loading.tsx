'use client'

import { motion } from 'framer-motion'
import { CrossIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1e]">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <CrossIcon
          className="w-8 h-8 text-white/60"
          strokeWidth={2.5}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-slate-400 text-sm font-light italic"
      >
        All in God's Timing
      </motion.p>
    </div>
  )
}

