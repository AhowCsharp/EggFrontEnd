import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { DrawOutBtn } from '@app/pages/commodity'
import { Content } from './index'
import { Container, RangePicker, Search } from './tabStyle'

const { Column } = Table

export default function StoredLog() {
  const storedLogs = useSelector(() => dataStore.storedLogs)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getStoredLogs(req)
  }, [req])

  const data = storedLogs?.data || []
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
            total: storedLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column title="儲值編號" dataIndex="recTradeId" key="recTradeId" />
          <Column title="金額" dataIndex="amount" key="amount" />
          <Column
            title="購買時間"
            key="buyDate"
            dataIndex="buyDate"
            render={renderDate}
          />
          <Column title="交易狀態" dataIndex="notifyCheckStatus" key="notifyCheckStatus" />
        </Table>
      </Container>
    </Content>
  )
}
