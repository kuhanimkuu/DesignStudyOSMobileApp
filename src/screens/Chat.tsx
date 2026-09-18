import { useState, useRef, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getColors } from '../utils/colors'

const graphData = [
  { temp: 400, eff: 25.0 },
  { temp: 500, eff: 40.0 },
  { temp: 600, eff: 50.0 },
  { temp: 700, eff: 57.1 },
  { temp: 800, eff: 62.5 },
  { temp: 900, eff: 66.7 },
  { temp: 1000, eff: 70.0 },
]

const tableData = [
  { th: '400 K', tc: '300 K', eff: '25.0%', work: '250 kJ' },
  { th: '600 K', tc: '300 K', eff: '50.0%', work: '500 kJ' },
  { th: '800 K', tc: '300 K', eff: '62.5%', work: '625 kJ' },
  { th: '1000 K', tc: '300 K', eff: '70.0%', work: '700 kJ' },
]

type MessageType = 'user' | 'ai' | 'thinking'

interface Message {
  id: number
  type: MessageType
  text?: string
  blocks?: BlockType[]
}

type BlockType =
  | { kind: 'text' }
  | { kind: 'equation' }
  | { kind: 'graph' }
  | { kind: 'table' }
  | { kind: 'citation' }
  | { kind: 'clarify' }
  | { kind: 'pdf' }
  | { kind: 'error' }
  | { kind: 'model-unavailable' }

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'user',
    text: 'Explain the Carnot efficiency formula and plot η vs T_h for T_c = 300K as T_h varies from 400K to 1000K',
  },
  {
    id: 2,
    type: 'ai',
    blocks: [
      { kind: 'text' },
      { kind: 'equation' },
      { kind: 'graph' },
      { kind: 'table' },
      { kind: 'pdf' },
      { kind: 'citation' },
      { kind: 'clarify' },
    ],
  },
]

function EquationBlock({ c }: { c: ReturnType<typeof getColors> }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{
      background: c.primaryLight,
      border: `1px solid ${c.primary}30`,
      borderLeft: `3px solid ${c.primary}`,
      borderRadius: 12,
      padding: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: c.primary, letterSpacing: '0.08em' }}>
          CARNOT EFFICIENCY
        </span>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }}
          style={{
            background: copied ? c.green + '20' : c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            padding: '3px 8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 500,
            color: copied ? c.green : c.fgMuted,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 22,
        fontWeight: 500,
        color: c.primary,
        textAlign: 'center',
        padding: '8px 0',
        letterSpacing: '0.02em',
      }}>
        η<sub>Carnot</sub> = 1 − T<sub>c</sub> / T<sub>h</sub>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 10, justifyContent: 'center' }}>
        {[['T_c', 'Cold reservoir temp (K)'], ['T_h', 'Hot reservoir temp (K)'], ['η', 'Thermal efficiency']].map(([sym, desc]) => (
          <div key={sym} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: c.primary, margin: '0 0 2px', fontWeight: 500 }}>{sym}</p>
            <p style={{ fontFamily: 'Inter', fontSize: 9, color: c.fgMuted, margin: 0, lineHeight: 1.3, maxWidth: 70 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GraphBlock({ c, darkMode }: { c: ReturnType<typeof getColors>; darkMode: boolean }) {
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fg, margin: 0 }}>
            Carnot Efficiency vs T<sub>h</sub>
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: c.fgMuted, margin: '2px 0 0' }}>
            T<sub>c</sub> = 300 K · Interactive
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ fontSize: 16 }}>📊</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={graphData} margin={{ top: 0, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
          <XAxis
            dataKey="temp"
            tick={{ fontSize: 9, fill: c.fgMuted, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={{ stroke: c.border }}
            label={{ value: 'T_h (K)', position: 'insideBottom', offset: -2, fontSize: 9, fill: c.fgMuted }}
          />
          <YAxis
            tick={{ fontSize: 9, fill: c.fgMuted, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: c.surface, border: `1px solid ${c.border}`,
              borderRadius: 8, fontSize: 11, fontFamily: 'Inter',
              color: c.fg,
            }}
            formatter={(v: unknown) => [`${Number(v).toFixed(1)}%`, 'η']}
            labelFormatter={(l: unknown) => `T_h = ${l} K`}
          />
          <Line
            type="monotone"
            dataKey="eff"
            stroke="#2F6FED"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#2F6FED', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#2F6FED' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function TableBlock({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px 8px', borderBottom: `1px solid ${c.border}` }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: c.fg, margin: 0 }}>
          Selected efficiency values · T<sub>c</sub> = 300 K
        </p>
      </div>
      <div style={{ overflowX: 'auto' }} className="scrollbar-hide">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
          <thead>
            <tr style={{ background: c.subtle }}>
              {['T_h', 'T_c', 'η_Carnot', 'W_net (kJ/kg)'].map(h => (
                <th key={h} style={{
                  padding: '7px 12px', textAlign: 'left', fontWeight: 600,
                  color: c.fgMuted, fontSize: 10, letterSpacing: '0.04em',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 11, color: c.fg, fontWeight: 500 }}>{row.th}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 11, color: c.fgMuted }}>{row.tc}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#2F6FED', fontWeight: 600 }}>{row.eff}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 11, color: c.fgMuted }}>{row.work}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PDFBlock({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
      padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 40, height: 48, borderRadius: 8,
        background: '#FEF2F2', border: '1px solid #FECACA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 20,
      }}>
        📕
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: c.fg, margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Thermodynamics — Çengel & Boles 9e
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: c.fgMuted, margin: 0 }}>
          Page 287 · Chapter 6 · 14.2 MB
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button style={{
          background: c.subtle, border: 'none', borderRadius: 8,
          padding: '5px 10px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: c.fg2,
        }}>Open</button>
        <button style={{
          background: c.primary, border: 'none', borderRadius: 8,
          padding: '5px 10px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#fff',
        }}>↓</button>
      </div>
    </div>
  )
}

