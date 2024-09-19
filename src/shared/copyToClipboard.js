import copy from 'copy-to-clipboard'
import { useRef } from 'react'
import styled from 'styled-components'
import { dataStore } from '@app/store'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
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
      <FontAwesomeIcon icon={faCopy} />
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
