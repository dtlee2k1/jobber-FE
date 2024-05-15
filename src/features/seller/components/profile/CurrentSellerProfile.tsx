import { useEffect, useState } from 'react'
import equal from 'react-fast-compare'
import { useParams } from 'react-router-dom'
import GigViewReviews from 'src/features/gigs/components/view/components/GigViewLeft/GigViewReviews'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IReviewDocument } from 'src/interfaces/review.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetGigsBySellerIdQuery } from 'src/services/gig.service'
import { useGetReviewsBySellerIdQuery } from 'src/services/review.service'
import { useUpdateSellerMutation } from 'src/services/seller.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

import { addSeller } from '../../reducers/seller.reducer'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import SellerOverview from './components/SellerOverview'

export default function CurrentSellerProfile() {
  const seller = useAppSelector((state: IReduxState) => state.seller)
  const dispatch = useAppDispatch()
  const { sellerId } = useParams()

  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller)
  const [showEdit, setShowEdit] = useState<boolean>(true)
  const [type, setType] = useState<string>('Overview')

  const { data, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`)
  const { data: reviewsData, isSuccess: isReviewsSuccess, isLoading: isReviewsLoading } = useGetReviewsBySellerIdQuery(`${sellerId}`)
  const [updateSeller, { isLoading }] = useUpdateSellerMutation()

  let reviews: IReviewDocument[] = []

  if (isReviewsSuccess) {
    reviews = reviewsData.reviews as IReviewDocument[]
  }

  const isDataLoading = isSellerGigLoading && isReviewsLoading && !isSellerGigSuccess && !isReviewsSuccess

  const onUpdateSeller = async () => {
    try {
      const response = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap()

      dispatch(addSeller(response.seller))
      setSellerProfile(response.seller as ISellerDocument)
      setShowEdit(false)
      showSuccessToast('Seller profile updated successfully')
    } catch (error) {
      showErrorToast('Error updating profile')
    }
  }

  useEffect(() => {
    const isEqual = equal(seller, sellerProfile)
    setShowEdit(isEqual)
  }, [seller, sellerProfile])

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${seller.username}`]} />

      {(isLoading || isDataLoading) && <CircularPageLoader />}
      {!isLoading && !isDataLoading && (
        <div className="container mx-auto px-2 md:px-0">
          <div className="my-2 flex h-8 justify-end md:h-10 md:px-6">
            {!showEdit && (
              <div>
                <Button
                  className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
                  label="Update"
                  onClick={onUpdateSeller}
                />
                &nbsp;&nbsp;
                <Button
                  className="md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2"
                  label="Cancel"
                  onClick={() => {
                    setShowEdit(false)
                    setSellerProfile(seller)
                  }}
                />
              </div>
            )}
          </div>
          <ProfileHeader sellerProfile={sellerProfile} setSellerProfile={setSellerProfile} showEditIcons={true} showHeaderInfo={true} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white px-6">
            {type === 'Overview' && (
              <SellerOverview sellerProfile={sellerProfile} showEditIcons={true} setSellerProfile={setSellerProfile} />
            )}
            {type === 'Active Gigs' ? (
              data?.gigs && data.gigs?.length > 0 ? (
                <div className="grid gap-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {data.gigs &&
                    data.gigs.map((gig: ISellerGig) => (
                      <GigCardDisplayItem key={uuidv4()} gig={gig} linkTarget={false} showEditIcon={true} />
                    ))}
                </div>
              ) : (
                <div className="w-full py-10 text-center text-lg font-semibold">No active gigs to show</div>
              )
            ) : (
              <></>
            )}
            {type === 'Ratings & Reviews' ? (
              reviews.length > 0 ? (
                <GigViewReviews showRatings={false} reviews={reviews} hasFetchedReviews={true} />
              ) : (
                <div className="w-full py-10 text-center text-lg font-semibold">No Ratings & Reviews to show</div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
