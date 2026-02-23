import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'
import type { MealTheme } from '../theme'

type MobileWeeklyPlanProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onAssignToSlot: (day: WeekDay, slot: WeekSlot) => void
  onClear: () => void
  theme: MealTheme
}

const getWeekDateLabel = (dayIndex: number) => {
  const today = new Date()
  const day = today.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)
  const slotDate = new Date(monday)
  slotDate.setDate(monday.getDate() + dayIndex)
  return slotDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const MobileWeeklyPlan = ({
  weeklyPlan,
  mealNameById,
  onAssignToSlot,
  onClear,
  theme,
}: MobileWeeklyPlanProps) => (
  <section className="space-y-4 rounded-3xl border bg-white p-4 shadow-sm" style={{ borderColor: theme.border, backgroundColor: theme.surface, boxShadow: `0 10px 24px ${theme.shadow}` }}>
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Weekly Plan</h2>
      <button type="button" className="text-sm font-semibold" style={{ color: theme.textSecondary }} onClick={onClear}>
        Clear Week
      </button>
    </div>
    <div className="space-y-5">
      {WEEK_DAYS.map((day, index) => (
        <div key={day} className="flex gap-3">
          <div className="w-16 pt-1">
            <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>{day.slice(0, 3)}</p>
            <p className="text-xs font-semibold" style={{ color: theme.textSecondary }}>{getWeekDateLabel(index)}</p>
          </div>
          <div className="flex-1 space-y-2">
            <button
              type="button"
              className="w-full rounded-2xl border border-dashed bg-white px-4 py-3 text-left text-base font-semibold transition-colors hover:bg-slate-50"
              style={{
                borderColor: weeklyPlan[day]?.lunch ? theme.primary : theme.border,
                backgroundColor: weeklyPlan[day]?.lunch ? theme.primaryPastel : theme.surface,
                color: weeklyPlan[day]?.lunch ? theme.textPrimary : theme.textSecondary,
              }}
              onClick={() => onAssignToSlot(day, 'lunch')}
            >
              {weeklyPlan[day]?.lunch
                ? mealNameById.get(weeklyPlan[day].lunch ?? '') ?? 'Add Lunch'
                : '+ Add Lunch'}
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-dashed bg-white px-4 py-3 text-left text-base font-semibold transition-colors hover:bg-slate-50"
              style={{
                borderColor: weeklyPlan[day]?.dinner ? theme.secondary : theme.border,
                backgroundColor: weeklyPlan[day]?.dinner ? theme.secondaryPastel : theme.surface,
                color: weeklyPlan[day]?.dinner ? theme.textPrimary : theme.textSecondary,
              }}
              onClick={() => onAssignToSlot(day, 'dinner')}
            >
              {weeklyPlan[day]?.dinner
                ? mealNameById.get(weeklyPlan[day].dinner ?? '') ?? 'Add Dinner'
                : '+ Add Dinner'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default MobileWeeklyPlan
