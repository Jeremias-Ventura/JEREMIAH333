'use client'

import { useState, useRef, useEffect } from 'react'
import Timer from '@/components/Timer'
import BibleVerseDisplay, { type BibleVerseDisplayRef } from '@/components/ui/BibleVerse'
import ShootingStars from '@/components/ui/ShootingStars'
import MeteorShowerBackground from '@/components/ui/MeteorShowerBackground'
import { createSession } from '@/app/actions/sessions'
import { useAuth } from '@/hooks/useAuth'

export const dynamic = 'force-dynamic'

export default function Home() {
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const verseRef = useRef<BibleVerseDisplayRef>(null)
  const { user } = useAuth()
  const verseChangeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-change verse every 5 minutes while timer is running
  useEffect(() => {
    if (isTimerRunning) {
      verseChangeIntervalRef.current = setInterval(() => {
        if (verseRef.current) {
          verseRef.current.loadNewVerse()
        }
      }, 5 * 60 * 1000) // 5 minutes in milliseconds
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

    // Only save session if user is authenticated
    if (user) {
      try {
        await createSession(completedMinutes)
      } catch (error) {
        console.error('Error saving session:', error)
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
    <div className="min-h-screen md:h-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 p-8 sm:pr-10 md:pr-13 lg:pr-30 relative">
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
