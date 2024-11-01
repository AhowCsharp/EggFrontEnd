import styled from 'styled-components'
import { PRIZE_LEVEL } from '@app/utils/constants'

// 保持原有的样式
const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 20px 20px 0;
  width: 190px;
  justify-content: space-between;
  cursor: pointer;
  
  img {
    width: 150px;
    height: 150px;
    &:hover {
      transform: scale(1.03);
    }
  }
  
  h4 {
    margin: 8px 0;
    max-height: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(p) =>
    PRIZE_LEVEL[p.prizeLevel]?.color || p.theme.color.defaultPrizeTag};
  color: #fff;
  max-width: 180px;
  border-radius: 100px;
  flex-direction: row;
  padding: 8px;
  margin-top: 8px;
`

// 新增的样式组件
const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const FireEmoji = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 30px;
  line-height: 1;

  /* 响应式调整字体大小 */
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

// 主组件 Prize
export default function Prize({ data, onClick, isCommodity }) {
  const name = data?.prizeName || data?.name
  const isOverAfterSoldOut = data?.isOverAfterSoldOut == true 
  return (
    <Container onClick={onClick}>
      <ImageWrapper>
        <img src={data?.imgUrl} alt={name} />
        {isOverAfterSoldOut && (
          <FireEmoji>🔥</FireEmoji>
        )}
      </ImageWrapper>
      <h4>{name}</h4>
      {!isCommodity && (
        <>
          <span>回收價格：{data.reclaimPrice}</span>
          <PrizeLevelAndAmount {...data} />
        </>
      )}
    </Container>
  )
}

function PrizeLevelAndAmount({ prizeLevel, amount, fixedAmount }) {
  return (
    <Label prizeLevel={prizeLevel}>
      <span>{PRIZE_LEVEL[prizeLevel].name}</span>
      <span>
        {amount}/{fixedAmount}
      </span>
    </Label>
  )
}
