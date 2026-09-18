import Logo from '../components/Logo'
import { getColors } from '../utils/colors'

export default function Splash({ darkMode }: { darkMode: boolean }) {
  const c = getColors(darkMode)

  return (
    <div
      style={{
        height: '100%',
        background: c.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}
    >
      {/* Subtle radial glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: darkMode
          ? 'radial-gradient(circle, rgba(47,111,237,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(47,111,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="splash-pulse" style={{ borderRadius: 999, padding: 2 }}>
        <Logo size={72} dark={darkMode} />
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 28,
          fontWeight: 700,
          color: c.fg,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Study OS
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          color: c.fgMuted,
          marginTop: 8,
          letterSpacing: '0.02em',
          fontWeight: 400,
        }}>
          Your AI study companion
        </div>
      </div>

      {/* Loading indicator */}
      <div style={{ marginTop: 60, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="thinking-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: c.primary,
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        color: c.fgMuted,
        opacity: 0.6,
        letterSpacing: '0.08em',
        fontWeight: 500,
      }}>
        BUILT FOR KENYAN ENGINEERS
      </div>
    </div>
  )
}
