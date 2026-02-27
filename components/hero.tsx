import { ArrowDown } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

export function Hero() {
  return (
    <section
      className="relative z-10 flex min-h-screen flex-col justify-center pt-24"
    >
      <div className="flex flex-col items-start gap-6">
        <SlideLogo size="xl" />

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="font-bold text-foreground">S</span>ocia
          <span className="font-bold text-foreground">L</span>{" "}
          <span className="font-bold text-foreground">I</span>nteraction{" "}
          <span className="font-bold text-foreground">D</span>
          {""}
          <span className="font-bold text-foreground">E</span>sign Research
          Studio
        </p>

        <h1 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-5xl">
          Designing inclusive futures through
          <span className="text-primary"> human-computer interaction</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          We research how people interact with technology and each other,
          centering accessibility, equity, and social connection in every system
          we design.
        </p>

        <a
          href="#research"
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="h-4 w-4" />
          Explore our work
        </a>
      </div>
    </section>
  )
}
