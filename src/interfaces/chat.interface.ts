import { ISellerGig } from './gig.interface'
import { IOffer } from './order.interface'
import { ISellerDocument } from './seller.interface'

export interface IConversationDocument {
  _id: string
  conversationId: string
  senderUsername: string
  receiverUsername: string
}

export interface IMessageDocument {
  _id?: string
  conversationId?: string
  body?: string
  url?: string
  file?: string
  fileType?: string
  fileSize?: string
  fileName?: string
  gigId?: string
  sellerId?: string
  buyerId?: string
  senderUsername?: string
  senderPicture?: string
  receiverUsername?: string
  receiverPicture?: string
  isRead?: boolean
  hasOffer?: boolean
  offer?: IOffer
  hasConversationId?: boolean
  createdAt?: Date | string
}

export interface IChatSellerProps {
  _id: string
  username: string
  profilePicture: string
  responseTime: number
}

export interface IChatBuyerProps {
  _id: string
  username: string
  profilePicture: string
}

export interface IChatMessageProps {
  message: IMessageDocument
  seller?: ISellerDocument
  gig?: ISellerGig
}
