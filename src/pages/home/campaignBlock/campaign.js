import styled from 'styled-components'
import { formatDateToYmd as formatDate } from '@app/utils/date'

const Image = styled.img.attrs((p) => ({
  src: p.src,
  alt: p.alt || '瞇那賞',
}))`
  height: ${(p) => (p.isHighLight ? 'auto' : '100px')}; // auto;
  width: ${(p) => (p.isHighLight ? '100%' : 'auto')};
  border-radius: 8px;
  margin-right: ${(p) => (p.isHighLight ? '0' : '1rem')};
  @media (max-width: 768px) {
    width: calc(45% - 12px);
    margin-right: 12px;
  }
`

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: ${(p) => (p.isHighLight ? 'column' : 'row')};
  margin: 0 0 10px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 10px 0;
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: 768px) {
    width: auto;
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  min-height: 22px;
  max-height: 2.8rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-height: 80px;
    word-break: normal;
    height: auto;
  }
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 0.75rem;
  color: ${(p) => p.theme.color.desc};
  line-height: 1.25rem;
  p {
    margin: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

export const DateInfo = styled.div`
  font-size: 0.7rem;
  display: flex;
  line-height: 1rem;
  margin-top: 0.95rem;
  color: ${(p) => p.theme.color.desc};
  flex-wrap: wrap;
  div:first-child {
    margin-right: 0.75rem;
  }
  @media (max-width: 768px) {
    color: ${(p) => p.theme.mobile.color.desc};
    line-height: 1.2rem;
  }
`

export default function Campaign({
  data,
  handleClick,
  isHighLight = false,
  isSimple = false,
}) {
  const {
    newsUrl: imgUrl,
    endDate,
    startDate,
    newsTitle,
    newsDetails,
    releaseDate,
  } = data
  return (
    <Container
      onClick={handleClick(data)}
      className="item"
      isHighLight={isHighLight}
    >
      <Image src={imgUrl} isHighLight={isHighLight} alt={newsTitle}/>
      <InfoContainer>
        <Title>{newsTitle}</Title>
        {!isSimple && (
          <>
            <Description
              id="description"
              dangerouslySetInnerHTML={{ __html: newsDetails }}
            />
            <DateInfo>
              <div>發布日期:{formatDate(releaseDate)}</div>
              <div>
                活動期間：{formatDate(startDate)}~{formatDate(endDate)}
              </div>
            </DateInfo>
          </>
        )}
      </InfoContainer>
    </Container>
  )
}
