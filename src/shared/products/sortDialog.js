import styled from 'styled-components'
import { Button } from '@app/pages/commodity'
import { Radio } from 'antd'
import { useState } from 'react'

export const SortType = {
  Default: 'default',
  TimeNewToOld: 'timeNewToOld',
  TimeOldToNew: 'timeOldToNew',
  CountMoreToLess: 'countMoreToLess',
  CountLessToMore: 'countLessToMore',
  PriceHighToLow: 'priceHighToLow',
  PriceLowToHigh: 'priceLowToHigh',
}

const SortTypeLocale = {
  [SortType.Default]: '預設排序',
  [SortType.TimeNewToOld]: '上架時間由新到舊',
  [SortType.TimeOldToNew]: '上架時間由舊到新',
  [SortType.CountMoreToLess]: '剩餘抽數由多到少',
  [SortType.CountLessToMore]: '剩餘抽數由少到多',
  [SortType.PriceHighToLow]: '價格由高到低',
  [SortType.PriceLowToHigh]: '價格由低到高',
}

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
  color: #000;
  opacity: 1;
  top: 15%;
  width: 60%;
  left: 20%;
  max-height: 85vh;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 250px;
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  overflow: hidden;
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
  background-color: ${(p) => p.theme.color.red};
  top: 0;
  width: 105%;
  left: -2.5%;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.color.red};
  color: white;
  h3 {
    margin: 0;
  }
`

const Footer = styled(Block)`
  position: relative;
  bottom: 0;
  left: 0;
  padding: 10px;
  justify-content: center;
  border-top: 1px solid ${(p) => p.theme.color.dialogBorder};
  div + div {
    margin-left: 1rem;
  }
`

const Content = styled(Block)`
  padding: 20px;
  flex-direction: column;
  overflow-y: auto;
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: 0.5rem;
    }
  }
`

export default function SortDialog({ onClose, onClick, type }) {
  const [sortType, setSortType] = useState(type)
  return (
    <>
      <Mask onClick={onClose} />
      <Container>
        <Header>
          <h3>排序</h3>
        </Header>
        <Content>
          <Radio.Group
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
          >
            {Object.values(SortType).map((key) => (
              <Radio key={key} value={key}>
                {SortTypeLocale[key]}
              </Radio>
            ))}
          </Radio.Group>
        </Content>
        <Footer>
          <Button onClick={onClose}>關閉</Button>
          <Button onClick={onConfirm}>確認</Button>
        </Footer>
      </Container>
    </>
  )
  function onConfirm() {
    onClick(sortType)
    onClose()
  }
}
