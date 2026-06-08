import { Deck } from '@/components/deck/Deck'
import { deckConfig } from '@/content/ai-share/deck.config'
import { slides } from '@/content/ai-share/slides'

export function App() {
  return <Deck config={deckConfig} slides={slides} />
}
