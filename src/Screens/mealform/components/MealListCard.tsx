import type { CSSProperties, DragEvent } from 'react'
import DeleteButton from '../../../lib/components/DeleteButton'
import type { Meal } from '../../../lib/utils/MealStorage'
import type { WeekSlot } from '../model'
import type { MealTheme } from '../theme'

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
  onView?: (meal: Meal) => void
  theme: MealTheme
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
  onView,
  theme,
}: MealListCardProps) => (
  <div className={wrapperClassName} style={wrapperStyle}>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>
        {title}
      </h3>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold ${badgeClassName ?? ''}`}
        style={{ color: theme.textPrimary, ...badgeStyle }}
      >
        {meals.length}
      </span>
    </div>
    <div className="mt-3 flex flex-col gap-2.5">
      {meals.length === 0 ? (
        <p className="text-sm opacity-75" style={{ color: theme.textSecondary }}>
          {emptyMessage}
        </p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal.id}
            draggable
            onDragStart={(event) => onDragStart(event, meal.id, slot)}
            className={`${itemClassName} transition-all duration-150 hover:shadow-sm`}
            style={itemStyle}
          >
            <span className="flex-1">{meal.name}</span>
            {onView && (
              <button
                type="button"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/5"
                style={{ color: theme.textSecondary }}
                onClick={(e) => {
                  e.stopPropagation()
                  onView(meal)
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            )}
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
