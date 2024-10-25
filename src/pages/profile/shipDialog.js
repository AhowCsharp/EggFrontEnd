import styled from 'styled-components'
import { Form, Table, Input, Select } from 'antd'
import { DrawOutBtn as Button } from '@app/pages/commodity'
import { useMemo, useState } from 'react'

const { Column } = Table

const shipWayOptions = [
  { label: '宅配', value: 0 },
  { label: '7-11', value: 1 },
  { label: '全家', value: 2 },
]

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  border-radius: ${(p) => p.theme.borderRadius.content};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: absolute;
  opacity: 1;
  top: 0;
  width: 60%;
  left: 20%;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 250px;
  max-height: 90%;
  overflow-y: auto;
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border: 1px solid ${(p) => p.theme.color.dialogBorder};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  padding: 20px 40px 40px;
  display: flex;
  padding-bottom: 55px;
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Header = styled(Block)`
  position: relative;
  top: 0;
  h3 {
    margin: 0;
  }
`

const Footer = styled(Block)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px 0;
  justify-content: center;
  ${Button} + ${Button} {
    margin-left: 20px;
  }
`

const Content = styled(Block)`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  .ant-table-wrapper {
    margin-bottom: 10px;
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  td,
  th {
    padding: 4px 8px !important;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

function formatTableData(shipInfoData) {
  return Object.keys(shipInfoData).map((key) => ({
    prizeId: key,
    ...shipInfoData[key],
  }))
}

export default function ShipDialog({
  onClose,
  onSubmit: onSubmitFn,
  shipInfoData,
}) {
  const data = useMemo(() => formatTableData(shipInfoData), [shipInfoData])
  const [form] = Form.useForm()

  return (
    <>
      <Mask />
      <Container className="dialog">
        <Header>
          <h3>配送</h3>
        </Header>
        <Content>
          <Table dataSource={data} pagination={false} size="small">
            <Column title="獎品" dataIndex="prizeName" key="prizeName" />
            <Column title="數量" dataIndex="amount" key="amount" />
          </Table>
          <ShipDialogForm form={form} />
        </Content>
        <Footer>
          <Button onClick={onClose}>關閉</Button>
          <Button onClick={onSubmit}>配送</Button>
        </Footer>
      </Container>
    </>
  )
  async function onSubmit() {
    await form.validateFields().then(
      () => {
        const formData = form.getFieldValue()
        const shipInfo = data.reduce((acc, cur) => {
          acc[cur.prizeId] = cur.amount
          return acc
        }, {})
        const req = { ...formData, shipInfo }
        onSubmitFn(req)
        onClose()
      },
      () => {}
    )
  }
}

function ShipDialogForm({ form }) {
  const [shipWay, setShipWay] = useState(0)
  return (
    <Form form={form} size="small">
      <Row>
        <Form.Item
          label="配送方式"
          name="shipWay"
          rules={[{ required: true, message: '不可為空' }]}
        >
          <Select
            style={{ width: 100 }}
            onChange={setShipWay}
            defaultValue="請選擇"
          >
            {shipWayOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="收件人"
          name="addressee"
          rules={[{ required: true, message: '不可為空' }]}
        >
          <Input />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label="聯絡電話"
          name="mobileNumber"
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
          label="郵遞區號"
          name="zipCode"
          rules={[{ required: true, message: '不可為空' }]}
        >
          <Input style={{ width: 80 }} />
        </Form.Item>
      </Row>
      <Form.Item
        label="超商店號"
        name="convenienceStoreName"
        rules={[{ required: shipWay, message: '不可為空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="詳細地址（超商地址）"
        name="recipientAddress"
        rules={[{ required: true, message: '不可為空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="免運券序號" name="freeshippingNo">
        <Input />
      </Form.Item>
      <Form.Item label="備註" name="memo">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}
