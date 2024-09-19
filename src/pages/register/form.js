import styled from 'styled-components'
import { Form, Input } from 'antd'
import { Button } from '@app/pages/login'
import { useState } from 'react'
import CountdownTimer from '@app/shared/countdownTimer'

export const PasswordRule = /^(?=.*[!@#$%^&*.])(?=.*[0-9])(?=.*[a-zA-Z])/

export const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .ant-form-item {
    flex: 1;
    &.btn-col {
      display: flex;
      align-items: end;
      width: 100%;
      & .ant-form-item-control-input-content {
        display: flex;
        align-items: end;
        ${Button} {
          margin: 0 0 0 8px;
          width: 160px;
          padding: 5px 20px;
          flex: 1 0 40%;
          &.verify-btn {
            flex: 1 0 80px;
          }
        }
      }
    }
  }
  .ant-form-item + .ant-form-item {
    margin-left: 8px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    .ant-form-item + .ant-form-item {
      margin-left: 0;
    }
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

export default function RegisterForm({
  onSubmit,
  onSendSms,
  enableSendSms,
  onCountdownEnd,
  shouldShowVerifyBtn,
  onVerifySms,
}) {
  const [form] = Form.useForm()
  const [verifyCode, setVerifyCode] = useState('')

  return (
    <>
      <Form form={form} layout="vertical">
        <Row>
          <Form.Item
            label="帳號"
            name="account"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: '不可為空' },
              { type: 'email', message: '格式錯誤' },
            ]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="手機"
            name="phoneNum"
            rules={[
              { required: true, message: '不可為空' },
              {
                type: 'string',
                len: 10,
                message: '請輸入正確的手機號碼',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="btn-col"
            label="手機驗證碼"
            name="verifyCode"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value)
              }}
            />
            <Button
              isLogin
              onClick={() => {
                const phoneNum = form.getFieldValue().phoneNum
                phoneNum && onSendSms({ phoneNum })
              }}
              disable={!enableSendSms}
            >
              {enableSendSms ? (
                '發送驗證碼'
              ) : (
                <CountdownTimer
                  initialSeconds={10}
                  isSmall
                  cb={onCountdownEnd}
                />
              )}
            </Button>
            {shouldShowVerifyBtn && (
              <Button
                className="verify-btn"
                isLogin
                onClick={() => {
                  verifyCode && onVerifySms(verifyCode)
                }}
              >
                驗證
              </Button>
            )}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="收貨姓名"
            name="name"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="暱稱"
            name="nickName"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="密碼"
            name="password"
            rules={[
              { required: true, message: '不可為空' },
              { min: 8, message: '密碼長度需大於8' },
              {
                pattern: PasswordRule,
                message: '密碼需包含至少一個特殊字符、數字和字母',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="確認密碼"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '不可為空' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密碼與確認密碼不一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="郵遞區號"
            name="districtNo"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="居住城市"
            name="city"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="居住地區"
            name="districtName"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Form.Item
          label="詳細地址"
          name="address"
          rules={[{ required: true, message: '不可為空' }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Footer>
        <Button isLogin onClick={handleSubmit}>
          註冊成為會員
        </Button>
      </Footer>
    </>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    await form.validateFields().then(
      () => {
        const formData = form.getFieldValue()
        onSubmit(formData)
      },
      () => {}
    )
  }
}
