"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { skipIntro } from "@/components/intro-loader"
import type { TransitionScene } from "@/lib/transition-scene"

type Phase = "idle" | "entering" | "waiting" | "leaving"

const ENTER_MS = 450
const MIN_VISIBLE_MS = 1100
const LEAVE_MS = 550
const SAFETY_MS = 6000

const loadScene = () => import("@/lib/transition-scene")

function readInkColor() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
  return value ? `hsl(${value.split(/\s+/).join(", ")})` : "#1c1e21"
}

function getTransitionTarget(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null

  const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
  if (!anchor) return null
  if (anchor.target && anchor.target !== "_self") return null
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return null

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  if (url.pathname === window.location.pathname) return null

  return url
}

export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<TransitionScene | null>(null)
  const targetPathRef = useRef<string | null>(null)
  const startedAtRef = useRef(0)
  const timersRef = useRef<number[]>([])

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }

  const finish = useCallback(() => {
    clearTimers()
    targetPathRef.current = null
    setPhase("leaving")
    schedule(() => setPhase("idle"), LEAVE_MS)
  }, [])

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    idle(() => void loadScene())

    const onClick = (event: MouseEvent) => {
      const url = getTransitionTarget(event)
      if (!url) return
      event.preventDefault()

      const href = url.pathname + url.search + url.hash
      skipIntro()
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href)
        return
      }

      clearTimers()
      targetPathRef.current = url.pathname
      startedAtRef.current = performance.now()
      setPhase("entering")
      router.prefetch(href)
      schedule(() => {
        setPhase("waiting")
        router.push(href)
      }, ENTER_MS)
      schedule(finish, SAFETY_MS)
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      clearTimers()
    }
  }, [router, finish])

  useEffect(() => {
    if (!targetPathRef.current || pathname !== targetPathRef.current) return
    const elapsed = performance.now() - startedAtRef.current
    const id = window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - elapsed))
    return () => window.clearTimeout(id)
  }, [pathname, finish])

  const active = phase !== "idle"

  useEffect(() => {
    if (!active) return
    let cancelled = false
    document.documentElement.style.overflow = "hidden"

    loadScene().then(({ createTransitionScene }) => {
      if (cancelled || !canvasRef.current) return
      try {
        sceneRef.current = createTransitionScene(canvasRef.current, readInkColor())
      } catch {
        sceneRef.current = null
      }
    })

    return () => {
      cancelled = true
      sceneRef.current?.dispose()
      sceneRef.current = null
      document.documentElement.style.overflow = ""
    }
  }, [active])

  if (!active) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-phase={phase}
      className="page-transition fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
    >
      <span className="sr-only">Loading page</span>
      <canvas ref={canvasRef} className="size-72 md:size-96" aria-hidden="true" />
      <div className="flex flex-col items-center gap-4" aria-hidden="true">
        <div className="h-px w-40 overflow-hidden bg-border md:w-56">
          <div className="page-transition-bar h-full w-full origin-left bg-foreground" />
        </div>
        <span className="text-xs tracking-wide text-muted-foreground">SLIDE Studio</span>
      </div>
    </div>
  )
}
