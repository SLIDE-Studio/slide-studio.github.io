"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import styles from "./footer-cat.module.css"

export function FooterCatTrack({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { threshold: 0.75 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={container} className={`${styles.track} ${visible ? "" : styles.paused}`}>
      {children}
    </div>
  )
}
