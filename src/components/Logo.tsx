interface LogoProps {
  size?: number
  showText?: boolean
  dark?: boolean
  textColor?: string
}

export default function Logo({ size = 40, showText = false, dark = false, textColor }: LogoProps) {
  const tc = textColor || (dark ? '#F1F5F9' : '#0F172A')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          background: 'linear-gradient(135deg, #2F6FED 0%, #1D4FBF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(47,111,237,0.35)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 22 22" fill="none">
          {/* Diamond/book mark */}
          <path
            d="M11 2L19 8.5V13.5L11 20L3 13.5V8.5L11 2Z"
            fill="white"
            fillOpacity="0.2"
            stroke="white"
            strokeWidth="1.2"
          />
          <path
            d="M11 5.5L16 9.5V12.5L11 16.5L6 12.5V9.5L11 5.5Z"
            fill="white"
            fillOpacity="0.85"
          />
          <circle cx="11" cy="11" r="2.2" fill="white" />
        </svg>
      </div>
      {showText && (
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: size * 0.42, color: tc, letterSpacing: '-0.01em', lineHeight: 1 }}>
            Study OS
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: size * 0.24, color: tc, opacity: 0.5, letterSpacing: '0.04em', lineHeight: 1, marginTop: 2 }}>
            AI COMPANION
          </div>
        </div>
      )}
    </div>
  )
}
