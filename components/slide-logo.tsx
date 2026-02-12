interface SlideLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showSubtitle?: boolean
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-6xl md:text-7xl lg:text-8xl",
}

const letters = [
  { char: "S", color: "#1b9e6f" },
  { char: "L", color: "#38a5e0" },
  { char: "I", color: "#e8823a" },
  { char: "D", color: "#eab422" },
  { char: "E", color: "#e47a9f" },
]

export function SlideLogo({ size = "md", showSubtitle = false }: SlideLogoProps) {
  return (
    <div className="flex flex-col">
      <span className={`${sizeClasses[size]} font-bold tracking-tight leading-none`} aria-label="SLIDE">
        {letters.map((l, i) => (
          <span key={i} style={{ color: l.color }}>
            {l.char}
          </span>
        ))}
      </span>
      {showSubtitle && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
          Research Studio
        </span>
      )}
    </div>
  )
}
