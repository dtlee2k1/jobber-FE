import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { IExperience } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import TextInput from 'src/shared/inputs/TextInput'
import { yearsList } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

export interface IExperienceProps {
  selectedField?: IExperience
  experienceFields: IExperience[]
  experienceErrors: Partial<IExperience>
  setExperienceFields: Dispatch<SetStateAction<IExperience[]>>
  setShowExperienceAddForm?: Dispatch<SetStateAction<boolean>>
  setShowExperienceEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerExperienceFields({ experienceFields, setExperienceFields, experienceErrors }: IExperienceProps) {
  const handleExperienceFieldsChange = (e: React.ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement
    const data = [...experienceFields]

    if (target.name === 'currentlyWorkingHere') {
      data[index]['currentlyWorkingHere'] = target.checked
      updatePresentEndDate(data, index)
    } else {
      data[index][target.name] = target.value
    }
    setExperienceFields(data)
  }

  const handleAddExperienceFields = () => {
    const newField = {
      id: uuidv4(),
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    }
    setExperienceFields([...experienceFields, newField])
  }

  const handleRemoveExperienceFields = (index: number) => {
    const data = [...experienceFields]
    data.splice(index, 1)

    setExperienceFields(data)
  }

  const updatePresentEndDate = (data: IExperience[], index: number) => {
    const newData = [...data]
    const currentExperienceField = newData[index]

    if (currentExperienceField.currentlyWorkingHere) {
      currentExperienceField.endDate = 'Present'
    } else {
      currentExperienceField.endDate = 'End Year'
    }

    setExperienceFields(newData)
  }

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Experience</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={handleAddExperienceFields}
        />
      </div>

      {experienceFields?.map((input: IExperience, index) => (
        <div key={`${input.id}`} className="mb-8">
          <div className="mb-4">
            <TextInput
              className={classNames('w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                'border-grey focus:outline-none': !experienceErrors.title,
                'border-red-600 bg-red-50 focus:border-red-600': experienceErrors.title
              })}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={experienceErrors.title}
              name="title"
              value={input.title}
              onChange={(e: React.ChangeEvent) => handleExperienceFieldsChange(e, index)}
              placeholder="Title (E.g: CEO)"
            />
          </div>
          <div className="mb-4">
            <TextInput
              className={classNames('w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                'border-grey focus:outline-none': !experienceErrors.company,
                'border-red-600 bg-red-50 focus:border-red-600': experienceErrors.company
              })}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={experienceErrors.company}
              placeholder="Company name"
              name="company"
              value={input.company}
              onChange={(e: React.ChangeEvent) => handleExperienceFieldsChange(e, index)}
            />
          </div>
          <div className="mb-16 grid h-1/5 grid-cols-2 gap-x-2 gap-y-3">
            <div className="relative">
              <Dropdown
                text={input.startDate}
                onClick={(item: string) => {
                  const data = [...experienceFields]
                  data[index]['startDate'] = item
                  setExperienceFields && setExperienceFields(data)
                }}
                maxHeight="300"
                mainClassNames={classNames('absolute border', {
                  'border-red-600 bg-red-50 focus:border-red-600': experienceErrors.startDate,
                  'bg-white border-grey focus:outline-none': !experienceErrors.startDate
                })}
                values={yearsList(50)}
              />
            </div>
            <div
              className={classNames('relative', {
                'pointer-events-auto cursor-pointer': !input.currentlyWorkingHere,
                'pointer-events-none cursor-none': input.currentlyWorkingHere
              })}
            >
              <Dropdown
                text={input.endDate}
                onClick={(item: string) => {
                  const data = [...experienceFields]
                  data[index]['endDate'] = item
                  setExperienceFields && setExperienceFields(data)
                }}
                maxHeight="300"
                mainClassNames={classNames('absolute border', {
                  'border-red-600 bg-red-50 focus:border-red-600': experienceErrors.endDate,
                  'bg-white border-grey focus:outline-none': !experienceErrors.endDate
                })}
                values={yearsList(50)}
              />
            </div>
          </div>
          <div className="mb-4 mt-2 flex items-center">
            <TextInput
              id="default-checkbox"
              type="checkbox"
              name="currentlyWorkingHere"
              value={`${input.currentlyWorkingHere}`}
              checked={input.currentlyWorkingHere}
              onChange={(e: React.ChangeEvent) => handleExperienceFieldsChange(e, index)}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-normal">
              I am currently working here
            </label>
          </div>
          <div className="flex flex-col">
            <TextAreaInput
              className={classNames('block w-full rounded border p-2.5 text-sm text-gray-900', {
                'border-grey focus:border-grey': !experienceErrors.company,
                'border-red-600 bg-red-50 focus:border-red-600': experienceErrors.company
              })}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={experienceErrors.company}
              name="description"
              value={input.description}
              onChange={(e: React.ChangeEvent) => handleExperienceFieldsChange(e, index)}
              rows={5}
              placeholder="Write description..."
            />
          </div>
          <div className="mt-2">
            {experienceFields.length > 1 && (
              <Button
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => handleRemoveExperienceFields(index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
