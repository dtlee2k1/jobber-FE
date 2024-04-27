import { Link } from 'react-router-dom'
import { IOrderDocument } from 'src/interfaces/order.interface'
import Button from 'src/shared/button/Button'
import { updateHeader } from 'src/shared/header/reducers/header.reducer'
import { dayMonthYear } from 'src/shared/utils/timeago.utils'
import { lowerCase } from 'src/shared/utils/utils.service'
import { useAppDispatch } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

interface IManageOrdersProps {
  type: string
  orders: IOrderDocument[]
  orderTypes: number
}

export default function ManageOrdersTable({ type, orders, orderTypes }: IManageOrdersProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="mt-4 flex flex-col">
      <div className="border-grey border border-b-0 px-3 py-3">
        <div className="text-xs font-bold uppercase sm:text-sm md:text-base">{type} orders </div>
      </div>
      <table className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table">
        {orderTypes > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              {orders.map(() => (
                <tr
                  key={uuidv4()}
                  className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black"
                >
                  <th className="w-auto p-3 text-center"></th>
                  <th className="w-auto p-3 text-left">Buyer</th>
                  <th className="p-3 text-left">Gig</th>
                  <th className="p-3 text-center">{type === 'cancelled' ? 'Cancelled On' : 'Due On'}</th>
                  {type === 'completed' && <th className="p-3 text-center">Delivered At</th>}
                  <th className="p-3 text-center">Total</th>
                  <th className="p-3 text-center">Status</th>
                  {type === 'active' && <th className="p-3 text-center">Cancel</th>}
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {orders.map((order: IOrderDocument) => (
                <tr key={uuidv4()} className="border-grey mb-2 flex flex-col flex-nowrap border-b bg-white sm:mb-0 sm:table-row ">
                  <td className="flex justify-start gap-3 px-3 py-3 sm:justify-center md:justify-start">
                    <div className="flex flex-wrap gap-2 self-center">
                      <img className="h-6 w-6 rounded-full object-cover lg:h-8 lg:w-8" src={order.buyerImage} alt={order.buyerImage} />
                      <span className="flex self-center font-bold">{order.buyerUsername}</span>
                    </div>
                  </td>
                  <td className="w-[300px] p-3 text-left lg:text-center">
                    <div className="grid">
                      <Link
                        to={`/orders/${order.orderId}/activities`}
                        onClick={() => dispatch(updateHeader('home'))}
                        className="truncate text-sm font-normal hover:text-sky-500"
                      >
                        {order.offer.gigTitle}
                      </Link>
                    </div>
                  </td>
                  <td className="p-3 text-left lg:text-center">
                    {type === 'cancelled' ? dayMonthYear(`${order.approvedAt}`) : dayMonthYear(`${order.offer.newDeliveryDate}`)}
                  </td>
                  {type === 'completed' && order.events.orderDelivered && (
                    <td className="p-3 text-left lg:text-center">{dayMonthYear(`${order.events.orderDelivered}`)}</td>
                  )}
                  <td className="p-3 text-left lg:text-center">${order.price}</td>
                  <td className="px-3 py-1 text-left lg:p-3 lg:text-center">
                    <span
                      className={`status rounded bg-transparent p-0 text-xs font-bold uppercase text-black sm:px-[5px] sm:py-[4px] sm:text-white ${lowerCase(
                        order.status.replace(/ /g, '')
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  {type === 'active' && (
                    <td className="px-3 py-1 text-left lg:p-3 lg:text-center">
                      <Button
                        className="rounded bg-red-500 px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base"
                        label="Cancel Order"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
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
