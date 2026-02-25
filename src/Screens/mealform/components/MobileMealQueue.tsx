import type { Meal } from '../../../lib/utils/MealStorage'
import type { WeekSlot } from '../model'
import type { MealTheme } from '../theme'

type MobileMealQueueProps = {
  activeTab: WeekSlot
  meals: Meal[]
  suggestedMeal: Meal | null
  onTabChange: (slot: WeekSlot) => void
  onAssignMeal: (meal: Meal) => void
  onEditMeal: (meal: Meal) => void
  onDeleteMeal: (mealId: string) => void
  onRandom: () => void
  theme: MealTheme
}

const tabClass = (active: boolean) =>
  `pb-2 text-xl font-semibold transition-colors duration-150 ${active ? 'border-b-2' : ''}`

const MobileMealQueue = ({
  activeTab,
  meals,
  suggestedMeal,
  onTabChange,
  onAssignMeal,
  onEditMeal,
  onDeleteMeal,
  onRandom,
  theme,
}: MobileMealQueueProps) => {
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
            backgroundColor:
              suggestedMeal.type === 'lunch' ? theme.primaryPastel : theme.secondaryPastel,
            color: theme.textPrimary,
          }}
        >
          Suggested: {suggestedMeal.name}
        </div>
      ) : null}

      <div
        className="space-y-3 overflow-y-auto overflow-x-visible pr-1"
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
              <p
                className="flex-1 text-sm font-medium"
                style={{ color: theme.mode === 'dark' ? '#ffffff' : theme.textPrimary }}
              >
                {meal.name}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl px-4 py-1.5 text-sm font-semibold transition-all duration-150"
                  style={{
                    backgroundColor: activeTab === 'lunch' ? theme.primary : theme.secondary,
                    color: '#ffffff',
                  }}
                  onClick={() => onAssignMeal(meal)}
                >
                  Assign
                </button>
                <button
                  type="button"
                  aria-label={`Edit ${meal.name}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-slate-100"
                  style={{ color: theme.mode === 'dark' ? '#e5e7eb' : '#111827' }}
                  onClick={() => onEditMeal(meal)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
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
                <button
                  type="button"
                  aria-label={`Delete ${meal.name}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-red-50"
                  style={{ color: '#dc2626' }}
                  onClick={() => onDeleteMeal(meal.id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
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
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default MobileMealQueue
