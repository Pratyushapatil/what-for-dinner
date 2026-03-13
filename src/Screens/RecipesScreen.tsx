import { useMemo, useState } from 'react'
import RecipeSection from './mealform/components/RecipeSection'
import RecipeFormModal from './mealform/components/RecipeFormModal'
import RecipeViewModal from './mealform/components/RecipeViewModal'
import PlannerHeader from './mealform/components/PlannerHeader'
import ThemeSettingsPanel from './mealform/components/ThemeSettingsPanel'
import useMealPlannerState from './mealform/hooks/useMealPlannerState'
import { buildMealTheme, THEME_PRESETS, type ThemeMode, type ThemePresetId } from './mealform/theme'

type RecipesScreenProps = {
  onNavigate: (screen: 'planner' | 'recipes') => void
}

const RecipesScreen = ({ onNavigate }: RecipesScreenProps) => {
  const {
    lunchMeals,
    dinnerMeals,
    addRecipe,
  } = useMealPlannerState()

  const [recipeFormOpen, setRecipeFormOpen] = useState(false)
  const [viewingRecipe, setViewingRecipe] = useState<any>(null)
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  
  const [mode, setMode] = useState<ThemeMode>('light')
  const [presetId, setPresetId] = useState<ThemePresetId>('classic')
  const selectedPreset = THEME_PRESETS.find((preset) => preset.id === presetId) ?? THEME_PRESETS[0]
  const [primaryColor, setPrimaryColor] = useState(selectedPreset.primary)
  const [secondaryColor, setSecondaryColor] = useState(selectedPreset.secondary)
  
  const theme = useMemo(
    () => buildMealTheme(mode, primaryColor, secondaryColor),
    [mode, primaryColor, secondaryColor],
  )

  return (
    <div
      className="min-h-screen px-3 py-4 text-black sm:px-4 md:px-0"
      style={{ backgroundColor: theme.pageBackground }}
    >
      <div className="mx-auto max-w-8xl rounded-[32px] p-3 md:rounded-3xl md:p-4">
        <PlannerHeader 
          theme={theme} 
          onOpenAppearance={() => setAppearanceOpen(true)} 
          onGoHome={() => onNavigate('planner')}
          onGoRecipes={() => {}} // Already here
        />
        
        <div className="mt-8">
          <RecipeSection
            lunchMeals={lunchMeals}
            dinnerMeals={dinnerMeals}
            onNewRecipe={() => setRecipeFormOpen(true)}
            onViewRecipe={setViewingRecipe}
            theme={theme}
          />
        </div>

        <RecipeFormModal
          open={recipeFormOpen}
          onClose={() => setRecipeFormOpen(false)}
          onSave={(recipe) => {
            void addRecipe(recipe.name, recipe.type, recipe.ingredients, recipe.instructions)
          }}
          theme={theme}
        />
        <RecipeViewModal
          recipe={viewingRecipe}
          onClose={() => setViewingRecipe(null)}
          theme={theme}
        />
        <ThemeSettingsPanel
          key={`${appearanceOpen ? 'open' : 'closed'}-${mode}-${presetId}-${primaryColor}-${secondaryColor}`}
          open={appearanceOpen}
          initialMode={mode}
          presets={THEME_PRESETS}
          initialPreset={presetId}
          initialPrimary={primaryColor}
          initialSecondary={secondaryColor}
          onClose={() => setAppearanceOpen(false)}
          onSave={({ mode: nextMode, presetId: nextPresetId, primary, secondary }) => {
            setMode(nextMode)
            setPresetId(nextPresetId)
            setPrimaryColor(primary)
            setSecondaryColor(secondary)
          }}
        />
      </div>
    </div>
  )
}

export default RecipesScreen
