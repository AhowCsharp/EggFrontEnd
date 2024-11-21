import styled from 'styled-components'
import BaseCarousel from '@app/shared/carousel'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { PRIZE_LEVEL } from '@app/utils/constants'

const Item = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 確保項目寬度一致 */
  height: 300px; /* 設定固定高度 */
  box-sizing: border-box; /* 包含內邊距和邊框 */
  img {
    margin-bottom: 10px;
    width: 270px;
    height: 270px;
    object-fit: cover; /* 保持圖片比例，避免變形 */
  }
  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 20px; /* 固定文字高度 */
    overflow: hidden; /* 隱藏超出部分 */
  }
`

const CarouselContainer = styled(BaseCarousel)`
  width: 300px;
  height: 300px;
  overflow-y: hidden;
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
        return (
          <Item key={uuidv4()}>
            <img src={imgUrl} alt={prizeName}/>
            <div className="text">{`${PRIZE_LEVEL[prizeLevel].name} ${prizeName}`}</div>
          </Item>
        )
      })}
    </CarouselContainer>
  )
}
