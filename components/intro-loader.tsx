"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

type Ribbon = {
  hue: number
  width: number
  phase: number
  speed: number
  alpha: number
}

const palette = ["#f06b4f", "#e6a23c", "#56a69a", "#5e84bd", "#d85d78", "#20252d"]

function seeded(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function drawGenerativeArt(canvas: HTMLCanvasElement, progress: { value: number }) {
  const context = canvas.getContext("2d")
  if (!context) return () => undefined

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * scale
    canvas.height = window.innerHeight * scale
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    context.setTransform(scale, 0, 0, scale, 0, 0)
  }

  resize()
  window.addEventListener("resize", resize)

  const ribbons: Ribbon[] = Array.from({ length: 30 }, (_, index) => ({
    hue: index % palette.length,
    width: 1 + seeded(index + 4) * 7,
    phase: seeded(index + 20) * Math.PI * 2,
    speed: 0.55 + seeded(index + 50) * 0.8,
    alpha: 0.46 + seeded(index + 80) * 0.42,
  }))
  let frame = 0
  let animationFrame = 0

  const render = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const time = frame * 0.012
    const reveal = progress.value
    context.fillStyle = `rgba(7, 8, 10, ${0.16 + reveal * 0.12})`
    context.fillRect(0, 0, width, height)

    ribbons.forEach((ribbon, index) => {
      const startX = width * (0.18 + seeded(index + 100) * 0.64)
      const startY = -height * (0.18 + seeded(index + 120) * 0.55) - time * height * ribbon.speed
      const drift = Math.sin(time * ribbon.speed + ribbon.phase) * width * 0.12
      context.beginPath()
      for (let point = 0; point < 26; point += 1) {
        const y = startY + point * height * 0.065
        const wave = Math.sin(point * 0.52 + time * ribbon.speed + ribbon.phase) * width * 0.09
        const x = startX + drift + wave + Math.sin(point * 0.16 + ribbon.phase) * width * 0.05
        if (point === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = palette[ribbon.hue]
      context.globalAlpha = ribbon.alpha * Math.min(1, reveal * 1.4)
      context.lineWidth = ribbon.width
      context.lineCap = "round"
      context.stroke()
    })

    context.globalAlpha = 1
    frame += 1
    animationFrame = requestAnimationFrame(render)
  }

  render()
  return () => {
    cancelAnimationFrame(animationFrame)
    window.removeEventListener("resize", resize)
  }
}

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const progress = useRef({ value: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDone(true)
      return
    }

    document.body.style.overflow = "hidden"
    const cleanupCanvas = canvasRef.current ? drawGenerativeArt(canvasRef.current, progress.current) : undefined
    const timeline = gsap.timeline({
      onComplete: () => {
        setDone(true)
        document.body.style.overflow = ""
      },
    })

    timeline
      .to(progress.current, { value: 1, duration: 0.5, ease: "power1.out" }, 0)
      .to(lineRef.current, { scaleX: 1, duration: 1.8, ease: "power3.inOut" }, 0.1)
      .to(labelRef.current, { opacity: 1, duration: 0.6 }, 0.35)
      .to(progress.current, { value: 1.2, duration: 0.5 }, 1.3)
      .to(overlayRef.current, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 1.8)

    return () => {
      timeline.kill()
      cleanupCanvas?.()
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {!done && (
        <div ref={overlayRef} className="fixed inset-0 z-[9999] overflow-hidden bg-[#07080a]" aria-hidden="true">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-x-8 bottom-12 flex items-end justify-between gap-6 text-white md:inset-x-16 md:bottom-16">
            <div ref={labelRef} className="opacity-0">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">SLIDE STUDIO</p>
              <p className="mt-2 text-xs tracking-[0.12em] text-white/90">Generative systems</p>
            </div>
            <div className="w-32 md:w-56">
              <div className="mb-2 text-right text-[9px] uppercase tracking-[0.28em] text-white/55">Loading</div>
              <div className="h-px w-full bg-white/25">
                <div ref={lineRef} className="h-px w-full origin-left scale-x-0 bg-white" />
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
