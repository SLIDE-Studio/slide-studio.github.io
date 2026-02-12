"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

const links = [
  { label: "Research", href: "#research" },
  { label: "Team", href: "#team" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-12">
        <a href="#" className="flex items-center">
          <SlideLogo size="sm" showSubtitle />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
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
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
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
