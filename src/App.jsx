import { useState, useEffect, useRef } from 'react'
import './App.css'

const cards = [
  {
    name: "The Fool",
    image: "/images/the-fool.png",
    meaning: "The Fool stands at the threshold of becoming—open, unburdened, and alive with possibility. This card explores sacred risk, intuition, and the strange freedom of stepping into the unknown before certainty arrives."
  },
  {
    name: "The Magician",
    image: "/images/the-magician.png",
    meaning: "The Magician bridges the unseen and the material, transforming thought, intention, and belief into tangible form. He reminds us that creation begins within—and that power is most potent when aligned with clarity and integrity."
  },
  {
    name: "The High Priestess",
    image: "/images/the-high-priestess.png",
    meaning: "The High Priestess speaks through symbol, silence, and intuition—guardian of hidden knowledge and the unseen dimensions of inner life. She reminds us that not all truths arrive through action; some must be received through stillness."
  },
  {
    name: "The Empress",
    image: "/images/the-empress.png",
    meaning: "The Empress embodies creation in its fullest form—abundance, sensuality, growth, and the quiet power of nurturing what longs to emerge. She reminds us that beauty, care, and embodiment are not passive forces, but acts of profound creation."
  },
  {
    name: "The Emperor",
    image: "/images/the-emperor.png",
    meaning: "The Emperor explores structure, authority, and the architecture of control—reminding us that stability can both protect and confine. He asks whether the systems we build are serving our growth, or shielding us from uncertainty."
  },
  {
    name: "The Hierophant",
    image: "/images/the-hierophant.png",
    meaning: "The Hierophant represents inherited wisdom, ritual, and the structures through which meaning is collectively shaped and transmitted. He invites us to examine tradition not as unquestioned doctrine, but as a living system—one that can both guide and constrain."
  },
  {
    name: "The Lovers",
    image: "/images/the-lovers.png",
    meaning: "The Lovers is not merely a symbol of romance, but of choice, alignment, and the tension between opposing forces seeking union. It asks what we are truly choosing—desire, illusion, connection, or authentic harmony."
  },
  {
    name: "The Chariot",
    image: "/images/the-chariot.png",
    meaning: "The Chariot is the force of directed will—movement born not from chaos, but from the disciplined alignment of opposing energies. It reminds us that true momentum comes not from domination alone, but from mastering tension, focus, and purposeful control."
  },
  {
    name: "Strength",
    image: "/images/strength.png",
    meaning: "Strength is the quiet mastery of instinct through compassion rather than force. It speaks to resilience, courage, and the profound power required to remain open-hearted in the presence of fear, chaos, or inner conflict."
  },
  {
    name: "The Hermit",
    image: "/images/the-hermit.png",
    meaning: "The Hermit represents the deliberate turning inward in search of clarity, wisdom, and inner truth. He reminds us that solitude is not always absence, but a sacred space where illumination emerges beyond the noise of the external world."
  },
  {
    name: "Wheel of Fortune",
    image: "/images/wheel-of-fortune.png",
    meaning: "The Wheel of Fortune speaks to cycles, change, and the unseen forces that shape our becoming beyond conscious control. It reminds us that transformation often arrives through movement itself—through timing, chance, and the ever-turning nature of life."
  },
  {
    name: "Justice",
    image: "/images/justice.png",
    meaning: "Justice is the uncompromising pursuit of truth, consequence, and ethical clarity. It reminds us that balance is not passive equilibrium, but the active reckoning between action, accountability, and the realities we create through choice."
  },
  {
    name: "The Hanged Man",
    image: "/images/the-hanged-man.png",
    meaning: "The Hanged Man represents the transformative power of surrender, inviting us into stillness, suspension, and altered perspective. What feels like delay may in fact be revelation—an opportunity to release control and see the world through a different lens."
  },
  {
    name: "Death",
    image: "/images/death.png",
    meaning: "Death marks the necessary ending of what can no longer continue, making space for transformation through release rather than resistance. It reminds us that profound becoming often begins with surrendering the identities, attachments, or chapters we have outgrown."
  },
  {
    name: "Temperance",
    image: "/images/temperance.png",
    meaning: "Temperance is the art of integration—an alchemical balancing of opposing forces into something more harmonious and whole. It reminds us that healing, patience, and transformation often emerge not through extremes, but through conscious synthesis."
  },
  {
    name: "The Devil",
    image: "/images/the-devil.png",
    meaning: "The Devil reveals the attachments, illusions, and patterns that bind us—often less through external force than through unconscious consent. It asks us to confront desire, shadow, and the stories we remain loyal to long after they cease to serve us."
  },
  {
    name: "The Tower",
    image: "/images/the-tower.png",
    meaning: "The Tower is the violent collapse of structures built on illusion, forcing truth into the open through upheaval and revelation. Though destabilizing, it clears what is false—making transformation possible where denial once stood."
  },
  {
    name: "The Star",
    image: "/images/the-star.png",
    meaning: "The Star offers renewal after upheaval—a return to hope, healing, and spiritual openness after the collapse of what once obscured the path. It reminds us that vulnerability is not weakness, but the quiet condition through which restoration becomes possible."
  },
  {
    name: "The Moon",
    image: "/images/the-moon.png",
    meaning: "The Moon invites us into uncertainty, intuition, and the shifting terrain of the subconscious where clarity is partial and meaning unfolds symbolically. It asks us to navigate illusion, fear, and hidden truths with trust in what is felt before it can be fully understood."
  },
  {
    name: "The Sun",
    image: "/images/the-sun.png",
    meaning: "The Sun is the radiant clarity that follows uncertainty—illumination, vitality, and the joyful revelation of what can now be fully seen. It reminds us that truth, confidence, and authentic expression flourish when nothing remains hidden in shadow."
  },
  {
    name: "Judgement",
    image: "/images/judgement.png",
    meaning: "Judgement is the moment of awakening that follows transformation—a reckoning with truth, self, and the call to become something new. It asks us not to remain trapped in former versions of ourselves, but to answer the deeper summons of renewal and conscious becoming."
  },
  {
    name: "The World",
    image: "/images/the-world.png",
    meaning: "The World represents completion, integration, and the profound wholeness that emerges when a cycle has fully run its course. It is both arrival and threshold—a reminder that true fulfillment is not an ending, but the embodied beginning of what comes next."
  }
]

