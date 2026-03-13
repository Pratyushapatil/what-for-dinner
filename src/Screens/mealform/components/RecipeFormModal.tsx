import { useState } from 'react'
import type { WeekSlot } from '../model'
import type { MealTheme } from '../theme'

type RecipeFormModalProps = {
  open: boolean
  onClose: () => void
  onSave: (recipe: { name: string; type: WeekSlot; ingredients: string; instructions: string }) => void
  theme: MealTheme
}

const RecipeFormModal = ({ open, onClose, onSave, theme }: RecipeFormModalProps) => {
  const [name, setName] = useState('')
  const [type, setType] = useState<WeekSlot>('lunch')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  if (!open) return null

  const handleSave = () => {
    if (!name.trim()) return
    onSave({ name, type, ingredients, instructions })
    setName('')
    setIngredients('')
    setInstructions('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-white p-6 shadow-2xl"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>New Recipe</h3>
          <button 
            type="button" 
            className="text-3xl leading-none" 
            style={{ color: theme.textSecondary }} 
            onClick={onClose}
          >
            {'\u00D7'}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Recipe Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grandma's Pasta"
              className="w-full rounded-2xl border px-4 py-3 text-base outline-none"
              style={{ borderColor: theme.border, color: theme.textPrimary, backgroundColor: theme.surfaceMuted }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Meal Type</label>
            <div className="grid grid-cols-2 gap-2 rounded-2xl p-1" style={{ backgroundColor: theme.surfaceMuted }}>
              <button
                type="button"
                className={`rounded-xl py-2 text-sm font-semibold transition-all ${type === 'lunch' ? 'shadow-sm' : ''}`}
                style={type === 'lunch' ? { backgroundColor: theme.primary, color: '#fff' } : { color: theme.textSecondary }}
                onClick={() => setType('lunch')}
              >
                Lunch
              </button>
              <button
                type="button"
                className={`rounded-xl py-2 text-sm font-semibold transition-all ${type === 'dinner' ? 'shadow-sm' : ''}`}
                style={type === 'dinner' ? { backgroundColor: theme.secondary, color: '#fff' } : { color: theme.textSecondary }}
                onClick={() => setType('dinner')}
              >
                Dinner
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Ingredients</label>
            <textarea
              rows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List items separated by commas or lines..."
              className="w-full rounded-2xl border px-4 py-3 text-base outline-none"
              style={{ borderColor: theme.border, color: theme.textPrimary, backgroundColor: theme.surfaceMuted }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Process / Instructions</label>
            <textarea
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="How to cook it..."
              className="w-full rounded-2xl border px-4 py-3 text-base outline-none"
              style={{ borderColor: theme.border, color: theme.textPrimary, backgroundColor: theme.surfaceMuted }}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border py-4 text-base font-bold transition-colors"
              style={{ borderColor: theme.border, color: theme.textSecondary }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl py-4 text-base font-bold text-white transition-all hover:scale-[1.02]"
              style={{ backgroundColor: theme.primary }}
              onClick={handleSave}
            >
              Save Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeFormModal
