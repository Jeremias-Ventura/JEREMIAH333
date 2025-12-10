'use client'

import { useState, useRef, useEffect } from 'react'
import Timer from '@/components/Timer'
import BibleVerseDisplay, { type BibleVerseDisplayRef } from '@/components/BibleVerse'
import ShootingStars from '@/components/ShootingStars'
import MeteorShowerBackground from '@/components/MeteorShowerBackground'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function Home() {
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [sessionDuration, setSessionDuration] = useState(25)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const verseRef = useRef<BibleVerseDisplayRef>(null)
  const supabase = createClient()
  const verseChangeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-change verse every 5 minutes while timer is running
  useEffect(() => {
    if (isTimerRunning) {
      verseChangeIntervalRef.current = setInterval(() => {
        if (verseRef.current) {
          verseRef.current.loadNewVerse()
        }
      }, 2 * 60 * 1000) // 5 minutes in milliseconds
    } else {
      if (verseChangeIntervalRef.current) {
        clearInterval(verseChangeIntervalRef.current)
        verseChangeIntervalRef.current = null
      }
    }

    return () => {
      if (verseChangeIntervalRef.current) {
        clearInterval(verseChangeIntervalRef.current)
      }
    }
  }, [isTimerRunning])

  const handleSessionComplete = async (completedMinutes: number) => {
    setSessionCompleted(true)
    setIsTimerRunning(false)
    const duration = completedMinutes
    
    // Check if user is logged in and record the session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      try {
        const { error } = await supabase.from('focus_sessions').insert({
          user_id: user.id,
          duration_minutes: duration,
          completed_at: new Date().toISOString(),
        })

        if (error) {
          console.error('Error recording session:', error)
        }
      } catch (error) {
        console.error('Error recording session:', error)
      }
    }
  }

  const handleTimerStart = () => {
    setIsTimerRunning(true)
    setSessionCompleted(false)
  }

  const handleTimerPause = () => {
    setIsTimerRunning(false)
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setSessionCompleted(false)
  }

  return (
    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 p-8 sm:pr-10 md:pr-13 lg:pr-30 relative">
      {/* Subtle meteor shower background - always running */}
      <MeteorShowerBackground />
      
      {/* Shooting Stars Animation - across whole page when timer completes */}
      {sessionCompleted && <ShootingStars />}

      {/* Timer - Top on mobile, Left on desktop */}
      <div className="flex-1 flex items-center justify-center md:justify-end w-full md:max-w-2xl mt-10 ">
        <Timer
          onComplete={handleSessionComplete}
          onStart={handleTimerStart}
          onPause={handleTimerPause}
          onReset={handleTimerReset}
          initialMinutes={25}
        />
      </div>

      {/* Verse - Bottom on mobile, Right on desktop */}
      <div className="flex-1 flex items-center justify-center md:justify-start w-full md:max-w-2xl sm:-mt-1">
        <BibleVerseDisplay ref={verseRef} />
      </div>
    </div>
  )
}
