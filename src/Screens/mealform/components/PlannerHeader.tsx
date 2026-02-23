import { useState } from 'react'
import type { MealTheme } from '../theme'

type PlannerHeaderProps = {
  theme: MealTheme
  onOpenAppearance: () => void
}

const PlannerHeader = ({ theme, onOpenAppearance }: PlannerHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="rounded-3xl border p-4"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.surfaceMuted,
        boxShadow: `0 10px 24px ${theme.shadow}`,
      }}
    >
      <div
        className="mb-4 rounded-2xl border p-2"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="md:hidden">
          <div className="flex items-center justify-between px-8">
            <p className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
              Meal Planner
            </p>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border text-lg font-semibold"
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
                backgroundColor: theme.surfaceMuted,
              }}
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              ☰
            </button>
          </div>

          {menuOpen ? (
            <div
              className="mt-2 flex flex-col overflow-hidden rounded-xl border"
              style={{ borderColor: theme.border, backgroundColor: theme.surface }}
            >
              <button
                type="button"
                className="px-3 py-2 text-left text-sm font-semibold"
                style={{ backgroundColor: theme.surfaceMuted, color: theme.textPrimary }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </button>
              <button
                type="button"
                className="px-3 py-2 text-left text-sm font-medium"
                style={{ color: theme.textSecondary }}
                onClick={() => setMenuOpen(false)}
              >
                Meals List
              </button>
              <button
                type="button"
                className="px-3 py-2 text-left text-sm font-medium"
                style={{ color: theme.textSecondary }}
                onClick={() => {
                  setMenuOpen(false)
                  onOpenAppearance()
                }}
              >
                Themes
              </button>
            </div>
          ) : null}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className="flex min-w-[64px] items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold"
            style={{ backgroundColor: theme.surfaceMuted, color: theme.textPrimary }}
          >
            Home
          </button>
          <button
            type="button"
            className="flex min-w-[64px] items-center justify-center rounded-xl px-3 py-2 text-sm font-medium"
            style={{ color: theme.textSecondary }}
          >
            Meals List
          </button>
          <button
            type="button"
            className="flex min-w-[64px] items-center justify-center rounded-xl px-3 py-2 text-sm font-medium"
            style={{ color: theme.textSecondary }}
            onClick={onOpenAppearance}
          >
            Themes
          </button>
        </div>
      </div>

      <div className="mb-4 px-1">
        <h1
          className="text-2xl font-bold leading-tight md:text-5xl"
          style={{ color: theme.textPrimary }}
        >
          Weekly Meal Planner
        </h1>
        <p
          className="mt-2 text-base leading-relaxed md:text-3xl"
          style={{ color: theme.textSecondary }}
        >
          Plan your meals for the week ahead
        </p>
      </div>

      <div
        className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium md:px-4 md:py-3 md:text-base"
        style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.surface }}
      >
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full border bg-white transition-colors duration-150 hover:bg-slate-50 md:h-9 md:w-9"
          style={{
            borderColor: theme.border,
            color: theme.textSecondary,
            backgroundColor: theme.surface,
          }}
          aria-label="Previous week"
        >
          {'<'}
        </button>
        <p className="text-center" style={{ color: theme.textPrimary }}>
          This Week (Feb 23-1)
        </p>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full border bg-white transition-colors duration-150 hover:bg-slate-50 md:h-9 md:w-9"
          style={{
            borderColor: theme.border,
            color: theme.textSecondary,
            backgroundColor: theme.surface,
          }}
          aria-label="Next week"
        >
          {'>'}
        </button>
      </div>
    </header>
  )
}

export default PlannerHeader
