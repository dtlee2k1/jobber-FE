import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IAuthDocument, IAuthResponse, IResetPassword, ISignInPayload, ISignUpPayload } from './auth.interface'

export type validationErrorsType = ISignInPayload | ISignUpPayload | IResetPassword
// | ICreateGig
// | IPersonalInfoData
// | IExperience
// | IEducation
// | ILanguage

export interface IQueryResponse {
  data: IAuthResponse
  error: FetchBaseQueryError | SerializedError
}

export interface IResponse {
  message?: string
  token?: string
  user?: IAuthDocument
  // buyer?: IBuyerDocument
  // seller?: ISellerDocument
  // sellers?: ISellerDocument[]
  // gig?: ISellerGig
  // gigs?: ISellerGig[]
  total?: number
  sortItems?: string[]
  // conversations?: IConversationDocument[] | IMessageDocument[]
  // messages?: IMessageDocument[]
  // messageData?: IMessageDocument
  conversationId?: string
  clientSecret?: string
  paymentIntentId?: string
  // order?: IOrderDocument
  // orders?: IOrderDocument[]
  // review?: IReviewDocument
  // reviews?: IReviewDocument[]
  // notifications?: IOrderNotifcation[]
  browserName?: string
  deviceType?: string
}

export interface ISliderImagesText {
  header: string
  subHeader: string
}

export interface IGigCardItemModal {
  overlay: boolean
  deleteApproval: boolean
}
