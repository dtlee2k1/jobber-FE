import { useContext, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { IExperience } from 'src/interfaces/seller.interface'
import { v4 as uuidv4 } from 'uuid'

import ExperienceEditFields from './ExperienceEditFields'

export default function Experience() {
  const { sellerProfile, showEditIcons } = useContext(SellerContext)

  const [showExperienceAddForm, setShowExperienceAddForm] = useState<boolean>(false)
  const [showExperienceEditForm, setShowExperienceEditForm] = useState<boolean>(false)
  const [selectedExperience, setSelectedExperience] = useState<IExperience>()

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">EXPERIENCE</h4>
        {showEditIcons && !showExperienceAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => {
              setShowExperienceAddForm(!showExperienceAddForm)
              setShowExperienceEditForm(false)
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showExperienceAddForm && (
          <li className="flex justify-between">
            <ExperienceEditFields type="add" setShowExperienceAddForm={setShowExperienceAddForm} />
          </li>
        )}

        {sellerProfile.experience.map((experience) => (
          <li key={uuidv4()} className="mb-1 flex justify-between">
            {!showExperienceEditForm && (
              <div className="col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base">
                <div className="mr-3 font-bold ">{experience.title}</div>
                <div className="mr-3 font-normal">{experience.company}</div>
                <div className="mr-3 font-normal">
                  {experience.startDate} - {experience.endDate}
                </div>
              </div>
            )}

            {showExperienceEditForm && selectedExperience?._id === experience._id && (
              <ExperienceEditFields
                type="edit"
                setShowExperienceEditForm={setShowExperienceEditForm}
                selectedExperience={selectedExperience}
              />
            )}

            {!showExperienceEditForm && showEditIcons && (
              <div className="mr-4">
                <FaPencilAlt
                  onClick={() => {
                    setSelectedExperience(experience)
                    setShowExperienceEditForm(true)
                    setShowExperienceAddForm(false)
                  }}
                  size="12"
                  className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
