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
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const meteorsRef = useRef<Meteor[]>([])
  const startTimeRef = useRef<number>(Date.now())

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

    // Initialize meteors - all going in the same direction (top-left to bottom-right)
    const initMeteors = () => {
      meteorsRef.current = []
      const meteorCount = 16 // Increased count for better coverage
      const angle = Math.PI / 4 // 45 degrees diagonal - all go same direction
      
      for (let i = 0; i < meteorCount; i++) {
        let startX: number
        let startY: number
        
        // Alternate between top area and bottom-left area
        if (i % 2 === 0) {
          // Start from top area
          startX = Math.random() * canvas.width // Can start anywhere across the width
          startY = Math.random() * canvas.height * 0.3 // Start from top area
        } else {
          // Start from bottom-left area
          startX = Math.random() * canvas.width * 0.4 // Start from left side
          startY = canvas.height * 0.7 + Math.random() * canvas.height * 0.3 // Start from bottom area
        }
        
        const length = 80 + Math.random() * 120 // Trail length
        const speed = 0.5 + Math.random() * 0.5 // Speed variation
        const size = 2 + Math.random() * 3 // Star size
        const delay = i * 0.25 // Stagger the meteors

        meteorsRef.current.push({
          x: startX,
          y: startY,
          length,
          speed,
          opacity: 1,
          angle, // All use the same angle
          size,
          delay,
        } as Meteor & { delay: number })
      }
    }

    initMeteors()
    startTimeRef.current = Date.now()

    // Animation loop using requestAnimationFrame for smooth 60fps
    const animate = () => {
      const now = Date.now()
      const elapsed = (now - startTimeRef.current) / 1000 // Convert to seconds

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each meteor
      meteorsRef.current.forEach((meteor: Meteor & { delay?: number }) => {
        const delay = meteor.delay || 0
        if (elapsed < delay) return

        const progress = (elapsed - delay) / 3 // 3 second animation duration
        if (progress > 1) return // Meteor finished

        // Calculate current position
        const distance = progress * Math.max(canvas.width, canvas.height) * 1.5
        const currentX = meteor.x + Math.cos(meteor.angle) * distance
        const currentY = meteor.y + Math.sin(meteor.angle) * distance

        // Fade out as it progresses
        const opacity = meteor.opacity * (1 - progress)

        // Draw meteor trail
        ctx.save()
        ctx.globalAlpha = opacity

        // Create gradient for the trail
        const gradient = ctx.createLinearGradient(
          currentX,
          currentY,
          currentX - Math.cos(meteor.angle) * meteor.length,
          currentY - Math.sin(meteor.angle) * meteor.length
        )

        // Bright white head fading to transparent
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)')
        gradient.addColorStop(0.3, 'rgba(220, 240, 255, 0.7)')
        gradient.addColorStop(0.6, 'rgba(180, 220, 255, 0.4)')
        gradient.addColorStop(1, 'rgba(150, 200, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = meteor.size
        ctx.lineCap = 'round'
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'

        // Draw the trail
        ctx.beginPath()
        ctx.moveTo(currentX, currentY)
        ctx.lineTo(
          currentX - Math.cos(meteor.angle) * meteor.length,
          currentY - Math.sin(meteor.angle) * meteor.length
        )
        ctx.stroke()

        // Draw bright head/star
        ctx.beginPath()
        ctx.arc(currentX, currentY, meteor.size * 2, 0, Math.PI * 2)
        
        // Multiple glow layers for beautiful star effect
        const headGradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          meteor.size * 4
        )
        headGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        headGradient.addColorStop(0.3, 'rgba(240, 250, 255, 0.8)')
        headGradient.addColorStop(0.6, 'rgba(200, 230, 255, 0.5)')
        headGradient.addColorStop(1, 'rgba(150, 200, 255, 0)')

        ctx.fillStyle = headGradient
        ctx.fill()

        // Additional glow layers
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(currentX, currentY, meteor.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.fill()

        ctx.restore()
      })

      // Continue animation if any meteors are still active
      const hasActiveMeteors = meteorsRef.current.some(
        (meteor: Meteor & { delay?: number }) => {
          const delay = meteor.delay || 0
          const progress = (elapsed - delay) / 3
          return progress >= 0 && progress <= 1
        }
      )

      if (hasActiveMeteors) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
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
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  )
}