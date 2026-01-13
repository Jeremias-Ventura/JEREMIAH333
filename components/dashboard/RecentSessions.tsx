'use client';

import { motion } from 'framer-motion';
import type { FocusSession } from '@/types/session';
import { formatDistanceToNow } from '@/lib/utils/time';

interface RecentSessionsProps {
  sessions: FocusSession[];
  delay?: number;
}

export function RecentSessions({ sessions, delay = 0 }: RecentSessionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm flex flex-col h-full"
    >
      <span className="text-slate-400 text-xs uppercase tracking-widest mb-6 block font-light">
        Recent Sessions
      </span>
      
      {sessions.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px]">
          <p className="text-slate-500 text-sm font-light italic">
            No sessions yet. Complete your first timer!
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto space-y-2 pr-2 max-h-[300px]">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: delay + index * 0.03 }}
              className="bg-slate-900/30 border border-slate-800/40 rounded-xl p-3 flex justify-between items-center group hover:bg-slate-900/50 hover:border-slate-700/50 transition-all"
            >
              <div className="flex flex-col gap-1">
                <span className="text-slate-200 text-sm font-light">
                  {formatDistanceToNow(new Date(session.completed_at))}
                </span>
                <span className="text-slate-500 text-[10px] uppercase tracking-wider">
                  {new Date(session.completed_at).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500/60 group-hover:bg-slate-400 transition-colors" />
                <span className="text-slate-300 font-light tracking-wide min-w-[3rem] text-right">
                  {session.duration_minutes}m
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

