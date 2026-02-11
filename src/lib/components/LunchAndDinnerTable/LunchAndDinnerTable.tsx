import DeleteButton from '../DeleteButton';

type Props = {
    mealType: 'lunch' | 'dinner';
    dinnerMeals?: { id: string; name: string }[];
    lunchMeals?: { id: string; name: string }[];
    handleDelete: (id: string) => void;
}

export default function LunchAndDinnerTable (props: Props) {
  const { lunchMeals, handleDelete, dinnerMeals, mealType } = props;

  const mealsToDisplay = mealType === 'lunch' ? lunchMeals : dinnerMeals;

  return (
       <div className="rounded-2xl bg-white shadow-md">
              <div className="px-4 py-3 font-semibold text-gray-700">
                {props.mealType === 'lunch' ? 'Lunch' : 'Dinner'}
              </div>
              <div >
                { mealsToDisplay && mealsToDisplay.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    No {props.mealType} meals yet.
                  </div>
                ) : (
                  mealsToDisplay?.map((meal, index) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between gap-3 px-4 py-2"
                    >
                      <span>{meal.name}</span>
                      <DeleteButton
                      label={`Delete ${props.mealType}`}
                        onClick={() => handleDelete(meal.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
  );
}
