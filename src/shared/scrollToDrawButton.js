import React from 'react';
import styled from 'styled-components';
// 請將下面的路徑替換為您的ICON圖片的實際路徑
import drawoutIcon from '@app/static/drawoutBTN.gif'; 

const ScrollButton = styled.div`
  position: fixed;
  bottom: 60px;
  right: 20px;
  background-color: white;
  border: 3px solid #ccc; /* 您可以根據需要調整邊框顏色和寬度 */
  border-radius: 10px; /* 可選：添加圓角 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 9999; /* 確保在最上層 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 可選：添加陰影效果 */
  
  &:hover {
    border-color: #888; /* 可選：懸停時改變邊框顏色 */
  }
`;

const Icon = styled.div`
  background: url(${drawoutIcon}) no-repeat center center;
  background-size: contain;
  width: 60px; /* 根據需要調整大小 */
  height: 50px;
  margin-bottom: 4px; /* 圖片與文字之間的間距 */
`;

const ButtonText = styled.span`
  font-size: 14px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

export default function ScrollToDrawButton() {

  const handleClick = () => {
    const drawButton = document.getElementById('draw-out-button ahow');
    console.log(drawButton);   
    if (drawButton) {
      drawButton.scrollIntoView({ behavior: 'smooth', block: 'center' });  
    } else {
      console.error('未找到 "立即抽獎" 按鈕');
    }
  };

  return (
    <ScrollButton onClick={handleClick}>
      <Icon />
      <ButtonText>移至抽獎</ButtonText>
    </ScrollButton>
  );
}
