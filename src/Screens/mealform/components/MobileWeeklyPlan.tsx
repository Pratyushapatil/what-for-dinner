import { APP_COLORS } from '../../../lib/constants/colors'
import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'

type MobileWeeklyPlanProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onAssignToSlot: (day: WeekDay, slot: WeekSlot) => void
  onClear: () => void
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
}: MobileWeeklyPlanProps) => (
  <section className="space-y-4 rounded-3xl bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-slate-900">Weekly Plan</h2>
      <button type="button" className="text-sm font-semibold text-slate-400" onClick={onClear}>
        Clear Week
      </button>
    </div>
    <div className="space-y-5">
      {WEEK_DAYS.map((day, index) => (
        <div key={day} className="flex gap-3">
          <div className="w-16 pt-1">
            <p className="text-xl font-bold text-slate-900">{day.slice(0, 3)}</p>
            <p className="text-xs font-semibold text-slate-400">{getWeekDateLabel(index)}</p>
          </div>
          <div className="flex-1 space-y-2">
            <button
              type="button"
              className="w-full rounded-2xl border border-dashed bg-white px-4 py-3 text-left text-lg font-semibold text-slate-400"
              style={{ borderColor: APP_COLORS.dropZoneBg }}
              onClick={() => onAssignToSlot(day, 'lunch')}
            >
              {weeklyPlan[day]?.lunch
                ? mealNameById.get(weeklyPlan[day].lunch ?? '') ?? 'Add Lunch'
                : '+ Add Lunch'}
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-dashed bg-white px-4 py-3 text-left text-lg font-semibold text-slate-400"
              style={{ borderColor: APP_COLORS.dropZoneBg }}
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
