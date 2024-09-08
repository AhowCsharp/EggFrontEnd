import styled, { keyframes } from 'styled-components'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const neon = keyframes`
  from {
    text-shadow: 0 0 20px #A3FFA3, 0 0 100px #A3FFA3, 0 0 20px #A3FFA3;
  }
  to {
    text-shadow: 0 0 50px #A3FFA3, 0 0 150px #A3FFA3, 0 0 50px #A3FFA3;
    color: #00B200;
  }
`

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  min-height: 100%;
  height: auto;
  min-width: 100%;
  vertical-align: middle;
  width: 100px;
`

const BaseProduct = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  overflow: hidden;
  width: calc((100% - 64px) / 4);
  margin: 20px 8px 0;
  cursor: pointer;
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
  position: relative;
  overflow: hidden;
  color: #00ff00;
  text-shadow: 0 0 50px #00ff00, 0 0 150px #00ff00, 0 0 20px #00ff00;
  animation: ${neon} 1.5s infinite alternate;
`

export default function Product({ data, handleClick }) {
  const { logoUrl, name, mobileNumber, address } = data

  return (
    <BaseProduct onClick={handleClick(data)}>
      <Image src={logoUrl} />
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
