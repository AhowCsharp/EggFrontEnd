import styled from 'styled-components'
import { Form, Input, Descriptions } from 'antd'
import { DrawOutBtn } from '@app/pages/commodity'
import { dataStore } from '@app/store'
import { PasswordRule } from '@app/pages/register/form'
import { ButtonContainer } from '../tabStyle'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export default function EditPassword() {
  const [form] = Form.useForm()

  return (
    <Container id="edit-password">
      <Descriptions title="修改密碼" />
      <Form form={form} layout="vertical">
        <Form.Item
          label="舊密碼"
          name="oldPw"
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
          label="新密碼"
          name="newPw"
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
          label="請確認新密碼"
          name="confirmPassword"
          dependencies={['newPw']}
          rules={[
            { required: true, message: '不可為空' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPw') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('密碼與確認密碼不一致'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <ButtonContainer>
        <DrawOutBtn onClick={onEditPasswordSubmit}>修改密碼</DrawOutBtn>
      </ButtonContainer>
    </Container>
  )
  async function onEditPasswordSubmit(e) {
    e.preventDefault()
    await form.validateFields().then(
      () => {
        const formData = form.getFieldValue()
        dataStore.editPassword(formData)
      },
      () => {}
    )
  }
}
