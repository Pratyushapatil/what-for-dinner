export type ThemeMode = 'light' | 'dark'

export type ThemePresetId =
  | 'classic'
  | 'vibrant'
  | 'nature'
  | 'sunset'
  | 'ocean'
  | 'berry'
  | 'autumn'
  | 'mint'
  | 'lavender'
  | 'monochrome'

export type ThemePreset = {
  id: ThemePresetId
  name: string
  primary: string
  secondary: string
}

export type MealTheme = {
  mode: ThemeMode
  primary: string
  secondary: string
  primarySoft: string
  secondarySoft: string
  primaryPastel: string
  secondaryPastel: string
  primaryPastelStrong: string
  secondaryPastelStrong: string
  pageBackground: string
  surface: string
  surfaceMuted: string
  border: string
  textPrimary: string
  textSecondary: string
  shadow: string
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'classic', name: 'Classic', primary: '#f6a62f', secondary: '#18b4c6' },
  { id: 'vibrant', name: 'Vibrant', primary: '#f06292', secondary: '#7c4dff' },
  { id: 'nature', name: 'Nature', primary: '#84cc16', secondary: '#14b8a6' },
  { id: 'sunset', name: 'Sunset', primary: '#fb8c50', secondary: '#8b5cf6' },
  { id: 'ocean', name: 'Ocean', primary: '#22b8cf', secondary: '#4f46e5' },
  { id: 'berry', name: 'Berry', primary: '#d946ef', secondary: '#f43f5e' },
  { id: 'autumn', name: 'Autumn', primary: '#f97316', secondary: '#dc2626' },
  { id: 'mint', name: 'Mint', primary: '#4ade80', secondary: '#22d3ee' },
  { id: 'lavender', name: 'Lavender', primary: '#c4b5fd', secondary: '#8b5cf6' },
  { id: 'monochrome', name: 'Monochrome', primary: '#94a3b8', secondary: '#64748b' },
]

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const valid = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized
  const value = Number.parseInt(valid, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const toRgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const blendHex = (fromHex: string, toHex: string, ratio: number) => {
  const from = hexToRgb(fromHex)
  const to = hexToRgb(toHex)
  return rgbToHex(
    Math.round(from.r + (to.r - from.r) * ratio),
    Math.round(from.g + (to.g - from.g) * ratio),
    Math.round(from.b + (to.b - from.b) * ratio),
  )
}

export const buildMealTheme = (
  mode: ThemeMode,
  primary: string,
  secondary: string,
): MealTheme => {
  const isDark = mode === 'dark'
  const blendBase = isDark ? '#1c1c1e' : '#ffffff'

  return {
    mode,
    primary,
    secondary,
    primarySoft: toRgba(primary, isDark ? 0.22 : 0.14),
    secondarySoft: toRgba(secondary, isDark ? 0.22 : 0.14),
    primaryPastel: blendHex(primary, blendBase, isDark ? 0.55 : 0.84),
    secondaryPastel: blendHex(secondary, blendBase, isDark ? 0.55 : 0.84),
    primaryPastelStrong: blendHex(primary, blendBase, isDark ? 0.4 : 0.74),
    secondaryPastelStrong: blendHex(secondary, blendBase, isDark ? 0.4 : 0.74),
    pageBackground: isDark ? '#0a0a0a' : '#f5f5f7',
    surface: isDark ? '#1c1c1e' : '#ffffff',
    surfaceMuted: isDark ? '#2c2c2e' : '#f2f2f7',
    border: isDark ? '#3a3a3c' : '#e5e5ea',
    textPrimary: isDark ? '#f5f5f7' : '#1d1d1f',
    textSecondary: isDark ? '#a1a1aa' : '#6e6e73',
    shadow: isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(17, 24, 39, 0.08)',
  }
}
