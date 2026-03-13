import type { Meal } from '../../../lib/utils/MealStorage'
import type { MealTheme } from '../theme'
import RecipeCard from './RecipeCard'

type RecipeSectionProps = {
  lunchMeals: Meal[]
  dinnerMeals: Meal[]
  onNewRecipe: () => void
  onViewRecipe: (meal: Meal) => void
  theme: MealTheme
}

const RecipeSection = ({
  lunchMeals,
  dinnerMeals,
  onNewRecipe,
  onViewRecipe,
  theme,
}: RecipeSectionProps) => {
  const hasMeals = lunchMeals.length > 0 || dinnerMeals.length > 0

  return (
    <section className="mt-8 space-y-10" id="recipes-section">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
          Recipe Gallery
        </h2>
        <button
          type="button"
          onClick={onNewRecipe}
          className="rounded-xl px-6 py-3 text-base font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ backgroundColor: theme.primary }}
        >
          + New Recipe
        </button>
      </div>

      {!hasMeals ? (
        <div 
          className="rounded-3xl border border-dashed p-12 text-center"
          style={{ borderColor: theme.border, backgroundColor: theme.surfaceMuted }}
        >
          <p className="text-lg font-medium" style={{ color: theme.textSecondary }}>
            No recipes added yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Lunch Section */}
          {lunchMeals.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full" style={{ backgroundColor: theme.primary }} />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Lunch Recipes
                </h3>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: theme.primaryPastel, color: theme.primary }}>
                  {lunchMeals.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {lunchMeals.map((meal) => (
                  <RecipeCard 
                    key={meal.id} 
                    meal={meal} 
                    onView={onViewRecipe} 
                    theme={theme} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Dinner Section */}
          {dinnerMeals.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full" style={{ backgroundColor: theme.secondary }} />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dinner Recipes
                </h3>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: theme.secondaryPastel, color: theme.secondary }}>
                  {dinnerMeals.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dinnerMeals.map((meal) => (
                  <RecipeCard 
                    key={meal.id} 
                    meal={meal} 
                    onView={onViewRecipe} 
                    theme={theme} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default RecipeSection
