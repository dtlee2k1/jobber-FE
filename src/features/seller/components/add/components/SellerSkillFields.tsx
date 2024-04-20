import { Dispatch, SetStateAction } from 'react'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'

interface ISkillProps {
  type?: string
  selectedField?: string[]
  skillsFields: string[]
  skillsErrors?: string[]
  setSkillsFields: Dispatch<SetStateAction<string[]>>
  setShowSkillEditForm?: Dispatch<SetStateAction<boolean>>
  setShowSkillAddForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerSkillFields({ skillsFields, setSkillsFields }: ISkillProps) {
  const handleAddSkillFields = () => {
    setSkillsFields([...skillsFields, ''])
  }

  const handleRemoveSkillFields = (index: number) => {
    const data = [...skillsFields]
    data.splice(index, 1)

    setSkillsFields(data)
  }

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Skills</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={handleAddSkillFields}
        />
      </div>

      {skillsFields.map((field, index) => (
        <div key={index} className="mb-8">
          <TextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Skill E.g: Front End Developer"
            type="text"
            name="skill"
            value={field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const data = [...skillsFields]
              data[index] = e.target.value
              setSkillsFields(data)
            }}
          />
          <div className="my-3">
            {skillsFields.length > 1 && (
              <Button
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => handleRemoveSkillFields(index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
