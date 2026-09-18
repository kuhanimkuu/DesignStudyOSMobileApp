import { useState, useEffect } from 'react'
import Splash from './screens/Splash'
import Onboarding from './screens/Onboarding'
import Auth from './screens/Auth'
import Home from './screens/Home'
import Chat from './screens/Chat'
import Learn from './screens/Learn'
import Planner from './screens/Planner'
import Profile from './screens/Profile'
import Projects from './screens/Projects'
import Notes from './screens/Notes'
import Progress from './screens/Progress'
import BottomNav from './components/BottomNav'

type Flow = 'splash' | 'onboarding' | 'auth' | 'app'
export type AppRoute = 'home' | 'chat' | 'learn' | 'planner' | 'profile' | 'projects' | 'notes' | 'progress'

const TAB_ROUTES: AppRoute[] = ['home', 'chat', 'learn', 'planner', 'profile']

function StatusBar({ darkMode }: { darkMode: boolean }) {
  const fg = darkMode ? '#8892A4' : '#64748B'
  return (
    <div style={{
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 12,
      fontWeight: 600,
      color: fg,
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={fg}>
          <rect x="0" y="8" width="3" height="4" rx="0.8" opacity="0.3"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" opacity="0.5"/>
          <rect x="9" y="3" width="3" height="9" rx="0.8" opacity="0.75"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.8"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 7.5C8.3 7.5 9 8.2 9 9C9 9.8 8.3 10.5 7.5 10.5C6.7 10.5 6 9.8 6 9C6 8.2 6.7 7.5 7.5 7.5Z" fill={fg}/>
          <path d="M4.5 5.5C5.4 4.6 6.4 4 7.5 4C8.6 4 9.6 4.6 10.5 5.5" stroke={fg} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
          <path d="M2 3C3.5 1.5 5.4 0.5 7.5 0.5C9.6 0.5 11.5 1.5 13 3" stroke={fg} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="24" height="13" viewBox="0 0 24 13" fill="none">
            <rect x="0.5" y="0.5" width="20" height="12" rx="3.5" stroke={fg} strokeOpacity="0.5"/>
            <rect x="2" y="2" width="15.5" height="9" rx="2" fill={fg} opacity="0.85"/>
            <path d="M21.5 4.5V8.5" stroke={fg} strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [flow, setFlow] = useState<Flow>('splash')
  const [route, setRoute] = useState<AppRoute>('home')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (flow === 'splash') {
      const t = setTimeout(() => setFlow('onboarding'), 2800)
      return () => clearTimeout(t)
    }
  }, [flow])

  const bg = darkMode ? '#0C0E16' : '#FAFBFD'
  const isTab = TAB_ROUTES.includes(route)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a2438 0%, #0d1420 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, width: '100%', maxWidth: 412 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: 'linear-gradient(135deg, #2F6FED, #1D4FBF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L12 5.5V8.5L7 12.5L2 8.5V5.5L7 1.5Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1"/>
              <circle cx="7" cy="7" r="2.2" fill="white"/>
            </svg>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em' }}>Study OS</span>
        </div>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to light' : 'Switch to dark'}
          style={{
            width: 30, height: 30, borderRadius: 15,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 13,
          }}
        >
          {darkMode ? '☀' : '◑'}
        </button>
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 412,
          height: 915,
          borderRadius: 44,
          overflow: 'hidden',
          background: bg,
          boxShadow: '0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.03)',
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StatusBar darkMode={darkMode} />

        {/* Screen area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: bg }}>
          {flow === 'splash' && <Splash darkMode={darkMode} />}
          {flow === 'onboarding' && <Onboarding darkMode={darkMode} onDone={() => setFlow('auth')} />}
          {flow === 'auth' && <Auth darkMode={darkMode} onLogin={() => { setFlow('app'); setRoute('home') }} />}

          {flow === 'app' && (
            <>
              {/* Deep screens (no bottom nav) */}
              {route === 'projects' && (
                <Projects darkMode={darkMode} onBack={() => setRoute('home')} />
              )}
              {route === 'notes' && (
                <Notes darkMode={darkMode} onBack={() => setRoute('home')} />
              )}
              {route === 'progress' && (
                <Progress darkMode={darkMode} onBack={() => setRoute('profile')} />
              )}

              {/* Tab screens */}
              {isTab && (
                <>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    {route === 'home' && <Home darkMode={darkMode} onNavigate={setRoute} />}
                    {route === 'chat' && <Chat darkMode={darkMode} />}
                    {route === 'learn' && <Learn darkMode={darkMode} />}
                    {route === 'planner' && <Planner darkMode={darkMode} />}
                    {route === 'profile' && <Profile darkMode={darkMode} onNavigate={setRoute} />}
                  </div>
                  <BottomNav
                    activeTab={route as 'home' | 'chat' | 'learn' | 'planner' | 'profile'}
                    onTabChange={r => setRoute(r)}
                    darkMode={darkMode}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: 11, marginTop: 14 }}>
        Tap to navigate · ◑ toggles dark mode · 412 × 915 Android frame
      </p>
    </div>
  )
}
