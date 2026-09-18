import { useState } from 'react'
import { getColors } from '../utils/colors'

const notesList = [
  {
    id: 1,
    title: 'Entropy and the Second Law',
    preview: 'Entropy (S) is a state function measuring molecular disorder. For any real process, ΔS_universe > 0...',
    subject: 'Thermodynamics',
    updated: '2 hours ago',
    words: 420,
  },
  {
    id: 2,
    title: 'Navier-Stokes Equations — Notes',
    preview: 'The Navier-Stokes equations describe the motion of viscous fluid substances. They arise from Newton\'s second law...',
    subject: 'Fluid Mechanics',
    updated: 'Yesterday',
    words: 680,
  },
  {
    id: 3,
    title: 'Rankine Cycle Analysis',
    preview: 'The Rankine cycle is the ideal cycle for steam power plants. It consists of four processes: pumping, boiling, expansion, condensation...',
    subject: 'Thermodynamics',
    updated: '3 days ago',
    words: 310,
  },
  {
    id: 4,
    title: 'Free Body Diagram Techniques',
    preview: 'Steps: 1. Isolate the body. 2. Identify all forces. 3. Draw force vectors from point of application...',
    subject: 'Statics',
    updated: 'Last week',
    words: 245,
  },
]

const noteContent = `# Entropy and the Second Law

## Definition
Entropy (S) is a **state function** measuring molecular disorder in a system. Higher entropy = more disorder.

$$dS = \\frac{\\delta Q_{rev}}{T}$$

For an irreversible process: *dS > δQ/T* (Clausius inequality)

---

## Second Law Statements

**Kelvin-Planck:** No heat engine can produce net work from a single thermal reservoir.

**Clausius:** Heat cannot spontaneously flow from cold to hot.

---

## Entropy Change Calculations

For an ideal gas:
$$\\Delta s = c_p \\ln\\frac{T_2}{T_1} - R\\ln\\frac{P_2}{P_1}$$

For an incompressible substance:
$$\\Delta s = c \\ln\\frac{T_2}{T_1}$$

---

## Isentropic Relations

For isentropic processes (reversible + adiabatic):
- T₂/T₁ = (P₂/P₁)^((k-1)/k)
- where k = c_p/c_v (specific heat ratio)

**For air:** k ≈ 1.4

---

## Key Insight
The entropy generation S_gen ≥ 0 for all real processes. This is why no real engine achieves Carnot efficiency.
`

interface NotesProps {
  darkMode: boolean
  onBack: () => void
}

export default function Notes({ darkMode, onBack }: NotesProps) {
  const c = getColors(darkMode)
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [selected, setSelected] = useState<typeof notesList[0] | null>(null)
  const [search, setSearch] = useState('')

  const filtered = search
    ? notesList.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase()))
    : notesList

  if (view === 'editor' && selected) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
        {/* Editor header */}
        <div style={{
          padding: '12px 16px',
          background: c.surface,
          borderBottom: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0 }}>{selected.subject}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted, margin: 0 }}>Updated {selected.updated} · {selected.words} words</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: c.primaryLight, border: 'none', borderRadius: 8,
              padding: '6px 12px', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: c.primary,
            }}>Ask AI</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: 18 }}>⋯</button>
          </div>
        </div>

        {/* Editor content */}
        <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 40px' }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: c.fg,
            margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            {selected.title}
          </h1>
          {/* Render note content as styled blocks */}
          {noteContent.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return (
              <h1 key={i} style={{ display: 'none' }} />
            )
            if (line.startsWith('## ')) return (
              <h2 key={i} style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: c.fg, margin: '20px 0 8px', letterSpacing: '-0.01em' }}>
                {line.replace('## ', '')}
              </h2>
            )
            if (line.startsWith('$$')) return (
              <div key={i} style={{
                background: c.primaryLight, border: `1px solid ${c.primary}20`,
                borderLeft: `3px solid ${c.primary}`,
                borderRadius: 10, padding: '10px 16px', margin: '8px 0',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: c.primary, textAlign: 'center',
              }}>
                {line.replace(/\$\$/g, '').replace('\\frac{\\delta Q_{rev}}{T}', 'δQ_rev / T')
                  .replace('\\Delta s = c_p \\ln\\frac{T_2}{T_1} - R\\ln\\frac{P_2}{P_1}', 'Δs = c_p·ln(T₂/T₁) − R·ln(P₂/P₁)')
                  .replace('\\Delta s = c \\ln\\frac{T_2}{T_1}', 'Δs = c·ln(T₂/T₁)')
                  .replace('\\frac{\\delta Q_{rev}}{T}', 'δQ_rev / T')
                }
              </div>
            )
            if (line === '---') return (
              <div key={i} style={{ height: 1, background: c.border, margin: '16px 0' }} />
            )
            if (line.startsWith('**') && line.endsWith('**')) return (
              <p key={i} style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: c.fg, margin: '6px 0', lineHeight: 1.6 }}>
                {line.replace(/\*\*/g, '')}
              </p>
            )
            if (line.startsWith('- ')) return (
              <div key={i} style={{ display: 'flex', gap: 8, margin: '4px 0' }}>
                <span style={{ color: c.primary, fontWeight: 700, flexShrink: 0 }}>·</span>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: c.fg2, margin: 0, lineHeight: 1.6 }}>{line.slice(2)}</p>
              </div>
            )
            if (line === '') return <div key={i} style={{ height: 8 }} />
            return (
              <p key={i} style={{ fontFamily: 'Inter', fontSize: 13, color: c.fg2, margin: '4px 0', lineHeight: 1.65 }}>
                {line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
              </p>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <div style={{
        padding: '12px 16px',
        background: c.surface,
        borderBottom: `1px solid ${c.border}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
        <h1 style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: c.fg, margin: 0, flex: 1, letterSpacing: '-0.02em' }}>
          Notes
        </h1>
        <button style={{
          background: c.primary, border: 'none', borderRadius: 10,
          padding: '7px 14px', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#fff',
        }}>
          + New
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{
          height: 40, background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
        }}>
          <span style={{ opacity: 0.4 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontFamily: 'Inter', fontSize: 13, color: c.fg,
            }}
          />
        </div>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 16px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: c.fgMuted, margin: 0 }}>No notes found for "{search}"</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(note => (
              <button
                key={note.id}
                onClick={() => { setSelected(note); setView('editor') }}
                style={{
                  background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`,
                  padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0, lineHeight: 1.3, paddingRight: 8 }}>{note.title}</p>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted, flexShrink: 0 }}>{note.updated}</span>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 12, color: c.fgMuted, margin: '0 0 8px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                  {note.preview}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    background: c.primaryLight, borderRadius: 20, padding: '2px 8px',
                    fontFamily: 'Inter', fontSize: 10, fontWeight: 500, color: c.primary,
                  }}>{note.subject}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted }}>{note.words} words</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
