import AddButton from '../../../lib/components/AddButton'
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
  <div className="mt-8 flex flex-row gap-4">
    <div className="mb-2 flex flex-center gap-4 rounded-md border border-gray-100 px-4 py-2 shadow-sm md:basis-1/2 md:flex-col md:justify-center">
      <h2 className="px-4 text-lg font-semibold">Add New Meals</h2>
      <div className="mb-2 flex flex-row gap-4">
        <button
          type="button"
          className={`flex min-w-[160px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm ${
            quickMealType === 'lunch'
              ? 'bg-gradient-to-r from-[#6eee87] to-[#5fc52e] text-white'
              : 'bg-transparent text-gray-500'
          }`}
          onClick={() => onQuickTypeChange('lunch')}
        >
          <span>Lunch</span>
        </button>
        <button
          type="button"
          className={`flex min-w-[160px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm ${
            quickMealType === 'dinner'
              ? 'border border-[#32c4c0] bg-gradient-to-r from-[#8de9d5] to-[#32c4c0] text-white'
              : 'bg-transparent text-gray-500'
          }`}
          onClick={() => onQuickTypeChange('dinner')}
        >
          <span>Dinner</span>
        </button>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <label htmlFor="meal-name" className="sr-only">
          Meal name
        </label>
        <input
          id="meal-name"
          name="mealName"
          type="text"
          value={mealName}
          onChange={(event) => onMealNameChange(event.target.value)}
          placeholder="Enter meal name..."
          className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />

        <AddButton aria-label={`Add ${quickMealType} meal`} onClick={() => onAdd(quickMealType)}>
          +
        </AddButton>
      </div>
    </div>
  </div>
)

export default MealComposer
