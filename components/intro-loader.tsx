"use client"

import { useState, useEffect } from "react"

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")

  useEffect(() => {
    // Blink for 1.6s, then start reveal
    const loadTimer = setTimeout(() => setPhase("reveal"), 1600)
    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (phase === "reveal") {
      const doneTimer = setTimeout(() => setPhase("done"), 800)
      return () => clearTimeout(doneTimer)
    }
  }, [phase])

  // Prevent scroll during loading
  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  return (
    <>
      {/* Loading overlay */}
      {phase !== "done" && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700"
          style={{ opacity: phase === "reveal" ? 0 : 1 }}
          aria-hidden="true"
        >
          <div
            className="h-3 w-3 rounded-full bg-foreground"
            style={{
              animation: "blink 0.6s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Site content - rendered underneath, revealed when overlay fades */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: phase === "loading" ? 0 : 1 }}
      >
        {children}
      </div>
    </>
  )
}
