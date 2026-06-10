"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

const links = [
  { label: "Research", href: "/#research" },
  { label: "Team", href: "/#team" },
  { label: "Works", href: "/works" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/#contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // When scrolled, links shrink and fade out until the nav is hovered.
  const collapsed = scrolled && !hovered

  return (
    <header
      className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <nav className="flex items-center justify-between px-6 py-3 lg:px-12">
        <a href="/" className="flex items-center">
          <SlideLogo size="sm" showSubtitle scrolled={scrolled} />
        </a>

        <ul className="hidden items-center md:flex" aria-label="Primary">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-label={l.label}
                className={`group relative flex items-center justify-center rounded-md font-mono uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring ${
                  collapsed ? "h-6 w-6" : "h-9 px-4 hover:bg-muted"
                }`}
              >
                {/* Dot indicator shown when the nav is collapsed */}
                <span
                  aria-hidden="true"
                  className={`absolute h-1.5 w-1.5 rounded-full bg-muted-foreground transition-all duration-300 group-hover:bg-foreground ${
                    collapsed ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
                {/* Full label shown when expanded / hovered */}
                <span
                  className={`text-xs transition-all duration-300 ${
                    collapsed ? "scale-95 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-3 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
