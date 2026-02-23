import type { Meal } from '../../../lib/utils/MealStorage'
import { WEEK_DAYS, type WeekDay, type WeekSlot } from '../model'
import type { MealTheme } from '../theme'

type MobileAssignSheetProps = {
  meal: Meal | null
  selectedDay: WeekDay
  selectedType: WeekSlot
  onDayChange: (day: WeekDay) => void
  onTypeChange: (slot: WeekSlot) => void
  onCancel: () => void
  onAssign: () => void
  theme: MealTheme
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
  theme,
}: MobileAssignSheetProps) => {
  if (!meal) {
    return null
  }
  const accentColor = selectedType === 'lunch' ? theme.primary : theme.secondary

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-2 md:hidden">
      <div className="w-full rounded-t-3xl border bg-white p-4 shadow-2xl" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-2xl font-semibold" style={{ color: theme.textPrimary }}>Assign '{meal.name}'</h3>
          <button type="button" className="text-3xl leading-none" style={{ color: theme.textSecondary }} onClick={onCancel}>
            {'\u00D7'}
          </button>
        </div>
        <div className="space-y-5 border-t pt-4" style={{ borderColor: theme.border }}>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Choose Day</p>
            <div className="flex flex-wrap gap-2">
              {WEEK_DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  className="min-w-[52px] rounded-xl px-3 py-2 text-sm font-semibold"
                  style={
                    day === selectedDay
                      ? { backgroundColor: accentColor, color: 'white' }
                      : { backgroundColor: theme.surfaceMuted, color: theme.textSecondary }
                  }
                  onClick={() => onDayChange(day)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Meal Type</p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl p-1" style={{ backgroundColor: theme.surfaceMuted }}>
              {(['lunch', 'dinner'] as const).map((slot) => {
                const allowed = isSlotAllowed(meal, slot)
                const selected = slot === selectedType
                return (
                  <button
                    key={slot}
                    type="button"
                    className="rounded-xl px-3 py-3 text-base font-semibold capitalize"
                    style={
                      selected
                        ? { backgroundColor: theme.surface, color: theme.textPrimary }
                        : { opacity: allowed ? 1 : 0.4, color: theme.textSecondary }
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
              className="flex-1 rounded-2xl border px-4 py-3 text-base font-semibold"
              style={{ borderColor: theme.border, color: theme.textSecondary }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl px-4 py-3 text-base font-semibold text-white"
              style={{ backgroundColor: accentColor }}
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
