import type { Meal } from '../../../lib/utils/MealStorage'
import { APP_COLORS } from '../../../lib/constants/colors'
import { WEEK_DAYS, type WeekDay, type WeekSlot } from '../model'

type MobileAssignSheetProps = {
  meal: Meal | null
  selectedDay: WeekDay
  selectedType: WeekSlot
  onDayChange: (day: WeekDay) => void
  onTypeChange: (slot: WeekSlot) => void
  onCancel: () => void
  onAssign: () => void
}

const isSlotAllowed = (meal: Meal, slot: WeekSlot) => meal.type === slot

const MobileAssignSheet = ({
  meal,
  selectedDay,
  selectedType,
  onDayChange,
  onTypeChange,
  onCancel,
  onAssign,
}: MobileAssignSheetProps) => {
  if (!meal) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-2 md:hidden">
      <div className="w-full rounded-t-3xl bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-3xl font-semibold text-slate-800">Assign '{meal.name}'</h3>
          <button type="button" className="text-3xl text-slate-400" onClick={onCancel}>
            x
          </button>
        </div>
        <div className="space-y-5 border-t border-slate-200 pt-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Choose Day</p>
            <div className="flex flex-wrap gap-2">
              {WEEK_DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  className="min-w-[52px] rounded-xl bg-slate-100 px-3 py-2 text-lg font-semibold text-slate-500"
                  style={
                    day === selectedDay ? { backgroundColor: APP_COLORS.mealHeaderBg, color: 'white' } : undefined
                  }
                  onClick={() => onDayChange(day)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Meal Type</p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
              {(['lunch', 'dinner'] as const).map((slot) => {
                const allowed = isSlotAllowed(meal, slot)
                const selected = slot === selectedType
                return (
                  <button
                    key={slot}
                    type="button"
                    className="rounded-xl px-3 py-3 text-lg font-semibold capitalize"
                    style={
                      selected
                        ? { backgroundColor: 'white', color: APP_COLORS.mealHeaderTitleStart }
                        : { opacity: allowed ? 1 : 0.4 }
                    }
                    onClick={() => {
                      if (allowed) {
                        onTypeChange(slot)
                      }
                    }}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
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
              onClick={onAssign}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAssignSheet
