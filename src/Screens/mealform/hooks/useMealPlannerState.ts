import { useCallback, useEffect, useMemo, useState } from 'react'
import type { DragEvent, FormEvent } from 'react'
import type { Meal } from '../../../lib/utils/MealStorage'
import MealSupabaseStore from '../../../lib/utils/MealSupabaseStore'
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
  const [meals, setMeals] = useState<Meal[]>([])
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(createEmptyWeeklyPlan)

  useEffect(() => {
    let active = true

    const loadInitialData = async () => {
      try {
        const [loadedMeals, loadedPlan] = await Promise.all([
          MealSupabaseStore.loadMeals(),
          MealSupabaseStore.loadWeeklyPlan(),
        ])

        if (!active) {
          return
        }

        setMeals(loadedMeals)
        setWeeklyPlan(loadedPlan)
      } catch (error) {
        console.error('Failed to load meal planner data from Supabase', error)
      }
    }

    loadInitialData()

    return () => {
      active = false
    }
  }, [])

  const addMeal = useCallback(async (type: WeekSlot) => {
    const trimmedName = mealName.trim()

    if (!trimmedName) {
      return
    }

    try {
      const createdMeal = await MealSupabaseStore.addMeal(trimmedName, type)
      setMeals((currentMeals) => [...currentMeals, createdMeal])
      setMealName('')
    } catch (error) {
      console.error('Failed to add meal', error)
    }
  }, [mealName])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void addMeal(quickMealType)
  }, [addMeal, quickMealType])

  const handleDelete = useCallback(async (mealId: string) => {
    const currentMeals = meals
    const currentPlan = weeklyPlan

    setMeals((existingMeals) => existingMeals.filter((meal) => meal.id !== mealId))
    setWeeklyPlan((existingPlan) =>
      WEEK_DAYS.reduce((acc, day) => {
        const dayPlan = existingPlan[day] ?? {}
        acc[day] = {
          lunch: dayPlan.lunch === mealId ? undefined : dayPlan.lunch,
          dinner: dayPlan.dinner === mealId ? undefined : dayPlan.dinner,
        }
        return acc
      }, {} as WeeklyPlan),
    )

    try {
      await MealSupabaseStore.deleteMeal(mealId)
    } catch (error) {
      console.error('Failed to delete meal', error)
      setMeals(currentMeals)
      setWeeklyPlan(currentPlan)
    }
  }, [meals, weeklyPlan])

  const duplicateMeal = useCallback(async (mealId: string) => {
    const sourceMeal = meals.find((meal) => meal.id === mealId)
    if (!sourceMeal) {
      return
    }

    try {
      const copiedMeal = await MealSupabaseStore.addMeal(`${sourceMeal.name} (Copy)`, sourceMeal.type)
      setMeals((currentMeals) => [copiedMeal, ...currentMeals])
    } catch (error) {
      console.error('Failed to duplicate meal', error)
    }
  }, [meals])

  const editMealName = useCallback(async (mealId: string, nextName: string) => {
    const trimmedName = nextName.trim()
    if (!trimmedName) {
      return
    }

    const currentMeals = meals
    setMeals((existingMeals) =>
      existingMeals.map((meal) =>
        meal.id === mealId ? { ...meal, name: trimmedName } : meal,
      ),
    )

    try {
      await MealSupabaseStore.updateMealName(mealId, trimmedName)
    } catch (error) {
      console.error('Failed to update meal name', error)
      setMeals(currentMeals)
    }
  }, [meals])

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
    void MealSupabaseStore.assignMealToSlot(day, slot, mealId).catch((error) => {
      console.error('Failed to assign meal on drop', error)
    })
  }, [mealTypeById])

  const assignMealToSlot = useCallback((day: WeekDay, slot: WeekSlot, mealId: string) => {
    const mealType = mealTypeById.get(mealId)
    if (mealType && mealType !== slot) {
      return
    }

    setWeeklyPlan((currentPlan) => ({
      ...currentPlan,
      [day]: {
        ...currentPlan[day],
        [slot]: mealId,
      },
    }))
    void MealSupabaseStore.assignMealToSlot(day, slot, mealId).catch((error) => {
      console.error('Failed to assign meal', error)
    })
  }, [mealTypeById])

  const handleClearPlan = useCallback(() => {
    setWeeklyPlan(createEmptyWeeklyPlan())
    void MealSupabaseStore.clearPlan().catch((error) => {
      console.error('Failed to clear plan', error)
    })
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
