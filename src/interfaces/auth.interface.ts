import { ObjectSchema } from 'yup'

export interface IAuthUser {
  id: number | null
  username: string | null
  email: string | null
  profilePublicId: string | null
  profilePicture: string | null
  country: string | null
  emailVerified: boolean | null
  emailVerificationToken: string | null
  passwordResetExpires: Date | null
  passwordResetToken: null | null
  browserName: string | null
  deviceType: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export interface IAuthDocument {
  id?: number
  profilePublicId?: string
  username?: string
  email?: string
  password?: string
  country?: string
  profilePicture?: string
  emailVerified?: number
  emailVerificationToken?: string
  passwordResetToken?: string
  passwordResetExpires?: Date
  browserName?: string
  deviceType?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUseAuthSchema {
  schema: ObjectSchema<ISignInPayload | ISignUpPayload | IResetPassword>
  userInfo: ISignInPayload | ISignUpPayload | IResetPassword
}

export const AUTH_FETCH_STATUS = {
  IDLE: '',
  SUCCESS: 'success',
  ERROR: 'error'
}

export interface ISignUpPayload {
  [key: string]: string | null | undefined
  username: string
  password: string
  email: string
  country: string
  profilePicture: string
  browserName: string | null | undefined
  deviceType: string | null | undefined
}

export interface ISignInPayload {
  [key: string]: string | null | undefined
  username: string
  password: string
  browserName: string | null | undefined
  deviceType: string | null | undefined
}

export interface IForgotPassword {
  email: string
}

export interface IResetPassword {
  [key: string]: string
  password: string
  confirmPassword: string
}

export interface IReduxAuthPayload {
  authInfo?: IAuthDocument
}

export interface IReduxAddAuthUser {
  type: string
  payload: IReduxAuthPayload
}

export interface IReduxLogout {
  type: string
  payload: boolean
}

export interface IAuthResponse {
  message: string
}
