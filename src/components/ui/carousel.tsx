import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EmblaCarouselType, EngineType, EmblaOptionsType } from 'embla-carousel'
import useCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
  const { options, slides: propSlides } = props
  const scrollListenerRef = useRef<() => void>(() => undefined)
  const [slides, setSlides] = useState(propSlides)

  const [emblaRef, emblaApi] = useCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
    Fade()
  ])

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      emblaApi.on('scroll', scrollListenerRef.current)
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return
    addScrollListener(emblaApi)

    const onResize = () => emblaApi.reInit()
    window.addEventListener('resize', onResize)
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize))
  }, [emblaApi, addScrollListener])

  return (
    <div className="h-screen w-1/2">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="min-w-full " key={index}>
              <img className='h-screen object-cover w-full' src={slide} alt={String(index)} loading='lazy' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
