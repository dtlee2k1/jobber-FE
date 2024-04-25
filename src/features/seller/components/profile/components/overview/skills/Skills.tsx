import { Fragment, useContext, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { v4 as uuidv4 } from 'uuid'

import SkillsEditFields from './SkillsEditFields'

export default function Skills() {
  const { sellerProfile, showEditIcons } = useContext(SellerContext)

  const [showSkillAddForm, setShowSkillAddForm] = useState<boolean>(false)
  const [showSkillEditForm, setShowSkillEditForm] = useState<boolean>(false)
  const [showSkillEditIcon, setShowSkillEditIcon] = useState<boolean>(false)
  const [selectedSkill, setSelectedSkill] = useState<string>('')

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">SKILLS</h4>
        {showEditIcons && !showSkillAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => {
              setShowSkillAddForm(true)
              setShowSkillEditForm(false)
              setShowSkillEditIcon(false)
            }}
          >
            Add New
          </span>
        )}
      </div>
      <div className="mb-0 py-1.5">
        {showSkillAddForm && <SkillsEditFields type="add" setShowSkillAddForm={setShowSkillAddForm} />}
        {showSkillEditForm && <SkillsEditFields type="edit" setShowSkillEditForm={setShowSkillEditForm} selectedSkill={selectedSkill} />}

        {!showSkillAddForm && (
          <div className="flex min-h-full flex-wrap gap-x-4 gap-y-5 px-2 py-4">
            {sellerProfile.skills.map((tag) => (
              <Fragment key={uuidv4()}>
                {!showSkillEditForm && (
                  <div
                    className="relative max-w-40 cursor-pointer truncate rounded-md border bg-[#edeef3] px-3 py-2 text-center"
                    onMouseEnter={() => {
                      setShowSkillEditIcon(true)
                      setSelectedSkill(tag)
                    }}
                    onMouseLeave={() => {
                      setShowSkillEditIcon(false)
                      setSelectedSkill('')
                    }}
                  >
                    <span className="left-0 top-0 h-full w-full text-sm font-bold text-[#55545b]">{tag}</span>
                    {showEditIcons && showSkillEditIcon && selectedSkill === tag && (
                      <span
                        onClick={() => {
                          setShowSkillAddForm(false)
                          setShowSkillEditForm(true)
                          setShowSkillEditIcon(false)
                          setSelectedSkill(tag)
                        }}
                        className="absolute left-0 top-0 flex h-full w-full cursor-pointer justify-center bg-white px-4 py-3"
                      >
                        <FaPencilAlt size="13" />
                      </span>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
