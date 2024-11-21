import styled from 'styled-components'
import { useState } from 'react'
import Products from '@app/shared/products'
import img from '@app/static/crateLog'
import Carousel from './carousel'
import { DrawOutBtn as Button } from './index'
import Only1Prize from './only1Prize'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: fixed;
  top: 175px;
  width: 80%;
  left: 10%;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 350px;
  max-height: calc(90vh - 175px);
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 40px 10px;
  overscroll-behavior: none;
  @media (max-width: 768px) {
    top: 150px;
    width: 90%;
    left: 5%;
    max-height: calc(90vh - 165px);
    padding: 20px;
    justify-content: center;
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
  margin: 10px 0;
  justify-content: center;
  * + * {
    margin-left: 20px;
  }
`

const Content = styled(Block)`
  margin: 20px 0;
  overflow-y: auto;
  justify-content: center;
  &.bonus {
    align-items: center;
    margin: 10px 0;
    min-height: 40px;
    flex-wrap: wrap;
  }
`

const Icon = styled.img.attrs(({ src }) => ({ src }))`
  width: 40px;
  height: 40px;
`

export default function ResultDialog({
  isLoading,
  data,
  onClose,
  drawOutBonusResult,
}) {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false)
  const { keys, crates } = drawOutBonusResult
  const isBonusResultExisted =
    !!Object.keys(keys).length || !!Object.keys(crates).length
  const [shouldDisplayAll, setShouldDisplayAll] = useState(false)
  if (isLoading || !data) return '抽獎中...'
  return (
    <>
      <Mask />
      <Container className="dialog">
        <Header>
          <h3>抽獎結果</h3>
        </Header>
        <Content>{renderContent()}</Content>
        {isBonusResultExisted && (
          <Content className="bonus">
            恭喜額外獲得
            {Object.keys(keys).map((k, index) => {
              const count = keys[k]
              return (
                <>
                  <Icon src={img.keys[k]} alt="鑰匙" /> *{count}
                  {index !== Object.keys(keys).length - 1 && '、'}
                </>
              )
            })}
            {Object.keys(crates).map((c, index) => {
              const count = crates[c]
              return (
                <>
                  {index === 0 && !!Object.keys(keys).length && '、'}
                  <Icon src={img.crates[c]} alt="寶箱" /> *{count}
                  {index !== Object.keys(crates).length - 1 && '、'}
                </>
              )
            })}
          </Content>
        )}
        <Footer>
          {!shouldDisplayAll && !isAnimationFinished && !data.length === 1 && (<Button onClick={() => setShouldDisplayAll(true)}>跳過動畫</Button>)}         
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
        return <Products data={data} isBase={true} isDrawOutShowAll={true}/>
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
