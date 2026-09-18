export interface ColorScheme {
  bg: string
  surface: string
  subtle: string
  subtle2: string
  fg: string
  fg2: string
  fgMuted: string
  border: string
  primary: string
  primaryLight: string
  primaryFg: string
  amber: string
  amberLight: string
  amberFg: string
  green: string
  red: string
  overlay: string
}

export function getColors(dark: boolean): ColorScheme {
  return dark ? {
    bg: '#0C0E16',
    surface: '#141824',
    subtle: '#1C2132',
    subtle2: '#232840',
    fg: '#F1F5F9',
    fg2: '#CBD5E1',
    fgMuted: '#8892A4',
    border: '#272D44',
    primary: '#4F85F5',
    primaryLight: '#162040',
    primaryFg: '#FFFFFF',
    amber: '#F5A623',
    amberLight: '#271B08',
    amberFg: '#0C0E16',
    green: '#34D399',
    red: '#F87171',
    overlay: 'rgba(0,0,0,0.6)',
  } : {
    bg: '#FAFBFD',
    surface: '#FFFFFF',
    subtle: '#EEF1F8',
    subtle2: '#E4EAF8',
    fg: '#0F172A',
    fg2: '#334155',
    fgMuted: '#64748B',
    border: '#E2E8F0',
    primary: '#2F6FED',
    primaryLight: '#EEF4FF',
    primaryFg: '#FFFFFF',
    amber: '#F5A623',
    amberLight: '#FFF8EB',
    amberFg: '#7C4A00',
    green: '#059669',
    red: '#DC2626',
    overlay: 'rgba(0,0,0,0.3)',
  }
}
