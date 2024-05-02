import { createContext } from 'react'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { emptyGigData, emptySellerData } from 'src/shared/utils/static-data'

export interface IGigContext {
  gig: ISellerGig
  seller: ISellerDocument
  isSuccess?: boolean
  isLoading?: boolean
}
export const GigContext = createContext<IGigContext>({
  gig: emptyGigData,
  seller: emptySellerData
})
