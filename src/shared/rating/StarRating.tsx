import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

interface IStarRatingProps {
  value?: number
  size?: number
  setReviewRating?: Dispatch<SetStateAction<number>>
}

export default function StarRating({ value, size, setReviewRating }: IStarRatingProps) {
  const [numOfStars] = useState<number[]>(
    Array(5)
      .fill(0)
      .map((_, index) => index + 1)
  )
  const [rating, setRating] = useState<number>(0)

  useEffect(() => {
    value && setRating(value)
  }, [value])

  const handleClick = (index: number) => {
    if (!value && setReviewRating) {
      setRating(index)
      setReviewRating(index)
    }
  }

  return (
    <div className="flex cursor-pointer">
      <div className="relative flex text-orange-400">
        {numOfStars.map((index: number) => (
          <Fragment key={index}>{index <= rating && <FaStar size={size} className="mr-1" />}</Fragment>
        ))}

        <div className="absolute flex text-orange-400">
          {numOfStars.map((index: number) => (
            <FaRegStar className="mr-1" key={uuidv4()} size={size} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}
