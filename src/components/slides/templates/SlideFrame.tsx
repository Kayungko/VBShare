import type { ReactNode } from 'react'

interface SlideFrameProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SlideFrame({ eyebrow, title, subtitle, children, align = 'left', className }: SlideFrameProps) {
  const frameClassName = ['slide-frame', `slide-frame--${align}`, className].filter(Boolean).join(' ')

  return (
    <div className={frameClassName}>
      <div className="slide-frame__header">
        {eyebrow ? <p className="slide-frame__eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {subtitle ? <p className="slide-frame__subtitle">{subtitle}</p> : null}
      </div>
      {children ? <div className="slide-frame__body">{children}</div> : null}
    </div>
  )
}
