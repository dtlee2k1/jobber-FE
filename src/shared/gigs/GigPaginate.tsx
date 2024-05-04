import { Dispatch, SetStateAction } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { v4 as uuidv4 } from 'uuid'

interface IGigPaginateProps {
  gigs: ISellerGig[]
  totalGigs: number
  itemsPerPage: number
  showNumbers: boolean
  setItemFrom: Dispatch<SetStateAction<string>>
  setPaginationType: Dispatch<SetStateAction<string>>
}

export default function GigPaginate({ gigs, totalGigs, itemsPerPage, showNumbers, setItemFrom, setPaginationType }: IGigPaginateProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const paginationCount: number[] = [...Array(Math.ceil((totalGigs as number) / itemsPerPage)).keys()]
  const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const targetPage = (pageNum: number) => {
    if (currPage < pageNum) {
      setPaginationType('forward')
      setItemFrom(`${pageNum * itemsPerPage - itemsPerPage}`)
    } else if (currPage > pageNum) {
      const selectedCount = pageNum * itemsPerPage + 1
      setPaginationType('backward')
      setItemFrom(`${selectedCount}`)
    }

    searchParams.set('page', String(pageNum))
    setSearchParams(searchParams)
  }

  const prevPage = () => {
    const prev = currPage === 1 ? currPage : currPage - 1
    searchParams.set('page', String(prev))
    setPaginationType('backward')
    const firstItem: ISellerGig = gigs[0]
    setItemFrom(`${firstItem.sortId}`)
    setSearchParams(searchParams)
  }

  const nextPage = () => {
    const next = currPage === paginationCount.length ? currPage : currPage + 1
    searchParams.set('page', String(next))
    setSearchParams(searchParams)
    setPaginationType('forward')
    const lastItem: ISellerGig = gigs[gigs.length - 1]
    setItemFrom(`${lastItem.sortId}`)
  }

  return (
    <div className="flex w-full justify-center">
      <ul className="flex gap-8">
        <button
          disabled={currPage === 1}
          className={`p-3 ${currPage === 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer rounded-full border border-sky-400'}`}
          onClick={prevPage}
        >
          <FaArrowLeft className="flex self-center" />
        </button>
        {showNumbers &&
          paginationCount.map((_, index: number) => {
            const pageNum = index + 1
            const isActive = pageNum === currPage

            return (
              <li
                key={uuidv4()}
                className={`px-3 py-2 ${isActive ? 'cursor-pointer border-b-2 border-black font-bold text-black' : 'cursor-pointer'}`}
                onClick={() => targetPage(pageNum)}
              >
                {index + 1}
              </li>
            )
          })}
        <button
          disabled={currPage === paginationCount.length}
          className={`p-3 ${
            currPage === paginationCount.length ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer rounded-full border border-sky-400'
          }`}
          onClick={nextPage}
        >
          <FaArrowRight className="flex self-center" color={`${currPage === paginationCount.length ? 'grey' : 'black'}`} />
        </button>
      </ul>
    </div>
  )
}
