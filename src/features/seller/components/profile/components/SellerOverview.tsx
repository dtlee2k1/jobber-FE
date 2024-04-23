import { Dispatch, SetStateAction } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { ISellerDocument } from 'src/interfaces/seller.interface'

import AboutMe from './overview/aboutme/AboutMe'
import Language from './overview/language/Language'
import SocialLinks from './overview/sociallinks/SocialLinks'

interface ISellerOverviewProps {
  showEditIcons: boolean
  sellerProfile: ISellerDocument
  setSellerProfile: Dispatch<SetStateAction<ISellerDocument>>
}

export default function SellerOverview({ sellerProfile, showEditIcons, setSellerProfile }: ISellerOverviewProps) {
  return (
    <SellerContext.Provider value={{ sellerProfile, showEditIcons, setSellerProfile }}>
      <div className="w-full py-4 lg:w-1/3">
        <Language />
        <AboutMe />
        <SocialLinks />
      </div>
      <div className="w-full py-4 lg:w-2/3 lg:pl-4">Right Components</div>
    </SellerContext.Provider>
  )
}
