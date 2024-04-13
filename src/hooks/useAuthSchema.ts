import { useState } from 'react'
import { IUseAuthSchema } from 'src/interfaces/auth.interface'
import { validationErrorsType } from 'src/interfaces/utils.interface'

export function useAuthSchema({ schema, userInfo }: IUseAuthSchema) {
  const [validationErrors, setValidationErrors] = useState<validationErrorsType[]>([])

  const schemaValidation = async () => {
    await schema
      .validate(userInfo, { abortEarly: false })
      .then(() => setValidationErrors([]))
      .catch((err) => {
        setValidationErrors([...err.errors])
      })

    const validation: boolean = await schema.isValid(userInfo, { abortEarly: false })
    return validation
  }

  return { schemaValidation, validationErrors }
}
