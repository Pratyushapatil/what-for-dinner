import type ActionButtonProps from './ActionButton.props'
import { APP_COLORS } from '../../constants/colors'

const BaseActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <button type="button" className={className} {...buttonProps}>
    {children}
  </button>
)

export const AddActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <BaseActionButton
    className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm font-extrabold ${className ?? ''}`}
    style={{ backgroundColor: APP_COLORS.lunchSoftBg, color: APP_COLORS.lunchAccent }}
    {...buttonProps}
  >
    {children ?? 'Add'}
  </BaseActionButton>
)

export const DeleteActionButton = ({ children, className, ...buttonProps }: ActionButtonProps) => (
  <BaseActionButton
    className={`ml-auto flex h-8 w-8 items-center justify-center text-red-700 font-bold ${className ?? ''}`}
    {...buttonProps}
  >
    {children ?? 'Delete'}
  </BaseActionButton>
)
