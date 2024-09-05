import styled from 'styled-components'
import Tag from '@app/shared/tag'
import DollarSign from '@app/shared/dollarSign'
import { PRIZE_LEVEL, CATEGORY } from '@app/utils/constants'
import soldOutImg from '@app/static/sold-out.png'
import prizeTagImg from '@app/static/prize-tag.png'

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  min-height: 100%;
  min-width: 100%;
  transition: all 0.3s;
  vertical-align: middle;
  width: 100px;
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

const Price = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  z-index: 1;
  color: ${(p) => p.theme.color.orange};
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
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

const Title = styled.div`
  font-size: 1.25rem;
  height: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
`

const CountTag = styled.div`
  padding: 1px 15px 1px 5px;
  background: #000;
  box-sizing: border-box;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  color: #fff;
  font-weight: 700;
  justify-content: flex-start;
  line-height: 34px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
`

const TagContainer = styled.div``

const ImageContainer = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
  &::after {
    background: linear-gradient(transparent 30%, rgba(0, 0, 0, 0.8));
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
    bottom: 0;
    left: 0;
    margin: 5px 0;
    z-index: 1;
  }
  ${TagContainer} {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    z-index: 1;
  }
`

const SimpleProduct = styled(BaseProduct)`
  margin: 10px 5px 0;
  width: calc((100% - 30px) / 3);
  ${Title} {
    min-height: 50px;
    font-size: 1rem;
    padding: 12px 6px;
  }
  ${ImageContainer} {
    height: auto;
  }
  @media (max-width: 768px) {
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
  padding: 12px 6px;
  flex-direction: column;
`

const Count = styled.span`
  font-size: 1.375rem;
  margin: 0 4px;
`

const PrizeTag = styled.div`
  font-size: 0.95rem;
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
  padding: 20px 8px 35px;
  flex: 0;
  color: #000;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff;
  font-weight: 700;
  span:first-child {
    flex-direction: column;
    display: flex;
    align-items: flex-start;
  }
  span:last-child {
    margin-top: 5px;
  }
`

const PrizeTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  color: #fff;
  overflow-x: auto;
  width: 100%;

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
    fixedTotalDrawOutTimes,
    category,
    manufacturerId,
    prizesOfCommodity,
  } = data
  if (isBase)
    return (
      <SimpleProduct>
        <ImageContainer>
          <Image src={imgUrl} />
        </ImageContainer>
        <Title>{name || prizeName}</Title>
      </SimpleProduct>
    )
  return (
    <BaseProduct onClick={handleClick(data)}>
      <ImageContainer>
        <Image src={imgUrl} />
        <Price>
          {CATEGORY.LUCKY_BAG === category ? '1' : drawOut1Price}
          <DollarSign category={category} />
        </Price>
        <CountTag>
          <Count>{totalDrawOutTimes}</Count>/
          <Count>{fixedTotalDrawOutTimes}</Count>抽
        </CountTag>
        <TagContainer>
          <Tag name={manufacturerName} id={manufacturerId} />
        </TagContainer>
        {isSoldOut && <SoldOutImg />}
      </ImageContainer>
      <InfoContainer>
        <Title>{name}</Title>
        <PrizeTagContainer>
          {prizesOfCommodity.map((p) => {
            const prizeInfo = PRIZE_LEVEL[p.prizeLevel]
            return (
              <PrizeTag key={p.id}>
                <span> {prizeInfo.name}</span> <span>{p.amount}</span>
              </PrizeTag>
            )
          })}
        </PrizeTagContainer>
      </InfoContainer>
    </BaseProduct>
  )
}
