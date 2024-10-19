import styled from 'styled-components'
import { DrawOutBtn as Button } from '@app/pages/commodity'
import { useEffect } from 'react'
import { dataStore, useSelector } from '@app/store/index'
import { TOP_UP_RESULT, TOP_UP_RESULT_LOCALE } from '@app/utils/constants'
import { Container, ButtonContainer } from './tabStyle'
import { Content } from './index'

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`

export default function TopUpResult({
  result,
  goBack,
  rec_trade_id,
  number,
  invoiceType,
}) {
  const topUpResult = useSelector(() => dataStore.topUpResult)
  // const [req, setReq] = useState({
  //   rec_trade_id,
  // })
  useEffect(() => {
    if (+result !== TOP_UP_RESULT.FAILED && !!rec_trade_id) {
      dataStore.getTopUpResult({ rec_trade_id })
      console.log('topUpResult:' + topUpResult)
      console.log(result)
      console.log('invoiceType' + invoiceType)
      console.log('number' + number)
      console.log('rec_trade_id' + rec_trade_id)
      dataStore.sendInvoice(rec_trade_id)
    }
  }, [result, rec_trade_id])

  if (+result === TOP_UP_RESULT.FAILED)
    return (
      <Content>
        <Container>
          <Title>{TOP_UP_RESULT_LOCALE[TOP_UP_RESULT.FAILED]}</Title>
        </Container>
      </Content>
    )

  if (topUpResult === TOP_UP_RESULT.NONE)
    return (
      <Content>
        <Container>
          <Title>交易中，請稍候...</Title>
        </Container>
      </Content>
    )

  return (
    <Content>
      <Container>
        <Title>{getMsg()}</Title>
        <ButtonContainer>
          <Button onClick={goBack}>確認</Button>
        </ButtonContainer>
      </Container>
    </Content>
  )

  function getMsg() {
    return (
      TOP_UP_RESULT_LOCALE[topUpResult] ||
      TOP_UP_RESULT_LOCALE[TOP_UP_RESULT.FAILED]
    )
  }
}
