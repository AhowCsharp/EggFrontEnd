import { useParams } from 'react-router-dom'
import Layout from '@app/shared/layout'
import { useEffect, useState } from 'react'
import { useSelector, dataStore } from '@app/store'
import styled from 'styled-components'
import { formatDate } from '@app/utils/date'
import { breadCrumbs, url } from '@app/utils/paths'
import Campaign, { DateInfo } from '@app/pages/home/campaignBlock/campaign'
import { hideScrollBarStyle } from '@app/shared/header'
import { useNavigate } from 'react-router-dom'
import { Header } from '@app/pages/commodity'

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${(p) => p.theme.color.desc};
  line-height: 1.25rem;
  p {
    margin: 5px 0;
  }
`
const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  height: auto;
  width: 100%;
  border-radius: 8px;
  margin: 2.5rem auto;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-bottom: 1.5rem;
`

const MainContainer = styled.div`
  width: calc(60% - 8px);
`

const OthersContainer = styled(MainContainer)`
  width: calc(40% - 8px);
  max-height: 700px;
  overflow: hidden;
  background: #f2f2f2;
  border-radius: 1rem;
  ${hideScrollBarStyle}
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  .header {
    margin-top: 0;
  }
  .content {
    overflow-y: auto;
  }
  img {
    width: 160px;
    height: auto;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    ${MainContainer}, ${OthersContainer} {
      width: 100%;
    }
    ${OthersContainer} {
      margin-top: 1.5rem;
      background-color: ${(p) => p.theme.mobile.color.descBg};
      img {
        width: auto;
        height: 100px;
      }
    }
    ${Description} {
      color: ${(p) => p.theme.mobile.color.font};
    }
    ${Image} {
      margin: 1.5rem auto;
    }
  }
`

export default function CampaignPage() {
  const params = useParams()
  const campaignId = +params.campaignId
  const campaignDict = useSelector(() => dataStore.newsById)
  const news = useSelector(() => dataStore.news)
  const campaign = campaignDict[campaignId]
  const [otherCampaigns, setOtherCampaigns] = useState([])
  const goto = useNavigate()

  useEffect(() => {
    if (!news.length) dataStore.getAds()
    else setOtherCampaigns(news.filter((item) => item.id !== campaignId))
  }, [news, campaignId])

  useEffect(() => {
    if (!campaign) return
    dataStore.setBreadCrumbs([...breadCrumbs.default, campaign.newsTitle])
  }, [campaign])

  useEffect(() => {
    dataStore.getNewsById(campaignId)
  }, [campaignId])

  if (!campaign) return null
  const {
    newsUrl: imgUrl,
    endDate,
    startDate,
    newsTitle,
    newsDetails,
  } = campaign

  return (
    <Layout>
      <Container>
        <MainContainer>
          <Title>{newsTitle}</Title>
          <DateInfo>
            <div>{formatDate(startDate)}</div>
            <div>
              活動期間：{formatDate(startDate)}~{formatDate(endDate)}
            </div>
          </DateInfo>
          <Image src={imgUrl} isHighLight />
          <Description
            id="description"
            dangerouslySetInnerHTML={{ __html: newsDetails }}
          />
        </MainContainer>
        <OthersContainer>
          <Header className="header" red>
            推薦活動
          </Header>
          <div className="content">
            {otherCampaigns.map((campaign) => (
              <Campaign
                data={campaign}
                handleClick={handleClick}
                isSimple={true}
                key={campaign.id}
              />
            ))}
          </div>
        </OthersContainer>
      </Container>
    </Layout>
  )
  function handleClick(data) {
    return () => {
      goto(url.campaign({ campaignId: data.id }))
    }
  }
}
