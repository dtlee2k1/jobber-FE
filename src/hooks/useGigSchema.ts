import { useState } from 'react'
import { IValidationErrors } from 'src/interfaces/utils.interface'
import { ObjectSchema } from 'yup'

import { ICreateGig } from '../interfaces/gig.interface'

interface IUseGigSchema {
  schema: ObjectSchema<ICreateGig | any>
  gigInfo: ICreateGig
}

const useGigSchema = ({ schema, gigInfo }: IUseGigSchema) => {
  const [validationErrors, setValidationErrors] = useState<Partial<ICreateGig>>({})

  async function schemaValidation(): Promise<boolean> {
    await schema
      .validate(gigInfo, { abortEarly: false })
      .then(() => setValidationErrors({}))
      .catch((err) => {
        const errorsObject = err.errors.reduce((acc: IValidationErrors, curr: { [key: string]: string }) => {
          const key = Object.keys(curr)[0]
          const value = curr[key]
          acc[key] = value
          return acc
        }, {})

        setValidationErrors(errorsObject)
      })
    const validation: boolean = await schema.isValid(gigInfo, { abortEarly: false })
    return validation
  }
  return { schemaValidation, validationErrors }
}

export { useGigSchema }
