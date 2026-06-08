import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { DeckConfig, SlideConfig } from '@/types/deck'
import { getProgress } from '@/lib/deck/navigation'
import { pageTransition } from '@/lib/animation/presets'
import { SlideCounter } from './SlideCounter'
import { DeckProgress } from './DeckProgress'
import { SlideRenderer } from '../slides/SlideRenderer'

interface DeckProps {
  config: DeckConfig
  slides: SlideConfig[]
}

export function Deck({ config, slides }: DeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const wheelLockedRef = useRef(false)

  const currentSlide = slides[currentIndex]
  const progress = useMemo(() => getProgress(currentIndex, slides.length), [currentIndex, slides.length])

  const goTo = (nextIndex: number) => {
    setCurrentIndex(Math.min(Math.max(nextIndex, 0), slides.length - 1))
  }

  const goNext = () => goTo(currentIndex + 1)
  const goPrev = () => goTo(currentIndex - 1)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        goNext()
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goPrev()
      }

      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(slides.length - 1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, slides.length])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 20 || wheelLockedRef.current) return
      wheelLockedRef.current = true
      if (event.deltaY > 0) goNext()
      if (event.deltaY < 0) goPrev()
      window.setTimeout(() => {
        wheelLockedRef.current = false
      }, 650)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [currentIndex])

  return (
    <main className="deck" aria-label={config.title}>
      <div className="deck__background" />
      <DeckProgress progress={progress} />
      <SlideCounter currentIndex={currentIndex} slideCount={slides.length} />

      <AnimatePresence mode="wait">
        <motion.section
          key={currentSlide.id}
          className="deck__slide"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <SlideRenderer slide={currentSlide} config={config} />
        </motion.section>
      </AnimatePresence>

      <div className="deck__controls" aria-hidden="true">
        <button onClick={goPrev} disabled={currentIndex === 0}>上一页</button>
        <button onClick={goNext} disabled={currentIndex === slides.length - 1}>下一页</button>
      </div>
    </main>
  )
}
