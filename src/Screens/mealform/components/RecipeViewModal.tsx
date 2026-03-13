import type { Meal } from '../../../lib/utils/MealStorage'
import type { MealTheme } from '../theme'

type RecipeViewModalProps = {
  recipe: Meal | null
  onClose: () => void
  theme: MealTheme
}

const RecipeViewModal = ({ recipe, onClose, theme }: RecipeViewModalProps) => {
  if (!recipe) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-white p-8 shadow-2xl"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>{recipe.name}</h3>
          <button 
            type="button" 
            className="text-3xl leading-none" 
            style={{ color: theme.textSecondary }} 
            onClick={onClose}
          >
            {'\u00D7'}
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>Ingredients</h4>
            <div 
              className="rounded-2xl p-6 text-base leading-relaxed"
              style={{ backgroundColor: theme.surfaceMuted, color: theme.textPrimary }}
            >
              <p className="whitespace-pre-wrap">{recipe.ingredients || 'No ingredients listed.'}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>Process</h4>
            <div 
              className="rounded-2xl p-6 text-base leading-relaxed"
              style={{ backgroundColor: theme.surfaceMuted, color: theme.textPrimary }}
            >
              <p className="whitespace-pre-wrap">{recipe.instructions || 'No instructions listed.'}</p>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-2xl py-4 text-base font-bold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: recipe.type === 'lunch' ? theme.primary : theme.secondary }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeViewModal
