import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { IEducation } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import { countriesList, degreeList, yearsList } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

interface IEducationProps {
  selectedField?: IEducation
  educationFields: IEducation[]
  educationErrors: Partial<IEducation>
  setEducationFields: Dispatch<SetStateAction<IEducation[]>>
  setShowEducationAddForm?: Dispatch<SetStateAction<boolean>>
  setShowEducationEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerEducationFields({ educationFields, setEducationFields, educationErrors }: IEducationProps) {
  const handleEducationFieldsChange = (e: React.ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement
    const data = [...educationFields]
    data[index][target.name] = target.value
    setEducationFields(data)
  }

  const handleAddEducationFields = () => {
    const newField = {
      id: uuidv4(),
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    }
    setEducationFields([...educationFields, newField])
  }

  const handleRemoveEducationFields = (index: number) => {
    const data = [...educationFields]
    data.splice(index, 1)

    setEducationFields(data)
  }
  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Education</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={handleAddEducationFields}
        />
      </div>

      {educationFields.map((field, index) => (
        <div key={`${field.id}`} className="mb-8">
          <div className="relative mb-4">
            <TextInput
              className={classNames('w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                'border-grey focus:outline-none': !educationErrors.university,
                'border-red-600 bg-red-50 focus:border-red-600': educationErrors.university
              })}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={educationErrors.university}
              placeholder="University/College Name"
              type="text"
              name="university"
              value={field.university}
              onChange={(e) => handleEducationFieldsChange(e, index)}
            />
          </div>
          <div className="relative h-[55px]">
            <Dropdown
              text={field.country}
              maxHeight="300"
              showSearchInput={true}
              mainClassNames={classNames('absolute border z-40', {
                'border-red-600 bg-red-50 focus:border-red-600': educationErrors.country,
                'bg-white border-grey focus:outline-none': !educationErrors.country
              })}
              values={countriesList()}
              onClick={(item: string) => {
                const data = [...educationFields]
                data[index]['country'] = item
                setEducationFields(data)
              }}
            />
          </div>
          <div className="mt-4 grid h-1/5 grid-cols-4 gap-x-2 gap-y-3">
            <div className="relative">
              <Dropdown
                text={field.title}
                maxHeight="300"
                mainClassNames={classNames('absolute border z-30', {
                  'border-red-600 bg-red-50 focus:border-red-600': educationErrors.title,
                  'bg-white border-grey focus:outline-none': !educationErrors.title
                })}
                values={degreeList()}
                onClick={(item: string) => {
                  const data = [...educationFields]
                  data[index]['title'] = item
                  setEducationFields(data)
                }}
              />
            </div>
            <div className="col-span-2">
              <TextInput
                className={classNames('w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                  'border-grey focus:outline-none': !educationErrors.major,
                  'border-red-600 bg-red-50 focus:border-red-600': educationErrors.major
                })}
                classNameError="min-h-[1rem] text-xs text-red-600"
                errorMessage={educationErrors.major}
                placeholder="Major e.g: Software Engineering"
                type="text"
                name="major"
                value={field.major}
                onChange={(e) => handleEducationFieldsChange(e, index)}
              />
            </div>
            <div className="relative">
              <Dropdown
                text={field.year}
                maxHeight="300"
                mainClassNames={classNames('absolute border z-30', {
                  'border-red-600 bg-red-50 focus:border-red-600': educationErrors.year,
                  'bg-white border-grey focus:outline-none': !educationErrors.year
                })}
                values={yearsList(30)}
                onClick={(item: string) => {
                  const data = [...educationFields]
                  data[index]['year'] = item
                  setEducationFields(data)
                }}
              />
            </div>

            <div className="mb-2">
              {educationFields.length > 1 && (
                <Button
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  label="Delete"
                  onClick={() => handleRemoveEducationFields(index)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