function CitationChip({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: c.subtle, borderRadius: 20,
        padding: '4px 10px',
      }}>
        <span style={{ fontSize: 12 }}>📚</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fg2, fontWeight: 500 }}>
          Çengel & Boles (2019) · p.287
        </span>
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: c.subtle, borderRadius: 20,
        padding: '4px 10px',
      }}>
        <span style={{ fontSize: 12 }}>🔗</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.primary, fontWeight: 500 }}>
          Wikipedia: Carnot cycle
        </span>
      </div>
    </div>
  )
}

function ClarifyBlock({ c }: { c: ReturnType<typeof getColors> }) {
  const [selected, setSelected] = useState<number | null>(null)
  const opts = ['Solve for T_h', 'Differentiate η', 'Compare real cycles', 'Integrate', 'Search papers']
  return (
    <div style={{ background: c.subtle, borderRadius: 12, padding: 12 }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: c.fgMuted, margin: '0 0 8px', fontWeight: 500 }}>
        What would you like to explore?
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {opts.map((o, i) => (
          <button
            key={o}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? c.primary : c.surface,
              color: selected === i ? '#fff' : c.fg2,
              border: `1px solid ${selected === i ? c.primary : c.border}`,
              borderRadius: 20,
              padding: '5px 11px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: selected === i ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function ThinkingIndicator({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'linear-gradient(135deg, #2F6FED, #1D4FBF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ fontSize: 14 }}>◆</span>
      </div>
      <div style={{
        background: c.surface, border: `1px solid ${c.border}`,
        borderRadius: 12, borderBottomLeftRadius: 4,
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="thinking-dot" style={{ animationDelay: `${i * 0.16}s` }} />
          ))}
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fgMuted }}>Thinking…</span>
      </div>
    </div>
  )
}

function AIAvatar({ c }: { c: ReturnType<typeof getColors> }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: 'linear-gradient(135deg, #2F6FED, #1D4FBF)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5L12 5.5V8.5L7 12.5L2 8.5V5.5L7 1.5Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="0.8" />
        <circle cx="7" cy="7" r="2.2" fill="white" />
      </svg>
    </div>
  )
}

