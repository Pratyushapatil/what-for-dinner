import AddButton from '../../../lib/components/AddButton'
import { APP_COLORS } from '../../../lib/constants/colors'
import type { WeekSlot } from '../model'

type MealComposerProps = {
  mealName: string
  quickMealType: WeekSlot
  onMealNameChange: (value: string) => void
  onQuickTypeChange: (slot: WeekSlot) => void
  onAdd: (slot: WeekSlot) => void
}

const MealComposer = ({
  mealName,
  quickMealType,
  onMealNameChange,
  onQuickTypeChange,
  onAdd,
}: MealComposerProps) => (
  <div className="mt-4 flex flex-row gap-4">
    <div
      className="mb-2 w-full space-y-4 rounded-3xl border bg-white px-4 py-4 shadow-sm md:basis-1/2"
      style={{ borderColor: APP_COLORS.dropZoneBg }}
    >
      <div className="grid grid-cols-2 rounded-2xl bg-slate-200 p-1">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold text-slate-500"
          onClick={() => onQuickTypeChange('lunch')}
          style={
            quickMealType === 'lunch'
              ? {
                  color: APP_COLORS.lunchAccent,
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.12)',
                }
              : undefined
          }
        >
          <span>Lunch</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold text-slate-500"
          onClick={() => onQuickTypeChange('dinner')}
          style={
            quickMealType === 'dinner'
              ? {
                  color: APP_COLORS.dinnerAccent,
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.12)',
                }
              : undefined
          }
        >
          <span>Dinner</span>
        </button>
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-3 py-2">
        <label htmlFor="meal-name" className="sr-only">
          Meal name
        </label>
        <input
          id="meal-name"
          name="mealName"
          type="text"
          value={mealName}
          onChange={(event) => onMealNameChange(event.target.value)}
          placeholder="e.g. Paneer wrap"
          className="flex-1 bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-400"
        />

        <AddButton
          aria-label={`Add ${quickMealType} meal`}
          className="h-11 w-12 rounded-xl"
          style={{ backgroundColor: APP_COLORS.mealHeaderTitleStart, color: 'white' }}
          onClick={() => onAdd(quickMealType)}
        >
          +
        </AddButton>
      </div>
    </div>
  </div>
)

export default MealComposer
