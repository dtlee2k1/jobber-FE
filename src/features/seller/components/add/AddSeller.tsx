import { filter } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer'
import { useSellerSchema } from 'src/hooks/useSellerSchema'
import { IBuyerDocument } from 'src/interfaces/buyer.interface'
import { ICertificate, IEducation, IExperience, ILanguage, IPersonalInfoData, ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { IResponse } from 'src/interfaces/utils.interface'
import { useCreateSellerMutation } from 'src/services/seller.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { lowerCase } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

import { addSeller } from '../../reducers/seller.reducer'
import PersonalInfo from './components/PersonalInfo'
import SellerCertificateFields from './components/SellerCertificateFields'
import SellerEducationFields from './components/SellerEducationFields'
import SellerExperienceFields from './components/SellerExperienceFields'
import SellerLanguagesFields from './components/SellerLanguagesFields'
import SellerSkillFields from './components/SellerSkillFields'
import SellerSocialFields from './components/SellerSocialFields'

export default function AddSeller() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const buyer = useAppSelector((state: IReduxState) => state.buyer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createSeller, { isLoading }] = useCreateSellerMutation()

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

  const { schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors } = useSellerSchema({
    personalInfo,
    experienceFields,
    educationFields,
    skillsFields,
    languageFields
  })

  const onCreateSeller = async () => {
    try {
      const isValid = await schemaValidation()
      if (!isValid) {
        return
      }

      // Filter all remaining non-validated fields
      const skills = filter(skillsFields, (field) => field !== '')
      const socialLinks = filter(socialFields, (field) => field !== '')
      const certificates = certificateFields.map((field) => {
        field.year = field.year === 'Year' ? '' : field.year
        return field
      })

      const sellerData: ISellerDocument = {
        email: `${authUser.email}`,
        profilePublicId: `${authUser.profilePublicId}`,
        profilePicture: `${authUser.profilePicture}`,
        fullName: personalInfo.fullName,
        description: personalInfo.description,
        country: `${authUser.country}`,
        skills,
        oneliner: personalInfo.oneliner,
        languages: languageFields,
        responseTime: parseInt(personalInfo.responseTime),
        experience: experienceFields,
        education: educationFields,
        socialLinks,
        certificates
      }

      const updatedBuyer: IBuyerDocument = { ...buyer, isSeller: true }
      const result: IResponse = await createSeller(sellerData).unwrap()

      dispatch(addBuyer(updatedBuyer))
      dispatch(addSeller(result.seller))
      navigate(`/seller_profile/${lowerCase(`${authUser.username}`)}/${result.seller?._id}/edit`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative w-full">
      <Breadcrumb breadCrumbItems={['Seller', 'Create profile']} />
      <div className="container relative mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0">
        {isLoading && <CircularPageLoader />}
        {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-20">Please verify your email</span>
          </div>
        )}

        <div className="left-0 top-0 z-10 mt-4 block h-full bg-white">
          <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} personalInfoErrors={personalInfoErrors} />
          <SellerExperienceFields
            experienceFields={experienceFields}
            setExperienceFields={setExperienceFields}
            experienceErrors={experienceErrors}
          />
          <SellerEducationFields
            educationFields={educationFields}
            setEducationFields={setEducationFields}
            educationErrors={educationErrors}
          />
          <SellerSkillFields skillsFields={skillsFields} setSkillsFields={setSkillsFields} skillsErrors={skillsErrors} />
          <SellerLanguagesFields languageFields={languageFields} setLanguageFields={setLanguageFields} languagesErrors={languagesErrors} />
          <SellerCertificateFields certificatesFields={certificateFields} setCertificatesFields={setCertificateFields} />
          <SellerSocialFields socialFields={socialFields} setSocialFields={setSocialFields} />
          <div className="flex justify-end p-6">
            <Button
              onClick={onCreateSeller}
              className="rounded bg-sky-500 px-8 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base"
              label="Create Profile"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
