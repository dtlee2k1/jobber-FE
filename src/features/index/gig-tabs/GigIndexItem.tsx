import { FaRegStar, FaStar } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { rating, replaceSpacesWithDash } from 'src/shared/utils/utils.service'

export interface IGigIndexItemProps {
  gig: ISellerGig
}

export default function GigIndexItem({ gig }: IGigIndexItemProps) {
  const title = replaceSpacesWithDash(gig.title)

  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/gig/${gig.id}/${title}`}>
          <LazyLoadImage
            src={gig.coverImage}
            alt="Gig cover image"
            className="w-full rounded-lg"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
        </Link>
        <div className="flex items-center gap-2">
          <LazyLoadImage
            src={gig.profilePicture}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
            </span>
          </div>
        </div>
        <div>
          <Link to={`/gig/${gig.id}/${title}`}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">{gig.basicDescription}</p>
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
  )
}
