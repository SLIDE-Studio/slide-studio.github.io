"use client"

import { useRef, useEffect, type ReactNode, type ElementType } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface RevealProps {
  children: ReactNode
  /** Stagger child elements instead of revealing the whole block at once */
  stagger?: boolean
  /** Delay before the reveal (seconds) */
  delay?: number
  /** Distance to travel upward (px) */
  y?: number
  as?: ElementType
  className?: string
  id?: string
}

/**
 * Fades + slides content into view as it enters the viewport.
 * When `stagger` is true, direct children animate in sequence.
 * Falls back to fully-visible content when reduced motion is preferred.
 */
export function Reveal({
  children,
  stagger = false,
  delay = 0,
  y = 28,
  as,
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = (as ?? "div") as ElementType

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el]

      gsap.set(targets, { opacity: 0, y })

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, delay, y])

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  )
}
