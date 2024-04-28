import { Link } from 'react-router-dom'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import StarRating from 'src/shared/rating/StarRating'
import { lowerCase, rating } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

export interface IFeaturedExpertProps {
  sellers: ISellerDocument[]
}

export default function FeaturedExperts({ sellers }: IFeaturedExpertProps) {
  return (
    <div className="mx-auto my-8 flex w-full flex-col">
      <div className="flex w-full flex-col justify-between self-center">
        <h2 className="flex self-center text-base font-bold md:text-2xl lg:text-3xl">Featured Experts</h2>
        <h4 className="pt-1 text-center text-sm md:text-base lg:text-lg">Work with talented people for the best possible result.</h4>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-8 pt-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sellers.map((seller: ISellerDocument) => (
            <div key={uuidv4()} className="border-grey w-full rounded-lg border bg-white shadow">
              <div className="flex flex-col items-center pb-10 pt-5">
                <img className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg" src={seller.profilePicture} alt="Profile image" />
                <h5 className="mb-1 font-medium text-gray-900 xl:text-xl ">{seller.username}</h5>
                <span className="mb-1 w-[90%] text-center text-sm text-gray-500 dark:text-gray-500">{seller.oneliner}</span>
                <div className="flex h-6 w-full justify-center gap-x-1 self-center">
                  <div className="mt-1 w-20 gap-x-2">
                    <StarRating value={rating(parseInt(`${seller.ratingSum}`) / parseInt(`${seller.ratingsCount}`))} size={14} />
                  </div>
                  {parseInt(`${seller.ratingsCount}`) > 0 && (
                    <div className="ml-2 flex gap-1 self-center rounded bg-orange-400 px-1 text-xs">
                      <span className="font-bold text-white">
                        {rating(parseInt(`${seller.ratingSum}`) / parseInt(`${seller.ratingsCount}`))}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex space-x-3 md:mt-6">
                  <Link
                    to={`/seller_profile/${lowerCase(`${seller.username}`)}/${seller._id}/view`}
                    className="rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
