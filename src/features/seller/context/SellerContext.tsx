import { createContext, Dispatch, SetStateAction } from 'react'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { emptySellerData } from 'src/shared/utils/static-data'

export interface ISellerContext {
  showEditIcons: boolean
  sellerProfile: ISellerDocument
  setSellerProfile?: Dispatch<SetStateAction<ISellerDocument>>
}

export const SellerContext = createContext<ISellerContext>({
  showEditIcons: false,
  sellerProfile: emptySellerData
})
