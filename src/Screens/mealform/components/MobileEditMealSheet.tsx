import type { ChangeEvent } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import type { MealTheme } from '../theme'

type MobileEditMealSheetProps = {
  meal: Meal | null
  value: string
  onChange: (value: string) => void
  onCancel: () => void
  onSave: () => void
  theme: MealTheme
}

const MobileEditMealSheet = ({
  meal,
  value,
  onChange,
  onCancel,
  onSave,
  theme,
}: MobileEditMealSheetProps) => {
  if (!meal) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-2 md:hidden">
      <div className="w-full rounded-t-3xl border bg-white p-4 shadow-2xl" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-2xl font-semibold" style={{ color: theme.textPrimary }}>Edit Meal</h3>
          <button type="button" className="text-3xl leading-none" style={{ color: theme.textSecondary }} onClick={onCancel}>
            {'\u00D7'}
          </button>
        </div>
        <div className="space-y-5 border-t pt-4" style={{ borderColor: theme.border }}>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Meal Name</p>
            <input
              autoComplete="off"
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
              className="w-full rounded-2xl border px-4 py-3 text-base outline-none"
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
                backgroundColor: theme.surfaceMuted,
                WebkitTextFillColor: theme.textPrimary,
                caretColor: theme.textPrimary,
                colorScheme: theme.mode,
              }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border px-4 py-3 text-base font-semibold"
              style={{ borderColor: theme.border, color: theme.textSecondary }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl px-4 py-3 text-base font-semibold text-white"
              style={{ backgroundColor: theme.primary }}
              onClick={onSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileEditMealSheet
