import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { useGetSellerByIdQuery } from 'src/services/seller.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'

import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import SellerOverview from './components/SellerOverview'

export default function SellerProfile() {
  const [type, setType] = useState<string>('Overview')
  const { sellerId } = useParams()

  const { data, isLoading } = useGetSellerByIdQuery(`${sellerId}`)

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${data && data.seller ? data.seller.username : ''}`]} />

      {isLoading && <CircularPageLoader />}
      {!isLoading && (
        <div className="container mx-auto px-2 md:px-0">
          <ProfileHeader sellerProfile={data?.seller} showEditIcons={false} showHeaderInfo={true} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white">
            {type === 'Overview' && <SellerOverview sellerProfile={data?.seller as ISellerDocument} showEditIcons={false} />}
            {type === 'Active Gigs' && <div>Active Gigs</div>}
            {type === 'Ratings & Reviews' && <div>Ratings & Reviews</div>}
          </div>
        </div>
      )}
    </div>
  )
}
