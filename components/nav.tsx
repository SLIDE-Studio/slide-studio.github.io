"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Team", href: "/#team" },
  { label: "Works", href: "/works" },
  { label: "News", href: "/news" },
  { label: "Album", href: "/album" },
  { label: "Contact", href: "/#contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="flex min-h-20 items-center justify-between px-6 lg:px-10" aria-label="Primary navigation">
        <a href="/" className="flex flex-col gap-0.5 text-foreground">
          <span className="text-xl font-light tracking-tight">SLIDE Studio</span>
          <span className="text-xs text-muted-foreground">social interaction design research</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">
                {link.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-border bg-background px-6 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block border-b border-border py-3 text-sm text-muted-foreground last:border-b-0" onClick={() => setOpen(false)}>
                {link.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
