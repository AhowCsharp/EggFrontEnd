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

export default function TopUp({ result, goBack }) {
  const topUpResult = useSelector(() => dataStore.topUpResult)

  useEffect(() => {
    if (+result !== TOP_UP_RESULT.FAILED)
      setTimeout(() => {
        dataStore.getTopUpResult()
      }, 3000)
  }, [result])
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
