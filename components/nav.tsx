"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

const links = [
  { label: "Research", href: "/#research" },
  { label: "Team", href: "/#team" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/#contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-12">
        <a href="/" className="flex items-center">
          <SlideLogo size="sm" showSubtitle />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-block rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {l.label}
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
