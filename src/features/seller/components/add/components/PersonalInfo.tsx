import classNames from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { IPersonalInfoData } from 'src/interfaces/seller.interface'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import TextInput from 'src/shared/inputs/TextInput'

interface IPersonalInfoProps {
  personalInfo: IPersonalInfoData
  setPersonalInfo: Dispatch<SetStateAction<IPersonalInfoData>>
  personalInfoErrors: Partial<IPersonalInfoData>
}

export default function PersonalInfo({ personalInfo, setPersonalInfo, personalInfoErrors }: IPersonalInfoProps) {
  const [allowedInfoLength, setAllowedInfoLength] = useState({
    description: '600/600',
    oneliner: '70/70'
  })

  const maxDescriptionCharacters = 600
  const maxOnelinerCharacters = 70

  return (
    <div className="border-grey border-b p-6">
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Fullname<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <TextInput
            className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
              'border-grey focus:outline-none': !personalInfoErrors.fullName,
              'border-red-600 bg-red-50 focus:border-red-600': personalInfoErrors.fullName
            })}
            classNameError="min-h-[1rem] text-xs text-red-600"
            errorMessage={personalInfoErrors.fullName}
            type="text"
            name="fullname"
            value={personalInfo.fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="mt-6 pb-2 text-base font-medium md:mt-0">
          Oneliner<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <TextInput
            className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
              'border-grey focus:outline-none': !personalInfoErrors.oneliner,
              'border-red-600 bg-red-50 focus:border-red-600': personalInfoErrors.oneliner
            })}
            classNameError="min-h-[1rem] text-xs text-red-600"
            errorMessage={personalInfoErrors.oneliner}
            type="text"
            name="oneliner"
            value={personalInfo.oneliner}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const onelinerValue = e.target.value
              const counter = maxOnelinerCharacters - onelinerValue.length
              setPersonalInfo({ ...personalInfo, oneliner: onelinerValue })
              setAllowedInfoLength({ ...allowedInfoLength, oneliner: `${counter}/70` })
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (personalInfo.oneliner.length === maxOnelinerCharacters && e.key !== 'Backspace') {
                e.preventDefault()
              }
            }}
            placeholder="E.g. Expert Mobile and Web Developer"
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedInfoLength.oneliner} Characters</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <TextAreaInput
            className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
              'border-grey focus:outline-none': !personalInfoErrors.description,
              'border-red-600 bg-red-50 focus:border-red-600': personalInfoErrors.description
            })}
            classNameError="min-h-[1rem] text-xs text-red-600"
            errorMessage={personalInfoErrors.description}
            name="description"
            value={personalInfo.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const descriptionValue = e.target.value
              const counter = maxDescriptionCharacters - descriptionValue.length
              setPersonalInfo({ ...personalInfo, description: descriptionValue })
              setAllowedInfoLength({ ...allowedInfoLength, description: `${counter}/600` })
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (personalInfo.description.length === maxDescriptionCharacters && e.key !== 'Backspace') {
                e.preventDefault()
              }
            }}
            rows={5}
          />
          <span className="flex justify-end text-xs text-[#95979d]">{allowedInfoLength.description} Characters</span>
        </div>
      </div>
      <div className="mb-6 grid md:grid-cols-5">
        <div className="pb-2 text-base font-medium">
          Response Time<sup className="top-[-0.3em] text-base text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <TextInput
            className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
              'border-grey focus:outline-none': !personalInfoErrors.responseTime,
              'border-red-600 bg-red-50 focus:border-red-600': personalInfoErrors.responseTime
            })}
            classNameError="min-h-[1rem] text-xs text-red-600"
            errorMessage={personalInfoErrors.responseTime}
            type="number"
            name="responseTime"
            placeholder="E.g. 1"
            value={personalInfo.responseTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPersonalInfo({ ...personalInfo, responseTime: parseInt(e.target.value) > 0 ? e.target.value : '' })
            }
          />
        </div>
      </div>
    </div>
  )
}
