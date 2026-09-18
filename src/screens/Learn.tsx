import { useState } from 'react'
import { getColors } from '../utils/colors'

type LearnView = 'concepts' | 'flashcards' | 'quiz'

const concepts = [
  { name: 'Carnot Efficiency', subject: 'Thermodynamics', mastery: 87, questions: 24 },
  { name: 'Entropy & Second Law', subject: 'Thermodynamics', mastery: 73, questions: 31 },
  { name: 'Bernoulli Equation', subject: 'Fluid Mechanics', mastery: 62, questions: 18 },
  { name: 'Navier-Stokes Equations', subject: 'Fluid Mechanics', mastery: 44, questions: 27 },
  { name: 'Integration by Parts', subject: 'Eng. Mathematics', mastery: 91, questions: 40 },
  { name: 'Differential Equations (ODE)', subject: 'Eng. Mathematics', mastery: 78, questions: 35 },
  { name: 'Free Body Diagrams', subject: 'Statics', mastery: 55, questions: 22 },
  { name: 'Moment of Inertia', subject: 'Statics', mastery: 41, questions: 19 },
]

const flashcards = [
  {
    front: 'What is the First Law of Thermodynamics?',
    back: 'Energy cannot be created or destroyed, only converted between forms.\n\ndU = δQ − δW\n\nwhere dU is internal energy change, δQ is heat added, and δW is work done by the system.',
    tags: ['Thermodynamics', 'Laws'],
  },
  {
    front: 'Define specific entropy and its SI units.',
    back: 's = entropy per unit mass (J/kg·K)\n\nds = δq_rev / T\n\nEntropy is a measure of molecular disorder. For reversible processes, the change equals heat divided by absolute temperature.',
    tags: ['Thermodynamics', 'Properties'],
  },
  {
    front: 'State the Bernoulli equation and list its assumptions.',
    back: 'P/ρg + V²/2g + z = constant\n\nAssumptions:\n• Steady flow\n• Incompressible fluid\n• Along a streamline\n• No viscous effects\n• No heat/work transfer',
    tags: ['Fluid Mechanics'],
  },
]

const quizQuestions = [
  {
    q: 'A Carnot engine operates between 800 K and 300 K. What is its maximum efficiency?',
    opts: ['37.5%', '62.5%', '52.5%', '47.5%'],
    correct: 1,
    explanation: 'η = 1 − T_c/T_h = 1 − 300/800 = 0.625 = 62.5%',
  },
  {
    q: 'Which thermodynamic process has ΔS = 0?',
    opts: ['Isothermal', 'Isobaric', 'Isentropic (reversible adiabatic)', 'Isochoric'],
    correct: 2,
    explanation: 'An isentropic process is reversible and adiabatic, so no heat transfer occurs and entropy remains constant.',
  },
]

