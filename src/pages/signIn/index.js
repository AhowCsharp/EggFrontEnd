import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import { useSelector, dataStore } from '@app/store'
import useAuth from '@app/utils/hooks/useAuth'
import GifPlayer from '@app/shared/gitPlayer'
import signInAnimation from '@app/static/sign-in-animation.gif'
import signInImg from '@app/static/sign-in-lottery.png'
import { DrawOutBtn } from '@app/pages/commodity/index'

const Container = styled.div`
  min-height: 400px;
  .img-container {
    img {
      max-width: 500px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      width: 50%;
      left: 25%;
      top: 10%;
    }
  }
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const Button = styled(DrawOutBtn)`
  font-size: 0.8rem;
`

const Image = styled.div`
  background-image: url(${signInImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 80%;
  margin: 1rem auto;
  height: 300px;
`

export default function SignIn() {
  const isSigned = useSelector(() => dataStore.isSigned)
  const isSigning = useSelector(() => dataStore.isSigning)
  const signInResult = useSelector(() => dataStore.signInResult)
  useAuth()

  useEffect(() => {
    dataStore.getSignIn()
  }, [])

  return (
    <Layout>
      <Container>
        <Image />
        {isSigning && (
          <GifPlayer
            src={signInAnimation}
            onComplete={() => {
              dataStore.setIsSigning(false)
              dataStore.setAlertMessage(`抽中 ${signInResult}`)
            }}
            duration={2000}
          />
        )}
        <ButtonContainer>
          {isSigned ? (
            '本日已完成簽到'
          ) : (
            <Button onClick={onSignIn}>簽到</Button>
          )}
        </ButtonContainer>
      </Container>
    </Layout>
  )
  function onSignIn() {
    if (isSigned) return
    dataStore.signIn()
  }
}
