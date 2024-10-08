import styled from 'styled-components'
import { formatDateToYmd as formatDate } from '@app/utils/date'

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  height: auto;
  width: ${(p) => (p.isHighLight ? '100%' : '250px')};
  border-radius: 8px;
  margin-right: ${(p) => (p.isHighLight ? '0' : '1rem')};
`

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: ${(p) => (p.isHighLight ? 'column' : 'row')};
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 10px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 10px 0;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 1.25rem;
  height: 22px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: keep-all;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 0.75rem;
  color: ${(p) => p.theme.color.desc};
  line-height: 1.25rem;
  p {
    margin: 0;
  }
`

const DateInfo = styled.div`
  font-size: 0.75rem;
  display: flex;
  line-height: 1rem;
  margin-top: 0.75rem;
  color: ${(p) => p.theme.color.desc};
  flex-wrap: wrap;
  div:first-child {
    margin-right: 0.75rem;
  }
`

const BaseReadMoreBtn = styled.div`
  font-size: 0.875rem;
  color: ${(p) => p.theme.color.red};
  cursor: pointer;
  line-height: 1.25rem;
`

export default function Commodity({ data, handleClick, isHighLight = false }) {
  const { newsUrl: imgUrl, endDate, startDate, newsTitle, newsDetails } = data
  return (
    <Container
      onClick={handleClick(data)}
      className="item"
      isHighLight={isHighLight}
    >
      <Image src={imgUrl} isHighLight={isHighLight} />
      <InfoContainer>
        <Title>{newsTitle}</Title>
        <Description
          id="description"
          dangerouslySetInnerHTML={{ __html: newsDetails }}
        />
        <ReadMoreBtn onClick={handleClick(data)} />
        <DateInfo>
          <div>{formatDate(startDate)}</div>
          <div>
            活動期間：{formatDate(startDate)}~{formatDate(endDate)}
          </div>
        </DateInfo>
      </InfoContainer>
    </Container>
  )
}

function ReadMoreBtn({ onClick }) {
  return <BaseReadMoreBtn onClick={onClick}>Read More</BaseReadMoreBtn>
}
