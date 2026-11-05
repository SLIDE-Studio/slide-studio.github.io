"use client"

import { useEffect, useRef, useState } from "react"

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
    <div ref={container} className="mt-6 flex h-24 justify-center overflow-hidden">
      <img
        src="/images/footer-cat.png"
        alt="A little orange kitten snoozing at the bottom of the page"
        width={144}
        height={96}
        className={`h-24 w-36 rounded-xl object-contain transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      />
    </div>
  )
}
