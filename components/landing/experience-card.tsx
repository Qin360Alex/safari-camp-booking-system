import { SiteImage } from '@/components/site-image'
import { getExperienceImage, type ExperienceImageId } from '@/lib/images'

type ExperienceCardProps = {
  imageKey: ExperienceImageId
  title: string
  description: string
  duration: string
}

export function ExperienceCard({
  imageKey,
  title,
  description,
  duration,
}: ExperienceCardProps) {
  return (
    <article className="group photo-frame bg-card overflow-hidden border-0 hover:shadow-2xl transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SiteImage
          slot={getExperienceImage(imageKey)}
          preset="experience"
          wrapperClassName="absolute inset-0"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          {duration}
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </article>
  )
}
