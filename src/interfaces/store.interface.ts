import { IAuthUser } from './auth.interface'
import { IBuyerDocument } from './buyer.interface'

export interface IReduxState {
  authUser: IAuthUser
  // header: string
  logout: boolean
  buyer: IBuyerDocument
  // seller: object
  // showCategoryContainer: boolean
  // notification: object
}
