"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface MarqueeProps {
  items: string[]
  /** Negative speed scrolls the opposite direction */
  baseSpeed?: number
}

/**
 * An infinite scrolling marquee whose velocity reacts to scroll direction —
 * a hallmark of editorial/awwwards layouts. Pauses cleanly for reduced motion.
 */
export function Marquee({ items, baseSpeed = 0.6 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    let x = 0
    let dir = 1
    const half = track.scrollWidth / 2

    const tick = () => {
      x -= baseSpeed * dir
      if (half > 0) {
        if (x <= -half) x += half
        if (x >= 0) x -= half
      }
      gsap.set(track, { x })
    }
    gsap.ticker.add(tick)

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        dir = self.direction
      },
    })

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [baseSpeed])

  return (
    <div
      className="relative flex overflow-hidden border-y border-border bg-card/40 py-2 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex shrink-0 flex-nowrap whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
