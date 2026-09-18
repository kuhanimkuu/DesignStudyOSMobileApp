import { useState } from 'react'
import { getColors } from '../utils/colors'
import type { AppRoute } from '../App'

interface ProfileProps {
  darkMode: boolean
  onNavigate: (route: AppRoute) => void
}

const aiModels = [
  { id: 'local', name: 'Local AI', sub: 'On-device · No key needed', badge: 'Private', color: '#059669' },
  { id: 'deepseek', name: 'DeepSeek V3', sub: 'Fast & cheap · API key required', badge: 'Popular', color: '#2F6FED' },
  { id: 'openai', name: 'OpenAI GPT-4o', sub: 'Powerful · API key required', badge: '', color: '#7C3AED' },
  { id: 'anthropic', name: 'Anthropic Claude', sub: 'Excellent reasoning · API key required', badge: '', color: '#D97706' },
]

const memories = [
  { id: 1, text: 'Studying Mechanical Engineering, 3rd year, University of Nairobi' },
  { id: 2, text: 'Struggles with entropy and isentropic relations — prefers worked examples' },
  { id: 3, text: 'Prefers step-by-step derivations over summary answers' },
  { id: 4, text: 'Strongest in Engineering Mathematics, weakest in Statics' },
  { id: 5, text: 'Usually studies between 9:00–12:00 and 14:00–17:00' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', margin: '0 0 8px', textTransform: 'uppercase' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

export default function Profile({ darkMode, onNavigate }: ProfileProps) {
  const c = getColors(darkMode)
  const [selectedModel, setSelectedModel] = useState('deepseek')
  const [apiKey, setApiKey] = useState('sk-••••••••••••••••9f2a')
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [toneValue, setToneValue] = useState(50)
  const [lengthValue, setLengthValue] = useState(75)
  const [memList, setMemList] = useState(memories)
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'ok' | 'fail'>('idle')

  const testConnection = () => {
    setTestStatus('testing')
    setTimeout(() => setTestStatus('ok'), 1800)
  }

  return (
    <div className="scrollbar-hide" style={{ height: '100%', overflowY: 'auto', background: c.bg }}>
      {/* Profile header */}
      <div style={{
        background: darkMode
          ? 'linear-gradient(160deg, #162040 0%, #0C0E16 100%)'
          : 'linear-gradient(160deg, #EEF4FF 0%, #FAFBFD 60%)',
        padding: '24px 20px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 20,
            background: 'linear-gradient(135deg, #2F6FED, #1D4FBF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: '0 4px 16px rgba(47,111,237,0.35)',
          }}>
            🎓
          </div>
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: c.fg, margin: '0 0 2px', letterSpacing: '-0.01em' }}>
              Amara Osei
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: c.fgMuted, margin: 0 }}>
              amara.osei@uon.ac.ke
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span style={{
                background: c.primaryLight, borderRadius: 20, padding: '2px 8px',
                fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: c.primary,
              }}>3rd Year</span>
              <span style={{
                background: c.subtle, borderRadius: 20, padding: '2px 8px',
                fontFamily: 'Inter', fontSize: 10, color: c.fgMuted,
              }}>Mechanical Engineering</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[['12 🔥', 'Day streak'], ['16.5h', 'This week'], ['66%', 'Avg mastery']].map(([val, label]) => (
            <div key={label} style={{
              flex: 1, background: c.surface, borderRadius: 12, padding: '10px 8px', textAlign: 'center',
              border: `1px solid ${c.border}`,
            }}>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, color: c.fg, margin: '0 0 2px' }}>{val}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 9, color: c.fgMuted, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* Progress link */}
        <button
          onClick={() => onNavigate('progress')}
          style={{
            width: '100%', height: 48, borderRadius: 12,
            background: c.surface, border: `1px solid ${c.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 18 }}>📈</span>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: c.fg, flex: 1, textAlign: 'left' }}>View progress & analytics</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke={c.fgMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* AI Model */}
        <Section title="AI Model">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {aiModels.map(model => {
              const active = selectedModel === model.id
              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  style={{
                    background: active ? c.primaryLight : c.surface,
                    border: `1.5px solid ${active ? c.primary : c.border}`,
                    borderRadius: 12, padding: '12px 14px',
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 10,
                    border: `2px solid ${active ? c.primary : c.border}`,
                    background: active ? c.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {active && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#fff' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: active ? c.primary : c.fg, margin: 0 }}>{model.name}</p>
                      {model.badge && (
                        <span style={{
                          background: `${model.color}15`, borderRadius: 8, padding: '1px 6px',
                          fontFamily: 'Inter', fontSize: 9, fontWeight: 600, color: model.color,
                        }}>{model.badge}</span>
                      )}
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: '1px 0 0' }}>{model.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* API Key field */}
          {selectedModel !== 'local' && (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: c.fgMuted, margin: '0 0 6px', letterSpacing: '0.04em' }}>
                API KEY
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{
                  flex: 1, height: 44, background: c.surface, borderRadius: 10,
                  border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center',
                  padding: '0 12px', gap: 8,
                }}>
                  <span style={{ fontSize: 14 }}>🔑</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: c.fg, flex: 1 }}>
                    {apiKeyVisible ? 'sk-abc123def456ghi789jkl9f2a' : apiKey}
                  </span>
                  <button
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: 14 }}
                  >
                    {apiKeyVisible ? '🙈' : '👁'}
                  </button>
                </div>
                <button
                  onClick={testConnection}
                  style={{
                    height: 44, borderRadius: 10, padding: '0 14px',
                    background: testStatus === 'ok' ? '#ECFDF5' : testStatus === 'fail' ? '#FEF2F2' : c.subtle,
                    border: `1px solid ${testStatus === 'ok' ? '#059669' : testStatus === 'fail' ? '#DC2626' : c.border}`,
                    cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
                    color: testStatus === 'ok' ? '#059669' : testStatus === 'fail' ? '#DC2626' : c.fg2,
                    whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {testStatus === 'testing' ? (
                    <div style={{ width: 12, height: 12, border: `2px solid ${c.primary}40`, borderTopColor: c.primary, borderRadius: 6, animation: 'spin 1s linear infinite' }} />
                  ) : testStatus === 'ok' ? '✓ OK' : testStatus === 'fail' ? '✗ Fail' : 'Test'}
                </button>
              </div>
            </div>
          )}
        </Section>

        {/* Personality */}
        <Section title="AI Personality">
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Tone', left: 'Formal', right: 'Friendly', value: toneValue, onChange: setToneValue },
              { label: 'Answer length', left: 'Brief', right: 'Detailed', value: lengthValue, onChange: setLengthValue },
            ].map(slider => (
              <div key={slider.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: c.fg }}>{slider.label}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={slider.value}
                  onChange={e => slider.onChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: c.primary, cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted }}>{slider.left}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted }}>{slider.right}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Memory */}
        <Section title="AI Memory">
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
            {memList.map((mem, i) => (
              <div key={mem.id} style={{
                padding: '10px 14px',
                borderBottom: i < memList.length - 1 ? `1px solid ${c.border}` : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🧠</span>
                <p style={{ fontFamily: 'Inter', fontSize: 12, color: c.fg2, margin: 0, lineHeight: 1.5, flex: 1 }}>{mem.text}</p>
                <button
                  onClick={() => setMemList(ms => ms.filter(m => m.id !== mem.id))}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: c.fgMuted, fontSize: 16, flexShrink: 0, padding: 0, lineHeight: 1,
                  }}
                >×</button>
              </div>
            ))}
          </div>
          <button style={{
            width: '100%', height: 40, marginTop: 8, borderRadius: 10,
            background: 'none', border: `1px solid ${c.border}`,
            cursor: 'pointer', fontFamily: 'Inter', fontSize: 12, color: c.red, fontWeight: 500,
          }}>
            Clear all memories
          </button>
        </Section>

        {/* History & Data */}
        <Section title="Data & Privacy">
          {[
            { icon: '📋', label: 'Chat history', sub: '127 conversations' },
            { icon: '📤', label: 'Export my data', sub: 'JSON · PDF' },
            { icon: '🗑', label: 'Delete all data', sub: 'Cannot be undone', danger: true },
          ].map((item, i) => (
            <button key={i} style={{
              width: '100%', background: c.surface, border: `1px solid ${c.border}`,
              borderRadius: 12, padding: '12px 14px', marginBottom: 6,
              cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: (item as any).danger ? c.red : c.fg, margin: 0 }}>{item.label}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: c.fgMuted, margin: 0 }}>{item.sub}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke={c.fgMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </Section>

        {/* Sign out */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14,
          background: 'none', border: `1.5px solid ${c.border}`,
          cursor: 'pointer', fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
          color: c.fgMuted, marginBottom: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 18 }}>↩</span>
          Sign out
        </button>
      </div>
    </div>
  )
}
