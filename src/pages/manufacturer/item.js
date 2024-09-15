import styled, { keyframes } from 'styled-components'
import {
  faLocationDot,
  faPhone,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const neonBorder = keyframes`
    0% {
        box-shadow: 0 0 0 rgba(34,198,15, 0.4); /* Green shadow, no blur initially */
    }
    50% {
        box-shadow: 0 0 4px rgba(34,198,15, 0.9); /* Bright green glow */
    }
    100% {
        box-shadow: 0 0 0 rgba(34,198,15, 0.4); /* Fade back to no glow */
    }
`

const neonBg = keyframes`
    0% {
        background-color: rgba(201,20,20,0.7); /* 深紅色 */
    }
    50% {
        background-color: rgba(201,20,20,0.9); /* 明亮的紅色 */
    }
    100% {
        background-color: rgba(201,20,20,0.7); /* 回到深紅色 */
    }`

const Image = styled.div`
  width: 100%;
  height: 180px;
  vertical-align: middle;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(p) => p.src});
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

const Link = styled.a.attrs((p) => ({ href: p.url, target: '_blank' }))`
  font-size: 1rem;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
  svg {
    font-size: 0.85rem;
  }
  * + * {
    margin-left: 6px;
  }
`

const Title = styled.div`
  animation: ${neonBorder} 2s infinite;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  height: 45px;
  border: 6px double rgba(34, 198, 15, 0.9);
  display: flex;
  position: relative;
  box-shadow: 0 0 5px lime, 0 0 5px lime, 0 0 5px lime;
  div {
    font-family: 'LXGW WenKai Mono TC', Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex: 1;
    animation: ${neonBg} 2s infinite;
  }
`

export default function Product({ data, handleClick }) {
  const { logoUrl, name, mobileNumber, address, officialWebsite } = data

  return (
    <BaseProduct onClick={handleClick(data)}>
      <Image src={logoUrl} />
      <InfoContainer>
        <Title>
          <div>{name}</div>
        </Title>
        {!!officialWebsite && (
          <Link url={officialWebsite} onClick={(e) => e.stopPropagation()}>
            <span>{officialWebsite}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        )}
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
