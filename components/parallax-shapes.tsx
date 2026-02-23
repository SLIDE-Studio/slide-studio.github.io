"use client"

import { useEffect, useRef } from "react"

const shapes = [
  // Large slow shapes (deep background)
  { x: 5, y: 8, w: 120, h: 80, r: 16, color: "#1b9e6f", opacity: 0.07, speed: 0.08 },
  { x: 78, y: 25, w: 160, h: 100, r: 16, color: "#38a5e0", opacity: 0.06, speed: 0.06 },
  { x: 45, y: 55, w: 140, h: 60, r: 16, color: "#eab422", opacity: 0.06, speed: 0.07 },
  { x: 85, y: 70, w: 100, h: 140, r: 16, color: "#e47a9f", opacity: 0.05, speed: 0.05 },
  { x: 15, y: 85, w: 180, h: 80, r: 16, color: "#38a5e0", opacity: 0.05, speed: 0.04 },

  // Medium shapes (mid layer)
  { x: 70, y: 12, w: 56, h: 56, r: 9999, color: "#e8823a", opacity: 0.1, speed: 0.15 },
  { x: 25, y: 35, w: 48, h: 100, r: 12, color: "#1b9e6f", opacity: 0.08, speed: 0.12 },
  { x: 90, y: 48, w: 44, h: 44, r: 9999, color: "#eab422", opacity: 0.09, speed: 0.14 },
  { x: 55, y: 72, w: 80, h: 40, r: 12, color: "#e47a9f", opacity: 0.07, speed: 0.11 },
  { x: 8, y: 60, w: 64, h: 48, r: 12, color: "#e8823a", opacity: 0.06, speed: 0.1 },
  { x: 40, y: 15, w: 36, h: 36, r: 9999, color: "#38a5e0", opacity: 0.08, speed: 0.13 },

  // Small fast shapes (foreground)
  { x: 60, y: 5, w: 20, h: 20, r: 9999, color: "#e8823a", opacity: 0.12, speed: 0.25 },
  { x: 30, y: 20, w: 16, h: 16, r: 9999, color: "#1b9e6f", opacity: 0.14, speed: 0.28 },
  { x: 82, y: 38, w: 14, h: 14, r: 9999, color: "#e47a9f", opacity: 0.12, speed: 0.3 },
  { x: 12, y: 45, w: 18, h: 18, r: 9999, color: "#eab422", opacity: 0.1, speed: 0.22 },
  { x: 50, y: 62, w: 12, h: 12, r: 9999, color: "#38a5e0", opacity: 0.13, speed: 0.32 },
  { x: 75, y: 80, w: 16, h: 16, r: 9999, color: "#e8823a", opacity: 0.11, speed: 0.26 },
  { x: 95, y: 15, w: 10, h: 10, r: 9999, color: "#1b9e6f", opacity: 0.15, speed: 0.35 },
  { x: 20, y: 75, w: 14, h: 14, r: 9999, color: "#e47a9f", opacity: 0.12, speed: 0.27 },
]

export function ParallaxShapes() {
  const shapesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let rafId: number
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        for (let i = 0; i < shapesRef.current.length; i++) {
          const el = shapesRef.current[i]
          if (el) {
            const speed = shapes[i].speed
            el.style.transform = `translate3d(0, ${scrollY * speed * -1}px, 0)`
          }
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          ref={(el) => {
            shapesRef.current[i] = el
          }}
          className="absolute will-change-transform"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.w,
            height: shape.h,
            borderRadius: shape.r,
            backgroundColor: shape.color,
            opacity: shape.opacity,
          }}
        />
      ))}
    </div>
  )
}
