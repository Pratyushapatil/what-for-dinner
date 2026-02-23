import type ActionButtonProps from './ActionButton.props'
import { APP_COLORS } from '../../constants/colors'

const BaseActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <button type="button" className={className} {...buttonProps}>
    {children}
  </button>
)

export const AddActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <BaseActionButton
    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-transparent shadow-sm font-extrabold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${className ?? ''}`}
    style={{ backgroundColor: APP_COLORS.lunchSoftBg, color: APP_COLORS.lunchAccent }}
    {...buttonProps}
  >
    {children ?? 'Add'}
  </BaseActionButton>
)

export const DeleteActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <BaseActionButton
    className={`ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-red-700 font-bold transition-colors duration-150 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 ${className ?? ''}`}
    {...buttonProps}
  >
    {children ?? 'Delete'}
  </BaseActionButton>
)
