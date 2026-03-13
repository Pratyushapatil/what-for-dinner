import type { Meal } from '../../../lib/utils/MealStorage'
import type { MealTheme } from '../theme'

type RecipeCardProps = {
  meal: Meal
  onView: (meal: Meal) => void
  theme: MealTheme
}

const RecipeCard = ({ meal, onView, theme }: RecipeCardProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.surface,
      }}
    >
      <h3
        className="mb-4 text-lg font-bold line-clamp-1"
        style={{ color: theme.textPrimary }}
      >
        {meal.name}
      </h3>
      <button
        type="button"
        onClick={() => onView(meal)}
        className="mt-auto w-full rounded-xl py-2 text-sm font-semibold transition-colors"
        style={{
          backgroundColor: meal.type === 'lunch' ? theme.primary : theme.secondary,
          color: '#ffffff',
        }}
      >
        View Recipe
      </button>
    </div>
  )
}

export default RecipeCard
