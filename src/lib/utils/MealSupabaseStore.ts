import type { Meal } from './MealStorage'
import type { WeekDay, WeekSlot, WeeklyPlan } from '../../Screens/mealform/model'
import { createEmptyWeeklyPlan, WEEK_DAYS } from '../../Screens/mealform/model'
import { supabase } from '../supabase/client'

type MealRow = {
  id: string
  name: string
  type: WeekSlot
}

type WeeklyPlanRow = {
  day: WeekDay
  slot: WeekSlot
  meal_id: string
}

class MealSupabaseStore {
  static async loadMeals(): Promise<Meal[]> {
    const { data, error } = await supabase
      .from('meals')
      .select('id, name, type')
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return (data ?? []) as MealRow[]
  }

  static async addMeal(name: string, type: WeekSlot): Promise<Meal> {
    const { data, error } = await supabase
      .from('meals')
      .insert({ name, type })
      .select('id, name, type')
      .single()

    if (error || !data) {
      throw error ?? new Error('Failed to add meal')
    }

    return data as MealRow
  }

  static async updateMealName(mealId: string, name: string): Promise<void> {
    const { error } = await supabase.from('meals').update({ name }).eq('id', mealId)
    if (error) {
      throw error
    }
  }

  static async deleteMeal(mealId: string): Promise<void> {
    const { error: planError } = await supabase.from('weekly_plan').delete().eq('meal_id', mealId)
    if (planError) {
      throw planError
    }

    const { error } = await supabase.from('meals').delete().eq('id', mealId)
    if (error) {
      throw error
    }
  }

  static async loadWeeklyPlan(): Promise<WeeklyPlan> {
    const { data, error } = await supabase.from('weekly_plan').select('day, slot, meal_id')
    if (error) {
      throw error
    }

    const nextPlan = createEmptyWeeklyPlan()
    for (const row of (data ?? []) as WeeklyPlanRow[]) {
      nextPlan[row.day][row.slot] = row.meal_id
    }
    return nextPlan
  }

  static async assignMealToSlot(day: WeekDay, slot: WeekSlot, mealId: string): Promise<void> {
    const { error } = await supabase
      .from('weekly_plan')
      .upsert(
        {
          day,
          slot,
          meal_id: mealId,
        },
        { onConflict: 'day,slot' },
      )

    if (error) {
      throw error
    }
  }

  static async clearPlan(): Promise<void> {
    const { error } = await supabase.from('weekly_plan').delete().in('day', [...WEEK_DAYS])
    if (error) {
      throw error
    }
  }
}

export default MealSupabaseStore
