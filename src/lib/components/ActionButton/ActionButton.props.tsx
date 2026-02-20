import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ActionButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
>

export default ActionButtonProps
