import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect, useState } from 'react'
import { useSelector, dataStore } from '@app/store'
import useAuth from '@app/utils/hooks/useAuth'
import { Wheel } from '@boriska420/react-custom-roulette'
import { DrawOutBtn } from '@app/pages/commodity/index'

const WheelContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const Button = styled(DrawOutBtn)`
  font-size: 0.8rem;
`

const wheelProps = {
  backgroundColors: ['#000', '#fff'],
  fontSize: 18,
  radiusLineWidth: 0,
  fontWeight: 700,
  outerBorderWidth: 2,
  spinDuration: 0.3,
  textColors: ['#f4c221', '#000'],
  fontFamily: 'Chocolate Classical Sans',
}

export default function SignIn() {
  const signInOptions = useSelector(() => dataStore.signInOptions)
  const isSigned = useSelector(() => dataStore.isSigned)
  const signInResult = useSelector(() => dataStore.signInResult)
  const [shouldSpin, setShouldSpin] = useState(false)
  useAuth()

  useEffect(() => {
    dataStore.getSignIn()
  }, [])

  useEffect(() => {
    if (signInResult === 0 || !!signInResult) setShouldSpin(true)
  }, [signInResult])

  return (
    <Layout>
      {!!signInOptions?.length &&
        (shouldSpin ? (
          <WheelContainer>
            <Wheel
              mustStartSpinning={true}
              prizeNumber={signInResult}
              data={signInOptions}
              {...wheelProps}
            />
          </WheelContainer>
        ) : (
          <WheelContainer>
            <Wheel
              prizeNumber={0}
              mustStartSpinning={false}
              data={signInOptions}
              {...wheelProps}
            />
          </WheelContainer>
        ))}
      <ButtonContainer>
        {isSigned ? '本日已完成簽到' : <Button onClick={onSignIn}>簽到</Button>}
      </ButtonContainer>
    </Layout>
  )
  function onSignIn() {
    if (isSigned) return
    dataStore.signIn()
  }
}
