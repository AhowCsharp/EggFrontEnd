import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import styled, { keyframes } from 'styled-components';

function generateUid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const Container = styled.div`
  position: absolute;
  top: 5px;
  z-index: ${(p) => p.theme.zIndex.danmaku};
  height: 48px;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const slideToLeft = keyframes`
  from {
    left: 100%;
    visibility: visible;
  }
  to {
    left: -800px;
    visibility: hidden;
  }
`;

const Item = styled.div`
  color: #fff;
  position: absolute;
  display: block;
  top: 0;
  left: 100%;
  min-width: 250px;
  height: 48px;
  padding: 4px 10px;
  border-radius: ${(p) => p.theme.borderRadius.danmaku};
  background-color: ${(p) => p.theme.color.danmakuMask};
  line-height: 40px;
  font-size: 1.25rem;
  animation: ${slideToLeft} 7s linear;
`;

export default function Danmaku() {
  const [messagesQueue, setMessagesQueue] = useState([]);
  const [nowShowing, setNowShowing] = useState(null);

  useEffect(() => {
    // 建立連線
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://api.lucky-egg.club/rankingHub', {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveRankingList', (data) => {
      handleEventData(data, 'ranking');
    });

    // 新增的事件處理器
    connection.on('ReceiveTask', (data) => {
      handleEventData(data, 'task');
    });

    connection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('SignalR Connection Error:', err));

    return () => {
      connection
        .stop()
        .then(() => console.log('SignalR Disconnected'))
        .catch((err) => console.error('SignalR Disconnection Error:', err));
    };
  }, []);

  function handleEventData(data, eventType) {
    console.log(`Received ${eventType}:`, data);
    let messages;
    if (Array.isArray(data)) {
      messages = data.map((item) => ({
        ...item,
        eventType,
        uid: generateUid(),
      }));
    } else {
      // 資料是物件
      messages = [
        {
          ...data,
          eventType,
          uid: generateUid(),
        },
      ];
    }

    // 如果需要延迟显示，可以调整这里的延迟时间
    setTimeout(() => {
      setMessagesQueue((prevQueue) => [...prevQueue, ...messages]);
    }, 3000);
  }

  useEffect(() => {
    if (!nowShowing && messagesQueue.length > 0) {
      const nextMessage = messagesQueue[0];
      setNowShowing(nextMessage);
      setMessagesQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [messagesQueue, nowShowing]);

  if (!nowShowing) return null;

  return (
    <Container>
      <Item onAnimationEnd={onAnimationEnd}>
        {nowShowing.eventType === 'ranking' &&
          `🚀 恭喜 ${nowShowing.customerName} 抽中 ${nowShowing.prizeLevelView} ${nowShowing.prizeName}`}
        {nowShowing.eventType === 'task' &&
          `🎯 恭喜 ${nowShowing.customerName} 完成 ${nowShowing.taskTitle} 任務內容為 ${nowShowing.award}`}
      </Item>
    </Container>
  );

  function onAnimationEnd() {
    setNowShowing(null);
  }
}
