import { ISellerGig } from 'src/interfaces/gig.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetGigsByCategoryQuery } from 'src/services/gig.service'
import { useGetRandomSellersQuery } from 'src/services/seller.service'
import { useAppSelector } from 'src/store/store'

import FeaturedExperts from './FeaturedExperts'
import HomeGigsView from './HomeGigsView'
import HomeSlider from './HomeSlider'

export default function Home() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const { data: sellersData, isSuccess: isSellersDataSuccess } = useGetRandomSellersQuery('8')
  const { data: categoryData, isSuccess: isCategoryDataSuccess } = useGetGigsByCategoryQuery(`${authUser.username}`)

  let sellers: ISellerDocument[] = []
  let categoryGigs: ISellerGig[] = []

  if (isSellersDataSuccess) {
    sellers = sellersData.sellers as ISellerDocument[]
  }

  if (isCategoryDataSuccess) {
    categoryGigs = categoryData?.gigs as ISellerGig[]
  }

  return (
    <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
      <HomeSlider />
      {categoryGigs.length > 0 && (
        <HomeGigsView gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
      )}
      <FeaturedExperts sellers={sellers} />
    </div>
  )
}
