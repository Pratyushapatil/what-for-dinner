import { useState } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import type { WeekSlot } from '../model'
import type { MealTheme } from '../theme'

type MobileMealQueueProps = {
  activeTab: WeekSlot
  meals: Meal[]
  suggestedMeal: Meal | null
  onTabChange: (slot: WeekSlot) => void
  onAssignMeal: (meal: Meal) => void
  onRandom: () => void
  onEditMeal: (meal: Meal) => void
  onDuplicateMeal: (meal: Meal) => void
  onDelete: (mealId: string) => void
  theme: MealTheme
}

const tabClass = (active: boolean) =>
  `pb-2 text-xl font-semibold transition-colors duration-150 ${
    active ? 'border-b-2' : ''
  }`

const MobileMealQueue = ({
  activeTab,
  meals,
  suggestedMeal,
  onTabChange,
  onAssignMeal,
  onRandom,
  onEditMeal,
  onDuplicateMeal,
  onDelete,
  theme,
}: MobileMealQueueProps) => {
  const [openMenuMealId, setOpenMenuMealId] = useState<string | null>(null)

  const closeMenu = () => setOpenMenuMealId(null)

  return (
    <section
      className="space-y-4 rounded-3xl border p-3"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.mode === 'dark' ? '#141519' : theme.surface,
        boxShadow: `0 10px 24px ${theme.shadow}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className={tabClass(activeTab === 'lunch')}
            style={
              activeTab === 'lunch'
                ? {
                    borderColor: theme.primary,
                    color: theme.mode === 'dark' ? '#ffffff' : theme.textPrimary,
                    backgroundColor: theme.mode === 'dark' ? '#0b0b0c' : 'transparent',
                    borderRadius: theme.mode === 'dark' ? 10 : 0,
                    paddingInline: theme.mode === 'dark' ? 10 : 0,
                    paddingTop: theme.mode === 'dark' ? 6 : 0,
                  }
                : {
                    color: theme.textSecondary,
                    borderRadius: theme.mode === 'dark' ? 10 : 0,
                    paddingInline: theme.mode === 'dark' ? 10 : 0,
                    paddingTop: theme.mode === 'dark' ? 6 : 0,
                    border: theme.mode === 'dark' ? '1px solid #3a3a3c' : 'none',
                    backgroundColor: theme.mode === 'dark' ? '#0b0b0c' : 'transparent',
                  }
            }
            onClick={() => onTabChange('lunch')}
          >
            Lunch
          </button>
          <button
            type="button"
            className={tabClass(activeTab === 'dinner')}
            style={
              activeTab === 'dinner'
                ? {
                    borderColor: theme.secondary,
                    color: theme.mode === 'dark' ? '#ffffff' : theme.textPrimary,
                    backgroundColor: theme.mode === 'dark' ? '#0b0b0c' : 'transparent',
                    borderRadius: theme.mode === 'dark' ? 10 : 0,
                    paddingInline: theme.mode === 'dark' ? 10 : 0,
                    paddingTop: theme.mode === 'dark' ? 6 : 0,
                  }
                : {
                    color: theme.textSecondary,
                    borderRadius: theme.mode === 'dark' ? 10 : 0,
                    paddingInline: theme.mode === 'dark' ? 10 : 0,
                    paddingTop: theme.mode === 'dark' ? 6 : 0,
                    border: theme.mode === 'dark' ? '1px solid #3a3a3c' : 'none',
                    backgroundColor: theme.mode === 'dark' ? '#0b0b0c' : 'transparent',
                  }
            }
            onClick={() => onTabChange('dinner')}
          >
            Dinner
          </button>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200"
          onClick={onRandom}
        >
          Random
        </button>
      </div>

      {suggestedMeal ? (
        <div
          className="rounded-xl border px-3 py-2 text-sm font-medium"
          style={{
            borderColor: suggestedMeal.type === 'lunch' ? theme.primary : theme.secondary,
            backgroundColor: suggestedMeal.type === 'lunch' ? theme.primaryPastel : theme.secondaryPastel,
            color: theme.textPrimary,
          }}
        >
          Suggested: {suggestedMeal.name}
        </div>
      ) : null}

      <div
        className="space-y-3 overflow-y-auto pr-1"
        style={{
          maxHeight: meals.length > 5 ? '328px' : 'none',
        }}
      >
        {meals.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-400 shadow-sm">
            No meals in this tab yet.
          </div>
        ) : (
          meals.map((meal) => (
            <div
              key={meal.id}
              className="relative flex min-h-[56px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              style={{
                borderColor: theme.mode === 'dark' ? '#3a3a3c' : theme.border,
                backgroundColor: theme.mode === 'dark' ? '#0b0b0c' : theme.surface,
              }}
            >
              <p className="flex-1 text-sm font-medium" style={{ color: theme.mode === 'dark' ? '#ffffff' : theme.textPrimary }}>{meal.name}</p>
              <button
                type="button"
                className="rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150"
                style={{
                  backgroundColor: meal.type === 'lunch' ? theme.primary : theme.secondary,
                  color: '#ffffff',
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
                className="px-2 text-xl leading-none transition-colors"
                style={{ color: theme.mode === 'dark' ? '#ffffff' : '#94a3b8' }}
                aria-label={`Open actions for ${meal.name}`}
                onClick={() => setOpenMenuMealId((current) => (current === meal.id ? null : meal.id))}
              >
                {'\u22EE'}
              </button>

              {openMenuMealId === meal.id ? (
                <div className="absolute right-3 top-14 z-10 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
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
