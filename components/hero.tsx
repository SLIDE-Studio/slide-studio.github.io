import { ArrowDown } from "lucide-react"
import { SlideLogo } from "@/components/slide-logo"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24 lg:px-12">
      <div className="flex flex-col items-start gap-6">
        {/* Big colorful SLIDE wordmark */}
        <SlideLogo size="xl" />

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="font-bold text-foreground">S</span>ocia<span className="font-bold text-foreground">L</span> <span className="font-bold text-foreground">I</span>nteraction <span className="font-bold text-foreground">D</span>{''}<span className="font-bold text-foreground">E</span>sign Research Studio
        </p>

        <h1 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-5xl">
          Designing inclusive futures through
          <span className="text-primary"> human-computer interaction</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          We research how people interact with technology and each other,
          centering accessibility, equity, and social connection in every system we design.
        </p>

        <a
          href="#research"
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="h-4 w-4" />
          Explore our work
        </a>
      </div>

      {/* Decorative color blocks inspired by the constructivist composition */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Green block */}
        <div className="absolute right-[5%] top-[12%] h-32 w-16 rounded-lg opacity-15" style={{ backgroundColor: "#1b9e6f" }} />
        {/* Blue block */}
        <div className="absolute right-[15%] top-[60%] h-20 w-28 rounded-lg opacity-12" style={{ backgroundColor: "#38a5e0" }} />
        {/* Orange circle */}
        <div className="absolute right-[8%] top-[45%] h-10 w-10 rounded-full opacity-20" style={{ backgroundColor: "#e8823a" }} />
        {/* Yellow block */}
        <div className="absolute left-[2%] bottom-[18%] h-12 w-20 rounded-lg opacity-15" style={{ backgroundColor: "#eab422" }} />
        {/* Pink dot */}
        <div className="absolute right-[30%] top-[8%] h-6 w-6 rounded-full opacity-20" style={{ backgroundColor: "#e47a9f" }} />
        {/* Small green dot */}
        <div className="absolute left-[40%] bottom-[10%] h-4 w-4 rounded-full opacity-25" style={{ backgroundColor: "#1b9e6f" }} />
      </div>
    </section>
  )
}
