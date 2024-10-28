import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Content } from './index'
import { Container, RangePicker, MobileList, MobileItem } from './tabStyle'

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
            const start = formatDate(value[0])
            const end = formatDate(value[1])
            if (start === 'Invalid Date' || end === 'Invalid Date') return
            setReq({
              ...req,
              start: formatDate(value[0]),
              end: formatDate(value[1]),
            })
          }}
          mb20={true}
        />
        {renderTable()}
      </Container>
    </Content>
  )
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
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
          <Column
            title="交易狀態"
            dataIndex="notifyCheckStatus"
            key="notifyCheckStatus"
          />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">儲值編號</span> {item.recTradeId}
              </div>
              <div>
                <span className="label">金額</span> {item.amount}
              </div>
              <div>
                <span className="label">購買時間</span> {item.buyDate}
              </div>
              <div>
                <span className="label">交易狀態</span> {item.notifyCheckStatus}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    )
  }
}
