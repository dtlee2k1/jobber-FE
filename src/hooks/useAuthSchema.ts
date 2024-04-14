import { useState } from 'react'
import { IUseAuthSchema } from 'src/interfaces/auth.interface'
import { IValidationErrors } from 'src/interfaces/utils.interface'

export function useAuthSchema({ schema, userInfo }: IUseAuthSchema) {
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>({})

  const schemaValidation = async () => {
    await schema
      .validate(userInfo, { abortEarly: false })
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

    const validation: boolean = await schema.isValid(userInfo, { abortEarly: false })
    return validation
  }

  return { schemaValidation, validationErrors }
}
