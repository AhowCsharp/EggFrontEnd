import styled from 'styled-components'
import Commodity from './commodity'
import headerImg from '@app/static/header.png'
import { url } from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  align-items: center;
  padding: 10px 0;
  margin: 1rem 0;
  flex-wrap: wrap;
  margin-top: -20px;
  min-height: 150px;
  .item + .item {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

export default function HotCommodityBlock({ data }) {
  const goto = useNavigate()

  return (
    <>
      <Header>
        <div className="block">
          <img src={headerImg} />
          熱銷商品
        </div>
        <div className="block">
          <ArrowButton disabled>
            <FontAwesomeIcon icon={faChevronLeft} />
          </ArrowButton>
          <ArrowButton>
            <FontAwesomeIcon icon={faChevronRight} />
          </ArrowButton>
        </div>
      </Header>
      {data && data.length ? (
        <Container>
          {data.map((p, index) => (
            <Commodity key={index} data={p} handleClick={handleClick} />
          ))}
        </Container>
      ) : null}
    </>
  )
  function handleClick(data) {
    return () => {
      goto(url.commodity({ commodityId: data.id }))
    }
  }
}
