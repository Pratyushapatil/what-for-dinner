import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import LunchAndDinnerTable from '../lib/components/LunchAndDinnerTable/LunchAndDinnerTable';
import MealStorage, { type Meal } from '../lib/utils/MealStorage'

const MealForm = () => {
  const [mealName, setMealName] = useState('')
  const [mealType, setMealType] = useState('')
  const [meals, setMeals] = useState<Meal[]>([])

  useEffect(() => {
    setMeals(MealStorage.load())
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = mealName.trim()

    if (!trimmedName || (mealType !== 'lunch' && mealType !== 'dinner')) {
      return
    }

    setMeals((currentMeals) => {
      const nextMeals = [
        ...currentMeals,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: trimmedName,
          type: mealType,
        },
      ]
      MealStorage.save(nextMeals)
      return nextMeals
    })
    setMealName('')
    setMealType('')
  }

  const handleDelete = (mealId: string) => {
    setMeals((currentMeals) => {
      const nextMeals = currentMeals.filter((meal) => meal.id !== mealId)
      MealStorage.save(nextMeals)
      return nextMeals
    })
  }

  const lunchMeals = useMemo(
    () => meals.filter((meal) => meal.type === 'lunch'),
    [meals],
  )
  const dinnerMeals = useMemo(
    () => meals.filter((meal) => meal.type === 'dinner'),
    [meals],
  )

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        className="flex flex-col gap-8 border border-gray-300 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="meal-name">Meal Name : </label>
          <input
            id="meal-name"
            name="mealName"
            type="text"
            value={mealName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMealName(event.target.value)
            }
            placeholder="Enter a meal name"
          />
        </div>
        <div>
          <label htmlFor="meal-type">Meal Type : </label>
          <select
            className="bg-white dark:bg-gray-800 text-black dark:text-white"
            id="meal-type"
            name="mealType"
            value={mealType}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setMealType(event.target.value)
            }
          >
            <option value="">Select a meal type</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="bg-green-600 p-2 rounded-md">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="mt-8">
        {Math.max(lunchMeals.length, dinnerMeals.length) === 0 ? (
          <div className="border border-gray-300 rounded-md px-4 py-2">
            No meals added yet.
          </div>
        ) : (
          <div className="flex md:flex-row flex-center md:justify-center gap-4 py-2">
            <LunchAndDinnerTable
              mealType="lunch"
              lunchMeals={lunchMeals}
              handleDelete={handleDelete}
            />
            <LunchAndDinnerTable
              mealType="dinner"
              dinnerMeals={dinnerMeals}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MealForm
