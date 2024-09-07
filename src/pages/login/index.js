import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useSelector, dataStore } from '@app/store'
import paths from '@app/utils/paths'
import { useNavigate } from 'react-router-dom'

const loginButtonStyle = (p) => `
  background-color: #000;
  color: ${p.theme.color.orange};
  border-color: ${p.theme.color.orange};
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
`

export default function Login() {
  const isLogged = useSelector(() => dataStore.isLogged)
  const goto = useNavigate()
  const [form] = Form.useForm()

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
        </Section>
        <Section>
          <h4>歡迎來到 剩蛋快樂-扭蛋所 官方網站！</h4>
          <p>如果你還沒有帳號~</p>
          <Button onClick={() => goto(paths.register)}>立即註冊</Button>
          <p>
            加入 <span className="highlight">剩蛋快樂-扭蛋所</span>{' '}
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
}
