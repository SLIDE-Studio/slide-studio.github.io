"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setDone(true)
      return
    }

    document.body.style.overflow = "hidden"

    const timeline = gsap.timeline({
      onComplete: () => {
        setDone(true)
        document.body.style.overflow = ""
      },
    })

    timeline
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" })
      .fromTo(markerRef.current, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.55")
      .fromTo(labelRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.3")
      .to({}, { duration: 0.45 })
      .to([labelRef.current, markerRef.current], { opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(lineRef.current, { scaleX: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.15")
      .to(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" })

    return () => {
      timeline.kill()
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <div className="flex w-[min(22rem,72vw)] flex-col gap-4">
            <div className="relative h-5">
              <div ref={lineRef} className="absolute left-0 top-1/2 h-px w-full origin-left bg-foreground" />
              <div ref={markerRef} className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 border border-foreground bg-background" />
            </div>
            <div ref={labelRef} className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>Slide Studio</span>
              <span>Loading</span>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  )
}
