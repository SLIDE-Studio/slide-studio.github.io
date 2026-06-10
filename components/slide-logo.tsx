interface SlideLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showSubtitle?: boolean
  scrolled?: boolean
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
}

// Refined colors with better harmony - teal, blue, amber, gold, coral
const letters = [
  { char: "S", color: "hsl(165, 50%, 40%)" },
  { char: "L", color: "hsl(200, 65%, 50%)" },
  { char: "I", color: "hsl(25, 80%, 52%)" },
  { char: "D", color: "hsl(42, 85%, 50%)" },
  { char: "E", color: "hsl(350, 60%, 58%)" },
]

export function SlideLogo({ size = "md", showSubtitle = false, scrolled = false }: SlideLogoProps) {
  return (
    <div className="flex flex-col">
      <span
        className={`${scrolled ? "text-sm" : sizeClasses[size]} flex items-baseline font-bold tracking-tight leading-none transition-all duration-300`}
        aria-label="SLIDE STUDIO"
      >
        {letters.map((l, i) => (
          <span
            key={i}
            style={{ color: scrolled ? "var(--foreground)" : l.color }}
            className="transition-colors duration-300"
          >
            {l.char}
          </span>
        ))}
        <span
          aria-hidden={!scrolled}
          className="inline-flex overflow-hidden whitespace-pre text-foreground transition-all duration-300"
          style={{
            maxWidth: scrolled ? "5rem" : "0",
            opacity: scrolled ? 1 : 0,
            marginLeft: scrolled ? "0.35rem" : "0",
          }}
        >
          STUDIO
        </span>
      </span>
      {showSubtitle && (
        <span
          className="block overflow-hidden font-mono uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300"
          style={{
            maxHeight: scrolled ? "0" : "1rem",
            opacity: scrolled ? 0 : 1,
            marginTop: scrolled ? "0" : "0.375rem",
            fontSize: "10px",
          }}
        >
          Research Studio
        </span>
      )}
    </div>
  )
}
