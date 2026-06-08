import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface HookSlideProps {
  slide: SlideConfig
}

export function HookSlide({ slide }: HookSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle}>
      {slide.metric ? (
        <div className="metric-compare">
          <div className="metric-compare__item metric-compare__item--muted">
            <span>Before</span>
            <strong>{slide.metric.from}</strong>
          </div>
          <div className="metric-compare__arrow">→</div>
          <div className="metric-compare__item metric-compare__item--accent">
            <span>After</span>
            <strong>{slide.metric.to}</strong>
          </div>
          <p>{slide.metric.label}</p>
        </div>
      ) : null}
    </SlideFrame>
  )
}
