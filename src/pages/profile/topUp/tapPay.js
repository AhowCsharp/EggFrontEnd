import { DrawOutBtn as Button } from '@app/pages/commodity'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Container, ButtonContainer } from '../tabStyle'
import { Content } from '../index'

const isDev = process.env.NODE_ENV !== 'production'
const APP_ID = 149631
const APP_KEY =
  'app_wR6OJ6ZaJ57avxC2DtMB5Y92SykYTnKp6mqWtBLqMUJontaYT7k9u8iXlmOJ'

const TapPayContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    height: 38px;
    line-height: 38px;
    width: 370px;
    max-width: 100%;
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: 6px;
  }
`

const config = {
  fields: {
    number: {
      element: '#card-number',
      placeholder: '**** **** **** ****',
    },
    expirationDate: {
      element: '#card-expiration-date',
      placeholder: 'MM / YY',
    },
    ccv: {
      element: '#card-ccv',
      placeholder: '後三碼',
    },
  },
  styles: {
    input: {
      'font-size': '14px',
    },
    '.invalid': {
      color: '#ff0000',
    },
  },
  isMaskCreditCardNumber: true,
  maskCreditCardNumberRange: {
    beginIndex: 4,
    endIndex: 11,
  },
}

export default function TapPay({ onSubmit, selected, discountCode }) {
  const serverType = isDev ? 'sandbox' : 'production'

  useEffect(() => {
    TPDirect.setupSDK(APP_ID, APP_KEY, serverType)
    TPDirect.card.setup(config)
  }, [])

  return (
    <Content>
      <Container>
        <TapPayContainer id="tap-pay">
          <div id="card-number"></div>
          <div id="card-expiration-date"></div>
          <div id="card-ccv"></div>
        </TapPayContainer>
        <ButtonContainer>
          <Button onClick={onTopUp}>儲值</Button>
        </ButtonContainer>
      </Container>
    </Content>
  )
  function onTopUp() {
    event.preventDefault()
    const { canGetPrime } = TPDirect.card.getTappayFieldsStatus()
    if (!canGetPrime) return
    const req = { amount: selected, discountCode }
    onSubmit(req)
  }
}
