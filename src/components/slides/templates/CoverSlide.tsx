import type { DeckConfig, SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface CoverSlideProps {
  slide: SlideConfig
  config: DeckConfig
}

export function CoverSlide({ slide, config }: CoverSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow} title={slide.title} subtitle={slide.subtitle ?? config.subtitle} align="center" className="slide-frame--hero">
      {slide.id === 'cover' ? (
        <div className="hero-command">
          <span>$</span>
          <code>ai-coding-share --workflow --structured-output</code>
        </div>
      ) : null}
    </SlideFrame>
  )
}
