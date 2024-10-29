import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Button } from '@app/pages/commodity'
import { Content } from './index'
import {
  Container,
  RangePicker,
  Search,
  MobileItem,
  MobileList,
} from './tabStyle'

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
          mb20={true}
        />
        <Search
          placeholder="請輸入任務名稱"
          enterButton={<Button>送出</Button>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, taskName: value })
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
            title="達成時間"
            key="completingTime"
            dataIndex="completingTime"
            render={renderDate}
          />
        </Table>
        <MobileList>
          {data?.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">任務名稱</span> {item.taskTitle}
              </div>
              <div>
                <span className="label">獎勵內容</span> {item.award}
              </div>
              <div>
                <span className="label">達成時間</span>{' '}
                {renderDate(item.completingTime)}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    )
  }
}
