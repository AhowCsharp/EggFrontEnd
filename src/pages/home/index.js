import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect, useState } from 'react'
import Products from '@app/shared/products'
import BaseCarousel from '@app/shared/carousel'
import { useSelector, dataStore } from '@app/store'
import {
  CATEGORY,
  DEFAULT_COMMODITIES_PAGINATION,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import headerImg from '@app/static/header.png'
import { url } from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import newArrivalsImg from '@app/static/new-arrivals.png'
import Button from '@app/shared/products/button'
import AnnouncementModal from '@app/shared/announcementModal'
import useRandomColors from '@app/utils/hooks/useRandomColors'
import HotCommodityBlock, { Header } from './hotCommodityBlock'
import CampaignBlock from './campaignBlock/index'

export const DisplayPageSize = 4

//限制為三條不跑版
const announcements = [
  {
    title: '金流系統公告',
    time: '2024年11月07日',
    content: [
      '目前僅開放刷卡方式 🎰',
      'ATM虛擬帳戶轉帳尚未開通 🃏',
      'LinePay也尚未開通 ，工程師努力中🎭'
    ],
  },
  {
    title: '新手村公告',
    time: '2024年11月01日',
    content: [
      '金幣與御守等值，金幣可藉由儲值獲得 🤖',
      '抽獎券、免運券可就由當月消費滿額贈送，詳情請點擊廠商資訊查看門檻 🚨',
      '御守可透過完成任務、每日簽到、抽獎回饋、提升會員等級、分享推薦連結給朋友獲得 🗿',
    ],
  },
  {
    title: '寶箱系統上線',
    time: '2024年11月07日',
    content: [
      '每一次抽獎都有機會獲得寶箱或鑰匙 💥',
      '單抽價格愈高，獲得高級寶箱機率愈高 🈵',
      '一組同等級鑰匙與寶箱才能開啟，寶箱等級決定獎勵大小 🉐',
    ],
  },
  {
    title: '每日簽到介紹',
    time: '2024年11月01日',
    content: [
      '每天僅可抽獎一次，凌晨12:00刷新 🀄',
      '獎勵有金幣、平台抽獎券不等 🎯',
      '當月全勤會於月底發放全勤獎，本站很重視出席率der 🏅',
    ],
  },
  {
    title: '紀念里程碑',
    time: '2024年11月07日 凌晨00:18',
    content: [
      '恭喜 玩家 : 陳世安✨ 成為開幕以來首位儲值消費的玩家 🫶',
      '可喜可賀 以茲紀念 🎉 本站真不是詐騙 😭',
      '歡迎顧客使用自身推薦碼邀請朋友加入 🎁 領取好禮大獎 😍',
    ],
  },
];

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    @media (max-width: 768px) {
      margin: 0;
    }
  }
`

const Carousel = styled(BaseCarousel)`
  margin: 0px auto 50px;
  padding: 16px 8px;
  .slick-slide {
    opacity: 0.6;
    transform: scale(0.9);
    padding: 20px;
  }
  .slick-slide.slick-current + .slick-slide {
    opacity: 1;
    transform: scale(1.1);
    margin-top: 5px;
  }
  .slick-dots {
    bottom: -5px;
    z-index: ${(p) => p.theme.zIndex.dialog} !important;
    li {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }
    .slick-active {
      width: 16px !important;
      div {
        opacity: 1;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.5rem;
      }
    }
  }
  @media (max-width: 768px) {
    .slick-slide.slick-current + .slick-slide,
    .slick-slide {
      opacity: 0.6;
      transform: scale(0.9);
    }
    .slick-slide.slick-current {
      opacity: 1;
      transform: scale(1.1);
      margin-top: 5px;
    }
  }
`

const Dots = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  background-color: #fff;
  border-radius: 0.375rem;
  opacity: 0.4;
  position: relative;
`

const NewArrivalTag = styled.img.attrs({ src: newArrivalsImg })`
  position: absolute;
  top: 0;
  left: 0;
  width: 25% !important;
  height: auto !important;
`

export default function Home() {
  const commodities = useSelector(() => dataStore.commodities)
  const newAds = useSelector(() => dataStore.newAds)
  const news = useSelector(() => dataStore.news)
  const hotAds = useSelector(() => dataStore.hotAds)
  const manufacturers = useSelector(() => dataStore.manufacturers)
  const goto = useNavigate()
  const manufacturerColors = useRandomColors(manufacturers, 'id')
  const [shouldSortDialogOpen, setShouldSortDialogOpen] = useState(false)
  useEffect(() => {
    dataStore.setManufacturerColors(manufacturerColors)
  }, [manufacturerColors])

  useEffect(() => {
    const req = {
      status: COMMODITY_STATUS.OPENING,
      ...DEFAULT_COMMODITIES_PAGINATION,
    }
    dataStore.getCommodities(req)
    dataStore.getAds()
    dataStore.recordVisitCount()
    dataStore.getManufacturers()
  }, [])

  return (
    <>
      <AnnouncementModal announcements={announcements} />
      {newAds.length ? (
        <Carousel
          arrows
          infinite={true}
          autoplay={true}
          speed={700}
          autoplaySpeed={1500}
          dots={true}
          centerMode={false}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerMode: true,
              },
            },
          ]}
          customPaging={(i) => <Dots />}
        >
          {newAds.map((data, index) => (
            <ImageContainer key={index} onClick={handleClick(data)}>
              <img src={data.imgUrl} />
              <NewArrivalTag />
            </ImageContainer>
          ))}
        </Carousel>
      ) : null}
      <Layout>
        <CampaignBlock data={news} />
        <HotCommodityBlock data={hotAds} />
        <Header className="digital-font">
          <div className="block">
            <img src={headerImg} />
            全部商品
          </div>
          <div className="block">
            <Button onClick={() => setShouldSortDialogOpen(true)} />
          </div>
        </Header>
        <Products
          data={commodities?.data}
          shouldSortDialogOpen={shouldSortDialogOpen}
          setShouldSortDialogOpen={setShouldSortDialogOpen}
          shouldDisplayControlBar={false}
        />
      </Layout>
    </>
  )
  function handleClick(data) {
    return () => {
      goto(url.commodity({ commodityId: data.id }))
    }
  }
}
