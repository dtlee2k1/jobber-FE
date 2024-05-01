import { Dispatch, SetStateAction } from 'react'
import { ICreateGig } from 'src/interfaces/gig.interface'
import TextInput from 'src/shared/inputs/TextInput'
import { v4 as uuidv4 } from 'uuid'

interface ITagsInputProps {
  title: string
  placeholder: string
  gigInfo: ICreateGig
  tags: string[]
  itemName: string
  itemInput: string
  className: string
  classNameError?: string
  errorMessage?: string
  counterText: string
  setItems: Dispatch<SetStateAction<string[]>>
  setItemInput: Dispatch<SetStateAction<string>>
  setGigInfo: Dispatch<SetStateAction<ICreateGig>>
}

export default function TagsInput({
  title,
  placeholder,
  gigInfo,
  tags,
  itemName,
  itemInput,
  counterText,
  className,
  classNameError,
  errorMessage,
  setItems,
  setItemInput,
  setGigInfo
}: ITagsInputProps) {
  const maxTagCount = 10

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemInput(event.target.value)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, input: string, tagsList: string[]) => {
    const { key } = event
    const trimmedInput: string = input.trim()
    if (!trimmedInput) {
      return
    }

    if (tagsList.length + 1 <= maxTagCount) {
      if ((key === ',' || key === 'Enter') && trimmedInput.length && !tagsList.includes(trimmedInput)) {
        event.preventDefault()
        setItems((prev: string[]) => [...prev, trimmedInput])
        setItemInput('')
        const gigInfoList: string[] = gigInfo[`${itemName}`] as string[]
        setGigInfo({ ...gigInfo, [`${itemName}`]: [...gigInfoList, trimmedInput] })
      }
    }
  }

  const deleteTag = (index: number): void => {
    setItems((prev: string[]) => prev.filter((_, i: number) => i !== index))
    const gigInfoList: string[] = gigInfo[`${itemName}`] as string[]
    setGigInfo({ ...gigInfo, [`${itemName}`]: gigInfoList.filter((_, i: number) => i !== index) })
  }

  return (
    <div className="mb-6 grid md:grid-cols-5">
      <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
        {title}
        <sup className="top-[-0.3em] text-base text-red-500">*</sup>
      </div>
      <div className="col-span-4 md:w-11/12 lg:w-8/12">
        <div className="flex w-full flex-wrap py-[4px]">
          {tags.map((tag, index) => (
            <div
              key={uuidv4()}
              className="my-[2px] mr-1 flex items-center whitespace-nowrap rounded-[50px] bg-sky-500 px-4 text-sm font-bold text-white"
            >
              {tag}
              <span className="flex cursor-pointer p-[6px] text-white" onClick={() => deleteTag(index)}>
                x
              </span>
            </div>
          ))}
        </div>
        <TextInput
          type="text"
          name={title}
          value={itemInput}
          className={className}
          placeholder={placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(event, itemInput, tags)}
        />
        <span className="flex text-xs text-[#95979d]">
          {errorMessage && <div className={classNameError}>{errorMessage}</div>}
          <span className="ml-auto">
            {maxTagCount - tags.length} {counterText}
          </span>
        </span>
      </div>
    </div>
  )
}
