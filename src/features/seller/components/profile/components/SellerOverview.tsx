import { Dispatch, SetStateAction } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { ISellerDocument } from 'src/interfaces/seller.interface'

import AboutMe from './overview/aboutme/AboutMe'
import Certificates from './overview/certificates/Certificates'
import Description from './overview/description/Description'
import Education from './overview/education/Education'
import Experience from './overview/experience/Experience'
import Language from './overview/language/Language'
import Skills from './overview/skills/Skills'
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
        <Certificates />
      </div>
      <div className="w-full py-4 lg:w-2/3 lg:pl-4">
        <Description />
        <Experience />
        <Education />
        <Skills />
      </div>
    </SellerContext.Provider>
  )
}
