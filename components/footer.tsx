import { SlideLogo } from "@/components/slide-logo"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <SlideLogo size="sm" />

        <p className="font-mono text-xs text-muted-foreground">
          SociaL Interaction DEsign Research Studio
        </p>

        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
