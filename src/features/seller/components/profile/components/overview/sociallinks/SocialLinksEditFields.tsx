import { cloneDeep, filter } from 'lodash'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'

export interface ISocialEditLinksProps {
  type: string
  selectedLink?: string
  setShowSocialLinksAddForm?: Dispatch<SetStateAction<boolean>>
  setShowSocialLinksEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function SocialLinksEditFields({
  type,
  selectedLink,
  setShowSocialLinksAddForm,
  setShowSocialLinksEditForm
}: ISocialEditLinksProps) {
  const [socialLink, setSocialLink] = useState<string>(selectedLink ? `${selectedLink}` : '')
  const { sellerProfile, setSellerProfile } = useContext(SellerContext)

  const onHandleUpdate = () => {
    if (type === 'add') {
      const clonedSocialLinks = cloneDeep(sellerProfile.socialLinks)
      clonedSocialLinks.push(socialLink)

      if (setSellerProfile && setShowSocialLinksAddForm) {
        setSellerProfile({ ...sellerProfile, socialLinks: clonedSocialLinks })
        setShowSocialLinksAddForm(false)
      }
    } else {
      const itemIndex = sellerProfile.socialLinks.findIndex((link) => link === selectedLink)
      const clonedSocialLinks = cloneDeep(sellerProfile.socialLinks)
      clonedSocialLinks[itemIndex] = socialLink
      const filteredSocialLinks = filter(clonedSocialLinks, (item: string) => item !== '')

      if (setSellerProfile && setShowSocialLinksEditForm) {
        setSellerProfile({ ...sellerProfile, socialLinks: filteredSocialLinks })
        setShowSocialLinksEditForm(false)
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 px-3">
        <TextInput
          className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Social media link"
          type="text"
          name="socialLink"
          value={socialLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLink(e.target.value)}
        />
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <Button
          disabled={!socialLink && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white
          hover:bg-sky-400 focus:outline-none md:py-2 ${
            !socialLink && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
          }`}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            type === 'add' && setShowSocialLinksAddForm && setShowSocialLinksAddForm(false)
            type === 'edit' && setShowSocialLinksEditForm && setShowSocialLinksEditForm(false)
          }}
        />
      </div>
    </div>
  )
}
