import { useCallback, useEffect, useState } from 'react'
import { ISliderState } from 'src/interfaces/home.interface'
import { ISliderImagesText } from 'src/interfaces/utils.interface'
import { sliderImages, sliderImagesText } from 'src/shared/utils/static-data'

export default function HomeSlider() {
  const [sliderState, setSliderState] = useState<ISliderState>({
    slideShow: sliderImages[0],
    slideIndex: 0
  })
  const [currentSliderImageText, setCurrentSliderImageText] = useState<ISliderImagesText>(sliderImagesText[0])

  const { slideShow, slideIndex } = sliderState

  const autoMoveSlide = useCallback(() => {
    const lastIndex = slideIndex + 1
    const currentSlideIndex = lastIndex >= sliderImages.length ? 0 : lastIndex

    setCurrentSliderImageText(sliderImagesText[currentSlideIndex])
    setSliderState({
      slideShow: sliderImages[currentSlideIndex],
      slideIndex: currentSlideIndex
    })
  }, [slideIndex])

  useEffect(() => {
    const timeInterval = setInterval(() => {
      autoMoveSlide()
    }, 3000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [autoMoveSlide])

  return (
    <div className="flex gap-x-8">
      <div className="relative h-96 w-full overflow-hidden bg-red-50">
        <img alt="slider" className="absolute h-96 w-full object-cover transition" src={slideShow} />
        <div className="absolute px-6 py-4">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">{currentSliderImageText.header}</h2>
          <h4 className="pt-1 font-bold text-white drop-shadow-md">{currentSliderImageText.subHeader}</h4>
        </div>
        <div className="absolute bottom-0 flex gap-3 px-6 py-4">
          {sliderImages.map((_, index: number) => (
            <div key={index} className={`h-2 w-2 rounded-full ${slideIndex === index ? 'bg-sky-500' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
