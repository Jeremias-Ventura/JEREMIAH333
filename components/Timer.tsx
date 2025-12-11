'use client'

import { useState, useEffect, useRef } from 'react'

interface TimerProps {
  onComplete: (durationMinutes: number) => void
  onStart: () => void
  onPause: () => void
  onReset: () => void
  initialMinutes?: number
}

export default function Timer({ 
  onComplete, 
  onStart, 
  onPause, 
  onReset, 
  initialMinutes = 25 
}: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60)
  const [initialSeconds, setInitialSeconds] = useState(initialMinutes * 60)
  const [baselineSeconds, setBaselineSeconds] = useState(initialMinutes * 60)
  const [hasStarted, setHasStarted] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [timeInput, setTimeInput] = useState('25:00')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastTickRef = useRef<number>(Date.now())

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Parse MM:SS input to seconds
  const parseTimeInput = (input: string): number | null => {
    const parts = input.split(':')
    if (parts.length !== 2) return null
    
    const mins = parseInt(parts[0], 10)
    const secs = parseInt(parts[1], 10)
    
    if (isNaN(mins) || isNaN(secs)) return null
    if (mins < 0 || mins > 99) return null
    if (secs < 0 || secs > 59) return null
    
    return mins * 60 + secs
  }

  // Auto-fix time input
  const fixTimeInput = (input: string): string => {
    const parts = input.split(':')
    if (parts.length !== 2) return timeInput
    
    let mins = parseInt(parts[0], 10) || 0
    let secs = parseInt(parts[1], 10) || 0
    
    // Auto-fix: cap seconds at 59, minutes at 99
    if (secs > 59) secs = 59
    if (mins > 99) mins = 99
    if (mins < 0) mins = 0
    if (secs < 0) secs = 0
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Update timeInput when totalSeconds changes (but not when editing or running)
  useEffect(() => {
    if (!isEditing && !isRunning && !isComplete) {
      setTimeInput(formatTime(totalSeconds))
    }
  }, [totalSeconds, isEditing, isRunning, isComplete])

  // Timer countdown with drift correction
  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      lastTickRef.current = Date.now()
      
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = now - lastTickRef.current
        lastTickRef.current = now
        
        // Account for drift by checking actual elapsed time
        const secondsToSubtract = elapsed >= 1500 ? 2 : 1
        
        setTotalSeconds((prev) => {
          if (prev <= secondsToSubtract) {
            setIsRunning(false)
            setIsComplete(true)
            const duration = Math.ceil(initialSeconds / 60)
            onComplete(duration)
            
            // Play completion sound
            if (typeof window !== 'undefined' && 'AudioContext' in window) {
              try {
                const audioContext = new AudioContext()
                const oscillator = audioContext.createOscillator()
                const gainNode = audioContext.createGain()
                
                oscillator.connect(gainNode)
                gainNode.connect(audioContext.destination)
                
                oscillator.frequency.value = 800
                oscillator.type = 'sine'
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
                
                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.5)
              } catch (e) {
                // Silent fail if audio doesn't work
              }
            }
            
            return 0
          }
          return prev - secondsToSubtract
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, initialSeconds, onComplete])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to start/pause (only if not editing)
      if (e.code === 'Space' && !isEditing && !isComplete) {
        e.preventDefault()
        if (isRunning) {
          handlePause()
        } else {
          handleStart()
        }
      }
      
      // R to reset
      if (e.code === 'KeyR' && !isEditing) {
        e.preventDefault()
        handleReset()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRunning, isEditing, isComplete])

  const handleStart = () => {
    if (totalSeconds === 0) {
      // Don't allow starting with 00:00
      return
    }
    
    if (isComplete) {
      // Reset from complete state - treat this as a fresh start with baseline
      const seconds = parseTimeInput(timeInput) || baselineSeconds
      setBaselineSeconds(seconds)
      setInitialSeconds(seconds)
      setTotalSeconds(seconds)
      setIsComplete(false)
      setIsRunning(true)
      setHasStarted(true)
      onStart()
    } else {
      // First start captures baseline; resume from pause keeps baseline
      if (!hasStarted) {
        setBaselineSeconds(totalSeconds)
        setInitialSeconds(totalSeconds)
        setHasStarted(true)
      }
      setIsRunning(true)
      onStart()
    }
  }

  const handlePause = () => {
    setIsRunning(false)
    onPause()
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsComplete(false)

    const resetSeconds =
      baselineSeconds && baselineSeconds > 0
        ? baselineSeconds
        : initialMinutes * 60

    setTotalSeconds(resetSeconds)
    setInitialSeconds(resetSeconds)
    setTimeInput(formatTime(resetSeconds))

    setIsEditing(false)
    setHasStarted(false)
    onReset()
  }

  const handleTimeInputChange = (value: string) => {
    // Allow typing MM:SS format
    let cleaned = value.replace(/[^\d:]/g, '')
    
    // Handle different input patterns
    if (cleaned.length === 0) {
      setTimeInput('')
      return
    }
    
    // If user types a single digit followed by colon, assume they mean 0X:
    if (cleaned.length === 2 && cleaned[1] === ':') {
      cleaned = '0' + cleaned
    }
    
    // Auto-insert colon after 2 digits if not present and user is typing more
    if (cleaned.length === 2 && !cleaned.includes(':')) {
      cleaned = cleaned + ':'
    }
    
    // If user types more than 2 digits without colon, insert colon
    if (cleaned.length > 2 && !cleaned.includes(':')) {
      cleaned = cleaned.slice(0, 2) + ':' + cleaned.slice(2)
    }
    
    // Limit to MM:SS format (max 5 chars: MM:SS)
    if (cleaned.length <= 5) {
      setTimeInput(cleaned)
    }
  }

  const handleTimeInputBlur = () => {
    const fixed = fixTimeInput(timeInput)
    setTimeInput(fixed)
    const seconds = parseTimeInput(fixed) || initialMinutes * 60
    
    // Only update if it's a valid non-zero time
    if (seconds > 0) {
      setTotalSeconds(seconds)
      setInitialSeconds(seconds)
      setBaselineSeconds(seconds)
      setHasStarted(false) // editing defines a new baseline; next start is fresh
      setIsComplete(false)
    } else {
      // If zero or invalid, revert to previous value
      setTimeInput(formatTime(totalSeconds))
    }
    setIsEditing(false)
  }

  const handleTimeClick = () => {
    // Allow editing when paused or not started
    if (!isRunning && !isComplete) {
      setIsEditing(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative mt-12 sm:mt-0">

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center text-center">
        {isEditing ? (
          <input
            type="text"
            value={timeInput}
            onChange={(e) => handleTimeInputChange(e.target.value)}
            onBlur={handleTimeInputBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTimeInputBlur()
              }
              if (e.key === 'Escape') {
                setIsEditing(false)
                setTimeInput(formatTime(totalSeconds))
              }
            }}
            className="text-8xl md:text-9xl font-light text-white bg-transparent border border-slate-800 rounded-lg px-0 outline-none text-center w-3/4 focus:border-slate-600 focus:outline-none"
            style={{ fontWeight: 300 }}
            autoFocus
            placeholder="MM:SS"
            maxLength={5}
          />
        ) : (
          <div 
            onClick={handleTimeClick}
            className={`text-8xl md:text-9xl font-light text-slate-100 ${!isRunning && !isComplete ? 'cursor-text hover:opacity-80 transition-opacity' : ''}`}
            style={{ fontWeight: 300 }}
            title={!isRunning && !isComplete ? 'Click to edit time' : ''}
          >
            {formatTime(totalSeconds)}
          </div>
        )}
        {isComplete && (
          <div className="mt-4 text-lg font-medium text-slate-400">
            Session Complete
          </div>
        )}
        {!isRunning && !isComplete && !isEditing && (
          <div className="mt-2 text-xs text-slate-500">
            Click time to edit • Space to start • R to reset
          </div>
        )}
        {isRunning && (
          <div className="mt-2 text-xs text-slate-500">
            Space to pause • R to reset
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-3 mt-10">
        {!isComplete && (
          <>
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={totalSeconds === 0}
                className="cursor-pointer rounded-2xl bg-[#17213F] px-6 py-2 text-sm text-slate-100 transition-all hover:bg-[#1E2A6B] focus:outline-none uppercase font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="cursor-pointer rounded-2xl bg-[#272B5B] px-6 py-2 text-sm text-slate-100 transition-colors hover:bg-indigo-500/60 focus:outline-none uppercase font-medium"
              >
                PAUSE
              </button>
            )}
          </>
        )}
        
        {isComplete && (
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-2xl bg-emerald-600/60 px-6 py-2 text-sm text-slate-100 transition-colors hover:bg-emerald-500/60 focus:outline-none uppercase font-medium"
          >
            DONE
          </button>
        )}

        <button
          onClick={handleReset}
          className="cursor-pointer text-xs text-slate-500 transition-colors hover:text-white focus:outline-none uppercase mt-2"
        >
          RESET
        </button>
      </div>
    </div>
  )
}