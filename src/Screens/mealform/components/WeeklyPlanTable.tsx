import type { DragEvent } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'
import type { MealTheme } from '../theme'

type WeeklyPlanTableProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onDragOver: (event: DragEvent<HTMLDivElement>) => void
  onDrop: (event: DragEvent<HTMLDivElement>, day: WeekDay, slot: WeekSlot) => void
  onEditMeal: (meal: Meal) => void
  onDeleteMeal: (mealId: string) => void
  onClear: () => void
  theme: MealTheme
}

const WeeklyPlanTable = ({
  weeklyPlan,
  mealNameById,
  onDragOver,
  onDrop,
  onEditMeal,
  onDeleteMeal,
  onClear,
  theme,
}: WeeklyPlanTableProps) => (
  <div
    className="rounded-2xl border bg-white p-4 md:basis-1/2"
    style={{ borderColor: theme.border, boxShadow: `0 10px 24px ${theme.shadow}`, backgroundColor: theme.surface }}
  >
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
        Weekly Timetable
      </h2>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-150 hover:bg-slate-100"
        style={{ borderColor: theme.border, color: theme.textSecondary, backgroundColor: theme.surfaceMuted }}
      >
        Clear plan
      </button>
    </div>
    <div className="mt-4 flex flex-col overflow-hidden rounded-xl border" style={{ borderColor: theme.border }}>
      <div className="flex" style={{ backgroundColor: theme.surfaceMuted }}>
        <div className="basis-1/3 border-r border-b p-3 text-sm font-semibold" style={{ borderColor: theme.border, color: theme.textSecondary }}>Day</div>
        <div
          className="basis-1/3 border-r border-b p-3 text-sm font-semibold"
          style={{ borderColor: theme.border, color: theme.textSecondary, backgroundColor: theme.primaryPastelStrong }}
        >
          Lunch
        </div>
        <div
          className="basis-1/3 border-b p-3 text-sm font-semibold"
          style={{
            backgroundColor: theme.secondaryPastelStrong,
            borderColor: theme.border,
            color: theme.textSecondary,
          }}
        >
          Dinner
        </div>
      </div>
      {WEEK_DAYS.map((day) => (
        <div key={day} className="flex min-h-[64px]">
          <div className="basis-1/3 border-r border-b p-3 text-sm font-medium" style={{ borderColor: theme.border, color: theme.textSecondary }}>
            {day}
          </div>
          <div
            onDragOver={onDragOver}
              onDrop={(event) => onDrop(event, day, 'lunch')}
              className="basis-1/3 border-r border-b p-3 text-sm"
              style={{ borderColor: theme.border }}
            >
              {weeklyPlan[day]?.lunch ? (
                <div
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold text-slate-900"
                  style={{
                    borderColor: theme.primary,
                    backgroundColor: theme.primaryPastel,
                    color: theme.textPrimary,
                  }}
                >
                  <span className="flex-1">{mealNameById.get(weeklyPlan[day]?.lunch ?? '')}</span>
                  <button
                    type="button"
                    aria-label={`Edit ${mealNameById.get(weeklyPlan[day]?.lunch ?? '') ?? 'meal'}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150 hover:bg-orange-50"
                    style={{ color: '#f59e0b' }}
                    onClick={() => {
                      const mealId = weeklyPlan[day]?.lunch
                      const mealName = mealNameById.get(mealId ?? '')
                      if (!mealId || !mealName) {
                        return
                      }
                      onEditMeal({ id: mealId, name: mealName, type: 'lunch' })
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${mealNameById.get(weeklyPlan[day]?.lunch ?? '') ?? 'meal'}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150 hover:bg-red-50"
                    style={{ color: '#dc2626' }}
                    onClick={() => onDeleteMeal(weeklyPlan[day]?.lunch ?? '')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm text-slate-400"
                  style={{ backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}
              >
                Drop here
              </div>
            )}
          </div>
          <div
            onDragOver={onDragOver}
              onDrop={(event) => onDrop(event, day, 'dinner')}
              className="basis-1/3 border-b p-3 text-sm"
              style={{ borderColor: theme.border }}
            >
              {weeklyPlan[day]?.dinner ? (
                <div
                  className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold text-slate-900"
                  style={{
                    borderColor: theme.secondary,
                    backgroundColor: theme.secondaryPastel,
                    color: theme.textPrimary,
                  }}
                >
                  <span className="flex-1">{mealNameById.get(weeklyPlan[day]?.dinner ?? '')}</span>
                  <button
                    type="button"
                    aria-label={`Edit ${mealNameById.get(weeklyPlan[day]?.dinner ?? '') ?? 'meal'}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150 hover:bg-orange-50"
                    style={{ color: '#f59e0b' }}
                    onClick={() => {
                      const mealId = weeklyPlan[day]?.dinner
                      const mealName = mealNameById.get(mealId ?? '')
                      if (!mealId || !mealName) {
                        return
                      }
                      onEditMeal({ id: mealId, name: mealName, type: 'dinner' })
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${mealNameById.get(weeklyPlan[day]?.dinner ?? '') ?? 'meal'}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150 hover:bg-red-50"
                    style={{ color: '#dc2626' }}
                    onClick={() => onDeleteMeal(weeklyPlan[day]?.dinner ?? '')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm text-slate-400"
                  style={{ backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}
              >
                Drop here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default WeeklyPlanTable
