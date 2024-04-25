import { cloneDeep, filter } from 'lodash'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'

interface ISkillEditProps {
  type: string
  selectedSkill?: string
  setShowSkillEditForm?: Dispatch<SetStateAction<boolean>>
  setShowSkillAddForm?: Dispatch<SetStateAction<boolean>>
}

export default function SkillsEditFields({ type, selectedSkill, setShowSkillAddForm, setShowSkillEditForm }: ISkillEditProps) {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext)

  const [skill, setSkill] = useState<string>(selectedSkill ?? '')

  const onHandleUpdate = () => {
    if (type === 'add') {
      const clonedSkills = cloneDeep(sellerProfile.skills)
      clonedSkills.push(skill)

      if (setSellerProfile && setShowSkillAddForm) {
        setSellerProfile({ ...sellerProfile, skills: clonedSkills })
        setShowSkillAddForm(false)
      }
    } else {
      const itemIndex = sellerProfile.skills.findIndex((skill) => skill === selectedSkill)
      const clonedSkills = cloneDeep(sellerProfile.skills)
      clonedSkills[itemIndex] = skill
      const filteredSkills = filter(clonedSkills, (item: string) => item !== '')

      if (filteredSkills.length > 0 && setSellerProfile && setShowSkillEditForm) {
        setSellerProfile({ ...sellerProfile, skills: filteredSkills })
        setShowSkillEditForm(false)
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 px-3">
        <TextInput
          className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Skill E.g: Front End Developer"
          type="text"
          name="skill"
          value={skill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSkill(e.target.value)}
        />
      </div>
      <div className="z-20 mx-3 my-2 flex cursor-pointer justify-start md:z-0 md:mt-0">
        <Button
          disabled={!skill && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white
          hover:bg-sky-400 focus:outline-none md:py-2 ${!skill && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            type === 'add' && setShowSkillAddForm && setShowSkillAddForm(false)
            type === 'edit' && setShowSkillEditForm && setShowSkillEditForm(false)
          }}
        />
      </div>
    </div>
  )
}
