import { useState } from 'react'
import { useParams } from 'react-router-dom'
import GigViewReviews from 'src/features/gigs/components/view/components/GigViewLeft/GigViewReviews'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IReviewDocument } from 'src/interfaces/review.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { useGetGigsBySellerIdQuery } from 'src/services/gig.service'
import { useGetReviewsBySellerIdQuery } from 'src/services/review.service'
import { useGetSellerByIdQuery } from 'src/services/seller.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { v4 as uuidv4 } from 'uuid'

import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import SellerOverview from './components/SellerOverview'

export default function SellerProfile() {
  const [type, setType] = useState<string>('Overview')
  const { sellerId } = useParams()

  const { data: sellerData, isLoading: isSellerLoading, isSuccess: isSellerSuccess } = useGetSellerByIdQuery(`${sellerId}`)
  const { data: gigData, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`)
  const { data: reviewsData, isSuccess: isReviewsSuccess, isLoading: isReviewsLoading } = useGetReviewsBySellerIdQuery(`${sellerId}`)

  let reviews: IReviewDocument[] = []

  if (isReviewsSuccess) {
    reviews = reviewsData.reviews as IReviewDocument[]
  }

  const isLoading: boolean =
    isSellerGigLoading && isSellerLoading && !isSellerSuccess && !isSellerGigSuccess && !isReviewsSuccess && !isReviewsLoading

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${sellerData && sellerData.seller ? sellerData.seller.username : ''}`]} />

      {isLoading && <CircularPageLoader />}
      {!isLoading && (
        <div className="container mx-auto px-2 md:px-0">
          <ProfileHeader sellerProfile={sellerData?.seller} showEditIcons={false} showHeaderInfo={true} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white">
            {type === 'Overview' && <SellerOverview sellerProfile={sellerData?.seller as ISellerDocument} showEditIcons={false} />}
            {type === 'Active Gigs' && (
              <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {gigData?.gigs &&
                  gigData?.gigs.map((gig: ISellerGig) => (
                    <GigCardDisplayItem key={uuidv4()} gig={gig} linkTarget={false} showEditIcon={false} />
                  ))}
              </div>
            )}
            {type === 'Ratings & Reviews' && <GigViewReviews showRatings={false} reviews={reviews} hasFetchedReviews={true} />}
          </div>
        </div>
      )}
    </div>
  )
}
