export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-8 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-foreground">SLIDE Studio</p>
          <p>SociaL Interaction DEsign Research Studio</p>
          <p>&copy; {new Date().getFullYear()} SLIDE Studio</p>
        </div>
        <p className="text-xs">Built with various AI tools including Opus, Fable, SOL</p>
      </div>
    </footer>
  )
}
