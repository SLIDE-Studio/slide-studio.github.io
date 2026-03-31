"use client"

import { useEffect, useRef } from "react"

interface Blob {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  color: string
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

const COLORS = [
  "rgba(27, 158, 111, 0.12)",   // green
  "rgba(56, 165, 224, 0.10)",   // blue
  "rgba(234, 180, 34, 0.10)",   // yellow
  "rgba(228, 122, 159, 0.08)",  // pink
  "rgba(232, 130, 58, 0.10)",   // orange
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
      const numBlobs = 8

      for (let i = 0; i < numBlobs; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight * 2
        blobs.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 150 + Math.random() * 250,
          color: COLORS[i % COLORS.length],
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.01,
        })
      }
      blobsRef.current = blobs
    }

    const drawBlob = (blob: Blob, time: number) => {
      if (!ctx) return

      ctx.beginPath()
      
      const points = 8
      const angleStep = (Math.PI * 2) / points
      
      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep
        const wobble = Math.sin(time * 0.001 + blob.phase + angle * 3) * 20
        const r = blob.radius + wobble
        const px = blob.x + Math.cos(angle) * r
        const py = blob.y + Math.sin(angle) * r - scrollRef.current * 0.3
        
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          const prevAngle = (i - 1) * angleStep
          const prevWobble = Math.sin(time * 0.001 + blob.phase + prevAngle * 3) * 20
          const prevR = blob.radius + prevWobble
          const prevX = blob.x + Math.cos(prevAngle) * prevR
          const prevY = blob.y + Math.sin(prevAngle) * prevR - scrollRef.current * 0.3
          
          const cpX1 = prevX + Math.cos(prevAngle + Math.PI / 2) * (blob.radius * 0.5)
          const cpY1 = prevY + Math.sin(prevAngle + Math.PI / 2) * (blob.radius * 0.5) - scrollRef.current * 0.3
          const cpX2 = px - Math.cos(angle + Math.PI / 2) * (blob.radius * 0.5)
          const cpY2 = py - Math.sin(angle + Math.PI / 2) * (blob.radius * 0.5)
          
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, px, py)
        }
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
        blob.x = blob.baseX + Math.sin(time * 0.0003 + blob.phase) * 50
        blob.y = blob.baseY + Math.cos(time * 0.0002 + blob.phase) * 30
        
        drawBlob(blob, time)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }

    resize()
    initBlobs()
    animate(0)

    window.addEventListener("resize", resize)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
