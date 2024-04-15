import { filter } from 'lodash'
import { CSSProperties, Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'
import { v4 as uuid4 } from 'uuid'

import Button from '../button/Button'
import TextInput from '../inputs/TextInput'
import { lowerCase } from '../utils/utils.service'

interface IDropdownProps {
  text: string
  values: string[]
  maxHeight: string
  mainClassNames?: string
  dropdownClassNames?: string
  showSearchInput?: boolean
  style?: CSSProperties
  setValue?: Dispatch<SetStateAction<string>>
  onClick?: (item: string) => void
}

export default function Dropdown({
  text,
  values,
  maxHeight,
  mainClassNames,
  dropdownClassNames,
  showSearchInput,
  style,
  setValue,
  onClick
}: IDropdownProps) {
  const [dropdownItems, setDropdownItems] = useState<string[]>(values)
  const [inputText, setInputText] = useState<string>(text)
  // const dropdownRef = useRef<HTMLLIElement>(null)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  const onHandleSelect = (event: MouseEvent) => {
    const selectedItem: string = (event.target as HTMLLIElement).textContent as string
    setToggleDropdown(false)
    setInputText(selectedItem)
    setDropdownItems(values)
    setValue && setValue(selectedItem)
    onClick && onClick(selectedItem)
  }

  return (
    <div className={`w-full divide-y divide-gray-100 rounded border ${mainClassNames}`} style={style}>
      {!toggleDropdown && (
        <Button
          className="bg-teal flex w-full justify-between rounded px-3 py-2 text-white"
          label={
            <>
              <span className="truncate text-slate-900">{text}</span>
              {!toggleDropdown ? (
                <FaChevronDown className="float-right mt-1 h-4 fill-current text-slate-900" />
              ) : (
                <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-900" />
              )}
            </>
          }
          onClick={() => {
            setToggleDropdown(!toggleDropdown)
            setInputText(text)
            setDropdownItems(values)
          }}
        />
      )}

      {showSearchInput && toggleDropdown && (
        <div className="flex">
          <TextInput
            type="text"
            name="search"
            value={inputText}
            className="h-10 w-full items-center rounded pl-3 text-sm font-normal text-gray-600 focus:outline-none lg:text-base"
            placeholder="Search..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue: string = e.target.value
              setInputText(inputValue)
              const filtered: string[] = filter(dropdownItems, (item: string) => lowerCase(item).includes(lowerCase(inputValue)))
              setDropdownItems(filtered)
              if (!inputValue) {
                setDropdownItems(values)
              }
            }}
          />
          <div className="flex self-center" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <FaTimes className="mx-3 h-4 fill-current text-slate-900" />
          </div>
        </div>
      )}

      {toggleDropdown && (
        <ul
          className={`z-40 cursor-pointer overflow-y-scroll py-2 text-sm text-gray-700 dark:text-gray-200
              ${dropdownClassNames}`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {dropdownItems.map((value: string) => (
            <li key={uuid4()} onClick={onHandleSelect}>
              <div className="block px-4 py-2 text-slate-900 dark:hover:bg-gray-200">{value}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
