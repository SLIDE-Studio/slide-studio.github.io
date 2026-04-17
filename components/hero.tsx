import { ArrowDown } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

export function Hero() {
  return (
    <section
      className="relative z-10 flex min-h-[90vh] flex-col justify-center pb-16 pt-24"
    >
      <div className="flex flex-col items-start gap-8">
        <SlideLogo size="xl" />

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="font-bold text-foreground">S</span>ocia
          <span className="font-bold text-foreground">L</span>{" "}
          <span className="font-bold text-foreground">I</span>nteraction{" "}
          <span className="font-bold text-foreground">D</span>
          {""}
          <span className="font-bold text-foreground">E</span>sign Research
          Studio
        </p>

        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl xl:text-6xl">
          Designing inclusive futures through
          <span className="text-primary"> human-computer interaction</span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          We research how people interact with technology and each other,
          centering accessibility, equity, and social connection in every system
          we design.
        </p>

        <a
          href="#research"
          className="mt-6 inline-flex items-center gap-3 rounded-md border border-border bg-card/60 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-card hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowDown className="h-4 w-4" />
          Explore our work
        </a>
      </div>
    </section>
  )
}
