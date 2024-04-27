import { filter, sumBy } from 'lodash'
import { useOutletContext } from 'react-router-dom'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { SellerContextType } from 'src/interfaces/seller.interface'
import { shortenLargeNumbers } from 'src/shared/utils/utils.service'

import ManageEarningsTable from './components/ManageEarningsTable'

export default function ManageEarnings() {
  const { seller, orders } = useOutletContext<SellerContextType>()

  const completedOrders: IOrderDocument[] = filter(orders, (order: IOrderDocument) => order.status === 'Delivered')
  const sum: number = sumBy(orders, 'price')
  const average: number = sum / orders.length
  const averageSellingPrice = average ? parseInt(shortenLargeNumbers(average)) : 0

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col flex-wrap">
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3">
          <div className="border-grey flex items-center justify-center border p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Earnings to date</span>
              <span className="truncate text-center text-base font-bold md:text-xl lg:text-2xl">${seller?.totalEarnings}</span>
            </div>
          </div>
          <div className="border-grey flex items-center justify-center border p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Avg. selling price</span>
              <span className="truncate text-center text-base font-bold md:text-xl lg:text-2xl">${averageSellingPrice}</span>
            </div>
          </div>
          <div className="border-grey flex items-center justify-center border p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Orders completed</span>
              <span className="truncate text-center text-base font-bold md:text-xl lg:text-2xl">{seller?.completedJobs}</span>
            </div>
          </div>
        </div>

        <ManageEarningsTable type="active" orders={completedOrders} orderTypes={completedOrders.length} />
      </div>
    </div>
  )
}
