import AddButton from '../../../lib/components/AddButton'
import type { WeekSlot } from '../model'
import type { MealTheme } from '../theme'

type MealComposerProps = {
  mealName: string
  quickMealType: WeekSlot
  onMealNameChange: (value: string) => void
  onQuickTypeChange: (slot: WeekSlot) => void
  onAdd: (slot: WeekSlot) => void
  theme: MealTheme
}

const MealComposer = ({
  mealName,
  quickMealType,
  onMealNameChange,
  onQuickTypeChange,
  onAdd,
  theme,
}: MealComposerProps) => (
  <div className="mt-4 flex flex-row gap-4">
    <div
      className="mb-1 w-full space-y-4 rounded-3xl border bg-white px-4 py-4 md:basis-1/2 md:px-5 md:py-5"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.surface,
        boxShadow: `0 10px 24px ${theme.shadow}`,
      }}
    >
      <h2 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
        Add New Meal
      </h2>
      <div
        className="grid grid-cols-2 rounded-2xl p-1"
        style={{ backgroundColor: theme.surfaceMuted }}
      >
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-150"
          onClick={() => onQuickTypeChange('lunch')}
          style={
            quickMealType === 'lunch'
              ? {
                  color: '#ffffff',
                  backgroundColor: theme.primary,
                  boxShadow: `0 6px 14px ${theme.primarySoft}`,
                }
              : { color: theme.textSecondary }
          }
        >
          <span>Lunch</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-150"
          onClick={() => onQuickTypeChange('dinner')}
          style={
            quickMealType === 'dinner'
              ? {
                  color: '#ffffff',
                  backgroundColor: theme.secondary,
                  boxShadow: `0 6px 14px ${theme.secondarySoft}`,
                }
              : { color: theme.textSecondary }
          }
        >
          <span>Dinner</span>
        </button>
      </div>
      <div
        className="flex items-center gap-2 rounded-2xl border px-3 py-2"
        style={{ borderColor: theme.border, backgroundColor: theme.surfaceMuted }}
      >
        <label htmlFor="meal-name" className="sr-only">
          Meal name
        </label>
        <input
          id="meal-name"
          name="mealName"
          type="text"
          autoComplete="off"
          value={mealName}
          onChange={(event) => onMealNameChange(event.target.value)}
          placeholder="Enter meal name..."
          className="flex-1 bg-transparent text-base outline-none md:text-lg"
          style={{
            color: theme.textPrimary,
            backgroundColor: 'transparent',
            WebkitTextFillColor: theme.textPrimary,
            caretColor: theme.textPrimary,
            colorScheme: theme.mode,
          }}
        />

        <AddButton
          aria-label={`Add ${quickMealType} meal`}
          className="h-11 w-11 rounded-xl transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2"
          style={{
            backgroundColor: quickMealType === 'lunch' ? theme.primary : theme.secondary,
            color: '#ffffff',
            boxShadow: `0 6px 14px ${quickMealType === 'lunch' ? theme.primarySoft : theme.secondarySoft}`,
          }}
          onClick={() => onAdd(quickMealType)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </AddButton>
      </div>
    </div>
  </div>
)

export default MealComposer
