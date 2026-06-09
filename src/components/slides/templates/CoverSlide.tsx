import type { DeckConfig, SlideConfig } from '@/types/deck'
import { SlideFrame } from './SlideFrame'

interface CoverSlideProps {
  slide: SlideConfig
  config: DeckConfig
}

export function CoverSlide({ slide, config }: CoverSlideProps) {
  const hasVisual = Boolean(slide.image)

  return (
    <SlideFrame
      eyebrow={slide.eyebrow}
      title={slide.title}
      subtitle={slide.subtitle ?? config.subtitle}
      align={hasVisual ? 'left' : 'center'}
      className={hasVisual ? 'slide-frame--chapter-visual' : 'slide-frame--hero'}
    >
      {slide.id === 'cover' ? (
        <div className="hero-command">
          <span>$</span>
          <code>ai-coding-share --prompt --context --output</code>
        </div>
      ) : slide.image ? (
        <figure className="chapter-visual">
          <img src={slide.image} alt={slide.imageAlt ?? ''} />
        </figure>
      ) : null}
    </SlideFrame>
  )
}
