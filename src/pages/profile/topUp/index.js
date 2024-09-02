import { useState, useEffect } from 'react'
import { Radio, Input } from 'antd'
import styled from 'styled-components'
import { TOP_UP_PRICE_OPTIONS } from '@app/utils/constants'
import { dataStore, useSelector } from '@app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { DrawOutBtn as Button } from '@app/pages/commodity'
import { Container, ButtonContainer } from '../tabStyle'
import { Content } from '../index'
import TapPay from './tapPay'

const PayWayOptions = [{ value: 1, label: '信用卡' }]

const Image = styled.img.attrs((p) => ({
  src: p.src,
}))`
  width: 100%;
  vertical-align: middle;
`

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  span {
    font-size: 1.25rem;
    color: rgb(245, 173, 61);
    margin-right: 5px;
  }
`

const CheckIcon = styled(FontAwesomeIcon).attrs(() => ({
  icon: faCheck,
}))`
  font-size: 1rem;
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  background-color: ${(p) =>
    p.selected ? p.theme.color.topUpSelected : '#ddd'};
`

const WarningBlock = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(p) => p.theme.color.topUpSelected};
  border: 1px solid ${(p) => p.theme.color.topUpSelected};
  border-radius: 8px;
  margin: 20px auto;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  * + * {
    margin-top: 10px;
  }
`

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`

const BaseOption = styled.div`
  ${(p) => p.selected && `border: 2px solid ${p.theme.color.topUpSelected};`}
  border-radius: 20px;
  align-items: center;
  overflow: visible;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 10px;
  width: calc((100% - 60px) / 3);
  margin: 20px 10px 0;
  cursor: pointer;
  @media (max-width: 768px) {
    width: calc((100% - 20px) / 2);
    margin: 20px 5px 0;
  }
`

const Price = styled.div`
  color: ${(p) => p.theme.color.topUpSelected};
  font-size: 1.3rem;
  font-weight: 700;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 315px;
  margin: 0 auto;
`

const Label = styled.div`
  font-weight: 700;
  margin-right: 10px;
  min-width: 60px;
`

export default function TopUp() {
  const [selected, setSelected] = useState(TOP_UP_PRICE_OPTIONS[0].value)
  const [showTapPayPage, setShowTapPayPage] = useState(false)
  const paymentUrl = useSelector(() => dataStore.paymentUrl)
  const [discountCode, setDiscountCode] = useState('')
  useEffect(() => {
    if (paymentUrl) {
      window.open(paymentUrl, '_self')
    }
  }, [paymentUrl])

  if (showTapPayPage)
    return (
      <TapPay
        onSubmit={dataStore.topUp}
        selected={selected}
        discountCode={discountCode}
      />
    )

  return (
    <Content>
      <Container>
        <Title>
          <span>step 1</span>請選擇付款方式
        </Title>
        <Radio.Group value={1} optionType="button" options={PayWayOptions} />
        <WarningBlock>
          <div>
            連續刷卡有機率會被銀行鎖卡，請務必確認好儲值金額，避免損失。
          </div>
        </WarningBlock>
        <Title>
          <span>step 3</span>請選擇儲值金額
        </Title>
        <OptionContainer>
          {TOP_UP_PRICE_OPTIONS.map((option) => (
            <Option
              key={option.value}
              selected={selected}
              setSelected={setSelected}
              {...option}
            />
          ))}
        </OptionContainer>
        <Row>
          <Label>折扣碼</Label>
          <Input
            value={discountCode}
            onChange={({ target }) => setDiscountCode(target.value)}
          />
        </Row>
        <ButtonContainer>
          <Button onClick={() => setShowTapPayPage(true)}>確認</Button>
        </ButtonContainer>
      </Container>
    </Content>
  )
}

function Option({ selected, setSelected, value, name, src }) {
  return (
    <BaseOption
      onClick={() => setSelected(value)}
      selected={selected === value}
    >
      <CheckIcon selected={selected === value} />
      <Image src={src} />
      <Price>{name}</Price>
    </BaseOption>
  )
}
