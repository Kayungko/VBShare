export function clampSlideIndex(index: number, slideCount: number) {
  return Math.min(Math.max(index, 0), Math.max(slideCount - 1, 0))
}

export function getProgress(index: number, slideCount: number) {
  if (slideCount <= 1) return 100
  return Math.round((index / (slideCount - 1)) * 100)
}

export function formatSlideCounter(index: number, slideCount: number) {
  const current = String(index + 1).padStart(2, '0')
  const total = String(slideCount).padStart(2, '0')
  return `${current} / ${total}`
}
