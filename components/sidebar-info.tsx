"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const socialLinks = [
  { label: "GITHUB", href: "https://github.com/SLIDE-Studio/" },
  { label: "SCHOLAR", href: "https://scholar.google.com/citations?user=NE2tiHsAAAAJ&hl=ko&oi=ao" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/slideresearch" },
]

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Team", href: "#team" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
]

export function SidebarInfo() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-background px-5 py-4 lg:hidden">
        <a href="/" className="text-lg font-bold tracking-tight">
          SLIDE
        </a>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="p-1"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 px-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Contact</p>
            <a href="mailto:slidelab@algomau.ca" className="text-sm font-bold">
              EMAIL
            </a>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col justify-between px-6 py-8 lg:flex xl:w-[300px]">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Info</span>
            <span className="text-xs uppercase tracking-wide">[SLIDE*]</span>
          </div>

          <p className="text-base font-bold leading-snug">
            SLIDE Studio is a Human-Computer Interaction research studio based at Algoma University. We work in Inclusive Design, Accessibility, and Social Interaction.
          </p>

          <div className="mt-8 flex flex-col gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Contact</p>
          <a
            href="mailto:slidelab@algomau.ca"
            className="text-sm font-bold uppercase tracking-wide hover:underline"
          >
            EMAIL
          </a>
        </div>
      </aside>
    </>
  )
}
