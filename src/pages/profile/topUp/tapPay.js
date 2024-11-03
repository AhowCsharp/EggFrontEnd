import { DrawOutBtn as Button } from '@app/pages/commodity'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Container } from '../tabStyle'
import { Content } from '../index'

const isDev = process.env.NODE_ENV !== 'production'
const APP_ID = 154437
const APP_KEY =
  'app_FwMCJkWJTC66UdYQU4CP3iYN9ECAarqcNzqn9hJnegjRiyp4RdOiPKioRjLt'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  div + div {
    margin-left: 8px;
  }
`

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

export default function TapPay({ onSubmit, selected,cancel }) {
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
          <Button onClick={()=>cancel(false)}>取消</Button>
          <Button onClick={onTopUp}>儲值</Button>
        </ButtonContainer>
      </Container>
    </Content>
  )
  function onTopUp() {
    event.preventDefault()
    const { canGetPrime } = TPDirect.card.getTappayFieldsStatus()
    if (!canGetPrime) return
    const req = { amount: selected }
    onSubmit(req)
  }
}
