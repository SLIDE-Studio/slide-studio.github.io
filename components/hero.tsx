"use client"

import { useRef, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Magnetic } from "@/components/motion/magnetic"

const letters = [
  { char: "S", color: "hsl(165, 50%, 40%)" },
  { char: "L", color: "hsl(200, 65%, 50%)" },
  { char: "I", color: "hsl(25, 80%, 52%)" },
  { char: "D", color: "hsl(42, 85%, 50%)" },
  { char: "E", color: "hsl(350, 60%, 58%)" },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reveals = el.querySelectorAll<HTMLElement>("[data-hero-reveal]")

      // Entrance — letters drop in, then content fades up. Delayed so the
      // intro loader finishes first.
      const tl = gsap.timeline({ delay: 1.6 })
      tl.from(letterRefs.current, {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.07,
      }).from(
        reveals,
        {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4",
      )

      // Scroll parallax on the giant wordmark
      gsap.to("[data-hero-mark]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative z-10 flex min-h-[92vh] flex-col justify-center pb-16 pt-24"
    >
      <div className="flex flex-col items-start gap-7">
        {/* Giant kinetic SLIDE wordmark */}
        <h1
          data-hero-mark
          className="flex items-baseline font-bold leading-[0.85] tracking-tighter"
          aria-label="SLIDE"
        >
          {letters.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                ref={(node) => {
                  letterRefs.current[i] = node
                }}
                className="inline-block text-[22vw] sm:text-[20vw] md:text-[16vw] lg:text-[13rem]"
                style={{ color: l.color }}
              >
                {l.char}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-reveal
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="font-bold text-foreground">S</span>ocia
          <span className="font-bold text-foreground">L</span>{" "}
          <span className="font-bold text-foreground">I</span>nteraction{" "}
          <span className="font-bold text-foreground">D</span>
          {""}
          <span className="font-bold text-foreground">E</span>sign Research
          Studio
        </p>

        <h2
          data-hero-reveal
          className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl xl:text-6xl"
        >
          Designing inclusive futures through
          <span className="text-primary"> human-computer interaction</span>
        </h2>

        <p
          data-hero-reveal
          className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We research how people interact with technology and each other,
          centering accessibility, equity, and social connection in every system
          we design.
        </p>

        <Magnetic className="mt-4 inline-block" strength={0.3}>
          <a
            data-hero-reveal
            href="#works"
            className="inline-flex items-center gap-3 rounded-md border border-border bg-card/60 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 hover:bg-card hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Explore our work
          </a>
        </Magnetic>
      </div>
    </section>
  )
}
