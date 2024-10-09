import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { DrawOutBtn } from '@app/pages/commodity'
import useRandomColors from '@app/utils/hooks/useRandomColors'
import Tag from '@app/shared/tag'
import CopyToClipboard from '@app/shared/copyToClipboard'
import { Content } from './index'
import { Container, RangePicker, Search, Select } from './tabStyle'

const { Column } = Table

const STATUS_OPTIONS = [
  { value: null, label: '全部' },
  {
    value: false,
    label: '未使用',
  },
  {
    value: true,
    label: '已使用',
  },
]

export default function freeshippingTicketLog() {
  const freeshippingTicketLogs = useSelector(
    () => dataStore.freeshippingTicketLogs
  )
  const dateRange = getDefaultDateRange()
  const manufacturerColor = useRandomColors(
    freeshippingTicketLogs?.data,
    'manufacturerName'
  )

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    status: null,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  useEffect(() => {
    dataStore.getFreeshippingticketLogs(req)
  }, [req])

  const data = freeshippingTicketLogs?.data || []
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
        <Select
          value={req.status}
          options={STATUS_OPTIONS}
          onChange={(value) => setReq({ ...req, status: value })}
        />
        <Table
          dataSource={data}
          pagination={{
            total: freeshippingTicketLogs?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
        >
          <Column
            title="廠商名稱"
            render={renderManufacturerName}
            key="manufacturerName"
          />
          <Column title="消費門檻" dataIndex="threshold" key="threshold" />
          <Column
            title="免運序號"
            dataIndex="freeShippingNo"
            render={(no) => <CopyToClipboard>{no}</CopyToClipboard>}
            key="freeShippingNo"
          />
          <Column title="訂單編號" dataIndex="orderId" key="orderId" />
          <Column
            title="免運金額"
            dataIndex="shippingCost"
            key="shippingCost"
          />
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
