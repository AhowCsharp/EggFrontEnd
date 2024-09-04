import styled from 'styled-components'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  min-height: 100%;
  min-width: 100%;
  transition: all 0.3s;
  vertical-align: middle;
  width: 100px;
`

const BaseProduct = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  overflow: hidden;
  width: calc((100% - 60px) / 3);
  margin: 20px 10px 0;
  cursor: pointer;
  &:hover ${Image} {
    transform: scale(1.07);
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 10px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 12px 6px;
  flex-direction: column;
`

const Info = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
  svg {
    font-size: 0.85rem;
  }
  * + * {
    margin-left: 6px;
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  height: 40px;
  font-weight: 700;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  position: relative; /* 使灯条效果相对于文字定位 */
  overflow: hidden;

  /* 霓虹灯文字效果 */
  color: #ff0000;
  text-shadow: 
    0 0 5px #ff0000,
    0 0 10px #ff0000,
    0 0 20px #ff0000,
    0 0 40px #ff0000,
    0 0 80px #ff0000,
    0 0 90px #ff0000,
    0 0 100px #ff0000,
    0 0 150px #ff0000;
  animation: neonTextFlicker 1.5s infinite alternate;

  /* 灯条包围效果 */
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 5px solid transparent;
    box-sizing: border-box;
    border-radius: 15px;
    pointer-events: none;
  }

  @keyframes neonTextFlicker {
    0%, 100% {
      color: #ff0000;
      text-shadow: 
        0 0 5px #ff0000,
        0 0 10px #ff0000,
        0 0 20px #ff0000,
        0 0 40px #ff0000,
        0 0 80px #ff0000,
        0 0 90px #ff0000,
        0 0 100px #ff0000,
        0 0 150px #ff0000;
    }
    50% {
      color: #00ff00;
      text-shadow: 
        0 0 5px #00ff00,
        0 0 10px #00ff00,
        0 0 20px #00ff00,
        0 0 40px #00ff00,
        0 0 80px #00ff00,
        0 0 90px #00ff00,
        0 0 100px #00ff00,
        0 0 150px #00ff00;
    }
  }

  @keyframes borderGlow {
    0% {
      border-color: #ff0000 transparent #ff0000 transparent;
    }
    50% {
      border-color: #00ff00 transparent #00ff00 transparent;
    }
    100% {
      border-color: #ff0000 transparent #ff0000 transparent;
    }
  }
`;

const ImageContainer = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
`

export default function Product({ data, handleClick }) {
  const { logoUrl, name, mobileNumber, address } = data

  return (
    <BaseProduct onClick={handleClick(data)}>
      <ImageContainer>
        <Image src={logoUrl} />
      </ImageContainer>
      <InfoContainer>
        <Title>{name}</Title>
        <Info>
          <FontAwesomeIcon icon={faPhone} />
          <span>{mobileNumber}</span>
        </Info>
        <Info>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{address}</span>
        </Info>
      </InfoContainer>
    </BaseProduct>
  )
}
