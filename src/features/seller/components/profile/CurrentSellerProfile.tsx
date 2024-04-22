import { useEffect, useState } from 'react'
import equal from 'react-fast-compare'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import { useAppSelector } from 'src/store/store'

import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'

export default function CurrentSellerProfile() {
  const seller = useAppSelector((state: IReduxState) => state.seller)

  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller)
  const [showEdit, setShowEdit] = useState<boolean>(true)
  const [type, setType] = useState<string>('Overview')

  useEffect(() => {
    const isEqual = equal(seller, sellerProfile)
    setShowEdit(isEqual)
  }, [seller, sellerProfile])

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${seller.username}`]} />

      <div className="container mx-auto px-2 md:px-0">
        <div className="my-2 flex h-8 justify-end md:h-10 md:px-6">
          {!showEdit && (
            <div>
              <Button
                className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
                label="Update"
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

        <div className="flex flex-wrap bg-white">
          {type === 'Overview' && <div>Overview</div>}
          {type === 'Active Gigs' && <div>Active Gigs</div>}
          {type === 'Ratings & Reviews' && <div>Ratings & Reviews</div>}
        </div>
      </div>
    </div>
  )
}
