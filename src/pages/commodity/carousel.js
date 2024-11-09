import styled from 'styled-components'
import BaseCarousel from '@app/shared/carousel'
import { useState } from 'react'
import { PRIZE_LEVEL } from '@app/utils/constants'

const Item = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 10px;
    width: 270px;
    height: 270px;
  }
`

const CarouselContainer = styled(BaseCarousel)`
  width: 300px;
  height: 300px;
  > .slick-prev,
  > .slick-prev:focus {
    left: 17px;
    opacity: 1;
  }

  > .slick-next,
  > .slick-next:focus {
    right: 17px;
    opacity: 1;
  }
`

export default function Carousel({ data, setIsAnimationFinished }) {
  const [enableAutoPlay, setEnableAutoPlay] = useState(true)
  return (
    <CarouselContainer
      autoplay={enableAutoPlay}
      autoplaySpeed={1000}
      speed={700}
      dots={false}
      infinite={false}
      arrows
      afterChange={(cur) => {
        if (cur === data.length - 1) {
          setIsAnimationFinished(true)
          setEnableAutoPlay(false)
        }
      }}
    >
      {data.map((i) => {
        const { imgUrl, prizeName, prizeLevel } = i
        console.log('prizeName', i)
        return (
          <Item>
            <img src={imgUrl} />
            {`${PRIZE_LEVEL[prizeLevel].name} ${prizeName}`}
          </Item>
        )
      })}
    </CarouselContainer>
  )
}
