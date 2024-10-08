import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  faLocationDot,
  faPhone,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 動畫定義
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
`;

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
`;

// 樣式組件定義
const Image = styled.div`
  width: 100%;
  height: 180px;
  vertical-align: middle;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(p) => p.src});
`;

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
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 44px;
  padding: 12px 6px;
  flex-direction: column;
`;

const Info = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  strong {
    margin-right: 6px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-wrap: wrap;
  }

  svg {
    font-size: 0.85rem;
  }

  * + * {
    margin-left: 6px;
  }
`;

const Link = styled.a.attrs((p) => ({ href: p.url, target: '_blank' }))`
  font-size: 1rem;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;

  svg {
    font-size: 0.85rem;
  }

  * + * {
    margin-left: 6px;
  }
`;

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

  div {
    font-family: 'DotGothic16', Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex: 1;
    padding: 6px 4px;
    border: 2px dashed rgba(34, 198, 15, 0.9);
    animation: ${neonBg} 2s infinite, ${neonBorder} 2s infinite;
  }
`;

// 定義 Tag 樣式組件和預設顏色
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
];

const Tag = styled.span`
  display: inline-block;
  background-color: ${(props) => props.bgColor};
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin: 4px 4px 0 0;
`;

// Product 元件
export default function Product({ data, handleClick }) {
  const { logoUrl, name, mobileNumber, address, officialWebsite, major } = data;

  // 將 major 字串以 '、' 分割成陣列
  const majorTags = major ? major.split('、') : [];

  // 隨機選擇顏色
  const getRandomColor = () => {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  };

  return (
    <BaseProduct onClick={handleClick(data)}>
      <Image src={logoUrl} />
      <InfoContainer>
        <Title>
          <div>{name}</div>
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
        {/* 新增「專營領域」區塊 */}
        {majorTags.length > 0 && (
          <Info>
            <strong>領域展開：</strong>
            <div>
              {majorTags.map((tag, index) => (
                <Tag key={index} bgColor={getRandomColor()}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Info>
        )}
      </InfoContainer>
    </BaseProduct>
  );
}
