import { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr'
import styled, { keyframes } from 'styled-components'

function generateUid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const Container = styled.div`
  position: absolute;
  top: 5px;
  z-index: ${(p) => p.theme.zIndex.danmaku};
  height: 48px;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
`

const slideToLeft = keyframes`
  from {
    left: 100%;
    visibility: visible;
  }
  to {
    left: -800px;
    visibility: hidden;
  }
`

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
`

export default function Danmaku() {
  const [rankingDict, setRankingDict] = useState({})
  const [newReceived, setNewReceived] = useState()
  const [rankingKeys, setRankingKeys] = useState([])
  const [nowShowing, setNowShowing] = useState()
  useEffect(() => {
    if (!newReceived) return
    setRankingDict({ ...rankingDict, ...newReceived })
    setNewReceived(null)
  }, [newReceived])
  useEffect(() => {
    if (!rankingDict) return
    setRankingKeys(Object.keys(rankingDict))
  }, [rankingDict])

  useEffect(() => {
    if (!nowShowing) setNowShowing(rankingKeys[0])
  }, [rankingKeys])

  useEffect(() => {
    // Create Connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://api.n7tzu.org/rankingHub', {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build()

    connection.on('ReceiveRankingList', (data) => {
      console.log('Received:', data)
      const dict = data.reduce((acc, cur) => {
        acc[generateUid()] = cur
        return acc
      }, {})
      setTimeout(() => {
        setNewReceived(dict)
      }, 3000)
    })
    connection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('SignalR Connection Error:', err))

    return () => {
      connection
        .stop()
        .then(() => console.log('SignalR Disconnected'))
        .catch((err) => console.error('SignalR Disconnection Error:', err))
    }
  }, [])

  if (!rankingDict || !rankingDict[nowShowing]) return null
  return (
    <Container>
      <Item onAnimationEnd={onAnimationEnd}>
        {`🚀 恭喜 ${rankingDict[nowShowing].customerName} 抽中 ${rankingDict[nowShowing].prizeLevelView} ${rankingDict[nowShowing].prizeName}`}
      </Item>
    </Container>
  )
  function onAnimationEnd() {
    const newRankingDict = { ...rankingDict }
    delete newRankingDict[nowShowing]
    setNowShowing(null)
    setRankingDict(newRankingDict)
  }
}
