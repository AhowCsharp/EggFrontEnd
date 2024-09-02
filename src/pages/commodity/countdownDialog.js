import styled from 'styled-components'
import CountdownTimer from '@app/shared/countdownTimer'
import { DrawOutBtn as Button } from './index'

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  border-radius: ${(p) => p.theme.borderRadius.content};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: absolute;
  opacity: 1;
  top: 25vh;
  width: 60%;
  left: 20%;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 250px;
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 40px 40px;
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Header = styled(Block)`
  position: relative;
  top: 0;
  h3 {
    margin: 0;
  }
`

const Footer = styled(Block)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px 0;
`

const Content = styled(Block)`
  padding: 20px 0;
`

export default function CountdownDialog({ countdownSec, onClose, cb }) {
  if (!countdownSec) return null
  return (
    <>
      <Mask />
      <Container>
        <Header>
          <h3>賞品鎖定中，解鎖倒數</h3>
        </Header>
        <Content>
          <CountdownTimer
            initialSeconds={countdownSec}
            cb={() => {
              onClose()
              cb()
            }}
          />
        </Content>
        <Footer>
          <Button onClick={onClose}>關閉</Button>
        </Footer>
      </Container>
    </>
  )
}