function MasteryRing({ mastery, size = 44 }: { mastery: number; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const color = mastery >= 75 ? '#059669' : mastery >= 50 ? '#F5A623' : '#DC2626'
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={4} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${(mastery / 100) * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x={size/2} y={size/2 + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={color} fontFamily="Inter">
        {mastery}
      </text>
    </svg>
  )
}

function ConceptsView({ c, darkMode, onFlashcards, onQuiz }: {
  c: ReturnType<typeof getColors>; darkMode: boolean;
  onFlashcards: () => void; onQuiz: () => void
}) {
  const subjects = ['All', 'Thermodynamics', 'Fluid Mechanics', 'Eng. Mathematics', 'Statics']
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? concepts : concepts.filter(c => c.subject === filter)

  return (
    <div className="scrollbar-hide" style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: c.fg, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Learn
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: c.fgMuted, margin: '0 0 16px' }}>
          14 flashcards due · 2 quizzes ready
        </p>

        {/* Mode buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            onClick={onFlashcards}
            style={{
              flex: 1, height: 52, borderRadius: 12,
              background: '#FFF8EB', border: '1.5px solid #F5A62340',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
            }}
          >
            <span style={{ fontSize: 18 }}>🃏</span>
            <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: '#B47A1A' }}>Flashcards</span>
          </button>
          <button
            onClick={onQuiz}
            style={{
              flex: 1, height: 52, borderRadius: 12,
              background: c.primaryLight, border: `1.5px solid ${c.primary}30`,
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
            }}
          >
            <span style={{ fontSize: 18 }}>🎯</span>
            <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: c.primary }}>Quiz</span>
          </button>
          <button
            style={{
              flex: 1, height: 52, borderRadius: 12,
              background: c.subtle, border: `1px solid ${c.border}`,
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
            }}
          >
            <span style={{ fontSize: 18 }}>📝</span>
            <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: c.fgMuted }}>Practice</span>
          </button>
        </div>

        {/* Subject filter */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14 }} className="scrollbar-hide">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? c.primary : c.surface,
                color: filter === s ? '#fff' : c.fgMuted,
                border: `1px solid ${filter === s ? c.primary : c.border}`,
                borderRadius: 20, padding: '5px 12px', whiteSpace: 'nowrap',
                fontFamily: 'Inter', fontSize: 11, fontWeight: filter === s ? 600 : 400,
                cursor: 'pointer',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((concept, i) => (
          <div key={i} style={{
            background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`,
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer',
          }}>
            <MasteryRing mastery={concept.mastery} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 2px' }}>
                {concept.name}
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>
                {concept.subject} · {concept.questions} questions
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke={c.fgMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlashcardView({ c, onBack }: { c: ReturnType<typeof getColors>; onBack: () => void }) {
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)
  const card = flashcards[cardIndex % flashcards.length]

  const rate = (rating: string) => {
    setFlipped(false)
    setAnswered(false)
    setTimeout(() => setCardIndex(i => i + 1), 150)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${c.border}`, background: c.surface }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0 }}>Flashcards</p>
          <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>
            {(cardIndex % flashcards.length) + 1} / {flashcards.length} · Thermodynamics
          </p>
        </div>
        <div style={{
          background: c.amberLight, borderRadius: 20, padding: '3px 10px',
          fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: c.amber,
        }}>14 due</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: c.subtle }}>
        <div style={{
          height: '100%',
          width: `${((cardIndex % flashcards.length) / flashcards.length) * 100}%`,
          background: c.amber, borderRadius: 2, transition: 'width 0.3s',
        }} />
      </div>

      {/* Card */}
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button
          onClick={() => setFlipped(!flipped)}
          style={{
            flex: 1,
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: 24,
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              background: flipped ? c.subtle : c.primaryLight,
              color: flipped ? c.fgMuted : c.primary,
              borderRadius: 20, padding: '3px 10px',
              fontFamily: 'Inter', fontSize: 10, fontWeight: 600,
            }}>
              {flipped ? 'ANSWER' : 'QUESTION'}
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted }}>{card.tags.join(' · ')}</span>
          </div>
          {!flipped ? (
            <p style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 500, color: c.fg, margin: 0, lineHeight: 1.5, flex: 1 }}>
              {card.front}
            </p>
          ) : (
            <pre style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: c.fg,
              margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap', flex: 1,
            }}>
              {card.back}
            </pre>
          )}
          {!flipped && (
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0, textAlign: 'center' }}>
              Tap to reveal answer
            </p>
          )}
        </button>

        {/* Rating buttons (show after flip) */}
        {flipped && (
          <div className="fade-in" style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Again', color: '#DC2626', bg: '#FEF2F2' },
              { label: 'Hard', color: '#D97706', bg: '#FFFBEB' },
              { label: 'Good', color: '#2F6FED', bg: '#EEF4FF' },
              { label: 'Easy', color: '#059669', bg: '#ECFDF5' },
            ].map(r => (
              <button
                key={r.label}
                onClick={() => rate(r.label)}
                style={{
                  flex: 1, height: 48, borderRadius: 12,
                  background: r.bg, border: 'none',
                  color: r.color, fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuizView({ c, onBack }: { c: ReturnType<typeof getColors>; onBack: () => void }) {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const q = quizQuestions[qIndex % quizQuestions.length]
  const progress = (qIndex / (quizQuestions.length * 2)) * 100

  const answer = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
  }

  const next = () => {
    setSelected(null)
    setAnswered(false)
    setQIndex(qi => qi + 1)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${c.border}`, background: c.surface }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
        <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0, flex: 1 }}>Thermodynamics Quiz</p>
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: c.fgMuted }}>{qIndex + 1}/{quizQuestions.length * 2}</span>
      </div>
      {/* Progress */}
      <div style={{ height: 4, background: c.subtle }}>
        <div style={{ height: '100%', width: `${progress}%`, background: c.primary, borderRadius: 2, transition: 'width 0.4s' }} />
      </div>

      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`, padding: 18,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <p style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: c.primary, margin: '0 0 8px', letterSpacing: '0.04em' }}>
            MULTIPLE CHOICE
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 500, color: c.fg, margin: 0, lineHeight: 1.5 }}>
            {q.q}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correct
            const isSelected = selected === i
            let bg = c.surface
            let border = c.border
            let textColor = c.fg
            if (answered) {
              if (isCorrect) { bg = '#ECFDF5'; border = '#059669'; textColor = '#059669' }
              else if (isSelected && !isCorrect) { bg = '#FEF2F2'; border = '#DC2626'; textColor = '#DC2626' }
            } else if (isSelected) {
              bg = c.primaryLight; border = c.primary; textColor = c.primary
            }
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                style={{
                  background: bg, border: `1.5px solid ${border}`,
                  borderRadius: 12, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  transition: 'all 0.2s', textAlign: 'left',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  border: `2px solid ${border}`,
                  background: answered && isCorrect ? '#059669' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 12, color: answered && isCorrect ? '#fff' : textColor,
                  fontWeight: 700,
                }}>
                  {answered && isCorrect ? '✓' : answered && isSelected && !isCorrect ? '✕' : String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: textColor, fontWeight: isSelected ? 600 : 400 }}>{opt}</span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="fade-in" style={{
            background: selected === q.correct ? '#ECFDF5' : '#FFF8EB',
            borderRadius: 12, padding: 14,
            border: `1px solid ${selected === q.correct ? '#059669' : '#F5A623'}30`,
          }}>
            <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: selected === q.correct ? '#059669' : '#D97706', margin: '0 0 4px' }}>
              {selected === q.correct ? '✓ Correct!' : '📖 Explanation'}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#374151', margin: 0, lineHeight: 1.5 }}>{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={next}
            style={{
              height: 48, borderRadius: 12, background: c.primary, color: '#fff',
              border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
            }}
          >
            Next question →
          </button>
        )}
      </div>
    </div>
  )
}

export default function Learn({ darkMode }: { darkMode: boolean }) {
  const c = getColors(darkMode)
  const [view, setView] = useState<LearnView>('concepts')

  if (view === 'flashcards') return <FlashcardView c={c} onBack={() => setView('concepts')} />
  if (view === 'quiz') return <QuizView c={c} onBack={() => setView('concepts')} />
  return (
    <ConceptsView
      c={c} darkMode={darkMode}
      onFlashcards={() => setView('flashcards')}
      onQuiz={() => setView('quiz')}
    />
  )
}
