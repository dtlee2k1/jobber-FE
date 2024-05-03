import { ISellerGig } from 'src/interfaces/gig.interface'

import BudgetDropdown from './components/BudgetDropdown'
import DeliveryTimeDropdown from './components/DeliveryTimeDropdown'

interface IGigsProps {
  type: string
  gig?: ISellerGig
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Gigs({ type }: IGigsProps) {
  return (
    <div className="container mx-auto items-center p-5">
      <h3 className="mb-5 flex gap-3 text-4xl">
        <span className="text-black">Results for</span>
        <strong className="text-black">category</strong>
      </h3>
      <div className="mb-4 flex gap-4">
        <BudgetDropdown />
        <DeliveryTimeDropdown />
      </div>
      <div className="my-5">
        <div className="">
          <span className="font-medium text-[#74767e]">5 services available</span>
        </div>
        <div className="grid gap-x-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* <!-- GigCardDisplayItem --> */}
        </div>
      </div>
      {/* <!-- PageMessage --> */}
      {/* <!-- GigPaginate --> */}
    </div>
  )
}
