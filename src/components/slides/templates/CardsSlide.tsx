import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface CardsSlideProps {
  slide: SlideConfig
}

export function CardsSlide({ slide }: CardsSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} align={slide.type === 'qa' ? 'center' : 'left'}>
      {slide.cards?.length ? (
        <div className="card-grid">
          {slide.cards.map((card, index) => (
            <article className="glass-card" key={card.title} style={{ animationDelay: `${index * 90}ms` }}>
              {card.tag ? <span className="card-tag">{card.tag}</span> : null}
              <h2>{card.title}</h2>
              {card.description ? <p>{card.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
      {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
    </SlideFrame>
  )
}
