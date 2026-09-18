import { useState, useEffect } from 'react'
import { getColors } from '../utils/colors'

type PlannerView = 'calendar' | 'timer'

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const dayBlocks = [
  [{ h: 9, dur: 1.5, subj: 'Thermo', color: '#2F6FED' }, { h: 14, dur: 1, subj: 'Maths', color: '#7C3AED' }],
  [{ h: 10, dur: 2, subj: 'Lab', color: '#059669' }],
  [{ h: 9, dur: 1, subj: 'Thermo', color: '#2F6FED' }, { h: 13, dur: 1.5, subj: 'Fluid', color: '#0EA5E9' }, { h: 16, dur: 1, subj: 'Maths', color: '#7C3AED' }],
  [{ h: 11, dur: 2, subj: 'Statics', color: '#DC2626' }],
  [{ h: 9, dur: 1, subj: 'Fluid', color: '#0EA5E9' }],
  [{ h: 10, dur: 3, subj: 'Study', color: '#F5A623' }],
  [],
]

const goals = [
  { title: 'Complete Thermo Chapter 6', subject: 'Thermodynamics', progress: 75, deadline: 'Fri 20 Sep' },
  { title: 'Practice 50 integration problems', subject: 'Eng. Mathematics', progress: 40, deadline: 'Sun 22 Sep' },
  { title: 'Revise statics — moment of inertia', subject: 'Statics', progress: 20, deadline: 'Wed 25 Sep' },
]

function CalendarView({ c, darkMode, onTimer }: {
  c: ReturnType<typeof getColors>; darkMode: boolean; onTimer: () => void
}) {
  const today = 2 // Wednesday

  return (
    <div className="scrollbar-hide" style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: c.fg, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Planner
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: c.fgMuted, margin: '0 0 20px' }}>
          Week of 16–22 Sep 2024
        </p>

        {/* Week strip */}
        <div style={{
          background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`,
          padding: '14px 12px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {days.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: i === today ? c.primary : c.fgMuted, fontWeight: i === today ? 700 : 400 }}>
                  {d}
                </span>
                <div style={{
                  width: 30, height: 30, borderRadius: 15,
                  background: i === today ? c.primary : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
                    color: i === today ? '#fff' : c.fg,
                  }}>
                    {16 + i}
                  </span>
                </div>
                {/* Study blocks minimap */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, height: 20, justifyContent: 'flex-start' }}>
                  {dayBlocks[i].slice(0, 2).map((block, j) => (
                    <div key={j} style={{
                      width: 24, height: Math.max(4, block.dur * 3),
                      borderRadius: 2, background: block.color,
                      opacity: 0.7,
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's sessions */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
              Wednesday · Today
            </p>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 12, color: c.primary, fontWeight: 500 }}>
              + Add session
            </button>
          </div>
          {dayBlocks[today].map((block, i) => (
            <div key={i} style={{
              background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`,
              padding: '12px 14px',
              borderLeft: `3px solid ${block.color}`,
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 2px' }}>{block.subj}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>
                  {block.h}:00 – {block.h + block.dur}:00 · {block.dur * 60} min
                </p>
              </div>
              <button
                onClick={onTimer}
                style={{
                  background: `${block.color}15`,
                  border: `1px solid ${block.color}30`,
                  borderRadius: 8,
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: block.color,
                }}
              >
                Start ▶
              </button>
            </div>
          ))}
        </div>

        {/* Goals */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: c.fgMuted, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
              Weekly Goals
            </p>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 12, color: c.primary, fontWeight: 500 }}>
              + Goal
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {goals.map((goal, i) => (
              <div key={i} style={{
                background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '13px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 8 }}>
                    <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 2px' }}>{goal.title}</p>
                    <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>
                      {goal.subject} · due {goal.deadline}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700,
                    color: goal.progress >= 70 ? c.green : goal.progress >= 40 ? c.amber : c.fgMuted,
                  }}>
                    {goal.progress}%
                  </span>
                </div>
                <div style={{ height: 5, background: c.subtle, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${goal.progress}%`,
                    background: goal.progress >= 70 ? c.green : goal.progress >= 40 ? c.amber : c.primary,
                    borderRadius: 3, transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TimerView({ c, onBack }: { c: ReturnType<typeof getColors>; onBack: () => void }) {
  const [seconds, setSeconds] = useState(45 * 60)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<'focus' | 'break'>('focus')
  const total = 45 * 60

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [running])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const progress = (seconds / total)
  const r = 110
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - progress)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${c.border}`, background: c.surface }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>←</button>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0 }}>Focus Timer</p>
          <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>Thermodynamics · Chapter 6</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 32 }}>
        {/* Phase selector */}
        <div style={{ display: 'flex', gap: 0, background: c.subtle, borderRadius: 10, padding: 3 }}>
          {(['focus', 'break'] as const).map(p => (
            <button
              key={p}
              onClick={() => { setPhase(p); setSeconds(p === 'focus' ? 45 * 60 : 5 * 60); setRunning(false) }}
              style={{
                background: phase === p ? c.surface : 'transparent',
                border: 'none', borderRadius: 8, padding: '6px 20px',
                fontFamily: 'Inter', fontSize: 12, fontWeight: phase === p ? 600 : 400,
                color: phase === p ? c.fg : c.fgMuted, cursor: 'pointer',
                boxShadow: phase === p ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {p === 'focus' ? '🎯 Focus' : '☕ Break'}
            </button>
          ))}
        </div>

        {/* Ring timer */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="260" height="260" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r={r} fill="none" stroke={c.subtle} strokeWidth="10" />
            <circle
              cx="130" cy="130" r={r}
              fill="none"
              stroke={phase === 'focus' ? '#2F6FED' : c.amber}
              strokeWidth="10"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 48, fontWeight: 500,
              color: c.fg, margin: 0,
              letterSpacing: '-0.02em',
            }}>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {phase}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button
            onClick={() => { setSeconds(total); setRunning(false) }}
            style={{
              width: 48, height: 48, borderRadius: 24,
              background: c.surface, border: `1px solid ${c.border}`,
              cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >↺</button>
          <button
            onClick={() => setRunning(!running)}
            style={{
              width: 72, height: 72, borderRadius: 36,
              background: running ? c.subtle : (phase === 'focus' ? '#2F6FED' : c.amber),
              border: 'none', cursor: 'pointer',
              fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: running ? 'none' : `0 8px 24px ${phase === 'focus' ? 'rgba(47,111,237,0.4)' : 'rgba(245,166,35,0.4)'}`,
              transition: 'all 0.2s',
            }}
          >
            {running ? '⏸' : '▶'}
          </button>
          <button
            onClick={onBack}
            style={{
              width: 48, height: 48, borderRadius: 24,
              background: c.surface, border: `1px solid ${c.border}`,
              cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: c.red,
            }}
          >■</button>
        </div>

        {/* Session note */}
        <div style={{
          background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`,
          padding: '12px 16px', width: '100%', maxWidth: 320,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {[['Sessions today', '2'], ['Total focus', '1h 30m'], ['Streak', '12 days']].map(([label, val]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700, color: c.fg, margin: 0 }}>{val}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 9, color: c.fgMuted, margin: '2px 0 0' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Planner({ darkMode }: { darkMode: boolean }) {
  const c = getColors(darkMode)
  const [view, setView] = useState<PlannerView>('calendar')

  if (view === 'timer') return <TimerView c={c} onBack={() => setView('calendar')} />
  return <CalendarView c={c} darkMode={darkMode} onTimer={() => setView('timer')} />
}
