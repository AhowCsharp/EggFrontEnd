// AnnouncementModal.jsx

import React, { useState, useEffect } from 'react';
import {
  IS_FIRST_TIME
} from "@app/utils/constants";
import styled from 'styled-components';
import wood from '@app/static/wood.png';

export default function AnnouncementModal({ announcements }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hasShown = localStorage.getItem(IS_FIRST_TIME);
    if (!hasShown) {
      setIsOpen(true);
      localStorage.setItem(IS_FIRST_TIME, 'true');
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < announcements.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  if (!isOpen || announcements.length === 0) return null;

  const { title, time, content } = announcements[currentIndex];

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Overlay />
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ContentWrapper>
          <Title>{title}</Title>
          <Time>{time}</Time>
          <ContentList>
            {content.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </ContentList>
          {announcements.length > 1 && (
            <Navigation>
              <NavButton onClick={showPrev} disabled={currentIndex === 0}>
                &laquo; 上一條
              </NavButton>
              <NavButton
                onClick={showNext}
                disabled={currentIndex === announcements.length - 1}
              >
                下一條 &raquo;
              </NavButton>
            </Navigation>
          )}
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div.attrs({
  role: 'dialog',
  'aria-modal': 'true',
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  position: relative;
  width: 750px;
  max-height: 90vh; /* 防止在小屏幕上过高 */
  background-image: url(${wood});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
  border: 2px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  font-family: 'DotGothic16', sans-serif;
  color: #fff;
  overflow: hidden;
  margin: 20px; /* 防止在小屏幕上贴边 */

  @media (max-width: 768px) {
    width: 90vw;
    height: auto; /* 高度自动适应内容 */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  z-index: 1;
`;

const CloseButton = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  z-index: 3; /* 将 z-index 提高到 3，确保位于最上层 */

  &:hover {
    color: #ccc;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* 确保 z-index 低于 CloseButton */
  width: 100%;
  padding: 50px 40px 20px;
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 40px 30px 20px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #fff;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Time = styled.p`
  font-size: 16px;
  color: #ddd;
  text-align: center;
  margin: 10px 0;
`;

const ContentList = styled.ul`
  margin: 10px 0;
  list-style-type: disc;
  padding-left: 20px;
  text-align: left;

  @media (max-width: 480px) {
    padding-left: 15px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 14px; /* 调整移动版字体更小 */
  }
`;

const Navigation = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'DotGothic16', sans-serif;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* 增加按钮与内容之间的间距 */

  &:hover:enabled {
    background-color: rgba(255, 255, 255, 1);
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
    margin-top: 4px; /* 适配移动设备 */
  }
`;
