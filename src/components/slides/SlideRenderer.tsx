import type { DeckConfig, SlideConfig } from '@/types/deck'
import { CoverSlide } from './templates/CoverSlide'
import { HookSlide } from './templates/HookSlide'
import { AgendaSlide } from './templates/AgendaSlide'
import { CompareSlide } from './templates/CompareSlide'
import { MethodSlide } from './templates/MethodSlide'
import { WorkflowSlide } from './templates/WorkflowSlide'
import { CardsSlide } from './templates/CardsSlide'
import { SummarySlide } from './templates/SummarySlide'

interface SlideRendererProps {
  slide: SlideConfig
  config: DeckConfig
}

export function SlideRenderer({ slide, config }: SlideRendererProps) {
  switch (slide.type) {
    case 'cover':
      return <CoverSlide slide={slide} config={config} />
    case 'hook':
      return <HookSlide slide={slide} />
    case 'agenda':
      return <AgendaSlide slide={slide} />
    case 'compare':
      return <CompareSlide slide={slide} />
    case 'method':
      return <MethodSlide slide={slide} />
    case 'workflow':
      return <WorkflowSlide slide={slide} />
    case 'summary':
      return <SummarySlide slide={slide} />
    case 'question':
    case 'case':
    case 'risk':
    case 'qa':
    default:
      return <CardsSlide slide={slide} />
  }
}
