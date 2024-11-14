import styled from 'styled-components'
import Tag from '@app/shared/tag'
import { PRIZE_LEVEL } from '@app/utils/constants'
import soldOutImg from '@app/static/sold-out.png'
import prizeTagImg from '@app/static/prize-tag.png'
import { showScrollBarStyle } from '@app/shared/header'
import { PushpinFilled } from '@ant-design/icons'
import { formatDiscount } from '@app/utils/formatDiscount'
import Price from './price'

const PinIcon = styled(PushpinFilled)`
  position: absolute;
  top: 2px;
  right: 2px;
  color: #ffa500;
  font-size: 24px;
  z-index: 2;

  @media (max-width: 768px) {
    top: 1px;
    right: 1px;
  }
`

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  transition: all 0.3s;
  vertical-align: middle;
  width: 100%;
  height: auto;
`

const SoldOutImg = styled.img.attrs((p) => ({
  src: soldOutImg,
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`

const BaseProduct = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  overflow: hidden;
  width: calc(25% - 11.25px);
  margin-top: 20px;
  flex-grow: 0;
  cursor: pointer;
  &:hover ${Image} {
    transform: scale(1.07);
  }
  ${BaseProduct} + ${BaseProduct} {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    border: 1px solid #fff;
    width: calc(50% - 4px);
    margin: 0 0 10px;
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 100%;
  height: 2.75rem;
`

const CountTag = styled.div`
  padding: 4px 16px;
  background: #000;
  color: #fff;
  font-weight: 700;
  justify-content: flex-start;
  display: flex;
  margin-left: 5px;
  border-radius: 50px;
  align-items: center;
  font-size: 1.25rem;
`

const TagContainer = styled.div`
  display: flex;
  width: 100%;
`

const SaleTag = styled.div`
  padding: 10px 12px;
  color: ${(p) => p.theme.color.red};
  border: 1px solid ${(p) => p.theme.color.red};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
  background: #fff;
`

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  display: flex;
  align-items: center;
  &::after {
    background: linear-gradient(transparent 30%, rgba(0, 0, 0, 0.65));
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
  ${CountTag} {
    position: absolute;
    top: 0;
    left: 0;
    margin: 8px;
    z-index: 1;
  }
  ${TagContainer} {
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
    z-index: 1;
  }
  ${SaleTag} {
    position: absolute;
    top: 48px;
    left: 0;
  }
`

const SimpleProduct = styled(BaseProduct)`
  width: calc((100% - 25px) / 4);
  ${Title} {
    min-height: 50px;
    font-size: 1rem;
    padding: 12px 6px;
  }
  ${ImageContainer} {
    height: auto;
  }
  @media (max-width: 768px) {
    width: calc((100% - 8px) / 2);
    ${Title} {
      min-height: 40px;
      font-size: 0.8rem;
      padding: 8px 4px;
    }
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 10px 12px;
  flex-direction: column;
`

const Count = styled.span`
  font-size: 1.25rem;
  margin: 0 4px;
`

const PrizeTag = styled.div`
  font-size: 0.95rem;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${prizeTagImg});
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 2.5rem;
  min-height: 6.85rem;
  padding: 0.9375rem 0.5rem 2.1875rem;
  padding: 0 0.5rem;
  flex: 0;
  color: #000;
  text-shadow: -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff,
    0.5px 0.5px 0 #fff;
  font-weight: 700;
  span:first-child {
    flex-direction: column;
    display: flex;
    align-items: center;
    max-width: ${(p) => (p.length <= 2 ? '1rem' : '2rem')};
    font-size: 0.75rem;
    position: absolute;
    top: 15%;
    max-height: 2.5rem;
    overflow: hidden;
    ${(p) => p.length <= 3 && `width: 1.3rem;`}
  }
  span:last-child {
    margin-top: 5px;
    position: absolute;
    bottom: 30%;
    font-size: 0.75rem;
  }
`

const PrizeTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  color: #fff;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 6.85rem;
  width: 100%;
  cursor: unset;
  ${showScrollBarStyle}
  ${PrizeTag} + ${PrizeTag} {
    margin-left: 5px;
  }
`

export default function Product({ data, handleClick, isBase, isSoldOut }) {
  const {
    imgUrl,
    name,
    totalDrawOutTimes,
    manufacturerName,
    drawOut1Price,
    prizeName,
    prizeLevel,
    fixedTotalDrawOutTimes,
    category,
    manufacturerId,
    prizesOfCommodity,
    isUsePrizeName,
    discount,
    isMain,
  } = data
  if (isBase)
    return (
      <SimpleProduct className="item">
        <ImageContainer>
          <Image src={imgUrl} />
        </ImageContainer>
        <Title>{`${PRIZE_LEVEL[prizeLevel].name} ${name || prizeName}`}</Title>
      </SimpleProduct>
    )

  return (
    <BaseProduct onClick={handleClick(data)} className="item">
      <ImageContainer>
        <Image src={imgUrl} />
        <Price
          category={category}
          drawOut1Price={drawOut1Price}
          discount={discount}
        />
        {!!discount && <SaleTag>{formatDiscount(discount)} 折</SaleTag>}
        <CountTag>
          <Count>{totalDrawOutTimes}</Count>/
          <Count>{fixedTotalDrawOutTimes}</Count>抽
        </CountTag>
        {isMain && <PinIcon />}
        {isSoldOut && <SoldOutImg />}
      </ImageContainer>
      <InfoContainer>
        <Title>{name}</Title>
        <TagContainer>
          <Tag name={manufacturerName} id={manufacturerId} />
        </TagContainer>
        <PrizeTagContainer>
          {prizesOfCommodity.map((p) => {
            const prizeInfo = PRIZE_LEVEL[p.prizeLevel]
            const name = isUsePrizeName ? p.prizeName : prizeInfo.name

            return (
              <PrizeTag key={p.id} length={name.length}>
                <span>{name}</span>
                <span>{p.amount}</span>
              </PrizeTag>
            )
          })}
        </PrizeTagContainer>
      </InfoContainer>
    </BaseProduct>
  )
}
