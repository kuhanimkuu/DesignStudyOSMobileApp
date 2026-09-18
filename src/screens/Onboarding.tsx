import { useState } from 'react'
import Logo from '../components/Logo'
import { getColors } from '../utils/colors'

interface OnboardingProps {
  darkMode: boolean
  onDone: () => void
}

const slides = [
  {
    id: 0,
    tag: 'Ask anything',
    title: 'Ask in any form,\nget deep answers',
    sub: 'Type a question, speak it, snap a photo of your textbook, or upload a PDF — Study OS handles all of it.',
    illustration: AskIllustration,
  },
  {
    id: 1,
    tag: 'See it, not just read it',
    title: 'Equations. Graphs.\nDiagrams. 3D models.',
    sub: 'Answers come with interactive graphs you can explore, rendered equations, diagrams, tables, and 3D visualisations.',
    illustration: SeeIllustration,
  },
  {
    id: 2,
    tag: 'Your data stays on your phone',
    title: 'Private by design,\npowered by you',
    sub: 'Run AI locally on your device, or plug in your own API key from DeepSeek, OpenAI, or Anthropic. Your notes stay yours.',
    illustration: PrivacyIllustration,
  },
]

function AskIllustration({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{ width: 280, height: 200, position: 'relative', margin: '0 auto' }}>
      {/* Chat bubbles */}
      <div style={{
        position: 'absolute', right: 20, top: 20,
        background: c.primary, borderRadius: '16px 16px 4px 16px',
        padding: '10px 16px', maxWidth: 200,
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.4 }}>
          Explain the second law of thermodynamics with an example
        </p>
      </div>
      <div style={{
        position: 'absolute', left: 20, top: 90,
        background: c.surface, borderRadius: '4px 16px 16px 16px',
        padding: '10px 16px', maxWidth: 220,
        border: `1px solid ${c.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fg, margin: 0, lineHeight: 1.5 }}>
          The second law states that entropy always increases...
        </p>
      </div>
      {/* Input chips */}
      <div style={{ position: 'absolute', bottom: 0, left: 20, display: 'flex', gap: 6 }}>
        {['📷 Photo', '🎤 Voice', '📄 PDF'].map(label => (
          <div key={label} style={{
            background: c.primaryLight, borderRadius: 20,
            padding: '4px 10px', fontSize: 11, color: c.primary,
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
          }}>{label}</div>
        ))}
      </div>
    </div>
  )
}

function SeeIllustration({ c }: { c: ReturnType<typeof getColors> }) {
  const pts = [[0, 70], [40, 50], [80, 35], [120, 25], [160, 18], [200, 12]]
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const areaD = pathD + ` L200,80 L0,80 Z`
  return (
    <div style={{ width: 280, height: 200, position: 'relative', margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start', paddingTop: 10 }}>
      {/* Graph card */}
      <div style={{
        background: c.surface, borderRadius: 12, padding: 12,
        border: `1px solid ${c.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        width: 180, flexShrink: 0,
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: c.fgMuted, margin: '0 0 8px', fontWeight: 500 }}>η vs T_h · Carnot Cycle</p>
        <svg width="156" height="80" viewBox="0 0 200 80">
          <defs>
            <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F6FED" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2F6FED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#gfill)" />
          <path d={pathD} stroke="#2F6FED" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Equation card */}
      <div style={{
        background: c.primaryLight, borderRadius: 12, padding: '10px 14px',
        border: `1px solid ${c.primary}22`,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: c.primary, fontWeight: 500,
        alignSelf: 'flex-start',
      }}>
        η = 1 − T_c/T_h
      </div>
      {/* Table chip */}
      <div style={{
        background: c.subtle, borderRadius: 10, padding: '8px 12px',
        fontSize: 11, color: c.fg2, fontFamily: 'Inter, sans-serif',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <span style={{ color: c.fgMuted }}>⊞</span> Data table
      </div>
    </div>
  )
}

function PrivacyIllustration({ c }: { c: ReturnType<typeof getColors> }) {
  const models = ['Local AI', 'DeepSeek', 'OpenAI', 'Anthropic']
  return (
    <div style={{ width: 280, height: 200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16 }}>
      {/* Privacy shield */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #059669, #064E3B)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 20 }}>🔒</span>
        </div>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fg, margin: 0 }}>End-to-end private</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted, margin: '2px 0 0' }}>Your data never leaves your device</p>
        </div>
      </div>
      {/* Model selector chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {models.map((m, i) => (
          <div key={m} style={{
            padding: '5px 12px',
            borderRadius: 20,
            border: `1.5px solid ${i === 0 ? c.primary : c.border}`,
            background: i === 0 ? c.primaryLight : c.surface,
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? c.primary : c.fgMuted,
          }}>{m}</div>
        ))}
      </div>
      <div style={{
        background: c.subtle, borderRadius: 10, padding: '8px 12px',
        fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 14 }}>🔑</span>
        <span>API key: <span style={{ fontFamily: 'JetBrains Mono', letterSpacing: 1 }}>••••••••9f2a</span></span>
      </div>
    </div>
  )
}

export default function Onboarding({ darkMode, onDone }: OnboardingProps) {
  const c = getColors(darkMode)
  const [current, setCurrent] = useState(0)

  const slide = slides[current]
  const Illustration = slide.illustration

  return (
    <div style={{
      height: '100%',
      background: c.bg,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size={30} dark={darkMode} />
        {current < 2 && (
          <button
            onClick={onDone}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, color: c.fgMuted, fontWeight: 500,
            }}
          >
            Skip
          </button>
        )}
      </div>

      {/* Slide content */}
      <div className="fade-in" key={current} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 24px 24px' }}>
        {/* Illustration area */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: c.subtle,
          borderRadius: 24,
          padding: 24,
          marginBottom: 32,
          minHeight: 0,
        }}>
          <Illustration c={c} />
        </div>

        {/* Text */}
        <div>
          <div style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: 20,
            background: c.primaryLight,
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: c.primary,
            marginBottom: 12,
            letterSpacing: '0.02em',
          }}>
            {slide.tag}
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 26,
            fontWeight: 700,
            color: c.fg,
            margin: '0 0 12px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: c.fgMuted,
            lineHeight: 1.6,
            margin: 0,
          }}>
            {slide.sub}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? c.primary : c.border,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.25s, background 0.2s',
              }}
            />
          ))}
        </div>

        {/* Button */}
        {current < 2 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            style={{
              height: 52,
              borderRadius: 16,
              background: c.primary,
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={onDone}
            style={{
              height: 52,
              borderRadius: 16,
              background: c.primary,
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Get started →
          </button>
        )}
      </div>
    </div>
  )
}
