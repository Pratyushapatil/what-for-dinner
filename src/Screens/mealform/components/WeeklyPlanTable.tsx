import type { DragEvent } from 'react'
import { APP_COLORS } from '../../../lib/constants/colors'
import { WEEK_DAYS, type WeekDay, type WeekSlot, type WeeklyPlan } from '../model'

type WeeklyPlanTableProps = {
  weeklyPlan: WeeklyPlan
  mealNameById: Map<string, string>
  onDragOver: (event: DragEvent<HTMLDivElement>) => void
  onDrop: (event: DragEvent<HTMLDivElement>, day: WeekDay, slot: WeekSlot) => void
  onClear: () => void
}

const WeeklyPlanTable = ({ weeklyPlan, mealNameById, onDragOver, onDrop, onClear }: WeeklyPlanTableProps) => (
  <div className="rounded-md p-3 shadow-sm md:basis-1/2">
    <div className="flex items-center justify-between px-2">
      <h2 className="px-2 text-lg font-semibold">Weekly Timetable</h2>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center rounded-full border bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Clear plan
      </button>
    </div>
    <div className="mt-3 flex flex-col overflow-hidden rounded-md border border-gray-200">
      <div className="flex bg-gray-50">
        <div className="basis-1/3 border-r border-b border-gray-200 p-3 text-sm font-semibold">Day</div>
        <div
          className="basis-1/3 border-r border-b border-gray-200 p-3 text-sm font-semibold"
          style={{ backgroundColor: APP_COLORS.lunchSoftBg }}
        >
          Lunch
        </div>
        <div
          className="basis-1/3 border-b border-gray-200 p-3 text-sm font-semibold"
          style={{ backgroundColor: APP_COLORS.dinnerSoftBg }}
        >
          Dinner
        </div>
      </div>
      {WEEK_DAYS.map((day) => (
        <div key={day} className="flex min-h-[64px]">
          <div className="basis-1/3 border-r border-b border-gray-200 p-3 text-sm font-medium text-gray-700">
            {day}
          </div>
          <div
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, day, 'lunch')}
            className="basis-1/3 border-r border-b border-gray-200 p-3 text-sm"
          >
            {weeklyPlan[day]?.lunch ? (
              <div
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold text-black"
                style={{
                  borderColor: APP_COLORS.lunchAccent,
                  backgroundColor: APP_COLORS.lunchSoftBg,
                }}
              >
                {mealNameById.get(weeklyPlan[day]?.lunch ?? '')}
              </div>
            ) : (
              <div
                className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm text-gray-400"
                style={{ backgroundColor: APP_COLORS.dropZoneBg }}
              >
                Drop here
              </div>
            )}
          </div>
          <div
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, day, 'dinner')}
            className="basis-1/3 border-b border-gray-200 p-3 text-sm"
          >
            {weeklyPlan[day]?.dinner ? (
              <div
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold text-black"
                style={{
                  borderColor: APP_COLORS.dinnerBorder,
                  backgroundColor: APP_COLORS.dinnerSoftCardBg,
                }}
              >
                {mealNameById.get(weeklyPlan[day]?.dinner ?? '')}
              </div>
            ) : (
              <div
                className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm text-gray-400"
                style={{ backgroundColor: APP_COLORS.dropZoneBg }}
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
