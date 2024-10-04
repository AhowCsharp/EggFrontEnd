import styled from 'styled-components'
import Tag from '@app/shared/tag'

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  min-height: 100%;
  min-width: 100%;
  transition: all 0.3s;
  vertical-align: middle;
  width: 100px;
`

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  overflow: hidden;
  width: calc((100% - 30px) / 4);
  margin-top: 20px;
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

const SaleTag = styled.div`
  padding: 10px 12px;
  color: ${(p) => p.theme.color.red};
  border: 1px solid ${(p) => p.theme.color.red};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
`

const ImageContainer = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  ${SaleTag} {
    position: absolute;
    top: 0;
    right: 16px;
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
`

export default function Commodity({ data, handleClick }) {
  const {
    imgUrl,
    name,
    totalDrawOutTimes,
    manufacturerName,
    manufacturerId,
    discount,
  } = data
  return (
    <Container onClick={handleClick(data)} className="item">
      <ImageContainer>
        <Image src={imgUrl} />
        {!!discount && <SaleTag>{discount} 折</SaleTag>}
      </ImageContainer>
      <InfoContainer>
        <Title>{name}</Title>
        <TagContainer>
          <Tag name={manufacturerName} id={manufacturerId} />
        </TagContainer>
      </InfoContainer>
    </Container>
  )
}
