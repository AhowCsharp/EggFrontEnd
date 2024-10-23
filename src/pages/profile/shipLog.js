import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
import {
  DEFAULT_PAGINATION,
  SHIP_STATUS_LOCALE,
  SHIP_STATUS_OPTIONS,
  SHIP_STATUS,
} from '@app/utils/constants'
import { getDefaultDateRange, formatDate, renderDate } from '@app/utils/date'
import { Content } from './index'
import { Container, RangePicker, Select } from './tabStyle'

const { Column } = Table

// 新增一个 HeaderSection 组件，用于包含 Info 和过滤器
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

// 修改 Info 组件，使其内容居中并美化
const Info = styled.div`
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
  font-size: 16px;
  color: #333;

  div {
    line-height: 1.5;
    margin-bottom: 5px;
  }
`

// 新增一个 FilterSection 组件，用于排列过滤器
const FilterSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  > *:not(:last-child) {
    margin-right: 10px;
  }
`

export default function ShipLog() {
  const shipLog = useSelector(() => dataStore.shipLog)
  const dateRange = getDefaultDateRange()

  const [req, setReq] = useState({
    ...DEFAULT_PAGINATION,
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
    status: SHIP_STATUS.PENDING,
  })

  useEffect(() => {
    dataStore.getShipLog(req)
  }, [req])

  const data = shipLog?.data || []
  return (
    <Content>
      <Container>
        <HeaderSection>
          <Info>
            <div>可以追蹤我們官方 LINE</div>
            <div>當配送狀態有異動時，會第一時間通知您！</div>
            <div>還有許多潮潮功能，歡迎體驗～</div>
          </Info>
          <FilterSection>
            <RangePicker
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
              defaultValue={dateRange}
              onOk={(value) =>
                setReq({
                  ...req,
                  start: formatDate(value[0]),
                  end: formatDate(value[1]),
                })
              }
            />
            <Select
              value={req.status}
              options={SHIP_STATUS_OPTIONS}
              onChange={(value) => setReq({ ...req, status: value })}
            />
          </FilterSection>
        </HeaderSection>
        <Table
          dataSource={data}
          pagination={{
            total: shipLog?.totalCount || 0,
            defaultPageSize: DEFAULT_PAGINATION.pageSize,
            showSizeChanger: true,
            onChange: (pageNumber, pageSize) => {
              setReq({ ...req, pageNumber, pageSize })
            },
          }}
          expandable={{
            expandedRowRender: ({ shippingDetails }) => (
              <DetailTable detail={shippingDetails} />
            ),
          }}
        >
          <Column title="訂單編號" dataIndex="orderNo" key="orderNo" />
          <Column
            title="配送申請日期"
            dataIndex="orderDate"
            key="orderDate"
            render={renderDate}
          />
          <Column title="運費" dataIndex="orderShipFee" key="orderShipFee" />
          <Column
            title="物流編號"
            dataIndex="logistiscsNO"
            key="logistiscsNO"
          />
          <Column
            title="配送日期"
            key="shipDate"
            dataIndex="shipDate"
            render={renderDate}
          />
          <Column
            title="廠商備註"
            dataIndex="manufacturerMemo"
            key="manufacturerMemo"
          />
          <Column
            title="訂單狀態"
            dataIndex="status"
            key="status"
            render={(d) => SHIP_STATUS_LOCALE[d]}
          />
        </Table>
      </Container>
    </Content>
  )
}

function DetailTable({ detail }) {
  return (
    <Table dataSource={detail} pagination={false} size="small">
      <Column title="獎品" dataIndex="prizeName" key="prizeName" />
      <Column title="數量" dataIndex="amount" key="amount" />
    </Table>
  )
}
