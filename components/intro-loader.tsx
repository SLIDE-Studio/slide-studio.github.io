"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

// Mirrors the brand letter colors used in SlideLogo
const letters = [
  { char: "S", color: "hsl(165, 50%, 40%)" },
  { char: "L", color: "hsl(200, 65%, 50%)" },
  { char: "I", color: "hsl(25, 80%, 52%)" },
  { char: "D", color: "hsl(42, 85%, 50%)" },
  { char: "E", color: "hsl(350, 60%, 58%)" },
]

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const wordRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setDone(true)
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        document.body.style.overflow = ""
      },
    })

    tl.from(lettersRef.current, {
      yPercent: 120,
      opacity: 0,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.08,
    })
      .from(
        wordRef.current,
        { opacity: 0, x: -8, duration: 0.5, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        barRef.current,
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        "-=0.5",
      )
      .to(lettersRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05,
      })
      .to([wordRef.current, barRef.current], { opacity: 0, duration: 0.3 }, "<")
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })

    return () => {
      tl.kill()
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="flex items-baseline overflow-hidden text-6xl font-bold leading-none tracking-tight md:text-8xl">
              {letters.map((l, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span
                    ref={(el) => {
                      lettersRef.current[i] = el
                    }}
                    className="inline-block"
                    style={{ color: l.color }}
                  >
                    {l.char}
                  </span>
                </span>
              ))}
              <span
                ref={wordRef}
                className="ml-3 inline-block text-foreground"
              >
                STUDIO
              </span>
            </span>
            <div className="h-px w-40 overflow-hidden bg-border md:w-56">
              <div
                ref={barRef}
                className="h-full w-full origin-left scale-x-0 bg-foreground"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              SociaL Interaction DEsign
            </span>
          </div>
        </div>
      )}

      {children}
    </>
  )
}
