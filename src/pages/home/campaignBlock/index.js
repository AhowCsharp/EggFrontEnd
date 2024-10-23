import styled from 'styled-components'
import { hideScrollBarStyle } from '@app/shared/header'
import PcContainer from './pcContainer'
import MobileContainer from './mobileContainer'

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

const InnerContainer = styled.div`
  width: calc(50% - 8px);
`

const OthersContainer = styled(InnerContainer)`
  max-height: 550px;
  overflow-y: auto;
  ${hideScrollBarStyle}
`

const Layout = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 1rem 0;
  justify-content: space-between;
  .item + .item {
    margin-top: 1.25rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    ${InnerContainer} {
      width: 100%;
    }
    ${OthersContainer} {
      display: none;
    }
  }
`

const Header = styled.div`
  border-bottom: 1px solid ${(p) => p.theme.color.red};
  color: #160d00;
  font-size: 1.5rem;
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
  @media (max-width: 768px) {
    color: ${(p) => p.theme.mobile.color.font};
  }
`

export {
  Layout as Container,
  ArrowButton,
  Header,
  InnerContainer,
  OthersContainer,
}

const Container = styled.div`
  .container {
    &.pc {
      display: block;
    }
    &.mobile {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .container {
      &.pc {
        display: none;
      }
      &.mobile {
        display: block;
      }
    }
  }
`

export default function CampaignBlock({ data }) {
  return (
    <Container>
      <PcContainer data={data} />
      <MobileContainer data={data} />
    </Container>
  )
}
