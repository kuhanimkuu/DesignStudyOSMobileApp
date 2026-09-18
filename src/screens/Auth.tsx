import Logo from '../components/Logo'
import { getColors } from '../utils/colors'

interface AuthProps {
  darkMode: boolean
  onLogin: () => void
}

export default function Auth({ darkMode, onLogin }: AuthProps) {
  const c = getColors(darkMode)

  return (
    <div style={{
      height: '100%',
      background: c.bg,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top gradient panel */}
      <div style={{
        background: darkMode
          ? 'linear-gradient(160deg, #162040 0%, #0C0E16 100%)'
          : 'linear-gradient(160deg, #EEF4FF 0%, #FAFBFD 100%)',
        padding: '48px 32px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 20,
      }}>
        <Logo size={60} showText dark={darkMode} />
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: c.fgMuted,
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 280,
        }}>
          Your intelligent study companion for engineering. Powered by AI, private by default.
        </p>
      </div>

      {/* Form area */}
      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: c.fg,
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
        }}>
          Welcome back
        </h2>

        {/* Email field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: c.fg2, letterSpacing: '0.02em' }}>
            UNIVERSITY EMAIL
          </label>
          <div style={{
            height: 48,
            borderRadius: 12,
            border: `1.5px solid ${c.border}`,
            background: c.surface,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 10,
          }}>
            <span style={{ fontSize: 16, opacity: 0.5 }}>✉</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: c.fgMuted }}>
              amara.osei@uon.ac.ke
            </span>
          </div>
        </div>

        {/* Password field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: c.fg2, letterSpacing: '0.02em' }}>
            PASSWORD
          </label>
          <div style={{
            height: 48,
            borderRadius: 12,
            border: `1.5px solid ${c.border}`,
            background: c.surface,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 10,
          }}>
            <span style={{ fontSize: 16, opacity: 0.5 }}>🔒</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, color: c.fgMuted, letterSpacing: 6 }}>
              ••••••••
            </span>
          </div>
        </div>

        <button
          onClick={onLogin}
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
            marginTop: 4,
            letterSpacing: '-0.01em',
            boxShadow: '0 4px 16px rgba(47,111,237,0.35)',
          }}
        >
          Sign in
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: c.border }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fgMuted }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: c.border }} />
        </div>

        {/* Google */}
        <button
          onClick={onLogin}
          style={{
            height: 52,
            borderRadius: 16,
            background: c.surface,
            color: c.fg,
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            border: `1.5px solid ${c.border}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4"/>
            <path d="M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.92-2.26a5.43 5.43 0 0 1-8.07-2.85H.96v2.34A9 9 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.96 10.71a5.32 5.32 0 0 1 0-3.42V4.95H.96a9 9 0 0 0 0 8.1l3-2.34z" fill="#FBBC05"/>
            <path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0a9 9 0 0 0-8.04 4.95l3 2.34A5.36 5.36 0 0 1 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: c.fgMuted, textAlign: 'center', margin: '4px 0 0', lineHeight: 1.5 }}>
          No account?{' '}
          <span style={{ color: c.primary, fontWeight: 500, cursor: 'pointer' }} onClick={onLogin}>
            Create one free
          </span>
        </p>
      </div>
    </div>
  )
}
