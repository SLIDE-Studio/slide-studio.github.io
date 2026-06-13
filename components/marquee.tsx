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
      className="relative flex overflow-hidden border-y border-border bg-card/40 py-4 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex shrink-0 flex-nowrap whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
