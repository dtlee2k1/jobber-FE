import { ISellerGig } from 'src/interfaces/gig.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useGetGigsByCategoryQuery, useGetTopRatedGigsByCategoryQuery } from 'src/services/gig.service'
import { useGetRandomSellersQuery } from 'src/services/seller.service'
import TopGigsView from 'src/shared/gigs/TopGigsView'
import { lowerCase } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'

import FeaturedExperts from './FeaturedExperts'
import HomeGigsView from './HomeGigsView'
import HomeSlider from './HomeSlider'

export default function Home() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const { data: sellersData, isSuccess: isSellersDataSuccess } = useGetRandomSellersQuery('8')
  const { data: categoryData, isSuccess: isCategoryDataSuccess } = useGetGigsByCategoryQuery(`${authUser.username}`)
  const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`)
  // const { data: sellerData1, isSuccess: isSellerDataSuccess1 } = useGetMoreGigsLikeThisQuery('6547ee5f5c323d4335dfcc1b')
  // const { data: sellerData2, isSuccess: isSellerDataSuccess2 } = useGetMoreGigsLikeThisQuery('6547ee735c323d4335dfcc27')
  let sellers: ISellerDocument[] = []
  let categoryGigs: ISellerGig[] = []
  let topGigs: ISellerGig[] = []

  if (isSellersDataSuccess) {
    sellers = sellersData.sellers as ISellerDocument[]
  }

  if (isCategoryDataSuccess) {
    categoryGigs = categoryData?.gigs as ISellerGig[]
  }

  if (isTopGigsSuccess) {
    topGigs = topGigsData.gigs as ISellerGig[]
  }

  // if (isSellerDataSuccess1 && isSellerDataSuccess2) {
  //   topGigs = [...(sellerData1.gigs as ISellerGig[]), ...(sellerData2.gigs as ISellerGig[])] as ISellerGig[]
  // }
  return (
    <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
      <HomeSlider />
      {topGigs.length > 0 && (
        <TopGigsView
          gigs={topGigs}
          title="Top rated services in"
          subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
          category={topGigs[0].categories}
          width="w-72"
          type="home"
        />
      )}
      {categoryGigs.length > 0 && (
        <HomeGigsView gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
      )}
      <FeaturedExperts sellers={sellers} />
    </div>
  )
}
