export type Meal = {
  id: string
  name: string
  type: 'lunch' | 'dinner'
}

class MealStorage {
  private static storageKey = 'meals'

  static load(): Meal[] {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const storedValue = window.localStorage.getItem(MealStorage.storageKey)
      if (!storedValue) {
        return []
      }

      const parsed = JSON.parse(storedValue) as Meal[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  static save(meals: Meal[]) {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(
        MealStorage.storageKey,
        JSON.stringify(meals),
      )
    } catch {
      // Ignore storage write errors
    }
  }
}

export default MealStorage
