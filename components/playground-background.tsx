"use client"

import { useEffect, useRef } from "react"

/**
 * Playful, hand-drawn "playground / kids drawing" parallax background.
 * Crayon-style doodles (stars, squiggles, spirals, hearts, suns, clouds,
 * bubbles) float, wobble, and parallax on scroll. Decorative only.
 * Respects prefers-reduced-motion (renders static, no motion).
 */

type Doodle = {
  /** position in % */
  x: number
  y: number
  /** rendered size in px */
  size: number
  /** brand color */
  color: string
  /** scroll-parallax speed (negative moves up as you scroll down) */
  speed: number
  /** seconds for the float loop */
  dur: number
  /** animation delay in seconds */
  delay: number
  /** base rotation in deg */
  rot: number
  /** which doodle to draw */
  kind: Kind
}

type Kind =
  | "star"
  | "squiggle"
  | "spiral"
  | "heart"
  | "sun"
  | "cloud"
  | "bubble"
  | "flower"
  | "zigzag"
  | "blob"

const TEAL = "#1b9e6f"
const BLUE = "#38a5e0"
const GOLD = "#eab422"
const CORAL = "#e47a9f"
const ORANGE = "#e8823a"

const doodles: Doodle[] = [
  // deep / large + slow
  { x: 6, y: 10, size: 90, color: GOLD, speed: 0.06, dur: 9, delay: 0, rot: -8, kind: "sun" },
  { x: 82, y: 14, size: 110, color: BLUE, speed: 0.05, dur: 11, delay: 1.2, rot: 6, kind: "cloud" },
  { x: 70, y: 60, size: 96, color: CORAL, speed: 0.07, dur: 10, delay: 0.6, rot: -5, kind: "blob" },
  { x: 12, y: 70, size: 84, color: TEAL, speed: 0.06, dur: 12, delay: 2.0, rot: 10, kind: "flower" },

  // mid layer
  { x: 40, y: 8, size: 54, color: CORAL, speed: 0.12, dur: 7, delay: 0.3, rot: 0, kind: "star" },
  { x: 90, y: 40, size: 48, color: TEAL, speed: 0.13, dur: 8, delay: 1.0, rot: 12, kind: "spiral" },
  { x: 22, y: 36, size: 60, color: ORANGE, speed: 0.11, dur: 9, delay: 0.8, rot: -10, kind: "squiggle" },
  { x: 58, y: 44, size: 44, color: BLUE, speed: 0.14, dur: 7.5, delay: 1.6, rot: 4, kind: "heart" },
  { x: 84, y: 78, size: 52, color: GOLD, speed: 0.12, dur: 8.5, delay: 0.2, rot: -6, kind: "star" },
  { x: 33, y: 88, size: 50, color: BLUE, speed: 0.1, dur: 10, delay: 1.4, rot: 8, kind: "zigzag" },

  // foreground / small + fast
  { x: 50, y: 22, size: 26, color: ORANGE, speed: 0.24, dur: 5.5, delay: 0.1, rot: 0, kind: "bubble" },
  { x: 16, y: 50, size: 30, color: GOLD, speed: 0.26, dur: 6, delay: 0.9, rot: 0, kind: "star" },
  { x: 76, y: 28, size: 22, color: CORAL, speed: 0.28, dur: 5, delay: 0.5, rot: 0, kind: "bubble" },
  { x: 64, y: 84, size: 28, color: TEAL, speed: 0.25, dur: 6.5, delay: 1.1, rot: 0, kind: "spiral" },
  { x: 4, y: 30, size: 24, color: BLUE, speed: 0.3, dur: 5.2, delay: 1.8, rot: 0, kind: "heart" },
  { x: 94, y: 62, size: 20, color: ORANGE, speed: 0.27, dur: 5.8, delay: 0.4, rot: 0, kind: "bubble" },
  { x: 44, y: 66, size: 26, color: GOLD, speed: 0.29, dur: 6.2, delay: 1.5, rot: 0, kind: "star" },
]

function DoodleShape({ kind, color }: { kind: Kind; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (kind) {
    case "star":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            {...common}
            d="M50 12 L61 39 L90 41 L67 60 L75 88 L50 72 L25 88 L33 60 L10 41 L39 39 Z"
          />
        </svg>
      )
    case "squiggle":
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <path {...common} d="M8 30 C20 6 30 54 44 30 C58 6 68 54 82 30 C96 6 104 50 112 32" />
        </svg>
      )
    case "spiral":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            {...common}
            d="M50 50 C50 44 58 44 58 51 C58 61 44 61 44 49 C44 35 64 35 64 52 C64 73 36 73 36 48"
          />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            {...common}
            d="M50 80 C18 58 20 30 38 30 C48 30 50 40 50 44 C50 40 52 30 62 30 C80 30 82 58 50 80 Z"
          />
        </svg>
      )
    case "sun":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle {...common} cx="50" cy="50" r="20" />
          <path
            {...common}
            d="M50 8 L50 20 M50 80 L50 92 M8 50 L20 50 M80 50 L92 50 M20 20 L29 29 M71 71 L80 80 M80 20 L71 29 M29 71 L20 80"
          />
        </svg>
      )
    case "cloud":
      return (
        <svg viewBox="0 0 120 80" className="h-full w-full">
          <path
            {...common}
            d="M30 60 C12 60 12 38 30 38 C30 20 58 18 60 36 C78 28 92 44 82 56 C96 58 94 60 86 60 Z"
          />
        </svg>
      )
    case "bubble":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle {...common} cx="50" cy="50" r="36" />
          <path {...common} strokeWidth={4} d="M34 32 C30 38 30 44 33 49" />
        </svg>
      )
    case "flower":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle {...common} cx="50" cy="30" r="13" />
          <circle {...common} cx="70" cy="50" r="13" />
          <circle {...common} cx="50" cy="70" r="13" />
          <circle {...common} cx="30" cy="50" r="13" />
          <circle {...common} cx="50" cy="50" r="9" />
        </svg>
      )
    case "zigzag":
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <path {...common} d="M8 44 L28 16 L48 44 L68 16 L88 44 L108 16" />
        </svg>
      )
    case "blob":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            {...common}
            d="M50 14 C72 14 88 30 86 52 C84 74 66 88 46 84 C24 80 12 62 16 42 C20 24 32 14 50 14 Z"
          />
        </svg>
      )
    default:
      return null
  }
}

export function PlaygroundBackground() {
  const layerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let rafId = 0
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        for (let i = 0; i < itemsRef.current.length; i++) {
          const el = itemsRef.current[i]
          if (el) {
            el.style.transform = `translate3d(0, ${scrollY * doodles[i].speed * -1}px, 0)`
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
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {doodles.map((d, i) => (
        <div
          key={i}
          ref={(el) => {
            itemsRef.current[i] = el
          }}
          className="absolute will-change-transform"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
        >
          <div
            className="playground-float h-full w-full"
            style={{
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
              ["--rot" as string]: `${d.rot}deg`,
              opacity: 0.5,
            }}
          >
            <DoodleShape kind={d.kind} color={d.color} />
          </div>
        </div>
      ))}
    </div>
  )
}
