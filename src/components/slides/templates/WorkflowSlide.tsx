import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface WorkflowSlideProps {
  slide: SlideConfig
}

export function WorkflowSlide({ slide }: WorkflowSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} className="slide-frame--split">
      <div className="workflow-showcase">
        <div className="workflow-command">
          <span>$</span>
          <code>connect-ai-coding-points</code>
        </div>
        <div className="workflow-line">
          {slide.steps?.map((step, index) => (
            <div className="workflow-line__step" key={step} style={{ animationDelay: `${index * 80}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
      </div>
    </SlideFrame>
  )
}
