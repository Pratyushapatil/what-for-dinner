import { useMemo, useState } from 'react'
import MealComposer from './mealform/components/MealComposer'
import MobileAssignSheet from './mealform/components/MobileAssignSheet'
import MobileEditMealSheet from './mealform/components/MobileEditMealSheet'
import MobileMealQueue from './mealform/components/MobileMealQueue'
import MobileWeeklyPlan from './mealform/components/MobileWeeklyPlan'
import MealListCard from './mealform/components/MealListCard'
import PlannerHeader from './mealform/components/PlannerHeader'
import WeeklyPlanTable from './mealform/components/WeeklyPlanTable'
import useMealPlannerState from './mealform/hooks/useMealPlannerState'
import { APP_COLORS } from '../lib/constants/colors'
import type { WeekDay, WeekSlot } from './mealform/model'
import type { Meal } from '../lib/utils/MealStorage'

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
    duplicateMeal,
    editMealName,
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
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [editingName, setEditingName] = useState('')

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
      return
    }
    const next = mobileMeals[Math.floor(Math.random() * mobileMeals.length)]
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

  const handleEditMobileMeal = (meal: Meal) => {
    setEditingMeal(meal)
    setEditingName(meal.name)
  }

  const handleDuplicateMobileMeal = (meal: Meal) => {
    duplicateMeal(meal.id)
  }

  const closeEditSheet = () => {
    setEditingMeal(null)
    setEditingName('')
  }

  const saveEditSheet = () => {
    if (!editingMeal) {
      return
    }
    editMealName(editingMeal.id, editingName)
    closeEditSheet()
  }

  const confirmAssignSheet = () => {
    if (!assigningMeal) {
      return
    }
    assignMealToSlot(assignDay, assignType, assigningMeal.id)
    closeAssignSheet()
  }

  return (
    <div className="min-h-screen bg-slate-200 px-3 py-4 text-black md:bg-transparent md:px-0">
      <div className="mx-auto max-w-5xl rounded-[32px] bg-slate-100 p-3 md:rounded-none md:bg-transparent md:p-0">
        <PlannerHeader />
        <form onSubmit={handleSubmit}>
        <MealComposer
          mealName={mealName}
          quickMealType={quickMealType}
          onMealNameChange={setMealName}
          onQuickTypeChange={setQuickMealType}
          onAdd={addMeal}
        />

        <div className="mt-8 space-y-6 md:hidden">
          <MobileMealQueue
            activeTab={mobileTab}
            meals={mobileMeals}
            onTabChange={setMobileTab}
            onAssignMeal={openAssignSheet}
            onRandom={handleRandomMobile}
            onEditMeal={handleEditMobileMeal}
            onDuplicateMeal={handleDuplicateMobileMeal}
            onDelete={handleDelete}
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
          />
        </div>

        <div className="mt-8 hidden flex-col gap-4 md:flex md:flex-row">
          <MealListCard
            title="Lunch Options"
            emptyMessage="No lunch meals yet."
            meals={lunchMeals}
            badgeStyle={{ backgroundColor: APP_COLORS.lunchBadgeBg }}
            wrapperClassName="rounded-xl border border-dashed px-4 py-3 shadow-sm md:basis-1/4"
            wrapperStyle={{
              borderColor: APP_COLORS.lunchAccent,
              backgroundColor: APP_COLORS.lunchSoftBg,
            }}
            itemClassName="flex cursor-grab items-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
            itemStyle={{ borderColor: APP_COLORS.lunchAccent }}
            slot="lunch"
            onDragStart={handleMealDragStart}
            onDelete={handleDelete}
          />
          <MealListCard
            title="Dinner Options"
            emptyMessage="No dinner meals yet."
            meals={dinnerMeals}
            badgeClassName="bg-white"
            wrapperClassName="rounded-xl border border-dashed px-4 py-3 shadow-sm md:basis-1/4"
            wrapperStyle={{
              borderColor: APP_COLORS.dinnerAccent,
              backgroundColor: APP_COLORS.dinnerSoftBg,
            }}
            itemClassName="flex cursor-grab items-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
            itemStyle={{ borderColor: APP_COLORS.dinnerAccent }}
            slot="dinner"
            onDragStart={handleMealDragStart}
            onDelete={handleDelete}
          />
          <WeeklyPlanTable
            weeklyPlan={weeklyPlan}
            mealNameById={mealNameById}
            onDragOver={handleDragOverCell}
            onDrop={handleDropInCell}
            onClear={handleClearPlan}
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
        />
        <MobileEditMealSheet
          meal={editingMeal}
          value={editingName}
          onChange={setEditingName}
          onCancel={closeEditSheet}
          onSave={saveEditSheet}
        />
      </div>
    </div>
  )
}

export default MealForm
