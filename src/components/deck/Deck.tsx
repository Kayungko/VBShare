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

const sectionLabels: Record<string, { number: string; label: string; title: string }> = {
  prompt: { number: '01', label: 'PROMPT', title: '把 Prompt 写得像任务' },
  plan: { number: '02', label: 'PLAN', title: '先看计划，再开始执行' },
  rules: { number: '03', label: 'RULES', title: '给项目固定说明入口' },
  automation: { number: '04', label: 'AUTOMATION', title: '从小流程开始自动化' },
  output: { number: '05', label: 'OUTPUT', title: '约定结果的交付格式' },
  demo: { number: 'DEMO', label: 'CASE', title: '活动入口需求转化' },
}

export function Deck({ config, slides }: DeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const wheelLockedRef = useRef(false)

  const currentSlide = slides[currentIndex]
  const sectionLabel = currentSlide.type === 'cover' ? undefined : sectionLabels[currentSlide.section]
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
      {sectionLabel ? (
        <div className="section-marker" aria-label={`章节 ${sectionLabel.number} ${sectionLabel.title}`}>
          <span className="section-marker__number">{sectionLabel.number}</span>
          <span className="section-marker__label">{sectionLabel.label}</span>
          <strong>{sectionLabel.title}</strong>
        </div>
      ) : null}
      <SlideCounter currentIndex={currentIndex} slideCount={slides.length} />

      <AnimatePresence mode="sync">
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

      <div className="deck__controls">
        <button onClick={goPrev} disabled={currentIndex === 0} aria-label="上一页">&lt;</button>
        <button onClick={goNext} disabled={currentIndex === slides.length - 1} aria-label="下一页">&gt;</button>
      </div>
    </main>
  )
}
