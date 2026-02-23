import { useState } from 'react'
import type { ThemeMode, ThemePreset, ThemePresetId } from '../theme'

type ThemeSettingsPanelProps = {
  open: boolean
  initialMode: ThemeMode
  presets: ThemePreset[]
  initialPreset: ThemePresetId
  initialPrimary: string
  initialSecondary: string
  onClose: () => void
  onSave: (next: {
    mode: ThemeMode
    presetId: ThemePresetId
    primary: string
    secondary: string
  }) => void
}

const ThemeSettingsPanel = ({
  open,
  initialMode,
  presets,
  initialPreset,
  initialPrimary,
  initialSecondary,
  onClose,
  onSave,
}: ThemeSettingsPanelProps) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode)
  const [selectedPreset, setSelectedPreset] = useState<ThemePresetId>(initialPreset)
  const [primary, setPrimary] = useState(initialPrimary)
  const [secondary, setSecondary] = useState(initialSecondary)

  const isDirty =
    mode !== initialMode ||
    selectedPreset !== initialPreset ||
    primary.toLowerCase() !== initialPrimary.toLowerCase() ||
    secondary.toLowerCase() !== initialSecondary.toLowerCase()

  const handlePresetChange = (presetId: ThemePresetId) => {
    setSelectedPreset(presetId)
    const preset = presets.find((item) => item.id === presetId)
    if (!preset) {
      return
    }
    setPrimary(preset.primary)
    setSecondary(preset.secondary)
  }

  const handleSave = () => {
    onSave({ mode, presetId: selectedPreset, primary, secondary })
    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 p-3">
      <div className="mx-auto mt-8 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Appearance</h3>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close appearance settings"
          >
            {'\u00D7'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Mode</p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                className={`rounded-xl px-3 py-2 text-sm font-medium ${mode === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setMode('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={`rounded-xl px-3 py-2 text-sm font-medium ${mode === 'dark' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setMode('dark')}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Theme Presets</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`rounded-2xl border p-2 text-left transition-colors ${selectedPreset === preset.id ? 'border-slate-700 ring-1 ring-slate-700/20' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => handlePresetChange(preset.id)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-slate-700">{preset.name}</p>
                    {selectedPreset === preset.id ? (
                      <span className="text-xs font-semibold text-emerald-600">✓</span>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSave}
              disabled={!isDirty}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSettingsPanel
