import { useState } from 'react'
import { getColors } from '../utils/colors'

const projects = [
  {
    name: 'Thermodynamics', emoji: '🔥', color: '#2F6FED', files: 12,
    updated: '2 hours ago',
    docs: [
      { name: 'Çengel & Boles Ch.6 — Entropy.pdf', size: '14.2 MB', type: 'pdf' },
      { name: 'Lecture Notes — Second Law.pdf', size: '2.1 MB', type: 'pdf' },
      { name: 'Carnot Cycle Derivation.md', size: '12 KB', type: 'note' },
      { name: 'Problem Set 3 Solutions.pdf', size: '3.4 MB', type: 'pdf' },
      { name: 'Rankine Cycle Analysis.md', size: '8 KB', type: 'note' },
    ],
  },
  {
    name: 'Fluid Mechanics', emoji: '💧', color: '#0EA5E9', files: 8,
    updated: 'Yesterday',
    docs: [
      { name: 'Munson — Fundamentals Ch.5.pdf', size: '9.8 MB', type: 'pdf' },
      { name: 'Bernoulli Applications.md', size: '6 KB', type: 'note' },
      { name: 'Navier-Stokes Notes.pdf', size: '1.9 MB', type: 'pdf' },
    ],
  },
  {
    name: 'Engineering Mathematics', emoji: '∫', color: '#7C3AED', files: 15,
    updated: '3 days ago',
    docs: [
      { name: 'Kreyszig — Advanced Eng. Maths.pdf', size: '28 MB', type: 'pdf' },
      { name: 'ODEs Cheatsheet.md', size: '4 KB', type: 'note' },
    ],
  },
  {
    name: 'Statics', emoji: '⚖', color: '#DC2626', files: 9,
    updated: 'Last week',
    docs: [
      { name: 'Beer & Johnston — Statics.pdf', size: '22 MB', type: 'pdf' },
      { name: 'Free Body Diagrams.md', size: '7 KB', type: 'note' },
    ],
  },
]

interface ProjectsProps {
  darkMode: boolean
  onBack: () => void
}

export default function Projects({ darkMode, onBack }: ProjectsProps) {
  const c = getColors(darkMode)
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)
  const [search, setSearch] = useState('')

  if (selected) {
    const docs = search
      ? selected.docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
      : selected.docs

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          background: c.surface,
          borderBottom: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: `${selected.color}15`, border: `1px solid ${selected.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>{selected.emoji}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: c.fg, margin: 0 }}>{selected.name}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>{selected.files} files</p>
          </div>
          <button style={{
            background: c.primary, border: 'none', borderRadius: 10,
            padding: '7px 12px', cursor: 'pointer',
            fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            + Add
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
              placeholder="Search files…"
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontFamily: 'Inter', fontSize: 13, color: c.fg,
              }}
            />
          </div>
        </div>

        {/* Files */}
        <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 16px' }}>
          {docs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: c.fgMuted, fontFamily: 'Inter', fontSize: 13 }}>
              No files match "{search}"
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.map((doc, i) => (
                <div key={i} style={{
                  background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`,
                  padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 36, height: 40, borderRadius: 6,
                    background: doc.type === 'pdf' ? '#FEF2F2' : '#F0FDF4',
                    border: `1px solid ${doc.type === 'pdf' ? '#FECACA' : '#BBF7D0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {doc.type === 'pdf' ? '📕' : '📝'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: c.fg, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
                    <p style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted, margin: 0 }}>{doc.type.toUpperCase()} · {doc.size}</p>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: 16 }}>⋯</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: c.surface,
        borderBottom: `1px solid ${c.border}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
        <h1 style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: c.fg, margin: 0, flex: 1, letterSpacing: '-0.02em' }}>
          Study Spaces
        </h1>
        <button style={{
          background: c.primary, border: 'none', borderRadius: 10,
          padding: '7px 14px', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#fff',
        }}>
          + New
        </button>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => setSelected(project)}
              style={{
                background: c.surface,
                borderRadius: 16,
                border: `1px solid ${c.border}`,
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${project.color}15`,
                border: `1.5px solid ${project.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }}>
                {project.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: c.fg, margin: '0 0 3px' }}>{project.name}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>
                  {project.files} files · Updated {project.updated}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke={c.fgMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
