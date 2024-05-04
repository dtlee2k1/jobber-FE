import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useAppSelector } from 'src/store/store'

import { lowerCase, rating, replaceSpacesWithDash } from '../utils/utils.service'

export interface IGigCardItemProps {
  gig: ISellerGig
  linkTarget: boolean
  showEditIcon: boolean
}

export default function GigCardDisplayItem({ gig, linkTarget, showEditIcon }: IGigCardItemProps) {
  const seller = useAppSelector((state: IReduxState) => state.seller)
  // const authUser = useAppSelector((state: IReduxState) => state.authUser)
  // const sellerUsername = useRef<string>('')
  const title = replaceSpacesWithDash(gig.title)
  const navigate = useNavigate()

  const navigateToEditGig = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig })
  }

  return (
    <div className="z-[1] h-full overflow-visible rounded bg-white text-black/[.87] shadow transition-transform duration-150 hover:translate-y-[-.0625rem] hover:shadow-md">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <div className="relative w-full pt-[50%]">
          <Link to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}>
            <LazyLoadImage
              src={gig.coverImage}
              alt="Gig cover image"
              className="absolute left-0 top-0 h-full w-full rounded-t-lg object-cover align-bottom"
              wrapperClassName="bg-center"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="opacity"
            />
          </Link>
        </div>
        <div className="px-2">
          <div className="relative flex items-center gap-2">
            <LazyLoadImage
              src={gig.profilePicture}
              alt="Profile image"
              className="h-7 w-8 rounded-full object-cover"
              wrapperClassName="bg-center"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="opacity"
            />
            {/* <span className="absolute bottom-0 left-5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400"></span> */}
            <div className="flex w-full justify-between">
              <span className="text-md hover:underline">
                {linkTarget ? (
                  <Link
                    to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${
                      seller.username === gig.username ? 'edit' : 'view'
                    }`}
                  >
                    <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
                  </Link>
                ) : (
                  <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
                )}
              </span>
              {showEditIcon && <FaPencilAlt className="mr-2 flex self-center" size={15} onClick={() => navigateToEditGig(`${gig.id}`)} />}
            </div>
          </div>
          <div>
            <Link to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}>
              <p className="line-clamp-2 min-h-[3rem] break-words text-sm text-[#404145] hover:underline md:text-base">
                {gig.basicDescription}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {parseInt(`${gig.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}

            <strong className="text-sm font-bold">({rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))})</strong>
          </div>
          <div>
            <strong className="text-sm font-bold md:text-base">From ${gig.price}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
