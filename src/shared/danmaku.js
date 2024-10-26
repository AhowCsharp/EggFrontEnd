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
  const [eventDataDict, setEventDataDict] = useState({});
  const [newReceived, setNewReceived] = useState(null);
  const [eventKeys, setEventKeys] = useState([]);
  const [nowShowing, setNowShowing] = useState(null);

  useEffect(() => {
    if (!newReceived) return;
    setEventDataDict((prev) => ({ ...prev, ...newReceived }));
    setNewReceived(null);
  }, [newReceived]);

  useEffect(() => {
    if (!eventDataDict) return;
    setEventKeys(Object.keys(eventDataDict));
  }, [eventDataDict]);

  useEffect(() => {
    if (!nowShowing && eventKeys.length > 0) {
      setNowShowing(eventKeys[0]);
    }
  }, [eventKeys, nowShowing]);

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
    let dict;
    if (Array.isArray(data)) {
      dict = data.reduce((acc, cur) => {
        acc[generateUid()] = { ...cur, eventType };
        return acc;
      }, {});
    } else {
      // 資料是物件
      dict = {
        [generateUid()]: { ...data, eventType }
      };
    }
    setTimeout(() => {
      setNewReceived(dict);
    }, 3000);
  }

  if (!eventDataDict || !eventDataDict[nowShowing]) return null;

  const currentItem = eventDataDict[nowShowing];

  return (
    <Container>
      <Item onAnimationEnd={onAnimationEnd}>
        {currentItem.eventType === 'ranking' && (
          `🚀 恭喜 ${currentItem.customerName} 抽中 ${currentItem.prizeLevelView} ${currentItem.prizeName}`
        )}
        {currentItem.eventType === 'task' && (
          `🎯 恭喜 ${currentItem.customerName} 完成了 ${currentItem.taskTitle} 任務內容為 ${currentItem.award}`
        )}
      </Item>
    </Container>
  );

  function onAnimationEnd() {
    const newEventDataDict = { ...eventDataDict };
    delete newEventDataDict[nowShowing];
    setNowShowing(null);
    setEventDataDict(newEventDataDict);
  }
}
