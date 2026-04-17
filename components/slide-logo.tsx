interface SlideLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showSubtitle?: boolean
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

export function SlideLogo({ size = "md", showSubtitle = false }: SlideLogoProps) {
  return (
    <div className="flex flex-col">
      <span className={`${sizeClasses[size]} font-bold tracking-tight leading-none`} aria-label="SLIDE">
        {letters.map((l, i) => (
          <span key={i} style={{ color: l.color }} className="transition-colors duration-200">
            {l.char}
          </span>
        ))}
      </span>
      {showSubtitle && (
        <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Research Studio
        </span>
      )}
    </div>
  )
}
