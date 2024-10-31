import { dataStore } from '@app/store'
import { DrawOutBtn } from '@app/pages/commodity'
import { Form, Input } from 'antd'
import { Row } from '@app/pages/register/form'
import { useEffect } from 'react'
import { ButtonContainer } from '../tabStyle'
import { Container } from './editPassword'

export default function EditMember({ member }) {
  const [form] = Form.useForm()
  useEffect(() => {
    if (!member || !form) return
    console.log('member', member)
    form.setFieldsValue(member)
    const a = form.getFieldsValue()
    console.log('a', a)
  }, [member, form])
  return (
    <Container id="edit-member">
      <Form form={form} layout="vertical">
        <Row>
          <Form.Item
            label="暱稱"
            name="nickName"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="收貨姓名"
            name="name"
            rules={[{ required: true, message: '不可為空' }]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="生日"
            name="birthday"
            rules={[
              { required: false, message: '請輸入正確的生日' },
              {
                type: 'string',
                len: 10,
                message: '請輸入正確的生日',
              },
            ]}
          >
            <Input />
          </Form.Item>
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
        </Row>
        <Row>
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

        <Form.Item
          label="狀態訊息"
          name="statusMessage"
          rules={[{ required: false, message: '' }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <ButtonContainer>
        <DrawOutBtn onClick={onEditMemberSubmit}>修改會員資料</DrawOutBtn>
      </ButtonContainer>
    </Container>
  )
  async function onEditMemberSubmit(e) {
    e.preventDefault()
    await form.validateFields().then(
      () => {
        const formData = form.getFieldsValue()
        const req = { id: member.id, account: member.account, ...formData }
        console.log('formData', formData, req)
        dataStore.editMember(req)
      },
      () => {}
    )
  }
}
