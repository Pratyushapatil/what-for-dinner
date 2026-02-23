import type { DragEvent } from 'react'
import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'
import type { MealTheme } from '../theme'

type WeeklyPlanTableProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onDragOver: (event: DragEvent<HTMLDivElement>) => void
  onDrop: (event: DragEvent<HTMLDivElement>, day: WeekDay, slot: WeekSlot) => void
  onClear: () => void
  theme: MealTheme
}

const WeeklyPlanTable = ({ weeklyPlan, mealNameById, onDragOver, onDrop, onClear, theme }: WeeklyPlanTableProps) => (
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
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold text-slate-900"
                style={{
                  borderColor: theme.primary,
                  backgroundColor: theme.primaryPastel,
                  color: theme.textPrimary,
                }}
              >
                {mealNameById.get(weeklyPlan[day]?.lunch ?? '')}
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
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold text-slate-900"
                style={{
                  borderColor: theme.secondary,
                  backgroundColor: theme.secondaryPastel,
                  color: theme.textPrimary,
                }}
              >
                {mealNameById.get(weeklyPlan[day]?.dinner ?? '')}
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
