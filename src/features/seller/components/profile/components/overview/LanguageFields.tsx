import { cloneDeep, filter } from 'lodash'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { ILanguage } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import { languageLevel } from 'src/shared/utils/utils.service'

interface ILanguageEditFieldsProps {
  type: string
  selectedLanguage?: ILanguage
  setShowLanguageEditForm?: Dispatch<SetStateAction<boolean>>
  setShowLanguageAddForm?: Dispatch<SetStateAction<boolean>>
}

export default function LanguageFields({
  type,
  selectedLanguage,
  setShowLanguageAddForm,
  setShowLanguageEditForm
}: ILanguageEditFieldsProps) {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext)
  const [language, setLanguage] = useState<string>(selectedLanguage ? `${selectedLanguage.language}` : '')
  const [level, setLevel] = useState<string>(selectedLanguage ? `${selectedLanguage.level}` : 'Level')

  const onHandleUpdate = () => {
    if (type === 'add') {
      const newItem: ILanguage = {
        language,
        level
      }

      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile.languages)
      clonedLanguages.push(newItem)
      setSellerProfile && setSellerProfile({ ...sellerProfile, languages: clonedLanguages })
      setShowLanguageAddForm && setShowLanguageAddForm(false)
    } else {
      const updatedItem: ILanguage = { language, level, _id: selectedLanguage?._id }
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile.languages)
      const updatedLanguages = clonedLanguages.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      const filteredLanguages: ILanguage[] = filter(updatedLanguages, (item: ILanguage) => item.language !== '' && item.level !== 'Level')
      if (filteredLanguages.length > 0 && setSellerProfile && setShowLanguageEditForm) {
        setSellerProfile({ ...sellerProfile, languages: filteredLanguages })
        setShowLanguageEditForm(false)
      } else {
        console.log('You need at least one language')
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 grid grid-cols-1 gap-y-3 px-3 md:grid-cols-2 md:gap-x-2">
        <div>
          <TextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Language"
            type="text"
            name="language"
            value={language}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value)}
          />
        </div>
        <div className="relative">
          <Dropdown text={level} onClick={setLevel} maxHeight="300" mainClassNames="absolute bg-white z-50" values={languageLevel()} />
        </div>
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <Button
          disabled={type === 'add' && (level === 'Level' || !language)}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2   ${(level === 'Level' || !language) && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            type === 'add' && setShowLanguageAddForm && setShowLanguageAddForm(false)
            type === 'edit' && setShowLanguageEditForm && setShowLanguageEditForm(false)
          }}
        />
      </div>
    </div>
  )
}
