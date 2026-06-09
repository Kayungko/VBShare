export type SlideType =
  | 'cover'
  | 'hook'
  | 'question'
  | 'agenda'
  | 'compare'
  | 'method'
  | 'workflow'
  | 'case'
  | 'risk'
  | 'summary'
  | 'qa'

export interface DeckConfig {
  title: string
  subtitle: string
  presenter?: string
}

export interface SlideCard {
  title: string
  description?: string
  tag?: string
}

export interface SlideColumn {
  label: string
  title?: string
  content: string
  tone?: 'muted' | 'accent'
}

export interface SlideMetric {
  from: string
  to: string
  label: string
}

export interface SlideStep {
  label: string
  caption?: string
}

export interface SlideConfig {
  id: string
  type: SlideType
  section: string
  eyebrow?: string
  title: string
  subtitle?: string
  image?: string
  imageAlt?: string
  statement?: string
  metric?: SlideMetric
  cards?: SlideCard[]
  steps?: Array<string | SlideStep>
  left?: SlideColumn
  right?: SlideColumn
  quote?: string
  note?: string
}
