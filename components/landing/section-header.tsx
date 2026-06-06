type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
            light ? 'text-secondary' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 ${
          light ? 'text-white' : 'text-foreground'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? 'text-white/80' : 'text-muted-foreground'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
