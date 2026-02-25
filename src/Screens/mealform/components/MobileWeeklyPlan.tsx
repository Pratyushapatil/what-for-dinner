import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'
import type { Meal } from '../../../lib/utils/MealStorage'
import type { MealTheme } from '../theme'

type MobileWeeklyPlanProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onAssignToSlot: (day: WeekDay, slot: WeekSlot) => void
  onEditMeal: (meal: Meal) => void
  onDeleteMeal: (mealId: string) => void
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
  onEditMeal,
  onDeleteMeal,
  onClear,
  theme,
}: MobileWeeklyPlanProps) => (
  <section
    className="space-y-4 rounded-3xl border bg-white p-4 shadow-sm"
    style={{
      borderColor: theme.border,
      backgroundColor: theme.surface,
      boxShadow: `0 10px 24px ${theme.shadow}`,
    }}
  >
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
        Weekly Plan
      </h2>
      <button
        type="button"
        className="text-sm font-semibold"
        style={{ color: theme.textSecondary }}
        onClick={onClear}
      >
        Clear Week
      </button>
    </div>
    <div className="space-y-5">
      {WEEK_DAYS.map((day, index) => (
        <div key={day} className="flex gap-3">
          <div className="w-16 pt-1">
            <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>
              {day.slice(0, 3)}
            </p>
            <p className="text-xs font-semibold" style={{ color: theme.textSecondary }}>
              {getWeekDateLabel(index)}
            </p>
          </div>
          <div className="flex-1 space-y-2">
            <div className="relative">
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
                  ? (mealNameById.get(weeklyPlan[day].lunch ?? '') ?? 'Add Lunch')
                  : '+ Add Lunch'}
              </button>
              {weeklyPlan[day]?.lunch ? (
                <>
                  <button
                    type="button"
                    aria-label={`Delete ${mealNameById.get(weeklyPlan[day].lunch ?? '') ?? 'meal'}`}
                    className="absolute -right-3 -top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white transition-colors duration-150 hover:bg-slate-50"
                    style={{ borderColor: '#fecaca', color: '#dc2626' }}
                    onClick={() => onDeleteMeal(weeklyPlan[day].lunch ?? '')}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={`Edit ${mealNameById.get(weeklyPlan[day].lunch ?? '') ?? 'meal'}`}
                    className="absolute right-4 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors duration-150 hover:bg-orange-50"
                    style={{ color: theme.primary }}
                    onClick={() => {
                      const mealId = weeklyPlan[day].lunch
                      const mealName = mealNameById.get(mealId ?? '')
                      if (!mealId || !mealName) {
                        return
                      }
                      onEditMeal({ id: mealId, name: mealName, type: 'lunch' })
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
            <div className="relative">
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
                  ? (mealNameById.get(weeklyPlan[day].dinner ?? '') ?? 'Add Dinner')
                  : '+ Add Dinner'}
              </button>
              {weeklyPlan[day]?.dinner ? (
                <>
                  <button
                    type="button"
                    aria-label={`Delete ${mealNameById.get(weeklyPlan[day].dinner ?? '') ?? 'meal'}`}
                    className="absolute -right-3 -top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white transition-colors duration-150 hover:bg-slate-50"
                    style={{ borderColor: '#fecaca', color: '#dc2626' }}
                    onClick={() => onDeleteMeal(weeklyPlan[day].dinner ?? '')}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={`Edit ${mealNameById.get(weeklyPlan[day].dinner ?? '') ?? 'meal'}`}
                    className="absolute right-4 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors duration-150 hover:bg-orange-50"
                    style={{ color: theme.secondary }}
                    onClick={() => {
                      const mealId = weeklyPlan[day].dinner
                      const mealName = mealNameById.get(mealId ?? '')
                      if (!mealId || !mealName) {
                        return
                      }
                      onEditMeal({ id: mealId, name: mealName, type: 'dinner' })
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default MobileWeeklyPlan
