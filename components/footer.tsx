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
    </footer>
  )
}
