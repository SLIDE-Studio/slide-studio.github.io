import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="flex min-h-[72vh] flex-col justify-between border-b border-border py-12 md:py-16 lg:min-h-[78vh]">
      <div className="flex items-start justify-between gap-8">
        <p className="text-sm text-muted-foreground">Algoma University · Ontario, Canada</p>
        <p className="hidden max-w-44 text-right text-xs leading-relaxed text-muted-foreground sm:block">Human-computer interaction, accessibility, and social computing.</p>
      </div>

      <div className="flex max-w-4xl flex-col gap-8 py-20">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">SociaL Interaction DEsign Research Studio</p>
        {/* <h1 className="text-balance text-6xl font-light leading-[0.94] sm:text-7xl md:text-8xl lg:text-9xl">Designing inclusive futures.</h1> */}
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          We research how people interact with technology and each other, centering accessibility, equity, and social connection in every system we design.
        </p>
      </div>

      <a href="#team" className="inline-flex w-fit items-center gap-3 text-sm underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground">
        Meet the studio
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  )
}
