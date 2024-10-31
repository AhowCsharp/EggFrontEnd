import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  faLocationDot,
  faPhone,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// 动画定义
const neonBorder = keyframes`
    0% {
        box-shadow: 0 0 0 rgba(34,198,15, 0.4);
    }
    50% {
        box-shadow: 0 0 4px rgba(34,198,15, 0.9);
    }
    100% {
        box-shadow: 0 0 0 rgba(34,198,15, 0.4);
    }
`

const neonBg = keyframes`
    0% {
        background-color: rgba(201,20,20,0.7);
    }
    50% {
        background-color: rgba(201,20,20,0.9);
    }
    100% {
        background-color: rgba(201,20,20,0.7);
    }
`

// 放大动画定义
const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`

// 样式组件定义
const Image = styled.div`
  width: 100%;
  height: 180px;
  vertical-align: middle;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(p) => p.src});
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 1;

  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    border-bottom: 1px solid white; /* 添加白色底线 */
    background-color: #212B3A; /* 设置背景色为 #212B3A */
  }
`

const BaseProduct = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  overflow: hidden;
  width: calc((100% - 64px) / 4);
  margin: 20px 8px 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 440px; /* 设置较低的固定高度 */
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 20px;
    height: auto; /* 在小屏幕上高度自动适应 */
    border-radius: 10px; /* 添加圆角 */
    border: 1px solid white; /* 设置白色边框 */
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 12px; /* 增加内边距 */
  overflow: hidden;
`

const Info = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    margin-right: 6px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }

  svg {
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  * + * {
    margin-left: 6px;
  }
`

// 新增 MajorInfo 组件，用于处理「領域展開」部分
const MajorInfo = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

  strong {
    margin-bottom: 4px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 6px; /* consistent spacing */
  }
`

const Link = styled.a.attrs((p) => ({ href: p.url, target: '_blank' }))`
  font-size: 1rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;

  svg {
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  border: 2px dashed rgba(34, 198, 15, 0.9);
  display: flex;
  position: relative;
  padding: 1px;
  box-shadow: 0 0 5px lime, 0 0 5px lime, 0 0 5px lime;
  flex-shrink: 0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex: 1;
    padding: 6px 4px;
    border: 2px dashed rgba(34, 198, 15, 0.9);
    animation: ${neonBg} 2s infinite, ${neonBorder} 2s infinite;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

// 定义 Tag 样式组件和预设颜色
const tagColors = [
  '#FF6B6B',
  '#6BCB77',
  '#4D96FF',
  '#FFD93D',
  '#9D4EDD',
  '#FF8C42',
  '#FF5252',
  '#40C4FF',
  '#69F0AE',
  '#FFCC80',
]

// 定义 Tag 样式组件
const Tag = styled.span`
  display: inline-block;
  background-color: ${(props) => props.bgColor};
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin: 4px 4px 0 0;
`

// 定义 ThresholdTag 样式组件
const ThresholdTag = styled.span`
  display: inline-block;
  background-color: #f0f0f0; /* 灰色背景 */
  color: #000; /* 黑色文字 */
  padding: 2px 6px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  font-size: 0.75rem; /* 字体大小 */
  margin: 4px 4px 0 0; /* 外边距，避免标签之间过于拥挤 */
`

// Product 组件
export default function Product({ data, handleClick }) {
  const {
    logoUrl,
    name,
    mobileNumber,
    address,
    officialWebsite,
    major,
    lotteryTicketThreshold,
    transportTicketThreshold,
  } = data

  // 将 major 字符串以 '、' 分割成数组
  const majorTags = major ? major.split('、') : []

  // 分配颜色基于索引，避免重复
  const getColorByIndex = (index) => {
    return tagColors[index % tagColors.length]
  }

  return (
    <BaseProduct onClick={handleClick(data)}>
      <Image src={logoUrl} />
      <InfoContainer>
        <Title>
          <div className="digital-font">{name}</div>
        </Title>
        {!!officialWebsite && (
          <Link href={officialWebsite} onClick={(e) => e.stopPropagation()}>
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
        {(lotteryTicketThreshold > 0 || transportTicketThreshold > 0) && (
          <Info>
            {lotteryTicketThreshold > 0 && (
              <ThresholdTag>
                消費滿 {lotteryTicketThreshold} 送抽獎券
              </ThresholdTag>
            )}
            {transportTicketThreshold > 0 && (
              <ThresholdTag>
                消費滿 {transportTicketThreshold} 送免運券
              </ThresholdTag>
            )}
          </Info>
        )}
        {majorTags.length > 0 && (
          <MajorInfo>
            <strong>領域展開：</strong>
            <div>
              {majorTags.map((tag, index) => (
                <Tag key={index} bgColor={getColorByIndex(index)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </MajorInfo>
        )}
      </InfoContainer>
    </BaseProduct>
  )
}
