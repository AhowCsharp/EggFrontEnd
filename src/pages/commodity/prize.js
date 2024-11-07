import styled from 'styled-components'
import { PRIZE_LEVEL } from '@app/utils/constants'
import { formatDateToYmd as formatDate } from '@app/utils/date'
import { FaCoins, FaShippingFast, FaBoxOpen, FaLayerGroup, FaCalendarAlt } from 'react-icons/fa';

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

// 定義 InfoItem 組件
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem; /* 調整文字大小 */
  margin: 5px 0;

  svg {
    margin-right: 8px; /* 圖標與文字之間的間距 */
    color: #a80502; /* 圖標顏色，可根據需求調整 */
    flex-shrink: 0;
  }

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

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
          <div>
            <InfoItem>
              <FaCoins /> {/* 圖標 */}
              <span>兌換金幣 : {data.reclaimPrice}</span>
            </InfoItem>
            <InfoItem>
              <FaShippingFast /> {/* 圖標 */}
              <span>運費 : {data.freight}</span>
            </InfoItem>
          </div>
          <PrizeLevelAndAmount {...data} />
        </>
      )}
      {isCommodity && (
        <>
          <InfoItem>
            <FaBoxOpen />
            <span>類別 : {data.category}</span>
          </InfoItem>
          <InfoItem>
            <FaLayerGroup /> 
            <span>子類別 : {data.commodityCategory}</span>
          </InfoItem>
          <InfoItem>
            <FaCalendarAlt />
            <span>上架日 : {formatDate(data.createDate)}</span>
          </InfoItem>
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
