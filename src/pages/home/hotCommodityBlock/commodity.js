import styled from 'styled-components'
import Tag from '@app/shared/tag'
import Price from './price'
import { formatDiscount } from '@app/utils/formatDiscount'

const Image = styled.img.attrs((p) => ({
  src: p.src,
  alt: p.alt || '瞇那賞 線上一番賞',
}))`
  transition: all 0.3s;
  vertical-align: middle;
  width: 100%;
  height: auto;
`

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  overflow: hidden;
  width: calc(25% - 11.25px);
  margin-top: 20px;
  cursor: pointer;
  &:hover ${Image} {
    transform: scale(1.07);
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

const SaleTag = styled.div`
  padding: 10px 12px;
  color: ${(p) => p.theme.color.red};
  border: 1px solid ${(p) => p.theme.color.red};
  background: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
`

const BaseRankTag = styled.div`
  background: ${(p) => (p.isHighLight ? p.theme.color.red : '#081324')};
  border-radius: 1rem;
  color: #fff;
  padding: 4px 16px;
  margin: 10px;
`

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  display: flex;
  align-items: center;
  ${SaleTag} {
    position: absolute;
    top: 0;
    right: 16px;
  }
  ${BaseRankTag} {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.25rem;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 10px 12px;
  flex-direction: column;
`

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  .tag {
    margin: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .tag {
      margin-top: 8px;
    }
  }
`

export default function Commodity({ data, handleClick }) {
  const {
    imgUrl,
    name,
    drawOut1Price,
    manufacturerName,
    manufacturerId,
    discount,
    category,
    index,
  } = data

  return (
    <Container onClick={handleClick(data)} className="item">
      <ImageContainer>
        <Image src={imgUrl} alt={name}/>
        {!!discount && <SaleTag>{formatDiscount(discount)} 折</SaleTag>}
        <RankTag rank={index} />
      </ImageContainer>
      <InfoContainer>
        <Title>{name}</Title>
        <TagContainer>
          <Price
            category={category}
            drawOut1Price={drawOut1Price}
            discount={discount}
          />
          <Tag name={manufacturerName} id={manufacturerId} />
        </TagContainer>
      </InfoContainer>
    </Container>
  )
}
function RankTag({ rank }) {
  if (rank > 10) return
  return <BaseRankTag isHighLight={rank <= 3}>NO {rank}.</BaseRankTag>
}
