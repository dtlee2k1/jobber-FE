import { useState } from 'react'
import { IExperience, IPersonalInfoData } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import { useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

import PersonalInfo from './components/PersonalInfo'
import SellerExperienceFields from './components/SellerExperienceFields'

export default function AddSeller() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoData>({
    fullName: '',
    profilePicture: `${authUser.profilePicture}`,
    description: '',
    responseTime: '',
    oneliner: ''
  })
  const [experienceFields, setExperienceFields] = useState<IExperience[]>([
    {
      id: uuidv4(),
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    }
  ])

  return (
    <div className="relative w-full">
      <Breadcrumb breadCrumbItems={['Seller', 'Create profile']} />
      <div className="container relative mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0">
        {/* add circular loader  */}
        {/* {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-20">Please verify your email</span>
          </div>
        )} */}

        <div className="left-0 top-0 z-10 mt-4 block h-full bg-white">
          <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} personalInfoErrors={[]} />
          <SellerExperienceFields experienceFields={experienceFields} setExperienceFields={setExperienceFields} experienceErrors={[]} />
        </div>
      </div>
    </div>
  )
}
