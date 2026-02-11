import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent } from 'react'
import DeleteButton from '../lib/components/DeleteButton'

import MealStorage, { type Meal } from '../lib/utils/MealStorage'
import AddButton from '../lib/components/AddButton'

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const
type WeekSlot = 'lunch' | 'dinner'
type WeeklyPlan = Record<string, Partial<Record<WeekSlot, string>>>
const createEmptyWeeklyPlan = (): WeeklyPlan =>
  WEEK_DAYS.reduce((acc, day) => {
    acc[day] = {}
    return acc
  }, {} as WeeklyPlan)

const MealForm = () => {
  const [mealName, setMealName] = useState('')
  const [mealType, setMealType] = useState<'lunch' | 'dinner' | ''>('')
  const [quickMealType, setQuickMealType] = useState<'lunch' | 'dinner'>('lunch')
  const [meals, setMeals] = useState<Meal[]>([])
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(createEmptyWeeklyPlan)

  useEffect(() => {
    setMeals(MealStorage.load())
  }, [])

  const addMeal = (forcedType?: 'lunch' | 'dinner') => {
    const trimmedName = mealName.trim()
    const nextType = forcedType ?? mealType

    if (!trimmedName || (nextType !== 'lunch' && nextType !== 'dinner')) {
      return
    }

    setMeals((currentMeals) => {
      const nextMeals = [
        ...currentMeals,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: trimmedName,
          type: nextType,
        },
      ]
      MealStorage.save(nextMeals)
      return nextMeals
    })
    setMealName('')
    setMealType('')
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addMeal()
  }

  const handleDelete = (mealId: string) => {
    setMeals((currentMeals) => {
      const nextMeals = currentMeals.filter((meal) => meal.id !== mealId)
      MealStorage.save(nextMeals)
      return nextMeals
    })

    setWeeklyPlan((currentPlan) =>
      WEEK_DAYS.reduce((acc, day) => {
        const dayPlan = currentPlan[day] ?? {}
        acc[day] = {
          lunch: dayPlan.lunch === mealId ? undefined : dayPlan.lunch,
          dinner: dayPlan.dinner === mealId ? undefined : dayPlan.dinner,
        }
        return acc
      }, {} as WeeklyPlan),
    )
  }

  const lunchMeals = useMemo(() => meals.filter((meal) => meal.type === 'lunch'), [meals])
  const dinnerMeals = useMemo(() => meals.filter((meal) => meal.type === 'dinner'), [meals])
  const mealNameById = useMemo(() => new Map(meals.map((meal) => [meal.id, meal.name])), [meals])

  const handleMealDragStart = (
    event: DragEvent<HTMLDivElement>,
    mealId: string,
    slot: WeekSlot,
  ) => {
    event.dataTransfer.setData('text/meal-id', mealId)
    event.dataTransfer.setData('text/meal-type', slot)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOverCell = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDropInCell = (event: DragEvent<HTMLDivElement>, day: string, slot: WeekSlot) => {
    event.preventDefault()
    const mealId = event.dataTransfer.getData('text/meal-id')
    const draggedType = event.dataTransfer.getData('text/meal-type') as WeekSlot

    if (!mealId || draggedType !== slot) {
      return
    }

    const meal = meals.find((item) => item.id === mealId)
    if (!meal || meal.type !== slot) {
      return
    }

    setWeeklyPlan((currentPlan) => ({
      ...currentPlan,
      [day]: {
        ...currentPlan[day],
        [slot]: mealId,
      },
    }))
  }

  const handleClearPlan = () => {
    setWeeklyPlan(createEmptyWeeklyPlan())
  }

  return (
    <div className=" text-black">
      <div className="inline-flex w-fit items-center rounded-full text-sm font-semibold text-[#0e1c26] shadow-sm bg-gradient-to-r from-[#f1eec8] to-[#d3eef4] px-3 py-2">
        <p>Plan your meal effortlessly</p>
      </div>
      <div className="text-5xl font-bold mt-4 mb-4 text-center bg-gradient-to-r from-[#f8997d] to-[#ad336d] bg-clip-text text-transparent">
        <p>Meal Planner</p>
      </div>
      <div className="text-md font-semibold mb-4 text-gray-500 max-w-xs mx-auto text-center">
        <p>Add your favorite meals and drag and drop then in weekly calender to plan your week</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 mt-8">
          <div className="flex md:flex-col flex-center md:justify-center gap-4 py-2 border border-gray-100 rounded-md mb-2 px-4 shadow-sm md:basis-1/2">
            <h2 className="text-lg font-semibold px-4">Add New Meals</h2>
            <div className="flex flex-row gap-4 mb-2">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 min-w-[160px] rounded-xl px-6 py-3 text-sm font-semibold shadow-sm ${
                  quickMealType === 'lunch'
                    ? 'bg-gradient-to-r from-[#6eee87] to-[#5fc52e] text-white'
                    : 'bg-transparent text-gray-500'
                }`}
                onClick={() => setQuickMealType('lunch')}
              >
                <span>Lunch</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 min-w-[160px] rounded-xl px-6 py-3 text-sm font-semibold shadow-sm ${
                  quickMealType === 'dinner'
                    ? 'bg-gradient-to-r from-[#8de9d5] to-[#32c4c0] text-white border border-[#32c4c0]'
                    : 'bg-transparent text-gray-500'
                }`}
                onClick={() => setQuickMealType('dinner')}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setMealName(event.target.value)}
                placeholder="Enter meal name..."
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              <AddButton label="+" onClick={() => addMeal(quickMealType)} />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <div className="rounded-xl border border-dashed border-[#5fc52e] bg-[#F0FFF0] px-4 py-3 md:basis-1/4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-800">Lunch Options</h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-sm font-semibold text-emerald-800">
                {lunchMeals.length}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {lunchMeals.length === 0 ? (
                <p className="text-sm text-emerald-700/70">No lunch meals yet.</p>
              ) : (
                lunchMeals.map((meal) => (
                  <div
                    key={meal.id}
                    draggable
                    onDragStart={(event) => handleMealDragStart(event, meal.id, 'lunch')}
                    className="flex cursor-grab items-center gap-2 rounded-lg border border-[#5fc52e] bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
                  >
                    <span>{meal.name}</span>
                    <DeleteButton label="X" onClick={() => handleDelete(meal.id)} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-[#32c4c0] bg-[#B5E6E4] px-4 py-3 md:basis-1/4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-800">Dinner Options</h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-semibold text-emerald-800">
                {dinnerMeals.length}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {dinnerMeals.length === 0 ? (
                <p className="text-sm text-emerald-700/70">No dinner meals yet.</p>
              ) : (
                dinnerMeals.map((meal) => (
                  <div
                    key={meal.id}
                    draggable
                    onDragStart={(event) => handleMealDragStart(event, meal.id, 'dinner')}
                    className="flex cursor-grab items-center gap-2 rounded-lg border border-[#32c4c0] bg-transparent px-3 py-2 text-sm font-semibold text-black active:cursor-grabbing"
                  >
                    <span>{meal.name}</span>
                    <DeleteButton label="X" onClick={() => handleDelete(meal.id)} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-md shadow-sm p-3 md:basis-1/2">
            <div className="flex items-center justify-between px-2">
              <h2 className="px-2 text-lg font-semibold">Weekly Timetable</h2>
              <button
                type="button"
                onClick={handleClearPlan}
                className="inline-flex items-center rounded-full  border bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Clear plan
              </button>
            </div>
            <div className="mt-3 flex flex-col overflow-hidden rounded-md border border-gray-200">
              <div className="flex bg-gray-50">
                <div className="basis-1/3 border-b border-r border-gray-200 p-3 text-sm font-semibold">
                  Day
                </div>
                <div className="basis-1/3 border-b border-r border-gray-200 p-3 text-sm font-semibold bg-[#F0FFF0]">
                  Lunch
                </div>
                <div className="basis-1/3 border-b border-gray-200 p-3 text-sm font-semibold bg-[#B5E6E4]">
                  Dinner
                </div>
              </div>
              {WEEK_DAYS.map((day) => (
                <div key={day} className="flex min-h-[64px]">
                  <div className="basis-1/3 border-b border-r border-gray-200 p-3 text-sm font-medium text-gray-700">
                    {day}
                  </div>
                  <div
                    onDragOver={handleDragOverCell}
                    onDrop={(event) => handleDropInCell(event, day, 'lunch')}
                    className="basis-1/3 border-b border-r border-gray-200 p-3 text-sm"
                  >
                    {weeklyPlan[day]?.lunch ? (
                      <div className="w-full rounded-xl border border-[#5fc52e] bg-[#F0FFF0] px-4 py-3 text-sm font-semibold text-black">
                        {mealNameById.get(weeklyPlan[day]?.lunch ?? '')}
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center rounded-xl bg-[#e5e7eb] px-4 py-3 text-sm text-gray-400">
                        Drop here
                      </div>
                    )}
                  </div>
                  <div
                    onDragOver={handleDragOverCell}
                    onDrop={(event) => handleDropInCell(event, day, 'dinner')}
                    className="basis-1/3 border-b border-gray-200 p-3 text-sm"
                  >
                    {weeklyPlan[day]?.dinner ? (
                      <div className="w-full rounded-xl border border-[#8bded8] bg-[#d3e8e7] px-4 py-3 text-sm font-semibold text-black">
                        {mealNameById.get(weeklyPlan[day]?.dinner ?? '')}
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center rounded-xl bg-[#e5e7eb] px-4 py-3 text-sm text-gray-400">
                        Drop here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MealForm
