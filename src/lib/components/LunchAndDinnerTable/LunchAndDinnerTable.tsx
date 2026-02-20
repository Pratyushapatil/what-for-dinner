import DeleteButton from '../DeleteButton'

type MealRow = {
  id: string
  name: string
}

type SharedTableProps = {
  title: string
  emptyMessage: string
  meals: MealRow[]
  onDelete: (id: string) => void
}

type VariantProps = {
  meals: MealRow[]
  onDelete: (id: string) => void
}

const MealsTableBase = ({ title, emptyMessage, meals, onDelete }: SharedTableProps) => (
  <div className="rounded-2xl bg-white shadow-md">
    <div className="px-4 py-3 font-semibold text-gray-700">{title}</div>
    <div>
      {meals.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-600">{emptyMessage}</div>
      ) : (
        meals.map((meal) => (
          <div key={meal.id} className="flex items-center justify-between gap-3 px-4 py-2">
            <span>{meal.name}</span>
            <DeleteButton aria-label={`Delete ${meal.name}`} onClick={() => onDelete(meal.id)}>
              X
            </DeleteButton>
          </div>
        ))
      )}
    </div>
  </div>
)

export const LunchMealsTable = ({ meals, onDelete }: VariantProps) => (
  <MealsTableBase
    title="Lunch"
    emptyMessage="No lunch meals yet."
    meals={meals}
    onDelete={onDelete}
  />
)

export const DinnerMealsTable = ({ meals, onDelete }: VariantProps) => (
  <MealsTableBase
    title="Dinner"
    emptyMessage="No dinner meals yet."
    meals={meals}
    onDelete={onDelete}
  />
)
