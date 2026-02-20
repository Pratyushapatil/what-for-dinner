import MealComposer from './mealform/components/MealComposer'
import MealListCard from './mealform/components/MealListCard'
import PlannerHeader from './mealform/components/PlannerHeader'
import WeeklyPlanTable from './mealform/components/WeeklyPlanTable'
import useMealPlannerState from './mealform/hooks/useMealPlannerState'

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
    handleClearPlan,
  } = useMealPlannerState()

  return (
    <div className="text-black">
      <PlannerHeader />
      <form onSubmit={handleSubmit}>
        <MealComposer
          mealName={mealName}
          quickMealType={quickMealType}
          onMealNameChange={setMealName}
          onQuickTypeChange={setQuickMealType}
          onAdd={addMeal}
        />
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <MealListCard
            title="Lunch Options"
            emptyMessage="No lunch meals yet."
            meals={lunchMeals}
            badgeClassName="bg-emerald-200"
            wrapperClassName="rounded-xl border border-dashed border-[#5fc52e] bg-[#F0FFF0] px-4 py-3 shadow-sm md:basis-1/4"
            itemClassName="flex cursor-grab items-center gap-2 rounded-lg border border-[#5fc52e] bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
            slot="lunch"
            onDragStart={handleMealDragStart}
            onDelete={handleDelete}
          />
          <MealListCard
            title="Dinner Options"
            emptyMessage="No dinner meals yet."
            meals={dinnerMeals}
            badgeClassName="bg-white"
            wrapperClassName="rounded-xl border border-dashed border-[#32c4c0] bg-[#B5E6E4] px-4 py-3 shadow-sm md:basis-1/4"
            itemClassName="flex cursor-grab items-center gap-2 rounded-lg border border-[#32c4c0] bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
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
    </div>
  )
}

export default MealForm
