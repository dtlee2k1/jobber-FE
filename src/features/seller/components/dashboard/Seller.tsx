import { Outlet, useParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from 'src/services/gig.service'
import { useGetOrdersBySellerIdQuery } from 'src/services/order.service'
import { useGetSellerByIdQuery } from 'src/services/seller.service'
import DashBoardHeader from 'src/shared/header/components/DashBoardHeader'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { useAppSelector } from 'src/store/store'

export default function Seller() {
  const header = useAppSelector((state: IReduxState) => state.header)

  const { sellerId } = useParams<string>()
  const { data: sellerData, isLoading, isSuccess: isSellerSuccess } = useGetSellerByIdQuery(`${sellerId}`)
  const { data: sellerGigs, isSuccess: isSellerGigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`)
  const { data: sellerPausedGigs, isSuccess: isSellerPausedGigsSuccess } = useGetSellerPausedGigsQuery(`${sellerId}`)
  const { data: sellerOrders, isSuccess: isSellerOrdersSuccess } = useGetOrdersBySellerIdQuery(`${sellerId}`, {
    refetchOnMountOrArgChange: true
  })

  let seller: ISellerDocument | undefined = undefined
  let gigs: ISellerGig[] = []
  let pausedGigs: ISellerGig[] = []
  let orders: IOrderDocument[] = []

  if (isSellerSuccess) {
    seller = sellerData?.seller as ISellerDocument
  }

  if (isSellerGigsSuccess) {
    gigs = sellerGigs?.gigs as ISellerGig[]
  }

  if (isSellerPausedGigsSuccess) {
    pausedGigs = sellerPausedGigs?.gigs as ISellerGig[]
  }

  if (isSellerOrdersSuccess) {
    orders = sellerOrders.orders as IOrderDocument[]
  }
  return (
    <div className="w-screen">
      {header === 'sellerDashboard' && <DashBoardHeader />}
      {isLoading && <CircularPageLoader />}
      {!isLoading && (
        <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
          <Outlet context={{ seller, gigs, pausedGigs, orders }} />
        </div>
      )}
    </div>
  )
}
