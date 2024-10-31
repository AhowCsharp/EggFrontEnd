import copy from 'copy-to-clipboard'
import { useRef } from 'react'
import styled from 'styled-components'
import { dataStore } from '@app/store'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import copyImg from '@app/static/fi-br-copy-alt.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  svg {
    margin-left: 5px;
  }
`

export default function CopyToClipboard({
  className,
  text,
  children,
  msgText,
}) {
  const ref = useRef()
  msgText = msgText = `${msgText || '已複製'}`
  return (
    <Container ref={ref} className={className} onClick={handleClick}>
      {children}
      <img src={copyImg} alt="copyImg" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    </Container>
  )

  function handleClick(e) {
    const copyText = text ?? ref.current.innerText
    e.preventDefault()
    e.stopPropagation()
    copy(copyText)
    if (!('clipboard' in navigator)) return msg(msgText)
    navigator.clipboard.readText().then((textInClipboard) => {
      if (textInClipboard !== copyText) copy(copyText)
    })
    dataStore.setAlertMessage(msgText)
    dataStore.setIsToast(true)
  }
}
