import { getColors } from '../utils/colors'

type Tab = 'home' | 'chat' | 'learn' | 'planner' | 'profile'

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  darkMode: boolean
}

function HomeIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9.5L11 3L19 9.5V19H14V14H8V19H3V9.5Z"
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth={active ? 0 : 1.8}
        strokeLinejoin="round"
        fillOpacity={active ? 1 : 0}
      />
      {!active && <path d="M3 9.5L11 3L19 9.5V19H14V14H8V19H3V9.5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />}
    </svg>
  )
}

function ChatIcon({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 3C7.5 3 3 6.9 3 11.7C3 14.1 4.1 16.3 6 17.9L5 23L10.5 20.2C11.3 20.4 12.1 20.5 13 20.5C18.5 20.5 23 16.6 23 11.8C23 7 18.5 3 13 3Z"
        fill={color}
        stroke={color}
        strokeWidth="0"
      />
      <circle cx="9" cy="12" r="1.4" fill="white" />
      <circle cx="13" cy="12" r="1.4" fill="white" />
      <circle cx="17" cy="12" r="1.4" fill="white" />
    </svg>
  )
}

function LearnIcon({ active, color }: { active: boolean; color: string }) {
  const sw = active ? 0 : 1.8
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 6.5L11 2L20 6.5L11 11L2 6.5Z"
        fill={active ? color : 'none'}
        stroke={color} strokeWidth={sw} strokeLinejoin="round"
        fillOpacity={active ? 0.9 : 0}
      />
      <path d="M2 6.5V14.5L11 19L20 14.5V6.5" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="6.5" x2="20" y2="10.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function PlannerIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="4" width="16" height="15" rx="2.5"
        fill={active ? color : 'none'}
        stroke={color} strokeWidth="1.8"
        fillOpacity={active ? 0.15 : 0}
      />
      <line x1="3" y1="8.5" x2="19" y2="8.5" stroke={color} strokeWidth="1.6" />
      <line x1="7" y1="2" x2="7" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="15" y1="2" x2="15" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {active && <>
        <rect x="6" y="11" width="3.5" height="3.5" rx="0.8" fill={color} fillOpacity="0.8"/>
        <rect x="12.5" y="11" width="3.5" height="3.5" rx="0.8" fill={color} fillOpacity="0.5"/>
      </>}
      {!active && <>
        <rect x="6.5" y="11.5" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.4" />
        <rect x="13" y="11.5" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.4" />
      </>}
    </svg>
  )
}

function ProfileIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7.5" r="3.5"
        fill={active ? color : 'none'}
        stroke={color} strokeWidth="1.8"
        fillOpacity={active ? 0.9 : 0}
      />
      <path d="M3 19C3 15.7 6.6 13 11 13C15.4 13 19 15.7 19 19"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"
      />
    </svg>
  )
}

export default function BottomNav({ activeTab, onTabChange, darkMode }: BottomNavProps) {
  const c = getColors(darkMode)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn' },
    { id: 'chat', label: '' },
    { id: 'planner', label: 'Planner' },
    { id: 'profile', label: 'Profile' },
  ]

  const renderIcon = (id: Tab, active: boolean) => {
    const color = active ? c.primary : c.fgMuted
    if (id === 'home') return <HomeIcon active={active} color={color} />
    if (id === 'learn') return <LearnIcon active={active} color={color} />
    if (id === 'planner') return <PlannerIcon active={active} color={color} />
    if (id === 'profile') return <ProfileIcon active={active} color={color} />
    return null
  }

  return (
    <div
      style={{
        height: 80,
        background: c.surface,
        borderTop: `1px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 4,
        flexShrink: 0,
        position: 'relative',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id
        if (tab.id === 'chat') {
          return (
            <button
              key="chat"
              onClick={() => onTabChange('chat')}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: activeTab === 'chat'
                  ? 'linear-gradient(135deg, #3D7EFF 0%, #1D4FBF 100%)'
                  : 'linear-gradient(135deg, #2F6FED 0%, #1A4BC4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(47,111,237,0.45)',
                marginTop: -16,
                transition: 'transform 0.15s, box-shadow 0.15s',
                flexShrink: 0,
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.93)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <ChatIcon color="#FFFFFF" />
            </button>
          )
        }
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0 0',
              transition: 'opacity 0.15s',
            }}
          >
            {renderIcon(tab.id, active)}
            <span style={{
              fontSize: 10,
              fontWeight: active ? 600 : 400,
              color: active ? c.primary : c.fgMuted,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.01em',
            }}>
              {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
