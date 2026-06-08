import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface CompareSlideProps {
  slide: SlideConfig
}

export function CompareSlide({ slide }: CompareSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} className="slide-frame--split">
      <div className="compare-grid">
        {[slide.left, slide.right].map((column) =>
          column ? (
            <article className={`compare-card compare-card--${column.tone ?? 'muted'}`} key={column.label}>
              <span>{column.label}</span>
              {column.title ? <h2>{column.title}</h2> : null}
              <p>{column.content}</p>
            </article>
          ) : null,
        )}
      </div>
    </SlideFrame>
  )
}
