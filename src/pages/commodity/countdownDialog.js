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

// 定義 Header 的樣式
const Header = styled.div`
  display: flex;
  flex-direction: column; /* 讓內容垂直排列 */
  align-items: center; /* 置中對齊 */
  padding: 1rem;
  text-align: center; /* 文字置中 */
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0.5rem 0;
`;

// 定義副標題的樣式
const Subtitle = styled.span`
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled(Block)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px 0;
`

const Content = styled(Block)`
  padding: 20px 0;
`

export default function CountdownDialog({ countdownSec, onClose, cb,protectPlayer }) {
  if (!countdownSec) return null
  return (
    <>
      <Mask />
      <Container className="dialog">
        <Header>
          <Title>
            賞品鎖定中，解鎖倒數 ⏳
          </Title>
          <Subtitle>
            👤 保護中玩家: {protectPlayer}
          </Subtitle>
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
