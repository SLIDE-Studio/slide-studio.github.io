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
          <path d="M67 31L69 12Q70 9 73 12L82 21L93 12Q96 10 97 14L101 32Q108 58 85 59Q62 58 67 31Z" />
          <g fill="var(--background)">
            <ellipse cx="78" cy="37" rx="2.5" ry="3.5" />
            <ellipse cx="93" cy="37" rx="2.5" ry="3.5" />
            <ellipse cx="73" cy="45" rx="4" ry="2" opacity="0.65" />
            <ellipse cx="98" cy="45" rx="4" ry="2" opacity="0.65" />
          </g>
          <path d="M81 45Q83 50 86 45Q89 50 91 45" fill="none" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
