import Campaign from './campaign'
import headerImg from '@app/static/header.png'
import { url } from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import {
  Container,
  InnerContainer,
  OthersContainer,
  ArrowButton,
  Header,
} from './index'

export default function CampaignBlock({ data }) {
  const goto = useNavigate()
  const [nowCampaign, setNowCampaign] = useState(data[0])
  const [nowIndex, setNowIndex] = useState(0)
  const [otherCampaigns, setOtherCampaigns] = useState(data.slice(1))

  useEffect(() => {
    if (data[nowIndex]) {
      setNowCampaign(data[nowIndex])
      setOtherCampaigns(data.filter((_, index) => index !== nowIndex))
    } else {
      setNowIndex(0)
    }
  }, [nowIndex, data])
  if (data.length === 0) {
    return null
  }
  return (
    <div className="container pc">
      <Header className="digital-font">
        <div className="block">
          <img src={headerImg} />
          活動消息
        </div>
        <div className="block">
          <ArrowButton
            disabled={nowIndex === 0}
            onClick={() => nowIndex !== 0 && setNowIndex(() => nowIndex - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </ArrowButton>
          <ArrowButton
            disabled={nowIndex === data.length - 1}
            onClick={() =>
              nowIndex !== data.length - 1 && setNowIndex(() => nowIndex + 1)
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </ArrowButton>
        </div>
      </Header>
      <Container>
        <InnerContainer>
          {!!nowCampaign && (
            <Campaign
              data={nowCampaign}
              isHighLight
              handleClick={handleClick}
            />
          )}
        </InnerContainer>
        <OthersContainer>
          {otherCampaigns.map((campaign) => (
            <Campaign
              data={campaign}
              handleClick={handleClick}
              key={campaign.id}
            />
          ))}
        </OthersContainer>
      </Container>
    </div>
  )
  function handleClick(data) {
    return () => {
      goto(url.campaign({ campaignId: data.id }))
    }
  }
}
