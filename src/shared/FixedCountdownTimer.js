// FixedCountdownTimer.jsx
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// 定義組件的樣式
const TimerContainer = styled.div`
  position: fixed;
  bottom: 125px; /* 默認位置為右下角 */
  right: 20px;
  transform: none;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    bottom: 5%;
    transform: translateY(-50%);
    padding: 10px 20px;
    font-size: 20px;
  }
`

const FixedCountdownTimer = ({ initialSeconds, onComplete }) => {
  // 如果 initialSeconds 是 null 或 <= 0，直接不顯示
  if (initialSeconds == null || initialSeconds <= 0) {
    return null
  }

  const [seconds, setSeconds] = useState(initialSeconds)

  // 當 initialSeconds 改變時，重置倒數
  useEffect(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    // 如果秒數已經到0，執行回調並退出
    if (seconds <= 0) {
      if (onComplete) onComplete()
      return
    }

    // 設置一個定時器，每秒減少一次
    const timerId = setTimeout(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    // 清除定時器以防止記憶體洩漏
    return () => clearTimeout(timerId)
  }, [seconds, onComplete])

  // 格式化時間（可選）
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const remainingSeconds = secs % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <TimerContainer aria-live="polite">
      {formatTime(seconds)}
    </TimerContainer>
  )
}

FixedCountdownTimer.propTypes = {
  initialSeconds: PropTypes.number.isRequired,
  onComplete: PropTypes.func,
}

FixedCountdownTimer.defaultProps = {
  onComplete: null,
}

export default FixedCountdownTimer
