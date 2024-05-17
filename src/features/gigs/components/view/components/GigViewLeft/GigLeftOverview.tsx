import { useContext } from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GigContext } from 'src/features/gigs/context/GigContext'

export default function GigLeftOverview() {
  const { gig, isSuccess, isLoading } = useContext(GigContext)

  return (
    <div className="relative flex h-[600px] max-h-[600px] cursor-pointer justify-center">
      {!isLoading && isSuccess && (
        <LazyLoadImage
          src={gig.coverImage}
          alt="Gig Image"
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
          placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
          effect="blur"
        />
      )}
      {isLoading && !isSuccess && (
        <div className="flex h-[600px] w-full transition-all duration-500 hover:scale-105">
          <FaCircleNotch className="mr-3 flex h-10 w-full animate-spin self-center" size={40} color="#50b5ff" />
        </div>
      )}
    </div>
  )
}
