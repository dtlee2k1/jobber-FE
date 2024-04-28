import { Outlet, useParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetSellerByIdQuery } from 'src/services/seller.service'
import DashBoardHeader from 'src/shared/header/components/DashBoardHeader'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { useAppSelector } from 'src/store/store'

export default function Seller() {
  const header = useAppSelector((state: IReduxState) => state.header)

  const { sellerId } = useParams<string>()
  const { data: sellerData, isLoading } = useGetSellerByIdQuery(`${sellerId}`)

  const gigs: ISellerGig[] = []
  const pausedGigs: ISellerGig[] = []
  const orders: IOrderDocument[] = []

  return (
    <div className="w-screen">
      {header === 'sellerDashboard' && <DashBoardHeader />}
      {isLoading && <CircularPageLoader />}
      {!isLoading && (
        <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
          <Outlet context={{ seller: sellerData?.seller as ISellerDocument, gigs, pausedGigs, orders }} />
        </div>
      )}
    </div>
  )
}
