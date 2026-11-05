"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./footer-cat.module.css"

export function FooterCat() {
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
    <div ref={container} className={styles.track}>
      <svg viewBox="0 0 112 88" role="img" aria-label="A little cat walking from left to right" className={`${styles.cat} ${visible ? "" : styles.paused}`}>
        <g fill="currentColor" className={styles.body}>
          <g opacity="0.55">
            <rect className={styles.leg} x="34" y="49" width="7" height="26" rx="3.5" />
            <rect className={`${styles.leg} ${styles.opposite}`} x="72" y="49" width="7" height="26" rx="3.5" />
          </g>
          <path className={styles.tail} d="M32 44C14 44 12 28 17 18" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="54" cy="45" rx="29" ry="14" />
          <rect className={`${styles.leg} ${styles.opposite}`} x="29" y="49" width="8" height="27" rx="4" />
          <rect className={styles.leg} x="75" y="49" width="8" height="27" rx="4" />
          <path d="M72 36L73 15L83 23L93 16L96 34Q107 39 98 47Q86 55 75 45Z" />
          <circle cx="92" cy="32" r="2" fill="var(--background)" />
          <path d="M97 39L109 37M97 42L108 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
