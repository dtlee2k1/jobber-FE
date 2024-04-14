import { IResetPassword, ISignInPayload, ISignUpPayload } from 'src/interfaces/auth.interface'
import { object, ObjectSchema, string } from 'yup'

const loginUserSchema: ObjectSchema<ISignInPayload> = object({
  username: string()
    .required({ username: 'Username is a required field' })
    .min(4, { username: 'Username length must be from 4 to 12 characters' }),
  password: string()
    .required({ password: 'Password is a required field' })
    .min(6, { password: 'Password length must be from 6 to 32 characters' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
})

const registerUserSchema: ObjectSchema<ISignUpPayload> = object({
  username: string()
    .required({ username: 'Username is a required field' })
    .min(4, { username: 'Username length must be from 4 to 12 characters' }),
  password: string()
    .required({ password: 'Password is a required field' })
    .min(6, { password: 'Password length must be from 6 to 32 characters' }),
  email: string().email({ email: 'Invalid email' }).required({ email: 'Email is a required field' }),
  country: string().notOneOf(['Select Country'], { country: 'Select a country' }).required({ country: 'Country is a required field' }),
  profilePicture: string().required({ profilePicture: 'Profile picture is a required field' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired()
})

const resetPasswordSchema: ObjectSchema<IResetPassword> = object({
  password: string().required({ password: 'Password is a required field' }).min(6, { password: 'Password is a required field' }),
  confirmPassword: string()
    .required({ confirmPassword: 'Confirm password is a required field' })
    .min(6, { password: 'Password is a required field' })
})

export { loginUserSchema, registerUserSchema, resetPasswordSchema }
