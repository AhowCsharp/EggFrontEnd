import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { DrawOutBtn } from '@app/pages/commodity'
import { Content } from './index'
import { Container, RangePicker, Search } from './tabStyle'

const { Column } = Table

export default function ReclaimLog() {
  const reclaimLog = useSelector(() => dataStore.reclaimLog)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getReclaimLog(req)
  }, [req])

  const data = reclaimLog?.data || []
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
          placeholder="請輸入獎品名稱"
          enterButton={<DrawOutBtn>送出</DrawOutBtn>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, prizeName: value })
          }}
        />
        <Table
          dataSource={data}
          pagination={{
            total: reclaimLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column title="獎品" dataIndex="prizeName" key="prizeName" />
          <Column title="價格" dataIndex="money" key="money" />
          <Column
            title="回收時間"
            key="reclaimDate"
            dataIndex="reclaimDate"
            render={renderDate}
          />
        </Table>
      </Container>
    </Content>
  )
}
