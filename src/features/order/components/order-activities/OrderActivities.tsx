import { forwardRef, useState } from 'react'
import ChatBox from 'src/features/chat/components/chatbox/ChatBox'
import { IAuthUser } from 'src/interfaces/auth.interface'
import { IChatBuyerProps, IChatSellerProps } from 'src/interfaces/chat.interface'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { chatMessageTransform } from 'src/shared/utils/timeago.utils'

import { OrderContext } from '../../context/OrderContext'
import OrderPlaced from './components/OrderPlaced'

interface IOrderActivitiesProps {
  order: IOrderDocument
  authUser: IAuthUser
  viewDeliveryBtnClicked?: boolean
  showDeliveryPanel?: boolean
  showReviewPanel?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderActivities = forwardRef<HTMLDivElement, IOrderActivitiesProps>((props, ref) => {
  const { order, authUser, viewDeliveryBtnClicked } = props

  const [showChatBox, setShowChatBox] = useState<boolean>(false)

  const chatSeller: IChatSellerProps = {
    username: `${order.sellerUsername}`,
    _id: `${order.sellerId}`,
    profilePicture: `${order.sellerImage}`,
    responseTime: 1
  }
  const chatBuyer: IChatBuyerProps = {
    username: `${order.buyerUsername}`,
    _id: `${order.buyerId}`,
    profilePicture: `${order.buyerImage}`
  }

  return (
    <div className="mb-3 mt-4 rounded-[4px] bg-white p-3">
      <div className="flex">
        <div className="my-5 rounded-full bg-[#e8e8e8] px-4 py-2 text-center text-sm font-bold">
          {chatMessageTransform(`${order.dateOrdered}`)}
        </div>
      </div>
      <OrderContext.Provider value={{ order, authUser, viewDeliveryBtnClicked }}>
        <OrderPlaced />
      </OrderContext.Provider>
      <div className="flex px-3 pt-2">
        If you need to contact the {order.buyerUsername === authUser.username ? 'seller' : 'buyer'},
        <div onClick={() => setShowChatBox(!showChatBox)} className="cursor-pointer px-2 text-blue-500 hover:underline">
          Go to Inbox
        </div>
      </div>
      {showChatBox && <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={order.gigId} onClose={() => setShowChatBox(false)} />}
    </div>
  )
})

export default OrderActivities
