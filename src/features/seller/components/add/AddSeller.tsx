import { useState } from 'react'
import { ICertificate, IEducation, IExperience, ILanguage, IPersonalInfoData } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import { useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

import PersonalInfo from './components/PersonalInfo'
import SellerCertificateFields from './components/SellerCertificateFields'
import SellerEducationFields from './components/SellerEducationFields'
import SellerExperienceFields from './components/SellerExperienceFields'
import SellerLanguagesFields from './components/SellerLanguagesFields'
import SellerSkillFields from './components/SellerSkillFields'
import SellerSocialFields from './components/SellerSocialFields'

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

  const [educationFields, setEducationFields] = useState<IEducation[]>([
    {
      id: uuidv4(),
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    }
  ])

  const [skillsFields, setSkillsFields] = useState<string[]>([''])
  const [languageFields, setLanguageFields] = useState<ILanguage[]>([
    {
      id: uuidv4(),
      language: '',
      level: 'Level'
    }
  ])
  const [certificateFields, setCertificateFields] = useState<ICertificate[]>([
    {
      id: uuidv4(),
      name: '',
      from: '',
      year: 'Year'
    }
  ])
  const [socialFields, setSocialFields] = useState<string[]>([''])

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
          <SellerEducationFields educationFields={educationFields} setEducationFields={setEducationFields} educationErrors={[]} />
          <SellerSkillFields skillsFields={skillsFields} setSkillsFields={setSkillsFields} skillsErrors={[]} />
          <SellerLanguagesFields languageFields={languageFields} setLanguageFields={setLanguageFields} languagesErrors={[]} />
          <SellerCertificateFields certificatesFields={certificateFields} setCertificatesFields={setCertificateFields} />
          <SellerSocialFields socialFields={socialFields} setSocialFields={setSocialFields} />
        </div>
      </div>
    </div>
  )
}
