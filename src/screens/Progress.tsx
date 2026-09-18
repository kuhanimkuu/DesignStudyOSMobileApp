import { getColors } from '../utils/colors'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts'

const weeklyData = [
  { day: 'Mon', hours: 2.0 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3.0 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 1.0 },
  { day: 'Sat', hours: 4.0 },
  { day: 'Sun', hours: 2.5 },
]

const masteryTrend = [
  { week: 'W1', thermo: 55, fluid: 40, maths: 70 },
  { week: 'W2', thermo: 62, fluid: 48, maths: 74 },
  { week: 'W3', thermo: 70, fluid: 52, maths: 79 },
  { week: 'W4', thermo: 80, fluid: 62, maths: 84 },
]

const subjects = [
  { name: 'Eng. Mathematics', mastery: 84, color: '#7C3AED', change: +5 },
  { name: 'Thermodynamics', mastery: 80, color: '#2F6FED', change: +10 },
  { name: 'Fluid Mechanics', mastery: 62, color: '#0EA5E9', change: +4 },
  { name: 'Materials Science', mastery: 58, color: '#059669', change: +2 },
  { name: 'Statics', mastery: 45, color: '#DC2626', change: -1 },
]

interface ProgressProps {
  darkMode: boolean
  onBack: () => void
}

export default function Progress({ darkMode, onBack }: ProgressProps) {
  const c = getColors(darkMode)
  const totalHours = weeklyData.reduce((a, b) => a + b.hours, 0)

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
          Progress
        </h1>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'This week', val: `${totalHours}h`, sub: '+2.5h from last', color: c.primary },
            { label: 'Day streak', val: '12 🔥', sub: 'Best: 21 days', color: '#F5A623' },
            { label: 'Avg mastery', val: '66%', sub: '+4% this month', color: c.green },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`,
              padding: '12px 10px', textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, color: stat.color, margin: '0 0 2px' }}>{stat.val}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: c.fg, margin: '0 0 2px' }}>{stat.label}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 9, color: c.fgMuted, margin: 0 }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Weekly study time */}
        <div style={{ background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`, padding: '14px 14px 10px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: 0 }}>Weekly Study Time</p>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: c.primary, fontWeight: 600 }}>{totalHours}h total</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: -24 }} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: c.fgMuted, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: c.fgMuted, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}h`} />
              <Tooltip
                contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 11, fontFamily: 'Inter', color: c.fg }}
                formatter={(v: unknown) => [`${v}h`, 'Study time']}
              />
              <Bar dataKey="hours" fill="#2F6FED" radius={[5, 5, 0, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mastery trend */}
        <div style={{ background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`, padding: '14px 14px 10px', marginBottom: 16 }}>
          <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 12px' }}>Mastery Trend (4 weeks)</p>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={masteryTrend} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: c.fgMuted, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: c.fgMuted }} axisLine={false} tickLine={false} domain={[30, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 11, fontFamily: 'Inter', color: c.fg }} formatter={(v: unknown) => [`${v}%`]} />
              <Line type="monotone" dataKey="thermo" stroke="#2F6FED" strokeWidth={2} dot={false} name="Thermo" />
              <Line type="monotone" dataKey="fluid" stroke="#0EA5E9" strokeWidth={2} dot={false} name="Fluid" />
              <Line type="monotone" dataKey="maths" stroke="#7C3AED" strokeWidth={2} dot={false} name="Maths" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, justifyContent: 'center' }}>
            {[['#2F6FED', 'Thermo'], ['#0EA5E9', 'Fluid'], ['#7C3AED', 'Maths']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 10, height: 3, borderRadius: 2, background: color }} />
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: c.fgMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject mastery */}
        <div style={{ background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`, padding: 14, marginBottom: 16 }}>
          <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: c.fg, margin: '0 0 12px' }}>Mastery by Subject</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {subjects.map((subject, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 500, color: c.fg }}>{subject.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 10, color: subject.change > 0 ? c.green : c.red }}>
                      {subject.change > 0 ? '+' : ''}{subject.change}%
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, color: c.fg }}>{subject.mastery}%</span>
                  </div>
                </div>
                <div style={{ height: 6, background: c.subtle, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${subject.mastery}%`,
                    background: subject.color, borderRadius: 3, transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strongest / weakest */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: '#ECFDF5', borderRadius: 14, padding: 14, border: '1px solid #BBF7D030' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: '#059669', margin: '0 0 4px', letterSpacing: '0.06em' }}>STRONGEST</p>
            <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#065F46', margin: 0 }}>Eng. Mathematics</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, color: '#059669', margin: '4px 0 0' }}>84%</p>
          </div>
          <div style={{ flex: 1, background: '#FEF2F2', borderRadius: 14, padding: 14, border: '1px solid #FECACA30' }}>
            <p style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: '#DC2626', margin: '0 0 4px', letterSpacing: '0.06em' }}>NEEDS WORK</p>
            <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#7F1D1D', margin: 0 }}>Statics</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, color: '#DC2626', margin: '4px 0 0' }}>45%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
