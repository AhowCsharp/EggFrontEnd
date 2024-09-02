import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Content } from './index'
import { Container, RangePicker } from './tabStyle'

const { Column } = Table

export default function ConsumeLog() {
  const consumeLog = useSelector(() => dataStore.consumeLog)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getConsumeLog(req)
  }, [req])

  const data = consumeLog?.data || []
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
        <Table
          dataSource={data}
          pagination={{
            total: consumeLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column title="賞品" dataIndex="commodityName" key="commodityName" />
          <Column title="獎品" dataIndex="prizeName" key="prizeName" />
          <Column title="抽獎價格" dataIndex="costMoney" key="costMoney" />
          <Column
            title="抽獎時間"
            key="drawDate"
            dataIndex="drawDate"
            render={renderDate}
          />
          <Column title="狀態" dataIndex="status" key="status" />
        </Table>
      </Container>
    </Content>
  )
}
