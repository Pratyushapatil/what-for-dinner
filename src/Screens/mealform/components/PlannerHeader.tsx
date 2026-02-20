import { APP_COLORS } from '../../../lib/constants/colors'

const PlannerHeader = () => (
  <header className="rounded-3xl bg-slate-100 p-3 shadow-sm">
    <div className="mb-3 flex items-center justify-between gap-3 px-1">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Meal Planner</h1>
        <p className="text-sm text-slate-500 md:text-lg">Plan lunch & dinner for the week</p>
      </div>
      <div className="flex items-center gap-3 text-slate-400">
        <span className="text-2xl">o</span>
        <span className="text-2xl">*</span>
      </div>
    </div>
    <div
      className="flex items-center justify-between rounded-2xl bg-slate-100 px-3 py-2 text-base font-semibold text-slate-700 md:text-lg"
      style={{ border: `1px solid ${APP_COLORS.dropZoneBg}`, backgroundColor: '#f1f5f9' }}
    >
      <button
        type="button"
        className="h-8 w-8 rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm md:h-10 md:w-10"
      >
        {'<'}
      </button>
      <p>This Week (Feb 23-1)</p>
      <button
        type="button"
        className="h-8 w-8 rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm md:h-10 md:w-10"
      >
        {'>'}
      </button>
    </div>
  </header>
)

export default PlannerHeader
