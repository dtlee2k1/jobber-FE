import { ChangeEvent, CSSProperties, KeyboardEvent } from 'react'

interface ITextAreaInputProps {
  id?: string
  name?: string
  value?: string | number
  type?: string
  placeholder?: string
  className?: string
  style?: CSSProperties
  readOnly?: boolean
  rows?: number
  maxLength?: number
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onClick?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyUp?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function TextAreaInput(props: ITextAreaInputProps) {
  return (
    <textarea
      id={props.id}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      className={props.className}
      style={props.style}
      readOnly={props.readOnly}
      rows={props.rows}
      maxLength={props.maxLength}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      autoComplete="false"
    />
  )
}
