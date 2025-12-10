'use client'

import { useEffect, useRef } from 'react'

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
  size: number
  life: number
  maxLife: number
}

export default function MeteorShowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const meteorsRef = useRef<Meteor[]>([])
  const lastSpawnTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Spawn a new meteor
    const spawnMeteor = () => {
      const angle = Math.PI / 4 // 45 degrees diagonal
      
      // Random starting position from top or left
      let startX: number
      let startY: number
      
      if (Math.random() > 0.5) {
        // Start from top
        startX = Math.random() * canvas.width
        startY = -10 // Start slightly above canvas
      } else {
        // Start from left
        startX = -10 // Start slightly left of canvas
        startY = Math.random() * canvas.height
      }
      
      const length = 30 + Math.random() * 50 // Shorter, more subtle trails
      const speed = 0.3 + Math.random() * 0.4 // Slower speed
      const size = 0.5 + Math.random() * 1 // Much smaller size
      const maxLife = 2 + Math.random() * 2 // 2-4 seconds lifespan

      meteorsRef.current.push({
        x: startX,
        y: startY,
        length,
        speed,
        opacity: 0.3 + Math.random() * 0.3, // Lower opacity (0.3-0.6)
        angle,
        size,
        life: 0,
        maxLife,
      })
    }

    // Animation loop using requestAnimationFrame for smooth 60fps
    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastSpawnTimeRef.current) / 1000

      // Spawn new meteors periodically (every 0.5-2 seconds)
      if (deltaTime > 0.5 + Math.random() * 1.5) {
        spawnMeteor()
        lastSpawnTimeRef.current = now
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each meteor
      meteorsRef.current = meteorsRef.current.filter((meteor) => {
        meteor.life += 0.016 // ~60fps, increment by frame time

        if (meteor.life > meteor.maxLife) {
          return false // Remove expired meteors
        }

        const progress = meteor.life / meteor.maxLife

        // Calculate current position
        const distance = progress * Math.max(canvas.width, canvas.height) * 1.2
        const currentX = meteor.x + Math.cos(meteor.angle) * distance
        const currentY = meteor.y + Math.sin(meteor.angle) * distance

        // Fade out as it progresses
        const opacity = meteor.opacity * (1 - progress * 0.5) // Subtle fade

        // Draw meteor trail
        ctx.save()
        ctx.globalAlpha = opacity

        // Create gradient for the trail - more subtle
        const gradient = ctx.createLinearGradient(
          currentX,
          currentY,
          currentX - Math.cos(meteor.angle) * meteor.length,
          currentY - Math.sin(meteor.angle) * meteor.length
        )

        // Subtle white head fading to transparent
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        gradient.addColorStop(0.2, `rgba(255, 255, 255, ${opacity * 0.7})`)
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(150, 200, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = meteor.size
        ctx.lineCap = 'round'
        ctx.shadowBlur = 5 // Reduced glow
        ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`

        // Draw the trail
        ctx.beginPath()
        ctx.moveTo(currentX, currentY)
        ctx.lineTo(
          currentX - Math.cos(meteor.angle) * meteor.length,
          currentY - Math.sin(meteor.angle) * meteor.length
        )
        ctx.stroke()

        // Draw subtle head/star - much smaller
        ctx.beginPath()
        ctx.arc(currentX, currentY, meteor.size * 1.5, 0, Math.PI * 2)
        
        // Subtle glow
        const headGradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          meteor.size * 3
        )
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        headGradient.addColorStop(0.5, `rgba(240, 250, 255, ${opacity * 0.5})`)
        headGradient.addColorStop(1, 'rgba(200, 230, 255, 0)')

        ctx.fillStyle = headGradient
        ctx.fill()

        ctx.restore()

        return true // Keep this meteor
      })

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

