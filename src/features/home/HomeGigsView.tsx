import { Link } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { replaceSpacesWithDash } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

interface IHomeProps {
  gigs: ISellerGig[]
  title: string
  subTitle?: string
  category?: string
}

export default function HomeGigsView({ gigs, title, category, subTitle }: IHomeProps) {
  return (
    <div className="border-grey mx-auto my-8 flex flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center px-6 py-6 sm:items-start">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2 md:flex-row">
            <h2 className="flex self-center text-base font-bold md:text-lg lg:text-2xl">{title}</h2>
            {category && (
              <span className="flex cursor-pointer self-center text-base font-bold text-sky-500 hover:text-sky-400 hover:underline md:text-lg lg:text-2xl">
                <Link to={`/categories/${replaceSpacesWithDash(category)}`}>{category}</Link>
              </span>
            )}
          </div>
          <h4 className="pt-1 text-center text-sm sm:text-left">{subTitle}</h4>
        </div>
      </div>
      <div className="flex w-full flex-nowrap items-center justify-center overflow-x-hidden px-6 md:overflow-x-auto lg:overflow-x-hidden">
        <div className="grid justify-center gap-x-8 pt-3 sm:h-full sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gigs.map((gig: ISellerGig) => (
            // <!-- placeholder -->
            <div key={uuidv4()} className="rounded">
              <div className="mb-8 flex cursor-pointer flex-col gap-2">
                <img src={gig.coverImage} className="w-full rounded-lg" alt="Gig cover image" />
                <div className="relative flex items-center gap-2">
                  <img src={gig.profilePicture} alt="Profile image" className="h-7 w-8 rounded-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
