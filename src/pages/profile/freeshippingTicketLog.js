import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { DrawOutBtn } from '@app/pages/commodity'
import { Content } from './index'
import { Container, RangePicker, Search } from './tabStyle'

const { Column } = Table

export default function freeshippingTicketLog() {
  const freeshippingTicketLog = useSelector(() => dataStore.freeshippingTicketLogs)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getFreeshippingticketLogs(req)
  }, [req])

  const data = freeshippingTicketLog?.data || []
  return (
    <Content>
      <Container>
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          defaultValue={dateRange}
          onOk={(value) => {
            setReq({
              ...req,
              start: formatDate(value[0]),
              end: formatDate(value[1]),
            })
          }}
        />
        <Search
          placeholder="請輸入廠商完整名稱"
          enterButton={<DrawOutBtn>送出</DrawOutBtn>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, manufacturerName: value })
          }}
        />
        <Table
          dataSource={data}
          pagination={{
            total: freeshippingTicketLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column title="廠商名稱" dataIndex="manufacturerName" key="manufacturerName" />
          <Column title="消費門檻" dataIndex="threshold" key="threshold" />
          <Column title="免運序號" dataIndex="freeShippingNo" key="freeShippingNo" />
          <Column title="訂單編號" dataIndex="orderId" key="orderId" />
          <Column title="免運金額" dataIndex="shippingCost" key="shippingCost" />
          <Column
            title="取得時間"
            key="createDate"
            dataIndex="createDate"
            render={renderDate}
          />
          <Column
            title="使用時間"
            key="usedDate"
            dataIndex="usedDate"
            render={renderDate}
          />
        </Table>
      </Container>
    </Content>
  )
}
