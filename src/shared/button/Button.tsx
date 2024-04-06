import { ReactNode } from 'react'

interface IButtonProps {
  label?: string | ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  id?: string
  className?: string
  role?: string
  onClick?: (event?: any) => void
  disabled?: boolean
  testId?: string
}

export default function Button(props: IButtonProps) {
  const { id, className, disabled, label, role, testId, type, onClick } = props

  return (
    <button data-testId={testId} id={id} className={className} role={role} type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}
