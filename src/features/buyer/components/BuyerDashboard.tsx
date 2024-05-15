import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { useGetOrdersByBuyerIdQuery } from 'src/services/order.service'
import { orderTypes, shortenLargeNumbers } from 'src/shared/utils/utils.service'
import { socket, socketService } from 'src/sockets/socket.service'

import BuyerTable from './BuyerTable'

const BUYER_GIG_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in progress',
  DELIVERED: 'delivered'
}

export default function BuyerDashboard() {
  const { buyerId } = useParams<string>()

  const [type, setType] = useState<string>(BUYER_GIG_STATUS.ACTIVE)
  const { data: buyerOrders, isSuccess: isBuyerOrdersSuccess } = useGetOrdersByBuyerIdQuery(`${buyerId}`)

  let orders: IOrderDocument[] = []

  if (isBuyerOrdersSuccess) {
    orders = buyerOrders.orders as IOrderDocument[]
  }

  useEffect(() => {
    socketService.setupSocketConnection()
    socket.emit('getLoggedInUsers')
  }, [])

  return (
    <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-6">
      <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl">Manage Orders</div>
        <div className="p-0">
          <ul className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.ACTIVE)}>
              <a
                href="#activeorders"
                className={classNames('px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base', {
                  'pb-[15px] outline outline-1 outline-sky-500 sm:rounded-lg': type === BUYER_GIG_STATUS.ACTIVE
                })}
              >
                Active{' '}
                {orderTypes(BUYER_GIG_STATUS.ACTIVE, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.ACTIVE, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.COMPLETED)}>
              <a
                href="#activeorders"
                className={classNames('px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base', {
                  'pb-[15px] outline outline-1 outline-sky-500 sm:rounded-lg': type === BUYER_GIG_STATUS.COMPLETED
                })}
              >
                Completed{' '}
                {orderTypes(BUYER_GIG_STATUS.COMPLETED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.COMPLETED, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.CANCELLED)}>
              <a
                href="#activeorders"
                className={classNames('px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base', {
                  'pb-[15px] outline outline-1 outline-sky-500 sm:rounded-lg': type === BUYER_GIG_STATUS.CANCELLED
                })}
              >
                Cancelled{' '}
                {orderTypes(BUYER_GIG_STATUS.CANCELLED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.CANCELLED, orders))}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
        {type === BUYER_GIG_STATUS.ACTIVE && (
          <BuyerTable type={type} orders={orders} orderTypes={orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders)} />
        )}
        {type === BUYER_GIG_STATUS.COMPLETED && (
          <BuyerTable type={type} orders={orders} orderTypes={orderTypes(BUYER_GIG_STATUS.COMPLETED, orders)} />
        )}
        {type === BUYER_GIG_STATUS.CANCELLED && (
          <BuyerTable type={type} orders={[]} orderTypes={orderTypes(BUYER_GIG_STATUS.CANCELLED, orders)} />
        )}
      </div>
    </div>
  )
}
