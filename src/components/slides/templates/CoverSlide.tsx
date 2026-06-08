import type { DeckConfig, SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface CoverSlideProps {
  slide: SlideConfig
  config: DeckConfig
}

export function CoverSlide({ slide, config }: CoverSlideProps) {
  return (
    <SlideFrame eyebrow={slide.eyebrow ?? config.title} title={slide.title} subtitle={slide.subtitle ?? config.subtitle} align="center">
      <div className="cover-meta">
        {config.presenter ? <span>{config.presenter}</span> : null}
        <span>Web Slide Deck</span>
      </div>
    </SlideFrame>
  )
}
