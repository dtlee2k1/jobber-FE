import { Dispatch, SetStateAction } from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IBuyerDocument } from 'src/interfaces/buyer.interface'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { useGetOrdersByBuyerIdQuery } from 'src/services/order.service'
import { lowerCase } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

export interface IOrderDropdownProps {
  buyer: IBuyerDocument
  setIsOrderDropdownOpen: Dispatch<SetStateAction<boolean>>
}

export default function OrderDropdown({ buyer, setIsOrderDropdownOpen }: IOrderDropdownProps) {
  const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyer?._id}`)
  let orders: IOrderDocument[] = []

  if (isSuccess) {
    orders = data.orders as IOrderDocument[]
  }

  return (
    <div className="border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="h-96 overflow-y-scroll">
        {orders.length > 0 ? (
          orders.map((order: IOrderDocument) => (
            <div key={uuidv4()} className="border-grey h-[76px] border-b pt-2 text-left hover:bg-gray-50">
              <Link to={`/orders/${order.orderId}/activities`} onClick={() => setIsOrderDropdownOpen(false)} className="flex px-4">
                <div className="mt-1 flex-shrink-0">
                  <img className="h-14 w-20 object-cover" src={order.gigCoverImage} alt="" />
                </div>
                <div className="w-full py-1 pl-3">
                  <div className="line-clamp-1 text-[13px] font-normal leading-normal">{order.gigBasicTitle}</div>
                  <div className="mt-1.5 flex gap-2 text-[11px]">
                    <span className="font-normal text-[#b5b6ba]">by {order.sellerUsername}</span>
                    <span className="font-normal">&#x2022;</span>
                    <span className={`rounded px-2 text-white ${lowerCase(order.status.replace(/ /g, ''))}`}>{order.status}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">No orders to show</div>
        )}
      </div>
      {orders.length > 0 && (
        <Link
          to={`/users/${lowerCase(`${buyer?.username}`)}/${buyer?._id}/orders`}
          className="flex h-10 cursor-pointer justify-center bg-white px-4 text-sm font-medium text-sky-500"
          onClick={() => setIsOrderDropdownOpen(false)}
        >
          <FaEye className="mr-2 h-4 w-4 self-center" />
          <span className="self-center">View all</span>
        </Link>
      )}
    </div>
  )
}
