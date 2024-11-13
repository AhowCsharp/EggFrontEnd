import { useEffect, useState } from 'react'
import { dataStore, useSelector } from '@app/store/index'
import { DEFAULT_PAGINATION } from '@app/utils/constants'
import { Table, Checkbox } from 'antd'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Button } from '@app/pages/commodity'
import Tag from '@app/shared/tag'
import { Content } from './index'
import {
  Container,
  Search,
  ButtonContainer,
  MobileItem,
  MobileList,
  Select,
} from './tabStyle'

const { Column } = Table

export default function Tickets() {
  const ticket = useSelector(() => dataStore.ticket)
  const manufacturers = useSelector(() => dataStore.manufacturers)
  const [req, setReq] = useState(DEFAULT_PAGINATION)
  const [usefulTicketCount, setUsefulTicketCount] = useState()
  const data = ticket?.data || []
  const [manufacturerWithPlatform, setManufacturerWithPlatform] = useState([])
  useEffect(() => {
    dataStore.getTickets(req)
  }, [req])

  useEffect(() => {
    if (!data || !data.length) return
    const count = data.filter((t) => !t.isUsed).length
    setUsefulTicketCount(count)
  }, [data])

  useEffect(() => {
    if (!manufacturers || manufacturerWithPlatform.length) return
    const platform = {
      id: 0,
      name: '平台方贈送',
    }

    setManufacturerWithPlatform(
      [platform, ...manufacturers].map((m) => ({
        value: m.name,
        label: m.name,
      }))
    )
  }, [manufacturers])

  return (
    <Content>
      <Container>
        <ButtonContainer left={true}>
          <Select
            className="mr10 dark-in-mobile"
            style={{ width: '60%' }}
            placeholder="請選擇廠商"
            value={req['manufacturerName']}
            options={manufacturerWithPlatform}
            onChange={(value) => setReq({ ...req, manufacturerName: value })}
          />
          <Checkbox
            className="dark-in-mobile"
            onChange={(e) => setReq({ ...req, isUsed: e.target.checked })}
          >
            已使用
          </Checkbox>
        </ButtonContainer>
        <ButtonContainer left={true}>
          可使用抽獎券：{usefulTicketCount}
        </ButtonContainer>
        {renderTable()}
      </Container>
    </Content>
  )
  function renderManufacturerName({ manufacturerName, manufacturerId }) {
    return <Tag name={manufacturerName} id={manufacturerId} />
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
          <Column title="消費門檻" dataIndex="threshold" key="threshold" />
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
