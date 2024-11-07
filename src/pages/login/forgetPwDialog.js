// ForgetPwDialog.jsx

import styled from 'styled-components'
import { DrawOutBtn as Button } from '@app/pages/commodity' // 引入您现有的按钮样式
import { useEffect } from 'react'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.alertMask};
`

const Container = styled.div`
  position: fixed;
  top: 50vh;
  transform: translateY(-50%);
  width: 40%;
  left: 30%;
  z-index: ${(p) => p.theme.zIndex.alertDialog};
  display: flex;
  flex-direction: column;
  min-height: 230px;
  max-height: calc(90vh - 175px);
  font-size: 1.15rem;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
    max-height: calc(90vh - 165px);
    padding: 15px 20px;
  }
`

const Title = styled.h2`
  margin: 0 0 15px 0;
  text-align: center;
  color: ${(p) => p.theme.color.primary};
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center;
    margin: 10px 0;
    line-height: 1.5;
    color: ${(p) => p.theme.color.text};
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`

export default function ForgetPwDialog({ msg, onConfirm, onClose}) {
  useEffect(() => {
    const layoutElement = document.getElementById('layout')
    if (layoutElement) {
      layoutElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Mask onClick={onClose} />
      <Container className="dialog">
        <Title>重設密碼</Title>
        <Content>
          <p>{msg}</p>
        </Content>
        <Footer>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={onConfirm}>確認</Button>
        </Footer>
      </Container>
    </>
  )
}
