import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useSelector, dataStore } from '@app/store'
import paths from '@app/utils/paths'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon as BaseFontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLine } from '@fortawesome/free-brands-svg-icons'

const loginButtonStyle = (p) => `
  background-color: #000;
  color: ${p.theme.color.orange};
  border-color: ${p.theme.color.orange};
`

const disableStyle = `
  cursor: not-allowed;
  opacity: 0.5;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Button = styled.button.attrs({ type: 'submit' })`
  cursor: pointer;
  color: #fff;
  margin: 20px 0;
  border-radius: 25px;
  font-weight: 700;
  text-align: center;
  background-color: #d04a26;
  border: 3px solid #9a3418;
  padding: 7px 20px;
  font-size: 0.875rem;
  ${(p) => p.isLogin && loginButtonStyle(p)}
  ${(p) => p.disable && disableStyle}
`

const Section = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
  flex-direction: column;
  h4 {
    margin: 10px 0;
  }
  .highlight {
    color: rgb(208, 74, 38);
  }
  ${Button} {
    margin: 0 0 20px;
  }
`

const BaseLineButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.width || 'auto'};
  margin: 20px auto;
`

const FontAwesomeIcon = styled(BaseFontAwesomeIcon)`
  margin-right: 10px;
  font-size: 1.25rem;
`

export default function Login() {
  const isLogged = useSelector(() => dataStore.isLogged)
  const goto = useNavigate()
  const [form] = Form.useForm()
  useLoginByLine()
  useEffect(() => {
    if (!isLogged) return
    goto(paths.index)
  }, [isLogged])

  return (
    <Layout>
      <Container>
        <Section>
          <Form form={form} layout="vertical">
            <Form.Item
              label="帳號"
              name="account"
              rules={[{ required: true, message: '不可為空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密碼"
              name="password"
              rules={[{ required: true, message: '不可為空' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <Button isLogin onClick={onSubmit}>
            立即登入
          </Button>
          <LineButton wording="登入" />
        </Section>
        <Section>
          <h4>歡迎來到 瞇那賞-玩具所 官方網站！</h4>
          <p>如果你還沒有帳號~</p>
          <Button onClick={() => goto(paths.register)}>立即註冊</Button>
          <p>
            加入 <span className="highlight">瞇那賞-玩具所</span>{' '}
            會員後，你將獲得無數刺激和創新的功能。
            只需線上儲值，就能立即獲得豐富的回饋！
            免去親自走訪門市的麻煩，趕緊來試試你的抽獎運氣吧！
            夢幻A賞、最後賞將直接送到你家！
          </p>
        </Section>
      </Container>
    </Layout>
  )
  async function onSubmit(e) {
    e.preventDefault()
    await form.validateFields().then(
      () => {
        const formData = form.getFieldValue()
        dataStore.login(formData)
      },
      () => {}
    )
  }
  function useLoginByLine() {
    const loginByLineUrl = useSelector(() => dataStore.loginByLineUrl)
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
      if (!code) return
      dataStore.getAccessTokenByLine({ code })
    }, [code])

    useEffect(() => {
      if (!loginByLineUrl) return
      window.open(loginByLineUrl, '_self')
    }, [loginByLineUrl])
  }
}

export function LineButton({ wording, ...props }) {
  return (
    <BaseLineButton isLogin onClick={dataStore.getLoginByLineUrl} {...props}>
      <FontAwesomeIcon icon={faLine} />
      {wording}
    </BaseLineButton>
  )
}
