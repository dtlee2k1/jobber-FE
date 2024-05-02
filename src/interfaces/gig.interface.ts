import { Dispatch, SetStateAction } from 'react'

import { IRatingCategories, IReviewDocument } from './review.interface'

export interface IGigPaginateProps {
  gigs: ISellerGig[]
  totalGigs: number
  itemsPerPage: number
  showNumbers: boolean
  setItemFrom: Dispatch<SetStateAction<string>>
  setPaginationType: Dispatch<SetStateAction<string>>
}

export interface IAllowedGigItem {
  gigTitle: string
  basicTitle: string
  basicDescription: string
  descriptionCharacters: string
}

export interface IGigDropdown {
  budget: boolean
  deliveryTime: boolean
}

export interface IShowGigModal {
  image: boolean
  cancel: boolean
}

export interface IGigTextLength {
  gigTitle: number
  basicTitle: number
  basicDescription: number
  fullDescription: number
}

export const GIG_MAX_LENGTH: IGigTextLength = {
  gigTitle: 80,
  basicTitle: 40,
  basicDescription: 100,
  fullDescription: 1200
}

export interface IGigsProps {
  type?: string
  gig?: ISellerGig
}

export interface ICreateGig {
  [key: string]: string | string[] | number | undefined
  sellerId?: string
  profilePicture?: string
  title: string
  categories: string
  description: string
  subCategories: string[]
  tags: string[]
  price: number
  coverImage: string
  expectedDelivery: string
  basicTitle: string
  basicDescription: string
}

export interface ISellerGig {
  _id?: string
  id?: string
  sellerId?: string
  title: string
  username?: string
  profilePicture?: string
  email?: string
  description: string
  active?: boolean
  categories: string
  subCategories: string[]
  tags: string[]
  ratingsCount?: number
  ratingSum?: number
  ratingCategories?: IRatingCategories
  expectedDelivery: string
  basicTitle: string
  basicDescription: string
  price: number
  coverImage: string
  createdAt?: Date | string
  sortId?: number
}

export interface ISelectedBudget {
  minPrice: string
  maxPrice: string
}

export interface IGigViewReviewsProps {
  showRatings: boolean
  reviews?: IReviewDocument[]
  hasFetchedReviews?: boolean
}

export interface IGigInfo {
  total: number | string
  title: string
  bgColor: string
}

export interface IGigCardItems {
  gig: ISellerGig
  linkTarget: boolean
  showEditIcon: boolean
}

export interface IGigTopProps {
  gigs: ISellerGig[]
  title?: string
  subTitle?: string
  category?: string
  width: string
  type: string
}
