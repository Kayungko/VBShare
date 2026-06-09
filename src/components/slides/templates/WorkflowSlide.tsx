import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface WorkflowSlideProps {
  slide: SlideConfig
}

export function WorkflowSlide({ slide }: WorkflowSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} className="slide-frame--split">
      <div className="workflow-showcase">
        <div className="workflow-path__header">
          <span>START</span>
          <strong>从任务说明出发</strong>
        </div>
        <div className="workflow-path">
          <svg className="workflow-path__route" viewBox="0 0 720 330" aria-hidden="true">
            <path d="M 90 82 H 630 Q 666 82 666 118 V 214 Q 666 250 630 250 H 90" />
          </svg>
          {slide.steps?.map((step, index) => {
            const label = typeof step === 'string' ? step : step.label
            const caption = typeof step === 'string' ? undefined : step.caption

            return (
              <div
                className={`workflow-path__step workflow-path__step--${index + 1}`}
                key={label}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                {caption ? <small>{caption}</small> : null}
              </div>
            )
          })}
          <div className="workflow-path__finish">
            <span>FINISH</span>
            <strong>形成可复用结果</strong>
          </div>
        </div>
        {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
      </div>
    </SlideFrame>
  )
}
