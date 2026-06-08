import { formatSlideCounter } from '@/lib/deck/navigation'

interface SlideCounterProps {
  currentIndex: number
  slideCount: number
}

export function SlideCounter({ currentIndex, slideCount }: SlideCounterProps) {
  return <div className="slide-counter">{formatSlideCounter(currentIndex, slideCount)}</div>
}
