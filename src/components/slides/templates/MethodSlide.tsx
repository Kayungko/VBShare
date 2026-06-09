import type { SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface MethodSlideProps {
  slide: SlideConfig
}

export function MethodSlide({ slide }: MethodSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle} className="slide-frame--split">
      <div className="method-panel">
        <div className="method-panel__header">
          <span>Task schema</span>
          <code>fields.json</code>
        </div>
        <div className="method-chain">
          {slide.steps?.map((step, index) => {
            const label = typeof step === 'string' ? step : step.label

            return (
              <div className="method-chain__node" key={label} style={{ animationDelay: `${index * 85}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
              </div>
            )
          })}
        </div>
        {slide.statement ? <p className="slide-statement">{slide.statement}</p> : null}
      </div>
    </SlideFrame>
  )
}
