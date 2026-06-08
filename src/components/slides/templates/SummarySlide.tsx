import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface SummarySlideProps {
  slide: SlideConfig
}

export function SummarySlide({ slide }: SummarySlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} align="center" className="slide-frame--hero">
      {slide.quote ? <blockquote className="summary-quote">{slide.quote}</blockquote> : null}
      {slide.cards?.length ? (
        <div className="summary-actions">
          {slide.cards.map((card) => (
            <span key={card.title}>{card.title}</span>
          ))}
        </div>
      ) : null}
    </SlideFrame>
  )
}