function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  const currentIndex = cards.findIndex(
    (card) => card.name === selectedCard?.name
  )

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % cards.length
    setSelectedCard(cards[nextIndex])
  }

  const goPrevious = () => {
    const previousIndex = (currentIndex - 1 + cards.length) % cards.length
    setSelectedCard(cards[previousIndex])
  }

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (audioPlaying) {
      audioRef.current.pause()
      setAudioPlaying(false)
    } else {
      audioRef.current.volume = 0.35
      audioRef.current.play()
      setAudioPlaying(true)
    }
  }

  const drawRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * cards.length)
  setSelectedCard(cards[randomIndex])
}

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedCard(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedCard])

  return (
    <div className="site">
      <audio ref={audioRef} loop>
        <source src="/audio/ritual-ambient.mp3" type="audio/mpeg" />
      </audio>

      <button className="sound-button" onClick={toggleAudio}>
        {audioPlaying ? '🔇 Mute Ambience' : '🔊 Play Ambience'}
      </button>

      <header className="hero">
        <p className="subtitle">MAJOR ARCANA EXHIBITION</p>
        <h1>Collage Tarot</h1>
        <p className="description">
          An exhibition of the Major Arcana through collage.
        </p>
      </header>

      <div className="draw-section">
  <button className="draw-button" onClick={drawRandomCard}>
    🔮 Your One-Card Pull
  </button>
  <p className="draw-subtitle">
    One message. One mirror. Specifically for you.
  </p>
</div>

      <section className="gallery">
        {cards.map((card) => (
          <button
            className="card"
            key={card.name}
            onClick={() => setSelectedCard(card)}
          >
            <img src={card.image} alt={card.name} className="tarot-image" />
          </button>
        ))}
      </section>

      <section className="about">
        <div className="about-content">
          <p className="about-label">ABOUT THE ARTIST</p>

          <div className="about-divider">
            <span>✦</span>
          </div>

          <h2>
            Where symbolism, ritual, and handmade process converge.
          </h2>

          <p>
            Tarot has long been part of my daily spiritual practice. Each morning, I
            pull cards as a form of reflection, guidance, and symbolic inquiry—returning
            again and again to the rich visual language that makes tarot such a compelling
            mirror for inner life.
          </p>

          <p>
            This original Major Arcana series emerged from a desire to create a deck of
            my own using fragments of books, papers, and collected imagery accumulated
            over the course of my life. Collage has always felt deeply rewarding to me:
            an intuitive process of assembly, transformation, and discovery where meaning
            emerges through juxtaposition.
          </p>

          <p>
            Based in the Seattle area, I’m increasingly interested in the intersection
            of art and technology—exploring how handmade symbolic work can be translated
            into digital spaces without losing texture, intimacy, or ritual presence.
            This exhibition is part archive, part spiritual artifact, and part experiment
            in building new ways for art and interaction to coexist.
          </p>
        </div>
      </section>

      {selectedCard && (
        <div className="modal-backdrop" onClick={() => setSelectedCard(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="back-button"
              onClick={() => setSelectedCard(null)}
            >
              ← Back to Gallery
            </button>

            <button className="nav-button prev" onClick={goPrevious}>
              ← Previous
            </button>

            <button className="nav-button next" onClick={goNext}>
              Next →
            </button>

            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="modal-image"
            />

            <div className="modal-text">
              <h2>{selectedCard.name}</h2>

              {selectedCard.meaning && (
                <p className="card-meaning">{selectedCard.meaning}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App