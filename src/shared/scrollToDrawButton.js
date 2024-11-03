import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// 请将下面的路径替换为您的 ICON 图片的实际路径
import drawoutIcon from '@app/static/drawoutBTN.gif'; 

// 定义固定在右下角的按钮容器
const ScrollButton = styled.div`
  position: fixed;
  bottom: 20px; /* 距离视口底部的距离 */
  right: 20px; /* 距离视口右侧的距离 */
  background-color: white;
  border: 3px solid #ccc; /* 您可以根据需要调整边框颜色和宽度 */
  border-radius: 10px; /* 可选：添加圆角 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 9999; /* 确保在最上层 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
  
  &:hover {
    border-color: #888; /* 可选：悬停时改变边框颜色 */
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 定义图标样式
const Icon = styled.div`
  background: url(${drawoutIcon}) no-repeat center center;
  background-size: contain;
  width: 60px; /* 根据需要调整大小 */
  height: 50px;
  margin-bottom: 4px; /* 图片与文字之间的间距 */
`;

// 定义按钮文字样式
const ButtonText = styled.span`
  font-size: 10px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

// 定义红色文字样式
const ButtonTextRed = styled(ButtonText)`
  color: red;
`;

export default function ScrollToDrawButton({ selectedPrizes }) {

  const handleClick = () => {
    // 确认 ID 是否正确，避免拼写错误
    const drawButton = document.getElementById('draw-out-button-ahow'); // 确保目标元素的 ID 是 'draw-out-button-show'  
    if (drawButton) {
      drawButton.scrollIntoView({ behavior: 'smooth', block: 'center' });  
    } else {
      console.error('未找到 "立即抽奖" 按钮');
    }
  };

  const buttonContent = (
    <ScrollButton onClick={handleClick}>
      <Icon />
      <ButtonText>移至抽獎</ButtonText>
      {selectedPrizes.length === 0 ? (
        <ButtonTextRed>尚未選擇</ButtonTextRed>
      ) : (
        <ButtonText>籤號: {selectedPrizes.map((index) => index + 1).join('、')}</ButtonText>
      )}
    </ScrollButton>
  );

  return ReactDOM.createPortal(
    buttonContent,
    document.body
  );
}
