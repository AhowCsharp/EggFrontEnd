import styled from 'styled-components'
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
import { hideScrollBarStyle } from '@app/shared/header'

const ArrowButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(p) => p.theme.color.red};
  color: #fff;
  font-size: 0.875rem;
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = styled.div`
  border-bottom: 1px solid ${(p) => p.theme.color.red};
  color: #160d00;
  font-size: 1.5rem;
  font-family: 'DotGothic16', 'Noto Sans', Roboto, Helvetica, Arial, sans-serif;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  div.block {
    display: flex;
    align-items: center;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  ${ArrowButton} + ${ArrowButton} {
    margin-left: 8px;
  }
`

const Container = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 1rem 0;
  justify-content: space-between;
  .item + .item {
    margin-top: 1.25rem;
  }
`

const InnerContainer = styled.div`
  width: calc(50% - 8px);
`

const OthersContainer = styled(InnerContainer)`
  max-height: 550px;
  overflow-y: auto;
  ${hideScrollBarStyle}
`

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
    <>
      <Header>
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
    </>
  )
  function handleClick(data) {
    return () => {
      goto(url.campaign({ campaignId: data.id }))
    }
  }
}
