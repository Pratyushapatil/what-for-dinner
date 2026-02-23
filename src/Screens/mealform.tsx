import { useMemo, useState } from 'react'
import MealComposer from './mealform/components/MealComposer'
import MobileAssignSheet from './mealform/components/MobileAssignSheet'
import MobileMealQueue from './mealform/components/MobileMealQueue'
import MobileWeeklyPlan from './mealform/components/MobileWeeklyPlan'
import MealListCard from './mealform/components/MealListCard'
import PlannerHeader from './mealform/components/PlannerHeader'
import ThemeSettingsPanel from './mealform/components/ThemeSettingsPanel'
import WeeklyPlanTable from './mealform/components/WeeklyPlanTable'
import useMealPlannerState from './mealform/hooks/useMealPlannerState'
import type { WeekDay, WeekSlot } from './mealform/model'
import type { Meal } from '../lib/utils/MealStorage'
import {
  buildMealTheme,
  THEME_PRESETS,
  type ThemeMode,
  type ThemePresetId,
} from './mealform/theme'

const MealForm = () => {
  const {
    mealName,
    setMealName,
    quickMealType,
    setQuickMealType,
    lunchMeals,
    dinnerMeals,
    mealNameById,
    weeklyPlan,
    addMeal,
    handleSubmit,
    handleDelete,
    handleMealDragStart,
    handleDragOverCell,
    handleDropInCell,
    assignMealToSlot,
    handleClearPlan,
  } = useMealPlannerState()
  const [mobileTab, setMobileTab] = useState<WeekSlot>('lunch')
  const [assigningMeal, setAssigningMeal] = useState<Meal | null>(null)
  const [assignDay, setAssignDay] = useState<WeekDay>('Monday')
  const [assignType, setAssignType] = useState<WeekSlot>('lunch')
  const [suggestedMeal, setSuggestedMeal] = useState<Meal | null>(null)
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

  const mobileMeals = useMemo(
    () => (mobileTab === 'lunch' ? lunchMeals : dinnerMeals),
    [mobileTab, lunchMeals, dinnerMeals],
  )

  const handleAssignMobileSlot = (day: WeekDay, slot: WeekSlot) => {
    if (!assigningMeal) {
      return
    }
    assignMealToSlot(day, slot, assigningMeal.id)
  }

  const handleRandomMobile = () => {
    if (mobileMeals.length === 0) {
      setSuggestedMeal(null)
      return
    }
    const next = mobileMeals[Math.floor(Math.random() * mobileMeals.length)]
    setSuggestedMeal(next)
    setAssigningMeal(next)
    setAssignType(next.type)
  }

  const openAssignSheet = (meal: Meal) => {
    setAssigningMeal(meal)
    setAssignType(meal.type)
  }

  const closeAssignSheet = () => {
    setAssigningMeal(null)
  }

  const confirmAssignSheet = () => {
    if (!assigningMeal) {
      return
    }
    assignMealToSlot(assignDay, assignType, assigningMeal.id)
    closeAssignSheet()
  }

  return (
    <div
      className="min-h-screen px-3 py-4 text-black sm:px-4 md:px-0"
      style={{ backgroundColor: theme.pageBackground }}
    >
      <div
        className="mx-auto max-w-5xl rounded-[32px] border p-3 md:rounded-3xl md:p-4"
        style={{ borderColor: theme.border, backgroundColor: theme.surfaceMuted }}
      >
        <PlannerHeader theme={theme} onOpenAppearance={() => setAppearanceOpen(true)} />
        <form onSubmit={handleSubmit}>
          <MealComposer
            mealName={mealName}
            quickMealType={quickMealType}
            onMealNameChange={setMealName}
            onQuickTypeChange={setQuickMealType}
            onAdd={addMeal}
            theme={theme}
          />

          <div className="mt-6 space-y-6 md:hidden">
            <MobileMealQueue
              activeTab={mobileTab}
              meals={mobileMeals}
              suggestedMeal={suggestedMeal}
              onTabChange={setMobileTab}
              onAssignMeal={openAssignSheet}
              onRandom={handleRandomMobile}
              theme={theme}
            />
            <MobileWeeklyPlan
              weeklyPlan={weeklyPlan}
              mealNameById={mealNameById}
              onAssignToSlot={(day, slot) => {
                setAssignDay(day)
                setAssignType(slot)
                if (!assigningMeal) {
                  return
                }
                handleAssignMobileSlot(day, slot)
                closeAssignSheet()
              }}
              onClear={handleClearPlan}
              theme={theme}
            />
          </div>

          <div className="mt-8 hidden flex-col gap-4 md:flex md:flex-row">
            <MealListCard
              title="Lunch Options"
              emptyMessage="No lunch meals yet."
              meals={lunchMeals}
              badgeStyle={{ backgroundColor: theme.primarySoft }}
              wrapperClassName="rounded-2xl border border-dashed px-4 py-3 shadow-sm md:basis-1/4"
              wrapperStyle={{
                borderColor: theme.primary,
                backgroundColor: theme.primarySoft,
                boxShadow: `0 10px 24px ${theme.shadow}`,
              }}
              itemClassName="flex cursor-grab items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold active:cursor-grabbing"
              itemStyle={{ borderColor: theme.primary, backgroundColor: theme.surface, color: theme.textPrimary }}
              slot="lunch"
              onDragStart={handleMealDragStart}
              onDelete={handleDelete}
              theme={theme}
            />
            <MealListCard
              title="Dinner Options"
              emptyMessage="No dinner meals yet."
              meals={dinnerMeals}
              badgeStyle={{ backgroundColor: theme.secondarySoft }}
              wrapperClassName="rounded-2xl border border-dashed px-4 py-3 shadow-sm md:basis-1/4"
              wrapperStyle={{
                borderColor: theme.secondary,
                backgroundColor: theme.secondarySoft,
                boxShadow: `0 10px 24px ${theme.shadow}`,
              }}
              itemClassName="flex cursor-grab items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold active:cursor-grabbing"
              itemStyle={{ borderColor: theme.secondary, backgroundColor: theme.surface, color: theme.textPrimary }}
              slot="dinner"
              onDragStart={handleMealDragStart}
              onDelete={handleDelete}
              theme={theme}
            />
            <WeeklyPlanTable
              weeklyPlan={weeklyPlan}
              mealNameById={mealNameById}
              onDragOver={handleDragOverCell}
              onDrop={handleDropInCell}
              onClear={handleClearPlan}
              theme={theme}
            />
          </div>
        </form>
        <MobileAssignSheet
          meal={assigningMeal}
          selectedDay={assignDay}
          selectedType={assignType}
          onDayChange={setAssignDay}
          onTypeChange={setAssignType}
          onCancel={closeAssignSheet}
          onAssign={confirmAssignSheet}
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

export default MealForm
