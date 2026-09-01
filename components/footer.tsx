import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-8 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-foreground">SLIDE Studio</p>
          <p>SociaL Interaction DEsign Research Studio</p>
          <p>&copy; {new Date().getFullYear()} SLIDE Studio</p>
        </div>
        <a href="https://algomau.ca" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-3 hover:text-foreground" aria-label="Algoma University (opens in a new tab)">
          <Image src="/images/algoma-logo.png" alt="Algoma University logo" width={48} height={32} className="h-8 w-auto grayscale" />
          <span>Part of Algoma University</span>
        </a>
        <p className="text-xs">Built with various AI tools including Opus, Fable, SOL</p>
      </div>
    </footer>
  )
}
