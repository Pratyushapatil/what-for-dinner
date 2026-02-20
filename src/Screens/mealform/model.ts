export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

export type WeekDay = (typeof WEEK_DAYS)[number]
export type WeekSlot = 'lunch' | 'dinner'
export type WeeklyPlan = Record<WeekDay, Partial<Record<WeekSlot, string>>>

export const DRAG_MEAL_ID_KEY = 'text/meal-id'
export const DRAG_MEAL_TYPE_KEY = 'text/meal-type'

export const createEmptyWeeklyPlan = (): WeeklyPlan =>
  WEEK_DAYS.reduce((acc, day) => {
    acc[day] = {}
    return acc
  }, {} as WeeklyPlan)
