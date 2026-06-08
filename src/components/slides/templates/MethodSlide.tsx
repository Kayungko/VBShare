import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface MethodSlideProps {
  slide: SlideConfig
}

export function MethodSlide({ slide }: MethodSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle}>
      <div className="method-chain">
        {slide.steps?.map((step, index) => (
          <div className="method-chain__node" key={step} style={{ animationDelay: `${index * 100}ms` }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
    </SlideFrame>
  )
}
