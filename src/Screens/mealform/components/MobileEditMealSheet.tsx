import type { ChangeEvent } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import { APP_COLORS } from '../../../lib/constants/colors'

type MobileEditMealSheetProps = {
  meal: Meal | null
  value: string
  onChange: (value: string) => void
  onCancel: () => void
  onSave: () => void
}

const MobileEditMealSheet = ({
  meal,
  value,
  onChange,
  onCancel,
  onSave,
}: MobileEditMealSheetProps) => {
  if (!meal) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-2 md:hidden">
      <div className="w-full rounded-t-3xl bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-3xl font-semibold text-slate-800">Edit Meal</h3>
          <button type="button" className="text-3xl text-slate-400" onClick={onCancel}>
            x
          </button>
        </div>
        <div className="space-y-5 border-t border-slate-200 pt-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Meal Name</p>
            <input
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-2xl text-slate-800 outline-none"
              style={{ borderColor: APP_COLORS.mealHeaderTitleStart }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-lg font-semibold text-slate-600"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl px-4 py-3 text-lg font-semibold text-white"
              style={{ backgroundColor: APP_COLORS.mealHeaderTitleStart }}
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
