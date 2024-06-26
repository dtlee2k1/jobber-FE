import { ISellerGig } from './gig.interface'
import { IOrderDocument } from './order.interface'
import { IRatingCategories } from './review.interface'

export type SellerContextType = {
  gigs: ISellerGig[]
  pausedGigs: ISellerGig[]
  orders: IOrderDocument[]
  seller: ISellerDocument | null
}

export interface ILanguage {
  [key: string]: string | number | undefined
  _id?: string
  language: string
  level: string
}

export interface IExperience {
  [key: string]: string | number | boolean | undefined
  _id?: string
  company: string
  title: string
  startDate: string
  endDate: string
  description: string
  currentlyWorkingHere: boolean | undefined
}

export interface IEducation {
  [key: string]: string | number | undefined
  _id?: string
  country: string
  university: string
  title: string
  major: string
  year: string
}

export interface ICertificate {
  [key: string]: string | number | undefined
  _id?: string
  name: string
  from: string
  year: number | string
}

export interface IPersonalInfoData {
  [key: string]: string
  fullName: string
  profilePicture: string
  description: string
  responseTime: string
  oneliner: string
}

export interface IReduxSeller {
  type?: string
  payload: ISellerDocument
}

export interface IShowEditItem {
  fullname: boolean
  oneliner: boolean
}

export interface ISellerProfileItem {
  fullname: string
  oneliner: string
}

export type SellerType =
  | string
  | string[]
  | number
  | IRatingCategories
  | Date
  | IExperience
  | IExperience[]
  | IEducation
  | IEducation[]
  | ICertificate
  | ICertificate[]
  | ILanguage
  | ILanguage[]
  | unknown
  | undefined

export interface ISellerDocument extends Record<string, SellerType> {
  _id?: string
  profilePublicId?: string
  fullName: string
  username?: string
  email?: string
  profilePicture?: string
  description: string
  country: string
  oneliner: string
  skills: string[]
  ratingsCount?: number
  ratingSum?: number
  ratingCategories?: IRatingCategories
  languages: ILanguage[]
  responseTime: number
  recentDelivery?: Date | string
  experience: IExperience[]
  education: IEducation[]
  socialLinks: string[]
  certificates: ICertificate[]
  ongoingJobs?: number
  completedJobs?: number
  cancelledJobs?: number
  totalEarnings?: number
  totalGigs?: number
  paypal?: string
  createdAt?: Date | string
}
