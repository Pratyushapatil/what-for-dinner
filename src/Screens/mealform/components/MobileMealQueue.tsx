import { useState } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import { APP_COLORS } from '../../../lib/constants/colors'
import type { WeekSlot } from '../model'

type MobileMealQueueProps = {
  activeTab: WeekSlot
  meals: Meal[]
  onTabChange: (slot: WeekSlot) => void
  onAssignMeal: (meal: Meal) => void
  onRandom: () => void
  onEditMeal: (meal: Meal) => void
  onDuplicateMeal: (meal: Meal) => void
  onDelete: (mealId: string) => void
}

const tabClass = (active: boolean) =>
  `pb-2 text-3xl font-semibold ${active ? 'border-b-2 text-slate-900' : 'text-slate-400'}`

const MobileMealQueue = ({
  activeTab,
  meals,
  onTabChange,
  onAssignMeal,
  onRandom,
  onEditMeal,
  onDuplicateMeal,
  onDelete,
}: MobileMealQueueProps) => {
  const [openMenuMealId, setOpenMenuMealId] = useState<string | null>(null)

  const closeMenu = () => setOpenMenuMealId(null)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className={tabClass(activeTab === 'lunch')}
            style={activeTab === 'lunch' ? { borderColor: APP_COLORS.lunchAccent } : undefined}
            onClick={() => onTabChange('lunch')}
          >
            Lunch
          </button>
          <button
            type="button"
            className={tabClass(activeTab === 'dinner')}
            style={activeTab === 'dinner' ? { borderColor: APP_COLORS.dinnerAccent } : undefined}
            onClick={() => onTabChange('dinner')}
          >
            Dinner
          </button>
        </div>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500"
          onClick={onRandom}
        >
          Random
        </button>
      </div>

      <div className="space-y-3">
        {meals.length === 0 ? (
          <div className="rounded-2xl bg-white px-4 py-5 text-sm text-slate-400 shadow-sm">
            No meals in this tab yet.
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="relative flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="flex-1 text-lg font-medium text-slate-900">{meal.name}</p>
              <button
                type="button"
                className="rounded-xl px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: APP_COLORS.dinnerSoftBg,
                  color: APP_COLORS.dinnerAccent,
                }}
                onClick={() => {
                  closeMenu()
                  onAssignMeal(meal)
                }}
              >
                Assign
              </button>
              <button
                type="button"
                className="px-2 text-lg text-slate-400"
                aria-label={`Open actions for ${meal.name}`}
                onClick={() => setOpenMenuMealId((current) => (current === meal.id ? null : meal.id))}
              >
                ...
              </button>

              {openMenuMealId === meal.id ? (
                <div className="absolute right-3 top-14 z-10 w-36 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                    onClick={() => {
                      closeMenu()
                      onEditMeal(meal)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                    onClick={() => {
                      closeMenu()
                      onDuplicateMeal(meal)
                    }}
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    onClick={() => {
                      closeMenu()
                      onDelete(meal.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default MobileMealQueue
