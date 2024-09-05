import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import gachaHeaderWordingImg from '@app/static/gacha-header.png'
import headerBg from '@app/static/header-bg.png'
import Products from '@app/shared/products'
import BaseCarousel from '@app/shared/carousel'
import { useSelector, dataStore } from '@app/store'
import {
  CATEGORY,
  DEFAULT_COMMODITIES_PAGINATION,
  COMMODITY_STATUS,
} from '@app/utils/constants'

const Header = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  img:first-child {
    position: relative;
    width: 110%;
    left: -5%;
  }
  img:last-child {
    position: absolute;
    left: 50%;
    bottom: 17%;
    transform: translate(-50%, 0);
    width: 7%;
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`

const Carousel = styled(BaseCarousel)`
  width: calc(90vw - 20px);
  height: calc(90vw - 20px);
  margin: 0 auto 30px;
  padding: 8px;
  border: 1px solid #bbb;
  max-height: 1080px;
  max-width: 1080px;
  overflow: hidden;
  .slick-center {
    padding: 10px;
  }
  .slick-center + .slick-slide {
    transform: scale(0.7) translateX(-20%);
  }
  .slick-slide:has(+ .slick-center) {
    transform: scale(0.7) translateX(20%);
  }
`

export default function Home() {
  const commodities = useSelector(() => dataStore.commodities)
  const ads = useSelector(() => dataStore.ads)

  useEffect(() => {
    const req = {
      category: CATEGORY.GACHA,
      status: COMMODITY_STATUS.OPENING,
      ...DEFAULT_COMMODITIES_PAGINATION,
    }
    dataStore.getCommodities(req)
    dataStore.getAds()
    dataStore.recordVisitCount()
  }, [])

  return (
    <Layout>
      {ads.length ? (
        <Carousel
          arrows
          infinite={true}
          autoplay={true}
          speed={700}
          dots={false}
          centerMode={true}
        >
          {ads.map((src, index) => (
            <img src={src} key={index} />
          ))}
        </Carousel>
      ) : null}
      <Header>
        <img src={headerBg} />
        <img src={gachaHeaderWordingImg} />
      </Header>
      <Products data={commodities?.data} />
    </Layout>
  )
}
