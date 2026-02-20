import { useCallback, useMemo, useState } from 'react'
import type { DragEvent, FormEvent } from 'react'
import MealStorage, { type Meal } from '../../../lib/utils/MealStorage'
import {
  createEmptyWeeklyPlan,
  DRAG_MEAL_ID_KEY,
  DRAG_MEAL_TYPE_KEY,
  WEEK_DAYS,
  type WeekDay,
  type WeekSlot,
  type WeeklyPlan,
} from '../model'

const useMealPlannerState = () => {
  const [mealName, setMealName] = useState('')
  const [quickMealType, setQuickMealType] = useState<WeekSlot>('lunch')
  const [meals, setMeals] = useState<Meal[]>(() => MealStorage.load())
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(createEmptyWeeklyPlan)

  const addMeal = useCallback((type: WeekSlot) => {
    const trimmedName = mealName.trim()

    if (!trimmedName) {
      return
    }

    setMeals((currentMeals) => {
      const nextMeals = [
        ...currentMeals,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: trimmedName,
          type,
        },
      ]
      MealStorage.save(nextMeals)
      return nextMeals
    })
    setMealName('')
  }, [mealName])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addMeal(quickMealType)
  }, [addMeal, quickMealType])

  const handleDelete = useCallback((mealId: string) => {
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
  }, [])

  const duplicateMeal = useCallback((mealId: string) => {
    setMeals((currentMeals) => {
      const sourceMeal = currentMeals.find((meal) => meal.id === mealId)
      if (!sourceMeal) {
        return currentMeals
      }

      const nextMeals = [
        {
          ...sourceMeal,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: `${sourceMeal.name} (Copy)`,
        },
        ...currentMeals,
      ]
      MealStorage.save(nextMeals)
      return nextMeals
    })
  }, [])

  const editMealName = useCallback((mealId: string, nextName: string) => {
    const trimmedName = nextName.trim()
    if (!trimmedName) {
      return
    }

    setMeals((currentMeals) => {
      const nextMeals = currentMeals.map((meal) =>
        meal.id === mealId ? { ...meal, name: trimmedName } : meal,
      )
      MealStorage.save(nextMeals)
      return nextMeals
    })
  }, [])

  const { lunchMeals, dinnerMeals, mealNameById, mealTypeById } = useMemo(() => {
    const lunch: Meal[] = []
    const dinner: Meal[] = []
    const nameById = new Map<string, string>()
    const typeById = new Map<string, WeekSlot>()

    for (const meal of meals) {
      nameById.set(meal.id, meal.name)
      typeById.set(meal.id, meal.type)
      if (meal.type === 'lunch') {
        lunch.push(meal)
      } else {
        dinner.push(meal)
      }
    }

    return {
      lunchMeals: lunch,
      dinnerMeals: dinner,
      mealNameById: nameById,
      mealTypeById: typeById,
    }
  }, [meals])

  const handleMealDragStart = useCallback((
    event: DragEvent<HTMLDivElement>,
    mealId: string,
    slot: WeekSlot,
  ) => {
    event.dataTransfer.setData(DRAG_MEAL_ID_KEY, mealId)
    event.dataTransfer.setData(DRAG_MEAL_TYPE_KEY, slot)
    event.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOverCell = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDropInCell = useCallback((event: DragEvent<HTMLDivElement>, day: WeekDay, slot: WeekSlot) => {
    event.preventDefault()
    const mealId = event.dataTransfer.getData(DRAG_MEAL_ID_KEY)
    const draggedType = event.dataTransfer.getData(DRAG_MEAL_TYPE_KEY) as WeekSlot

    if (!mealId || draggedType !== slot) {
      return
    }

    const mealType = mealTypeById.get(mealId)
    if (mealType !== slot) {
      return
    }

    setWeeklyPlan((currentPlan) => ({
      ...currentPlan,
      [day]: {
        ...currentPlan[day],
        [slot]: mealId,
      },
    }))
  }, [mealTypeById])

  const assignMealToSlot = useCallback((day: WeekDay, slot: WeekSlot, mealId: string) => {
    const mealType = mealTypeById.get(mealId)
    if (mealType !== slot) {
      return
    }

    setWeeklyPlan((currentPlan) => ({
      ...currentPlan,
      [day]: {
        ...currentPlan[day],
        [slot]: mealId,
      },
    }))
  }, [mealTypeById])

  const handleClearPlan = useCallback(() => {
    setWeeklyPlan(createEmptyWeeklyPlan())
  }, [])

  return {
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
  }
}

export default useMealPlannerState
