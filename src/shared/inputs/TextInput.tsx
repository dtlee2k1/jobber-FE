import { ChangeEvent, CSSProperties, forwardRef, KeyboardEvent } from 'react'

interface ITextInputProps {
  id?: string
  name?: string
  type?: string
  value?: string | number
  placeholder?: string
  className?: string
  classNameError?: string
  errorMessage?: string
  style?: CSSProperties
  readOnly?: boolean
  checked?: boolean
  rows?: number
  autoFocus?: boolean
  maxLength?: number
  min?: string | number
  max?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyUp?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>((props, ref) => (
  <>
    <input
      ref={ref}
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      readOnly={props.readOnly}
      checked={props.checked}
      className={props.className}
      maxLength={props.maxLength}
      style={props.style}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      autoComplete="false"
    />
    {props.errorMessage && <div className={props.classNameError}>{props.errorMessage}</div>}
  </>
))

export default TextInput
