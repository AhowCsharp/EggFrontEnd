import styled from 'styled-components';
import { hideScrollBarStyle } from '@app/shared/header';
import PcContainer from './pcContainer';
import MobileContainer from './mobileContainer';

const ArrowButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(p) => p.theme.color.red};
  color: #fff;
  font-size: 0.875rem;
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  flex: 0 0 60%;
  margin-right: 30px; /* 可根據需要調整間距 */
`;

const OthersContainer = styled.div`
  flex: 0 0 40%;
  max-height: 550px;
  overflow-y: auto;
  .item {
    align-items: center;
  }
  ${hideScrollBarStyle}
`;

const Layout = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    ${InnerContainer}, ${OthersContainer} {
      width: 100%;
      margin-right: 0;
    }
    ${OthersContainer} {
      display: none;
    }
  }
`;

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
`;

export {
  Layout as Container,
  ArrowButton,
  Header,
  InnerContainer,
  OthersContainer,
};

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
        margin-top: -20px;
        display: block;
      }
    }
  }
`;

export default function CampaignBlock({ data }) {
  return (
    <Container>
      <PcContainer data={data} />
      <MobileContainer data={data} />
    </Container>
  );
}
