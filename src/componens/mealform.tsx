import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

const MealForm = () => {
  const [mealName, setMealName] = useState('')
  const [mealType, setMealType] = useState('')
  const [meals, setMeals] = useState<{ name: string; type: 'lunch' | 'dinner' }[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = mealName.trim()

    if (!trimmedName || (mealType !== 'lunch' && mealType !== 'dinner')) {
      return
    }

    setMeals((currentMeals) => [
      ...currentMeals,
      { name: trimmedName, type: mealType },
    ])
    setMealName('')
    setMealType('')
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
    <div className='bg-white dark:bg-gray-800 text-black dark:text-white'>
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
      <table className="mt-8 w-full  border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Lunch
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Dinner
            </th>
          </tr>
        </thead>
        <tbody>
          {Math.max(lunchMeals.length, dinnerMeals.length) === 0 ? (
            <tr>
              <td className="border border-gray-300 px-4 py-2" colSpan={2}>
                No meals added yet.
              </td>
            </tr>
          ) : (
            Array.from({
              length: Math.max(lunchMeals.length, dinnerMeals.length),
            }).map((_, index) => (
              <tr key={`meal-row-${index}`}>
                <td className="border border-gray-300 px-4 py-2">
                  {lunchMeals[index]?.name ?? ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {dinnerMeals[index]?.name ?? ''}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MealForm
