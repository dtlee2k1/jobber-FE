import { useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import GigIndexItem from 'src/features/index/gig-tabs/GigIndexItem'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { socket } from 'src/sockets/socket.service'
import { v4 as uuidv4 } from 'uuid'

import { replaceSpacesWithDash } from '../utils/utils.service'
import GigCardDisplayItem from './GigCardDisplayItem'

interface IScrollProps {
  start: boolean
  end: boolean
}

interface ITopGigsViewProps {
  gigs: ISellerGig[]
  title: string
  subTitle: string
  category?: string
  width: string
  type: string
}

export default function TopGigsView({ gigs, title, subTitle, category, type, width }: ITopGigsViewProps) {
  const navElement = useRef<HTMLDivElement | null>(null)
  const [scroll, setScroll] = useState<IScrollProps>({
    start: false,
    end: false
  })
  const slideLeft = () => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft
      const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth
      setScroll({ start: maxWidth === navElement.current.scrollWidth, end: false })
    }
  }

  const slideRight = () => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft
      const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth - 1000
      setScroll({ start: true, end: maxWidth === navElement.current.clientWidth })
    }
  }

  return (
    <div className="mx-auto my-8 flex flex-col overflow-hidden rounded-lg">
      <div className="flex items-start py-6">
        <div className="flex w-full flex-col justify-between">
          <div className="flex gap-2">
            <h2 className="text-base font-bold md:text-lg lg:text-2xl">{title}</h2>
            {category && (
              <span className="flex cursor-pointer self-center text-base font-bold text-sky-500 hover:text-sky-400 hover:underline md:text-lg lg:text-2xl">
                <Link to={`/categories/${replaceSpacesWithDash(category)}`} onClick={() => socket.emit('getLoggedInUsers')}>
                  {category}
                </Link>
              </span>
            )}
          </div>
          <h4 className="pt-1 text-left text-sm">{subTitle}</h4>
        </div>
      </div>

      <div className="m-auto flex h-96 w-full overflow-x-auto" ref={navElement}>
        {scroll.start && gigs.length > 5 && (
          <span
            onClick={slideLeft}
            className="absolute left-2 z-50 flex cursor-pointer justify-start self-center rounded-full bg-sky-400 sm:left-3 md:left-7 lg:left-0"
          >
            <FaAngleLeft className="text-3xl text-white sm:text-3xl md:text-4xl lg:text-4xl" />
          </span>
        )}

        <div className="relative flex gap-x-8 pt-3">
          {gigs.map((gig: ISellerGig) => (
            <div key={uuidv4()} className={`${gigs.length === 5 ? 'w-[20%]' : width}`}>
              {type === 'home' ? <GigCardDisplayItem gig={gig} linkTarget={false} showEditIcon={false} /> : <GigIndexItem gig={gig} />}
            </div>
          ))}
        </div>

        {!scroll.end && gigs.length > 5 && (
          <span
            onClick={slideRight}
            className="absolute right-2 flex max-w-4xl cursor-pointer justify-end self-center rounded-full bg-sky-400 sm:right-3 md:right-7 lg:right-0"
          >
            <FaAngleRight className="text-3xl text-white sm:text-3xl md:text-4xl lg:text-4xl" />
          </span>
        )}
      </div>
    </div>
  )
}
