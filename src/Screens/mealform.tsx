import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import LunchAndDinnerTable from '../lib/components/LunchAndDinnerTable/LunchAndDinnerTable'
import MealStorage, { type Meal } from '../lib/utils/MealStorage'

const MealForm = () => {
  const [mealName, setMealName] = useState('')
  const [mealType, setMealType] = useState<'lunch' | 'dinner' | ''>('')
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

  const lunchMeals = useMemo(() => meals.filter((meal) => meal.type === 'lunch'), [meals])
  const dinnerMeals = useMemo(() => meals.filter((meal) => meal.type === 'dinner'), [meals])

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
            onChange={(event: ChangeEvent<HTMLInputElement>) => setMealName(event.target.value)}
            placeholder="Enter a meal name"
          />
        </div>
        <div>
          <label htmlFor="meal-type">Meal Type : </label>
          <select
            className="bg-white text-black"
            id="meal-type"
            name="mealType"
            value={mealType}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setMealType(event.target.value as 'lunch' | 'dinner' | '')
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
      <form>
        <div className="flex flex-row gap-4 mt-8 ">
          <div className="flex md:flex-col flex-center md:justify-center gap-4 py-2 border border-gray-300 rounded-md mb-2 px-4">
            <h2 className="text-lg font-semibold px-4">Add New Meals</h2>
            <div className="flex flex-row gap-4 mb-2">
              <div className="flex items-center justify-center gap-2 min-w-[160px] rounded-xl  bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm">
                <span aria-hidden="true">☀️</span>
                <span>Lunch</span>
              </div>
              <div className="flex items-center justify-center gap-2 min-w-[160px] rounded-xl px-6 py-3 text-sm font-semibold text-black shadow-md">
                <span aria-hidden="true">🌙</span>
                <span>Dinner</span>
              </div>
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
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-200 text-emerald-700 shadow-sm font-extrabold "
                aria-label="Add meal"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-center gap-4 py-2 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold px-4">Weekly Timetable</h2>
          </div>
        </div>
      </form>
      <div className="mt-8">
        {Math.max(lunchMeals.length, dinnerMeals.length) === 0 ? (
          <div className="border border-gray-300 rounded-md px-4 py-2">No meals added yet.</div>
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
