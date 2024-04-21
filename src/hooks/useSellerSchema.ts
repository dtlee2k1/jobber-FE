import { useState } from 'react'
import { IEducation, IExperience, ILanguage, IPersonalInfoData } from 'src/interfaces/seller.interface'
import {
  ArrayOfEducationSchema,
  ArrayOfExperienceSchema,
  ArrayOfLanguagesSchema,
  ArrayOfSkillsSchema,
  personalInfoSchema
} from 'src/schemes/seller.scheme'

interface IUseSellerSchema {
  personalInfo: IPersonalInfoData
  experienceFields: IExperience[]
  educationFields: IEducation[]
  skillsFields: string[]
  languageFields: ILanguage[]
}

export function useSellerSchema({ personalInfo, experienceFields, educationFields, skillsFields, languageFields }: IUseSellerSchema) {
  const [personalInfoErrors, setPersonalInfoErrors] = useState<Partial<IPersonalInfoData>>({})
  const [experienceErrors, setExperienceErrors] = useState<Partial<IExperience>>({})
  const [educationErrors, setEducationErrors] = useState<Partial<IEducation>>({})
  const [skillsErrors, setSkillsErrors] = useState<string[]>([])
  const [languagesErrors, setLanguagesErrors] = useState<Partial<ILanguage>>({})

  async function schemaValidation(): Promise<boolean> {
    await personalInfoSchema
      .validate(personalInfo, { abortEarly: false })
      .then(() => setPersonalInfoErrors({}))
      .catch((error) => {
        const errorsObject = error.errors.reduce((acc: IPersonalInfoData, curr: { [key: string]: string }) => {
          const key = Object.keys(curr)[0]
          const value = curr[key]
          acc[key] = value
          return acc
        }, {})
        setPersonalInfoErrors(errorsObject)
      })

    await ArrayOfExperienceSchema.validate(experienceFields, { abortEarly: false })
      .then(() => setExperienceErrors({}))
      .catch((error) => {
        const errorsObject = error.errors.reduce((acc: IExperience, curr: { [key: string]: string }) => {
          const key = Object.keys(curr)[0]
          const value = curr[key]
          acc[key] = value
          return acc
        }, {})
        setExperienceErrors(errorsObject)
      })

    await ArrayOfEducationSchema.validate(educationFields, { abortEarly: false })
      .then(() => setEducationErrors({}))
      .catch((error) => {
        const errorsObject = error.errors.reduce((acc: IEducation, curr: { [key: string]: string }) => {
          const key = Object.keys(curr)[0]
          const value = curr[key]
          acc[key] = value
          return acc
        }, {})
        setEducationErrors(errorsObject)
      })

    await ArrayOfSkillsSchema.validate(skillsFields, { abortEarly: false })
      .then(() => setSkillsErrors([]))
      .catch((error) => {
        setSkillsErrors([...error.errors])
      })

    await ArrayOfLanguagesSchema.validate(languageFields, { abortEarly: false })
      .then(() => setLanguagesErrors({}))
      .catch((error) => {
        const errorsObject = error.errors.reduce((acc: ILanguage, curr: { [key: string]: string }) => {
          const key = Object.keys(curr)[0]
          const value = curr[key]
          acc[key] = value
          return acc
        }, {})
        setLanguagesErrors(errorsObject)
      })

    const isPersonalInfoValid = await personalInfoSchema.isValid(personalInfo, { abortEarly: false })
    const isExperienceValid = await ArrayOfExperienceSchema.isValid(experienceFields, { abortEarly: false })
    const isEducationValid = await ArrayOfEducationSchema.isValid(educationFields, { abortEarly: false })
    const isSkillValid = await ArrayOfSkillsSchema.isValid(skillsFields, { abortEarly: false })
    const isLanguageValid = await ArrayOfLanguagesSchema.isValid(languageFields, { abortEarly: false })

    return isPersonalInfoValid && isExperienceValid && isEducationValid && isSkillValid && isLanguageValid
  }

  return { schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors }
}
