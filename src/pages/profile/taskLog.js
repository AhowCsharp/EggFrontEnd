import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { DrawOutBtn } from '@app/pages/commodity'
import { Content } from './index'
import { Container, RangePicker, Search } from './tabStyle'

const { Column } = Table

export default function TaskLog() {
  const taskHistoryLogs = useSelector(() => dataStore.taskHistoryLogs)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getTaskHistoryLogs(req)
  }, [req])

  const data = taskHistoryLogs?.data || []
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
          placeholder="請輸入任務名稱"
          enterButton={<DrawOutBtn>送出</DrawOutBtn>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, taskName: value })
          }}
        />
        <Table
          dataSource={data}
          pagination={{
            total: taskHistoryLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column title="任務名稱" dataIndex="taskTitle" key="taskTitle" />
          <Column title="獎勵內容" dataIndex="award" key="award" />
          <Column
            title="回收時間"
            key="completingTime"
            dataIndex="completingTime"
            render={renderDate}
          />
        </Table>
      </Container>
    </Content>
  )
}
