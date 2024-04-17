import { ISellerGig } from 'src/interfaces/gig.interface'

import FeaturedExperts from './FeaturedExperts'
import HomeGigsView from './HomeGigsView'
import HomeSlider from './HomeSlider'

export default function Home() {
  return (
    <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
      <HomeSlider />
      <HomeGigsView
        gigs={[1, 2, 3, 4, 5] as unknown as ISellerGig[]}
        title="Because you view a gig on"
        subTitle=""
        category="Programming & Tech"
      />
      <FeaturedExperts sellers={[]} />
    </div>
  )
}
