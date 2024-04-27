import { IAuthUser } from './auth.interface'
import { IBuyerDocument } from './buyer.interface'
import { ISellerDocument } from './seller.interface'

export interface IReduxState {
  authUser: IAuthUser
  header: string
  logout: boolean
  buyer: IBuyerDocument
  seller: ISellerDocument
  showCategoryContainer: boolean
  // notification: object
}
