import { createContext } from 'react'
import { IAuthUser } from 'src/interfaces/auth.interface'
import { IOrderDocument, IOrderInvoice } from 'src/interfaces/order.interface'

interface IOrderContext {
  order?: IOrderDocument
  authUser?: IAuthUser
  orderInvoice?: IOrderInvoice
  viewDeliveryBtnClicked?: boolean
}

export const OrderContext = createContext<IOrderContext>({
  order: {} as IOrderDocument,
  authUser: {} as IAuthUser,
  orderInvoice: {} as IOrderInvoice
})
