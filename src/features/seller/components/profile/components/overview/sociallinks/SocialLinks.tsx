import { useContext, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { v4 as uuidv4 } from 'uuid'

import SocialLinksEditFields from './SocialLinksEditFields'

export default function SocialLinks() {
  const [showSocialLinkAddForm, setShowSocialLinkAddForm] = useState<boolean>(false)
  const [showSocialLinkEditForm, setShowSocialLinkEditForm] = useState<boolean>(false)
  const [selectedSocialLink, setSelectedSocialLink] = useState<string>()
  const { sellerProfile, showEditIcons } = useContext(SellerContext)

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">SOCIAL LINKS</h4>

        {showEditIcons && (
          <span
            onClick={() => {
              setShowSocialLinkAddForm(!showSocialLinkAddForm)
              setShowSocialLinkEditForm(false)
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showSocialLinkAddForm && (
          <li className="flex justify-between">
            <SocialLinksEditFields type="add" setShowSocialLinksAddForm={setShowSocialLinkAddForm} />
          </li>
        )}

        {sellerProfile.socialLinks.map((link) => (
          <li key={uuidv4()} className="mb-2 flex justify-between">
            {!showSocialLinkEditForm && (
              <div className="col-span-3 ml-4 flex pb-3 text-sm md:text-base">
                <a href={link} target="_blank" className="mr-3 text-sky-500 no-underline hover:underline">
                  {link}
                </a>
              </div>
            )}

            {showSocialLinkEditForm && selectedSocialLink === link && (
              <SocialLinksEditFields type="edit" selectedLink={selectedSocialLink} setShowSocialLinksEditForm={setShowSocialLinkEditForm} />
            )}

            {!showSocialLinkEditForm && showEditIcons && (
              <div className="mr-4">
                <FaPencilAlt
                  onClick={() => {
                    setSelectedSocialLink(link)
                    setShowSocialLinkEditForm(true)
                    setShowSocialLinkAddForm(false)
                  }}
                  size="12"
                  className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                />
              </div>
            )}
          </li>
        ))}

        {!sellerProfile.socialLinks.length && !showSocialLinkAddForm && <li className="mb-2 ml-4 flex justify-between">No information</li>}
      </ul>
    </div>
  )
}
