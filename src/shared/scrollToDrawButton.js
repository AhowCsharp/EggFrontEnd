import React, { useEffect } from 'react';
import styled from 'styled-components';
// 請將下面的路徑替換為您的ICON圖片的實際路徑
import drawoutIcon from '@app/static/drawoutBTN.gif'; 

const ScrollButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  background: url(${drawoutIcon}) no-repeat center center;
  background-size: contain;
  width: 70px; /* 根據需要調整大小 */
  height: 70px;
  cursor: pointer;
  z-index: 9999; /* 確保在最上層 */
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

  return <ScrollButton onClick={handleClick} />;
}
