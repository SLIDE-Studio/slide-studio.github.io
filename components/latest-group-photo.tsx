"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export function LatestGroupPhoto() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    let dismissTimer: ReturnType<typeof setTimeout> | undefined

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    const dismissAfterScroll = () => {
      if (dismissTimer) return
      dismissTimer = setTimeout(() => setIsOpen(false), 5000)
    }

    window.addEventListener("keydown", onKeyDown)
    // Listen to both native scrolling and Lenis' wheel/touch input. Lenis
    // smooths the scroll without always dispatching a native scroll event.
    window.addEventListener("scroll", dismissAfterScroll, { passive: true })
    window.addEventListener("wheel", dismissAfterScroll, { passive: true })
    window.addEventListener("touchmove", dismissAfterScroll, { passive: true })
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", dismissAfterScroll)
      window.removeEventListener("wheel", dismissAfterScroll)
      window.removeEventListener("touchmove", dismissAfterScroll)
      if (dismissTimer) clearTimeout(dismissTimer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <aside
      className="fixed bottom-4 left-4 z-40 w-[min(18rem,calc(100vw-2rem))] border border-foreground bg-background p-2 shadow-[6px_6px_0_hsl(var(--foreground))] animate-in fade-in slide-in-from-bottom-3 duration-500 sm:bottom-6 sm:left-6"
      aria-label="Latest group photo"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src="/images/album/spring-2026/26SS.jpg"
          alt="Six SLIDE Studio lab members posing with peace signs outdoors in front of greenery and roses"
          fill
          sizes="(max-width: 640px) calc(100vw - 2rem), 18rem"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center border border-foreground bg-background text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close latest group photo"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-2">
        <p className="text-xs font-medium">Latest from the studio</p>
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">2026</span>
      </div>
    </aside>
  )
}
