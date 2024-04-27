import { Link } from 'react-router-dom'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { updateHeader } from 'src/shared/header/reducers/header.reducer'
import { dayMonthYear } from 'src/shared/utils/timeago.utils'
import { useAppDispatch } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

interface IManageEarningsTableProps {
  type: string
  orders: IOrderDocument[]
  orderTypes: number
}

export default function ManageEarningsTable({ type, orders, orderTypes }: IManageEarningsTableProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col justify-between">
      <div className="border-grey border border-b-0 px-3 py-3">
        <div className="text-xs font-bold uppercase sm:text-sm md:text-base">Payouts</div>
      </div>
      <table className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table">
        {orderTypes && (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              {orders.map(() => (
                <tr
                  key={uuidv4()}
                  className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black "
                >
                  <th className="p-3 text-left md:text-center">Date</th>
                  <th className="p-3 text-left md:text-center">Activity</th>
                  <th className="p-3 text-left md:text-center">Description</th>
                  <th className="p-3 text-left md:text-center">From</th>
                  <th className="p-3 text-left md:text-center">Order</th>
                  <th className="p-3 text-left md:text-center">Amount</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {orders.map((order) => (
                <tr key={order.orderId} className="border-grey mb-2 flex flex-col flex-nowrap border-b bg-white sm:mb-0 sm:table-row ">
                  <td className="p-3 text-left md:text-center">{dayMonthYear(`${order.events.orderDelivered}`)}</td>
                  <td className="p-3 text-left md:text-center">Earning</td>
                  <td className="p-3 text-left md:text-center">order</td>
                  <td className="p-3 text-left lowercase md:text-center">{order.buyerUsername}</td>
                  <td className="p-3 text-left md:text-center">
                    <Link to={`/orders/${order.orderId}/activities`} onClick={() => dispatch(updateHeader('home'))} className="underline">
                      {order.orderId}
                    </Link>
                  </td>
                  <td className="px-3 text-left font-bold text-sky-500 md:text-center">US ${0.8 * order.price}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
        {!orderTypes && (
          <tbody>
            <tr>
              <td className="w-full px-4 py-2 text-sm">No {type} orders to show</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}
