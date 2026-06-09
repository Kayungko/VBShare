import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface AgendaSlideProps {
  slide: SlideConfig
}

export function AgendaSlide({ slide }: AgendaSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle}>
      <div className="card-grid card-grid--three">
        {slide.cards?.map((card, index) => (
          <article className="glass-card" key={card.title} style={{ animationDelay: `${index * 90}ms` }}>
            <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{card.title}</h2>
            {card.description ? <p>{card.description}</p> : null}
          </article>
        ))}
      </div>
    </SlideFrame>
  )
}
