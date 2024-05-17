import { find } from 'lodash'
import { useRef, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { useSearchGigsQuery } from 'src/services/search.service'
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem'
import GigPaginate from 'src/shared/gigs/GigPaginate'
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

import BudgetDropdown from './components/BudgetDropdown'
import DeliveryTimeDropdown from './components/DeliveryTimeDropdown'

interface IGigsProps {
  type: string
}

const ITEMS_PER_PAGE = 8
export default function Gigs({ type }: IGigsProps) {
  const [itemFrom, setItemFrom] = useState<string>('0')
  const [paginationType, setPaginationType] = useState<string>('forward')

  const { category } = useParams<string>()
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const updatedSearchParams = new URLSearchParams(searchParams.toString())

  const queryType =
    type === 'search'
      ? replaceDashWithSpaces(`${updatedSearchParams}`)
      : `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(`${category}`)}`)}&${replaceDashWithSpaces(`${updatedSearchParams}`)}`

  const { data, isSuccess, isLoading, isError } = useSearchGigsQuery({
    query: `${queryType}`,
    from: itemFrom,
    size: `${ITEMS_PER_PAGE}`,
    type: paginationType
  })

  const gigs = useRef<ISellerGig[]>([])
  let totalGigs = 0

  const categoryName = find(categories(), (item: string) => location.pathname.includes(replaceSpacesWithDash(`${lowerCase(`${item}`)}`)))
  const gigCategories = categoryName ?? searchParams.get('query')

  if (isSuccess) {
    gigs.current = data.gigs as ISellerGig[]
    totalGigs = data.total ?? 0
  }

  return (
    <>
      {isLoading && <CircularPageLoader />}
      {!isLoading && (
        <div className="container mx-auto items-center p-5">
          {gigs.current.length > 0 ? (
            <>
              <h3 className="mb-5 flex gap-3 text-4xl">
                {type === 'search' && <span className="text-black">Results for</span>}
                <strong className="text-black">{gigCategories}</strong>
              </h3>
              <div className="mb-4 flex gap-4">
                <BudgetDropdown />
                <DeliveryTimeDropdown />
              </div>
              <div className="my-5">
                <div>
                  <span className="font-medium text-[#74767e]">{totalGigs} services available</span>
                </div>
                <div className="grid gap-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {gigs.current.map((gig: ISellerGig) => (
                    <GigCardDisplayItem key={uuidv4()} gig={gig} linkTarget={true} showEditIcon={false} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <PageMessage header="No services found for your search" body="Please try a new search" />
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
      )}
    </>
  )
}
