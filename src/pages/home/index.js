import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import ichibanHeaderWordingImg from '@app/static/ichiban-header.png'
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
    width: 100%;
  }
  img:last-child {
    position: absolute;
    left: 50%;
    bottom: 15%;
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
`

export default function Home() {
  const commodities = useSelector(() => dataStore.commodities)
  const ads = useSelector(() => dataStore.ads)

  useEffect(() => {
    const req = {
      category: CATEGORY.ICHIBAN,
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
        >
          {ads.map((src, index) => (
            <img src={src} key={index} />
          ))}
        </Carousel>
      ) : null}
      <Header>
        <img src={headerBg} />
        <img src={ichibanHeaderWordingImg} />
      </Header>
      <Products data={commodities?.data} />
    </Layout>
  )
}
