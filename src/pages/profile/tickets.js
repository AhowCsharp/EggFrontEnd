import { useEffect, useState } from 'react'
import { dataStore, useSelector } from '@app/store/index'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { Table } from 'antd'
import dayjs from 'dayjs'
import { DrawOutBtn } from '@app/pages/commodity'
import useRandomColors from '@app/utils/hooks/useRandomColors'
import Tag from '@app/shared/tag'
import { Content } from './index'
import { Container, Search } from './tabStyle'

const { Column } = Table

export default function Tickets() {
  const ticket = useSelector(() => dataStore.ticket)
  const [req, setReq] = useState(DEFAULT_PAGINATION)
  const [usefulTicketCount, setUsefulTicketCount] = useState()
  const data = ticket?.data || []
  const manufacturerColor = useRandomColors(ticket?.data, 'manufacturerName')

  useEffect(() => {
    dataStore.getTickets(req)
  }, [req])

  useEffect(() => {
    if (!data || !data.length) return
    const count = data.filter((t) => !t.isUsed).length
    setUsefulTicketCount(count)
  }, [data])

  return (
    <Content>
      <Container>
        <Search
          mt10
          placeholder="請輸入廠商名稱"
          enterButton={<DrawOutBtn>送出</DrawOutBtn>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, manufacturerName: value })
          }}
        />
        <div>可使用抽獎券：{usefulTicketCount}</div>
        <Table
          dataSource={data}
          pagination={{
            total: ticket?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column
            title="廠商名稱"
            key="manufacturerName"
            render={renderManufacturerName}
          />
          <Column title="取得方式" dataIndex="sourceType" key="sourceType" />
          <Column
            title="取得時間"
            key="drawDate"
            dataIndex="createDate"
            render={(d) => dayjs(d).format('YYYY/MM/DD HH:mm')}
          />
          <Column
            title="已使用"
            dataIndex="isUsed"
            key="isUsed"
            render={(d) => (d ? '是' : '否')}
          />
        </Table>
      </Container>
    </Content>
  )
  function renderManufacturerName({ manufacturerName, id }) {
    return (
      <Tag
        name={manufacturerName}
        id={id}
        color={manufacturerColor[manufacturerName]}
      />
    )
  }
}
