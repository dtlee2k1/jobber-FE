import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { ILanguage } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import { languageLevel } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

interface ILanguageProps {
  languageEdit?: ILanguage
  languageFields: ILanguage[]
  languagesErrors: Partial<ILanguage>
  setLanguageFields: Dispatch<SetStateAction<ILanguage[]>>
  setShowLanguageEditForm?: Dispatch<SetStateAction<boolean>>
  setShowLanguageAddForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerLanguagesFields({ languageFields, setLanguageFields, languagesErrors }: ILanguageProps) {
  const handleLanguageFieldsChange = (e: React.ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement
    const data = [...languageFields]

    data[index][target.name] = target.value
    setLanguageFields(data)
  }

  const addLanguageFields = () => {
    const newField: ILanguage = {
      id: uuidv4(),
      language: '',
      level: 'Level'
    }
    setLanguageFields([...languageFields, newField])
  }

  const removeLanguageFields = (index: number) => {
    const data = [...languageFields]
    data.splice(index, 1)

    setLanguageFields(data)
  }

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Languages</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={addLanguageFields}
        />
      </div>

      {languageFields.map((field, index) => (
        <div key={`${field.id}`} className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-2">
          <div>
            <TextInput
              className={classNames('w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                'border-grey focus:outline-none': !languagesErrors.language,
                'border-red-600 bg-red-50 focus:border-red-600': languagesErrors.language
              })}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={languagesErrors.language}
              type="text"
              name="language"
              value={field.language}
              placeholder="Language"
              onChange={(e) => handleLanguageFieldsChange(e, index)}
            />
          </div>
          <div className="relative">
            <Dropdown
              maxHeight="300"
              mainClassNames={classNames(`absolute border ${index < languageFields.length - 1 ? 'z-50' : ''}`, {
                'border-red-600 bg-red-50 focus:border-red-600': languagesErrors.level,
                'bg-white border-grey focus:outline-none': !languagesErrors.level
              })}
              text={field.level}
              values={languageLevel()}
              onClick={(item: string) => {
                const data = [...languageFields]
                data[index]['level'] = item
                setLanguageFields(data)
              }}
            />
          </div>
          <div className="mb-8">
            {languageFields.length > 1 && (
              <Button
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => removeLanguageFields(index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
