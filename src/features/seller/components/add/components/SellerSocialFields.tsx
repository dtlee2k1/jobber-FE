import { Dispatch, SetStateAction } from 'react'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'

export interface ISocialLinksProps {
  socialFields: string[]
  type?: string
  setSocialFields: Dispatch<SetStateAction<string[]>>
  setShowSocialLinksAddForm?: Dispatch<SetStateAction<boolean>>
  setShowSocialLinksEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerSocialFields({ socialFields, setSocialFields }: ISocialLinksProps) {
  const handleSocialFieldsChange = (e: React.ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement
    const data = [...socialFields]
    data[index] = target.value
    setSocialFields(data)
  }

  const addSocialFields = () => {
    setSocialFields([...socialFields, ''])
  }

  const removeSocialFields = (index: number) => {
    const data = [...socialFields]
    data.splice(index, 1)

    setSocialFields(data)
  }
  return (
    <div className="flex w-full flex-col px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Social Links</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={addSocialFields}
        />
      </div>

      {socialFields.map((field, index) => (
        <div key={index} className="mb-4">
          <TextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Social media link"
            type="text"
            name="url"
            value={field}
            onChange={(e) => handleSocialFieldsChange(e, index)}
          />
          <div className="my-4">
            {socialFields.length > 1 && (
              <Button
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => removeSocialFields(index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
