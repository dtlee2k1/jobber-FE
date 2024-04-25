import { cloneDeep, filter } from 'lodash'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { IExperience } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import TextInput from 'src/shared/inputs/TextInput'
import { yearsList } from 'src/shared/utils/utils.service'

export interface IExperienceEditProps {
  type: string
  selectedExperience?: IExperience
  setShowExperienceAddForm?: Dispatch<SetStateAction<boolean>>
  setShowExperienceEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function ExperienceEditFields({
  type,
  selectedExperience,
  setShowExperienceAddForm,
  setShowExperienceEditForm
}: IExperienceEditProps) {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext)

  const [experienceItem, setExperienceItem] = useState<IExperience>({
    title: selectedExperience?.title ?? '',
    company: selectedExperience?.company ?? '',
    startDate: selectedExperience?.startDate ?? 'Start Year',
    endDate: selectedExperience?.endDate ?? 'End Year',
    description: selectedExperience?.description ?? '',
    currentlyWorkingHere: selectedExperience?.currentlyWorkingHere ?? false
  })

  const onHandleUpdate = () => {
    if (type === 'add') {
      const newItem: IExperience = {
        title: experienceItem.title,
        company: experienceItem.company,
        startDate: experienceItem.startDate,
        endDate: experienceItem.endDate,
        description: experienceItem.description,
        currentlyWorkingHere: experienceItem.currentlyWorkingHere
      }

      const clonedExperience: IExperience[] = cloneDeep(sellerProfile.experience)
      clonedExperience.push(newItem)
      setSellerProfile && setSellerProfile({ ...sellerProfile, experience: clonedExperience })
      setShowExperienceAddForm && setShowExperienceAddForm(false)
    } else {
      const updatedItem: IExperience = {
        _id: selectedExperience?._id,
        title: experienceItem.title,
        company: experienceItem.company,
        startDate: experienceItem.startDate,
        endDate: experienceItem.endDate,
        description: experienceItem.description,
        currentlyWorkingHere: experienceItem.currentlyWorkingHere
      }
      const clonedExperience: IExperience[] = cloneDeep(sellerProfile.experience)
      const updatedExperience = clonedExperience.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      const filteredExperience: IExperience[] = filter(updatedExperience, (item: IExperience) => item.title !== '' && item.company !== '')

      if (setSellerProfile && setShowExperienceEditForm) {
        setSellerProfile({ ...sellerProfile, experience: filteredExperience })
        setShowExperienceEditForm(false)
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 px-3 md:mb-16">
        <TextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Title (E.g: CEO)"
          type="text"
          name="title"
          value={experienceItem.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceItem({ ...experienceItem, title: e.target.value })}
        />
        <TextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Company name"
          type="text"
          name="company"
          value={experienceItem.company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceItem({ ...experienceItem, company: e.target.value })}
        />
        <div className="grid h-1/5 grid-cols-2 gap-x-2 gap-y-3">
          <div className="relative">
            <Dropdown
              text={experienceItem.startDate}
              maxHeight="300"
              mainClassNames="absolute bg-white z-50"
              values={yearsList(50)}
              onClick={(value: string) => {
                setExperienceItem((experience) => ({ ...experience, startDate: value }))
              }}
            />
          </div>
          <div
            className="relative"
            style={{
              cursor: `${experienceItem.currentlyWorkingHere ? 'none' : 'pointer'}`,
              pointerEvents: `${experienceItem.currentlyWorkingHere ? 'none' : 'auto'}`
            }}
          >
            <Dropdown
              text={experienceItem.endDate}
              maxHeight="300"
              mainClassNames="absolute bg-white z-50"
              values={yearsList(50)}
              onClick={(value: string) => {
                setExperienceItem((experience) => ({ ...experience, endDate: value }))
              }}
            />
          </div>
        </div>
        <div className="mb-4 mt-2 flex items-center">
          <TextInput
            id="default-checkbox"
            type="checkbox"
            name="currentlyWorkingHere"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
            value={`${experienceItem.currentlyWorkingHere}`}
            checked={experienceItem.currentlyWorkingHere}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setExperienceItem({
                ...experienceItem,
                endDate: e.target.checked ? 'Present' : 'End Year',
                currentlyWorkingHere: e.target.checked
              })
            }}
          />
          <label htmlFor="default-checkbox" className="ml-2 text-sm font-normal">
            I am currently working here
          </label>
        </div>
        <div className="mb-5 flex items-center">
          <TextAreaInput
            className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
            placeholder="Write description..."
            name="description"
            value={experienceItem.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExperienceItem({ ...experienceItem, description: e.target.value })}
            rows={5}
          />
        </div>
      </div>
      <div className="z-20 mx-3 my-4 mt-10 flex cursor-pointer justify-start md:z-0 md:mt-0">
        <Button
          disabled={
            (experienceItem.startDate === 'Start Year' ||
              experienceItem.endDate === 'End Year' ||
              !experienceItem.title ||
              !experienceItem.company ||
              !experienceItem.description) &&
            type === 'add'
          }
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${
            (experienceItem.startDate === 'Start Year' ||
              experienceItem.endDate === 'End Year' ||
              !experienceItem.title ||
              !experienceItem.company ||
              !experienceItem.description) &&
            type === 'add'
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer'
          }`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            type === 'add' && setShowExperienceAddForm && setShowExperienceAddForm(false)
            type === 'edit' && setShowExperienceEditForm && setShowExperienceEditForm(false)
          }}
        />
      </div>
    </div>
  )
}
