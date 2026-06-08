interface DeckProgressProps {
  progress: number
}

export function DeckProgress({ progress }: DeckProgressProps) {
  return (
    <div className="deck-progress" aria-hidden="true">
      <div className="deck-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
