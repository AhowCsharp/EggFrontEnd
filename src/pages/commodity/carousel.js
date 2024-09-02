import styled from 'styled-components'
import BaseCarousel from '@app/shared/carousel'

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
`

export default function Carousel({ data, setIsAnimationFinished }) {
  return (
    <CarouselContainer
      autoplay={true}
      autoplaySpeed={1800}
      speed={700}
      dots={false}
      infinite={false}
      afterChange={(cur) => {
        if (cur === data.length - 1) setIsAnimationFinished(true)
      }}
    >
      {data.map(({ imgUrl, prizeName }) => (
        <Item>
          <img src={imgUrl} />
          {prizeName}
        </Item>
      ))}
    </CarouselContainer>
  )
}
