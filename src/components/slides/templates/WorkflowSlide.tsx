import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface WorkflowSlideProps {
  slide: SlideConfig
}

export function WorkflowSlide({ slide }: WorkflowSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle}>
      <div className="workflow-line">
        {slide.steps?.map((step, index) => (
          <div className="workflow-line__step" key={step} style={{ animationDelay: `${index * 110}ms` }}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
    </SlideFrame>
  )
}
