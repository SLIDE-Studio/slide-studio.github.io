import Image from "next/image"
import { SlideLogo } from "@/components/slide-logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-6 py-10 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <SlideLogo size="sm" />

        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          SociaL Interaction DEsign Research Studio
        </p>

        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SLIDE Studio
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 border-t border-border pt-6 text-center">
        <a
          href="https://algomau.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Algoma University (opens in a new tab)"
        >
          <Image
            src="/images/algoma-logo.png"
            alt="Algoma University logo"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
          <span className="font-mono text-xs text-muted-foreground">
            Part of Algoma University
          </span>
        </a>

        <p className="font-mono text-xs text-muted-foreground">
          Built with various AI tools including Opus, Fable, SOL
        </p>
      </div>
    </footer>
  )
}
