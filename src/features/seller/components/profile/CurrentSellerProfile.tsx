import { useEffect, useState } from 'react'
import equal from 'react-fast-compare'
import { useParams } from 'react-router-dom'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useUpdateSellerMutation } from 'src/services/seller.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import { addSeller } from '../../reducers/seller.reducer'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import SellerOverview from './components/SellerOverview'

export default function CurrentSellerProfile() {
  const seller = useAppSelector((state: IReduxState) => state.seller)
  const dispatch = useAppDispatch()
  const [updateSeller, { isLoading }] = useUpdateSellerMutation()

  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller)
  const [showEdit, setShowEdit] = useState<boolean>(true)
  const [type, setType] = useState<string>('Overview')

  const { sellerId } = useParams()

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

      {isLoading && <CircularPageLoader />}
      {!isLoading && (
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

          <div className="flex flex-wrap bg-white">
            {type === 'Overview' && (
              <SellerOverview sellerProfile={sellerProfile} showEditIcons={true} setSellerProfile={setSellerProfile} />
            )}
            {type === 'Active Gigs' && <div>Active Gigs</div>}
            {type === 'Ratings & Reviews' && <div>Ratings & Reviews</div>}
          </div>
        </div>
      )}
    </div>
  )
}