export default function Chat({ darkMode }: { darkMode: boolean }) {
  const c = getColors(darkMode)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [attachedPDF, setAttachedPDF] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), type: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai' as const,
        blocks: [{ kind: 'text' as const }],
      }])
    }, 2200)
  }

  const renderBlock = (block: BlockType, idx: number) => {
    if (block.kind === 'text') return (
      <p key={idx} style={{
        fontFamily: 'Inter, sans-serif', fontSize: 14, color: c.fg,
        lineHeight: 1.65, margin: 0,
      }}>
        The <strong>Carnot efficiency</strong> represents the theoretical maximum efficiency of a heat engine operating between two thermal reservoirs. No real engine can exceed this limit — it provides a fundamental upper bound in thermodynamics.
        <br /><br />
        For a cold reservoir at T<sub>c</sub> = 300 K, efficiency increases as T<sub>h</sub> grows, but with diminishing returns.
      </p>
    )
    if (block.kind === 'equation') return <EquationBlock key={idx} c={c} />
    if (block.kind === 'graph') return <GraphBlock key={idx} c={c} darkMode={darkMode} />
    if (block.kind === 'table') return <TableBlock key={idx} c={c} />
    if (block.kind === 'pdf') return <PDFBlock key={idx} c={c} />
    if (block.kind === 'citation') return <CitationChip key={idx} c={c} />
    if (block.kind === 'clarify') return <ClarifyBlock key={idx} c={c} />
    if (block.kind === 'error') return (
      <div key={idx} style={{
        background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: 12,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#DC2626', margin: '0 0 2px' }}>Couldn't generate graph</p>
          <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#7F1D1D', margin: 0 }}>An error occurred while processing the data. Try rephrasing.</p>
        </div>
      </div>
    )
    if (block.kind === 'model-unavailable') return (
      <div key={idx} style={{
        background: c.subtle, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 20 }}>🤖</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 4px' }}>Local model unavailable</p>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: c.fgMuted, margin: '0 0 10px' }}>Add your own API key to use DeepSeek, OpenAI, or Anthropic.</p>
          <button style={{
            background: c.primary, color: '#fff', border: 'none', borderRadius: 8,
            padding: '6px 14px', fontFamily: 'Inter', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Add API key →</button>
        </div>
      </div>
    )
    return null
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: c.bg }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${c.border}`,
        background: c.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AIAvatar c={c} />
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: c.fg, margin: 0 }}>Study OS AI</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: c.green }} />
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted, margin: 0 }}>DeepSeek V3 · online</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, opacity: 0.5 }}>⋯</button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="scrollbar-hide"
        style={{ flex: 1, overflowY: 'auto', padding: '16px' }}
      >
        {/* Conversation date */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{
            fontFamily: 'Inter', fontSize: 11, color: c.fgMuted,
            background: c.subtle, borderRadius: 10, padding: '3px 10px',
          }}>Today · Thermodynamics</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 16 }}>
            {msg.type === 'user' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  maxWidth: '78%',
                  background: c.primary,
                  borderRadius: '16px 16px 4px 16px',
                  padding: '10px 14px',
                }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.5 }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <AIAvatar c={c} />
                <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {msg.blocks?.map((block, i) => renderBlock(block, i))}
                </div>
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <AIAvatar c={c} />
            <ThinkingIndicator c={c} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{
        borderTop: `1px solid ${c.border}`,
        background: c.surface,
        padding: '10px 12px 12px',
        flexShrink: 0,
      }}>
        {/* Attached PDF chip */}
        {attachedPDF && (
          <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: c.primaryLight, borderRadius: 10,
              padding: '4px 10px',
            }}>
              <span style={{ fontSize: 12 }}>📄</span>
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: c.primary, fontWeight: 500 }}>Thermo_Ch6.pdf</span>
              <button
                onClick={() => setAttachedPDF(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.primary, fontSize: 14, lineHeight: 1, padding: '0 0 0 2px' }}
              >×</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          {/* Text input */}
          <div style={{
            flex: 1,
            minHeight: 44,
            background: c.subtle,
            borderRadius: 14,
            border: `1.5px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask anything…"
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: c.fg,
                lineHeight: 1.4,
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => setAttachedPDF(!attachedPDF)}
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: attachedPDF ? c.primaryLight : c.subtle,
                border: `1px solid ${attachedPDF ? c.primary + '40' : c.border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}
            >
              📎
            </button>
            <button style={{
              width: 40, height: 40, borderRadius: 12,
              background: c.subtle, border: `1px solid ${c.border}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🎤</button>
            <button
              onClick={sendMessage}
              style={{
                width: 44, height: 44, borderRadius: 14,
                background: input.trim() ? c.primary : c.subtle,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9L16 9M16 9L10 4M16 9L10 14" stroke={input.trim() ? '#fff' : c.fgMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
