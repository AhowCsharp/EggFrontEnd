import { useEffect, useState } from 'react'
import { dataStore, useSelector } from '@app/store/index'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { Table } from 'antd'
import dayjs from 'dayjs'
import { Button } from '@app/pages/commodity'
import useRandomColors from '@app/utils/hooks/useRandomColors'
import Tag from '@app/shared/tag'
import { Content } from './index'
import {
  Container,
  Search,
  ButtonContainer,
  MobileItem,
  MobileList,
} from './tabStyle'

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
          enterButton={<Button>送出</Button>}
          size="small"
          onSearch={(value) => {
            setReq({ ...req, manufacturerName: value })
          }}
        />
        <ButtonContainer left={true}>
          可使用抽獎券：{usefulTicketCount}
        </ButtonContainer>
        {renderTable()}
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
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
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
        <MobileList>
          {data?.map((item, index) => (
            <MobileItem key={index}>
              <div className="title">
                <span className="label">廠商名稱</span>{' '}
                {renderManufacturerName(item)}
              </div>
              <div>
                <span className="label">取得方式</span> {item.sourceType}
              </div>
              <div>
                <span className="label">取得時間</span>{' '}
                {dayjs(item.createDate).format('YYYY/MM/DD HH:mm')}
              </div>
              <div>
                <span className="label">已使用</span>{' '}
                {item.isUsed ? '是' : '否'}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    )
  }
}
