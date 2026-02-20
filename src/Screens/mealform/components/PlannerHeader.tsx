import { APP_COLORS } from '../../../lib/constants/colors'

const PlannerHeader = () => (
  <>
    <div
      className="inline-flex w-fit items-center rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm"
      style={{ backgroundColor: APP_COLORS.mealHeaderBg }}
    >
      <p>Plan your meal effortlessly</p>
    </div>
    <div
      className="mt-4 mb-4 bg-clip-text text-center text-5xl font-bold text-transparent"
      style={{
        backgroundImage: `linear-gradient(to right, ${APP_COLORS.mealHeaderTitleStart}, ${APP_COLORS.mealHeaderTitleEnd})`,
      }}
    >
      <p>Meal Planner</p>
    </div>
    <div className="mx-auto mb-4 max-w-xs text-center text-md font-semibold text-gray-500">
      <p>Add your favorite meals and drag and drop then in weekly calender to plan your week</p>
    </div>
  </>
)

export default PlannerHeader
