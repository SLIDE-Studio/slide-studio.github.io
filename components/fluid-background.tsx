"use client"

import { useEffect, useRef } from "react"

interface Blob {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  baseRadius: number
  color: string
  phase: number
  phaseSpeed: number
  pinch: number // 0 = normal, 1 = fully pinched
  pinchTarget: number
}

const COLORS = [
  "rgba(27, 158, 111, 0.15)",   // green
  "rgba(56, 165, 224, 0.12)",   // blue
  "rgba(234, 180, 34, 0.12)",   // yellow
  "rgba(228, 122, 159, 0.10)",  // pink
  "rgba(232, 130, 58, 0.12)",   // orange
]

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<Blob[]>([])
  const scrollRef = useRef(0)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    const initBlobs = () => {
      const blobs: Blob[] = []
      const numBlobs = 12

      for (let i = 0; i < numBlobs; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight * 3
        const radius = 40 + Math.random() * 80
        blobs.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius,
          baseRadius: radius,
          color: COLORS[i % COLORS.length],
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.008 + Math.random() * 0.015,
          pinch: 0,
          pinchTarget: 0,
        })
      }
      blobsRef.current = blobs
    }

    const drawBlob = (blob: Blob, time: number) => {
      if (!ctx) return

      const scrollOffset = scrollRef.current * 0.3
      const screenY = blob.y - scrollOffset

      // Skip drawing if blob is far off screen
      if (screenY < -blob.radius * 2 || screenY > window.innerHeight + blob.radius * 2) {
        return
      }

      ctx.beginPath()
      
      const points = 6
      const angleStep = (Math.PI * 2) / points
      
      // Pinch effect - contracts the blob toward center
      const pinchFactor = 1 - blob.pinch * 0.6
      const currentRadius = blob.radius * pinchFactor
      
      const pathPoints: { x: number; y: number }[] = []
      
      for (let i = 0; i < points; i++) {
        const angle = i * angleStep
        const wobble = Math.sin(time * 0.002 + blob.phase + angle * 2) * (8 * pinchFactor)
        const r = currentRadius + wobble
        const px = blob.x + Math.cos(angle) * r
        const py = screenY + Math.sin(angle) * r
        pathPoints.push({ x: px, y: py })
      }
      
      // Draw smooth blob using quadratic curves through midpoints
      ctx.moveTo(
        (pathPoints[0].x + pathPoints[points - 1].x) / 2,
        (pathPoints[0].y + pathPoints[points - 1].y) / 2
      )
      
      for (let i = 0; i < points; i++) {
        const curr = pathPoints[i]
        const next = pathPoints[(i + 1) % points]
        const midX = (curr.x + next.x) / 2
        const midY = (curr.y + next.y) / 2
        ctx.quadraticCurveTo(curr.x, curr.y, midX, midY)
      }
      
      ctx.closePath()
      ctx.fillStyle = blob.color
      ctx.fill()
    }

    const animate = (time: number) => {
      if (!ctx) return
      
      timeRef.current = time
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      blobsRef.current.forEach((blob) => {
        // Organic movement
        blob.phase += blob.phaseSpeed
        blob.x = blob.baseX + Math.sin(time * 0.0004 + blob.phase) * 30
        blob.y = blob.baseY + Math.cos(time * 0.0003 + blob.phase) * 20
        
        // Animate pinch - smoothly interpolate toward target
        blob.pinch += (blob.pinchTarget - blob.pinch) * 0.15
        
        // Auto-release pinch
        if (blob.pinchTarget > 0) {
          blob.pinchTarget *= 0.92
          if (blob.pinchTarget < 0.01) {
            blob.pinchTarget = 0
          }
        }
        
        drawBlob(blob, time)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }

    const onClick = (e: MouseEvent) => {
      const clickX = e.clientX
      const clickY = e.clientY + scrollRef.current * 0.3

      blobsRef.current.forEach((blob) => {
        const dx = blob.x - clickX
        const dy = blob.y - clickY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Pinch blobs within range - closer blobs pinch more
        const maxRange = 200
        if (distance < maxRange) {
          const intensity = 1 - (distance / maxRange)
          blob.pinchTarget = Math.max(blob.pinchTarget, intensity)
        }
      })
    }

    resize()
    initBlobs()
    animate(0)

    window.addEventListener("resize", resize)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
