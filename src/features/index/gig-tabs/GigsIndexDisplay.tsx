import { find } from 'lodash'
import { useRef, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { useGetAuthGigsByCategoryQuery } from 'src/services/auth.service'
import GigPaginate from 'src/shared/gigs/GigPaginate'
import Header from 'src/shared/header/components/Header'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import PageMessage from 'src/shared/page-message/PageMessage'
import {
  categories,
  lowerCase,
  replaceAmpersandAndDashWithSpace,
  replaceDashWithSpaces,
  replaceSpacesWithDash
} from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

import GigIndexItem from './GigIndexItem'

interface IGigsIndexDisplayProps {
  type: string
}

const ITEMS_PER_PAGE = 8
export default function GigsIndexDisplay({ type }: IGigsIndexDisplayProps) {
  const [itemFrom, setItemFrom] = useState<string>('0')
  const [paginationType, setPaginationType] = useState<string>('forward')

  const location = useLocation()
  const { category } = useParams<string>()
  const [searchParams] = useSearchParams({})
  const updatedSearchParams = new URLSearchParams(searchParams.toString())

  const queryType: string =
    type === 'search'
      ? replaceDashWithSpaces(`${updatedSearchParams}`)
      : `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(`${category}`)}`)}`

  const gigs = useRef<ISellerGig[]>([])
  let totalGigs = 0

  const categoryName = find(categories(), (item: string) => location.pathname.includes(replaceSpacesWithDash(`${lowerCase(`${item}`)}`)))
  const gigCategories = categoryName ?? searchParams.get('query')

  const { data, isSuccess, isLoading, isError } = useGetAuthGigsByCategoryQuery({
    query: `${queryType}`,
    from: itemFrom,
    size: `${ITEMS_PER_PAGE}`,
    type: paginationType
  })

  if (isSuccess) {
    gigs.current = data?.gigs as ISellerGig[]
    totalGigs = data.total ?? 0
  }

  return (
    <div className="flex w-screen flex-col">
      <Header navClass="navbar peer-checked:navbar-active z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="relative m-auto mb-10 mt-8 min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
        {isLoading && !isSuccess && <CircularPageLoader />}
        {!isLoading && (
          <>
            {gigs.current.length > 0 ? (
              <>
                <h3 className="mb-5 flex gap-3 text-4xl">
                  {type === 'search' && <span className="text-black">Results for</span>}
                  <strong className="text-black">{gigCategories}</strong>
                </h3>
                <div className="my-5">
                  <div className="grid gap-x-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {gigs.current.map((gig: ISellerGig) => (
                      <GigIndexItem key={uuidv4()} gig={gig} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <PageMessage header="No services found for your search" body="Please try a new search" />
            )}
          </>
        )}
        {isError && <PageMessage header="Services issue" body="A network issue occurred. Try again later" />}
        {isSuccess && gigs.current.length > 0 && (
          <GigPaginate
            gigs={gigs.current}
            totalGigs={totalGigs}
            itemsPerPage={ITEMS_PER_PAGE}
            showNumbers={true}
            setItemFrom={setItemFrom}
            setPaginationType={setPaginationType}
          />
        )}
      </div>
    </div>
  )
}
