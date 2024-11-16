import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { dataStore, useSelector } from '@app/store'
import { useNavigate, useSearchParams } from 'react-router-dom'
import paths from '@app/utils/paths'
import { useEffect } from 'react'
import useScrollToTop from '@app/utils/hooks/useScrollToTop'
import { LineButton } from '../login'
import Form from './form'
import { Helmet } from 'react-helmet';

const Warning = styled.span`
  color: red;
  margin: 0 5px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  text-align: center;
  h4 {
    margin: 0 0 10px;
  }
`

export default function Register() {
  const isLogged = useSelector(() => dataStore.isLogged)
  const enableSendSms = useSelector(() => dataStore.enableSendSms)
  const alreadySentSms = useSelector(() => !!dataStore.sentSmsReq)
  const goto = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultReferralCode = searchParams.get('referralCode')
  useEffect(() => {
    if (defaultReferralCode) dataStore.setReferralCode(defaultReferralCode)
  }, [defaultReferralCode])
  useLoginByLine()
  useEffect(() => {
    if (!isLogged) return
    goto(paths.index)
  }, [isLogged])
  useScrollToTop()

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ENGGR9ZBNL"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ENGGR9ZBNL');
          `}
        </script>
      </Helmet>
    <Layout>
      <Container>
        <h4>為避免您的賞品寄送權益，請務必如實填寫會員資料</h4>
        <h4>
          <Warning>*</Warning>為必填項目，嫌慢請用Line註冊🤛
        </h4>
        <LineButton wording="註冊" width="200px" />
      </Container>
      <Form
        onSubmit={dataStore.setRegisterReq}
        onSendSms={dataStore.sendSms}
        enableSendSms={enableSendSms}
        onCountdownEnd={dataStore.setSendSmsEnable}
        shouldShowVerifyBtn={alreadySentSms}
        onVerifySms={dataStore.verifySms}
      />
    </Layout>
  </>
  )
  function useLoginByLine() {
    const loginByLineUrl = useSelector(() => dataStore.loginByLineUrl)

    useEffect(() => {
      if (!loginByLineUrl) return
      window.open(loginByLineUrl, '_self')
    }, [loginByLineUrl])
  }
}
