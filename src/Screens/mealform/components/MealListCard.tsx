import type { CSSProperties, DragEvent } from 'react'
import DeleteButton from '../../../lib/components/DeleteButton'
import type { Meal } from '../../../lib/utils/MealStorage'
import type { WeekSlot } from '../model'

type MealListCardProps = {
  title: string
  emptyMessage: string
  meals: Meal[]
  badgeClassName?: string
  badgeStyle?: CSSProperties
  wrapperClassName: string
  wrapperStyle?: CSSProperties
  itemClassName: string
  itemStyle?: CSSProperties
  slot: WeekSlot
  onDragStart: (event: DragEvent<HTMLDivElement>, mealId: string, slot: WeekSlot) => void
  onDelete: (mealId: string) => void
}

const MealListCard = ({
  title,
  emptyMessage,
  meals,
  badgeClassName,
  badgeStyle,
  wrapperClassName,
  wrapperStyle,
  itemClassName,
  itemStyle,
  slot,
  onDragStart,
  onDelete,
}: MealListCardProps) => (
  <div className={wrapperClassName} style={wrapperStyle}>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-emerald-800">{title}</h3>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold text-emerald-800 ${badgeClassName ?? ''}`}
        style={badgeStyle}
      >
        {meals.length}
      </span>
    </div>
    <div className="mt-3 flex flex-col gap-2">
      {meals.length === 0 ? (
        <p className="text-sm text-emerald-700/70">{emptyMessage}</p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal.id}
            draggable
            onDragStart={(event) => onDragStart(event, meal.id, slot)}
            className={itemClassName}
            style={itemStyle}
          >
            <span>{meal.name}</span>
            <DeleteButton aria-label={`Delete ${meal.name}`} onClick={() => onDelete(meal.id)}>
              X
            </DeleteButton>
          </div>
        ))
      )}
    </div>
  </div>
)

export default MealListCard
