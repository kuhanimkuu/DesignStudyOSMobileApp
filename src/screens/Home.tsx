import { getColors } from '../utils/colors'
import type { AppRoute } from '../App'

interface HomeProps {
  darkMode: boolean
  onNavigate: (route: AppRoute) => void
}

function Card({ children, c, style }: { children: React.ReactNode; c: ReturnType<typeof getColors>; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: c.surface,
      borderRadius: 16,
      border: `1px solid ${c.border}`,
      padding: 16,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      ...style,
    }}>
      {children}
    </div>
  )
}

const quickActions = [
  { icon: '💬', label: 'Ask', color: '#2F6FED', bg: '#EEF4FF' },
  { icon: '📄', label: 'PDF', color: '#7C3AED', bg: '#F3EEFF' },
  { icon: '📷', label: 'Scan', color: '#059669', bg: '#ECFDF5' },
  { icon: '🎤', label: 'Voice', color: '#DC2626', bg: '#FEF2F2' },
]

const todayPlan = [
  { subject: 'Thermodynamics', topic: 'Chapter 6: Entropy & The Second Law', duration: '45 min', done: false },
  { subject: 'Fluid Mechanics', topic: 'Practice Quiz: Bernoulli Equation', duration: '20 min', done: true },
  { subject: 'Eng. Mathematics', topic: 'Problem Set 4: Integration by Parts', duration: '30 min', done: false },
]

const weakConcepts = [
  { name: 'Rankine Cycle efficiency', subject: 'Thermodynamics', mastery: 38 },
  { name: 'Navier-Stokes simplifications', subject: 'Fluid Mechanics', mastery: 52 },
  { name: 'Eigenvalue methods', subject: 'Eng. Mathematics', mastery: 45 },
]

export default function Home({ darkMode, onNavigate }: HomeProps) {
  const c = getColors(darkMode)

  return (
    <div
      className="scrollbar-hide"
      style={{
        height: '100%',
        overflowY: 'auto',
        background: c.bg,
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: c.fgMuted, margin: '0 0 2px' }}>
              Good morning,
            </p>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: c.fg, margin: 0, letterSpacing: '-0.02em' }}>
              Amara 👋
            </h1>
          </div>
          {/* Streak badge */}
          <div
            className="streak-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#FFF8EB',
              borderRadius: 20,
              padding: '6px 12px',
              border: '1.5px solid #F5A62340',
            }}
          >
            <span style={{ fontSize: 18 }}>🔥</span>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#F5A623', margin: 0, lineHeight: 1 }}>12</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#B47A1A', margin: '1px 0 0', lineHeight: 1 }}>day streak</p>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: c.fgMuted, margin: '8px 0 0' }}>
          Thursday · 3rd Year, Mechanical Engineering
        </p>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {quickActions.map(a => (
            <button
              key={a.label}
              style={{
                flex: 1,
                height: 72,
                borderRadius: 14,
                background: darkMode ? c.surface : a.bg,
                border: `1.5px solid ${darkMode ? c.border : 'transparent'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: darkMode ? c.fgMuted : a.color }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue where you left off */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: '0 0 10px', textTransform: 'uppercase' }}>
          Continue
        </p>
        <Card c={c} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            height: 5,
            background: `linear-gradient(90deg, ${c.primary} 0%, ${c.primary} 68%, ${c.subtle} 68%)`,
          }} />
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: c.primary, margin: '0 0 4px', letterSpacing: '0.03em' }}>
                  THERMODYNAMICS
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: c.fg, margin: 0, letterSpacing: '-0.01em' }}>
                  Second Law & Entropy
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fgMuted, margin: '3px 0 0' }}>
                  Chapter 6 · 68% complete
                </p>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: c.primaryLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: 18 }}>📘</span>
              </div>
            </div>
            <button style={{
              background: c.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              height: 38,
              width: '100%',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Resume →
            </button>
          </div>
        </Card>
      </div>

      {/* Today's plan */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
            Today's Plan
          </p>
          <button onClick={() => onNavigate('planner')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.primary, fontWeight: 500 }}>
            View all →
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todayPlan.map((item, i) => (
            <Card key={i} c={c} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `2px solid ${item.done ? c.green : c.border}`,
                background: item.done ? c.green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {item.done && <span style={{ fontSize: 12, color: '#fff' }}>✓</span>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.primary, margin: '0 0 1px', opacity: 0.8 }}>
                  {item.subject}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: item.done ? c.fgMuted : c.fg,
                  margin: 0, textDecoration: item.done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {item.topic}
                </p>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted, flexShrink: 0 }}>{item.duration}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Flashcards due */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: '0 0 10px', textTransform: 'uppercase' }}>
          Due Today
        </p>
        <Card c={c}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: '#FFF8EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 22 }}>🃏</span>
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700, color: c.fg, margin: 0 }}>
                  14 flashcards
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fgMuted, margin: '2px 0 0' }}>
                  Thermodynamics · Statics
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              style={{
                background: c.amber,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                height: 38,
                padding: '0 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Review
            </button>
          </div>
        </Card>
      </div>

      {/* Weak concepts */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
            Needs Work
          </p>
          <button onClick={() => onNavigate('progress')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.primary, fontWeight: 500 }}>
            See analysis →
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {weakConcepts.map((concept, i) => (
            <Card key={i} c={c} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 2px' }}>
                  {concept.name}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted, margin: 0 }}>
                  {concept.subject}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ width: 60, height: 4, borderRadius: 2, background: c.subtle, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${concept.mastery}%`,
                    background: concept.mastery < 50 ? c.red : c.amber,
                    borderRadius: 2,
                  }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: c.fgMuted, minWidth: 28, textAlign: 'right' }}>
                  {concept.mastery}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Projects shortcut */}
      <div style={{ padding: '20px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
            Study Spaces
          </p>
          <button onClick={() => onNavigate('projects')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.primary, fontWeight: 500 }}>
            All projects →
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }} className="scrollbar-hide">
          {[
            { name: 'Thermodynamics', files: 12, color: '#EEF4FF', tc: '#2F6FED', emoji: '🔥' },
            { name: 'Fluid Mechanics', files: 8, color: '#F3EEFF', tc: '#7C3AED', emoji: '💧' },
            { name: 'Eng. Maths', files: 15, color: '#ECFDF5', tc: '#059669', emoji: '∫' },
          ].map(p => (
            <button
              key={p.name}
              onClick={() => onNavigate('projects')}
              style={{
                background: darkMode ? c.surface : p.color,
                border: `1px solid ${darkMode ? c.border : 'transparent'}`,
                borderRadius: 14,
                padding: '14px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{p.emoji}</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: darkMode ? c.fg : p.tc, margin: '0 0 2px' }}>{p.name}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted, margin: 0 }}>{p.files} files</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
