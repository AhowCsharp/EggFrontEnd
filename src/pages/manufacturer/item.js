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
  height: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
  margin-bottom: 10px;
`

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
