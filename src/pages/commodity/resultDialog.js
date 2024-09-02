import styled from 'styled-components'
import { useState } from 'react'
import Products from '@app/shared/products'
import Carousel from './carousel'
import { DrawOutBtn as Button } from './index'
import Only1Prize from './only1Prize'

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
  width: 80%;
  left: 10%;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 350px;
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 40px 40px;
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding: 20px 20px 40px;
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
  justify-content: center;
  * + * {
    margin-left: 20px;
  }
`

const Content = styled(Block)`
  padding: 10px 0;
`

export default function ResultDialog({ isLoading, data, onClose }) {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false)
  const [shouldDisplayAll, setShouldDisplayAll] = useState(false)
  if (isLoading || !data) return '抽獎中...'
  return (
    <>
      <Mask />
      <Container>
        <Header>
          <h3>抽獎結果</h3>
        </Header>
        <Content>{renderContent()}</Content>
        <Footer>
          {isAnimationFinished && (
            <Button onClick={() => setShouldDisplayAll(true)}>顯示所有</Button>
          )}
          <Button onClick={onClose}>關閉</Button>
        </Footer>
      </Container>
    </>
  )
  function renderContent() {
    switch (true) {
      case data.length === 1:
        return <Only1Prize data={data[0]} />
      case shouldDisplayAll:
        return <Products data={data} isBase={true} />
      case data.length > 1:
        return (
          <Carousel
            data={data}
            setIsAnimationFinished={setIsAnimationFinished}
          />
        )
      default:
        return null
    }
  }
}
