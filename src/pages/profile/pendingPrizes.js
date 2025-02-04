import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table, InputNumber, Checkbox } from 'antd'
import styled from 'styled-components'
import { Button as BaseButton } from '@app/pages/commodity'
import { getDefaultDateRange, formatDate } from '@app/utils/date'
import Tag from '@app/shared/tag'
import { Content } from './index'
import {
  Container,
  RangePicker,
  ButtonContainer,
  MobileItem,
  MobileList,
} from './tabStyle'
import ShipDialog from './shipDialog'

const { Column } = Table

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Img = styled.img.attrs((p) => ({ src: p.src }))`
  height: 80px;
  width: auto;
  @media (max-width: 768px) {
    width: 50%;
    max-width: 300px;
    height: auto;
  }
`

const disableStyle = `
  cursor: not-allowed;
  opacity: 0.5;
`

export const Button = styled(BaseButton)`
  font-size: 0.8rem;
  text-align: center;
  ${(p) => p.disable && disableStyle}
  @media (max-width: 768px) {
    font-size: 1.05rem;
    flex: 1;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  .ant-input-number {
    width: 60px;
    margin-right: 5px;
  }
  .ant-input-number-input-wrap,
  .ant-input-number-input {
    height: 100% !important;
  }
  ${Button} {
    padding: 0.5rem;
  }
  ${Button} + ${Button} {
    margin-left: 5px;
  }
`

const Warning = styled.div`
  color: red;
`

const Info = styled.div`
  margin: 10px;
  div {
    line-height: 1.5;
  }
`

function formatShipDict(data) {
  return data.reduce((acc, cur) => {
    const { prizeId, prizeName, commodityName } = cur
    acc[prizeId] = { amount: cur.totalAmount, prizeName, commodityName }
    return acc
  }, {})
}

export default function PendingPrizes() {
  const pendingPrize = useSelector(() => dataStore.pendingPrize)
  const dateRange = getDefaultDateRange()
  const [isReclaiming, setIsReclaiming] = useState(false)
  const [shipDict, setShipDict] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [shipInfo, setShipInfo] = useState()
  const [listReq, setListReq] = useState({
    start: formatDate(dateRange[0]),
    end: formatDate(dateRange[1]),
  })

  const [itemCount, setItemCount] = useState(1)

  useEffect(() => {
    if (!pendingPrize) return
    const dict = formatShipDict(pendingPrize.data)
    setShipDict(dict)
  }, [pendingPrize])

  useEffect(() => {
    dataStore.getPendingPrize(listReq)
  }, [listReq])

  const rowSelection = {
    selectedRowKeys,
    onChange: (ids) => {
      setSelectedRowKeys(ids)
    },
  }

  const data = pendingPrize?.data || []
  return (
    <Content>
      {shipInfo && (
        <ShipDialog
          onClose={() => {
            setShipInfo(null)
            setSelectedRowKeys([])
          }}
          onSubmit={dataStore.ship}
          shipInfoData={shipInfo}
        />
      )}
      <Container tableMinWidth={700}>
        <Info>
          <div>單筆訂單尺寸 45 （含）以內🉑使用711店到店。</div>
          <div>超過125（含）只能選擇宅配。</div>
          <div>運費價格取單筆訂單最高的賞品運費價格去做計算。</div>
          <div> 例： 單筆訂單 有2個A賞+1個B賞：</div>
          <div>
            A賞運費價格150，B賞運費價格120，此筆訂單運費則挑150最高價格最為此單運費。
          </div>
          <Warning>
            不同廠商的賞品不得合併出貨，若未處理獎品超過30天，則廠商會自動回收該獎品!!
          </Warning>
        </Info>
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
            setListReq({
              ...listReq,
              start,
              end,
            })
          }}
        />
        <ButtonContainer>
          <Button disable={!selectedRowKeys.length} onClick={onShip}>
            配送
          </Button>
        </ButtonContainer>
        {renderTable()}
      </Container>
    </Content>
  )
  function renderManufacturer({ manufacturerName, manufacturerId: id }) {
    return <Tag name={manufacturerName} id={id} isSmall={true} />
  }
  function renderImg(src) {
    return (
      <ImgContainer>
        <Img src={src} />
      </ImgContainer>
    )
  }
  function renderAction(data) {
    if (selectedRowKeys.includes(data.prizeId))
      return (
        <InputNumber
          min={1}
          max={data.totalAmount}
          defaultValue={data.totalAmount}
          onChange={onSelectedItemAmountChange(data.prizeId)}
          size="small"
        />
      )
    if (isReclaiming && isReclaiming === data.prizeId)
      return (
        <ActionContainer>
          <InputNumber
            min={1}
            max={data.totalAmount}
            defaultValue={1}
            onChange={setItemCount}
            size="small"
          />
          <Button onClick={onReclaim}>確定</Button>
          <Button
            onClick={() => {
              setIsReclaiming(false)
              setItemCount(1)
            }}
          >
            取消
          </Button>
        </ActionContainer>
      )
    return (
      <ActionContainer>
        <Button onClick={() => setIsReclaiming(data.prizeId)}>回收</Button>
      </ActionContainer>
    )
    function onReclaim() {
      const req = {
        amount: itemCount,
        prizeId: isReclaiming,
      }
      dataStore.reclaim(req)
      setIsReclaiming(false)
      setItemCount(1)
    }
  }
  function onSelectedItemAmountChange(prizeId) {
    return (value) => {
      setShipDict({
        ...shipDict,
        [prizeId]: { ...shipDict[prizeId], amount: value },
      })
    }
  }
  function onShip() {
    if (!selectedRowKeys.length) return
    const infos = Object.keys(shipDict).reduce((acc, key) => {
      if (selectedRowKeys.includes(+key)) {
        acc[key] = shipDict[key]
      }
      return acc
    }, {})
    setShipInfo(infos)
  }
  function renderTable() {
    return (
      <>
        <Table
          className="hide-in-mobile"
          rowSelection={!isReclaiming && rowSelection}
          rowKey="prizeId"
          dataSource={data}
          pagination={false}
        >
          <Column
            dataIndex="prizeImgUrl"
            key="prizeImgUrl"
            render={renderImg}
          />

          <Column
            title="獎品"
            dataIndex="prizeName"
            key="prizeName"
            width={100}
          />
          <Column
            title="廠商"
            key="manufacturerName"
            render={renderManufacturer}
          />
          <Column
            title="總花費"
            dataIndex="totalCostMoney"
            key="totalCostMoney"
          />
          <Column title="運費價格" dataIndex="shippingFee" key="shippingFee" />
          <Column
            title="兌換代幣"
            dataIndex="reclaimPrize"
            key="reclaimPrize"
          />
          <Column title="擁有數量" dataIndex="totalAmount" key="totalAmount" />
          <Column title="商品尺寸" key="size" dataIndex="size" />
          <Column title="狀態" dataIndex="status" key="status" />
          <Column title="需運送或回收數量" key="action" render={renderAction} width={220} />
        </Table>
        <MobileList>
          {data.map((item, index) => (
            <MobileItem key={index}>
              <div className="title vertical">
                {renderImg(item.prizeImgUrl)}
                <Checkbox
                  className="dark-in-mobile"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys([...selectedRowKeys, item.prizeId])
                    } else {
                      setSelectedRowKeys(
                        selectedRowKeys.filter((key) => key !== item.prizeId)
                      )
                    }
                  }}
                />
              </div>
              <div>
                <span className="label">獎品</span> {item.prizeName}
              </div>
              <div>
                <div>{selectedRowKeys.includes(item.prizeId) ? '配送數量':''}</div>
                {renderAction(item)}
              </div>
              <div>
                <span className="label">廠商</span>
                {renderManufacturer(item)}
              </div>
              <div>
                <span className="label">總花費</span> {item.totalCostMoney}
              </div>
              <div>
                <span className="label">運費價格</span> {item.shippingFee}
              </div>
              <div>
                <span className="label">兌換代幣</span> {item.reclaimPrize}
              </div>
              <div>
                <span className="label">數量</span> {item.totalAmount}
              </div>
              <div>
                <span className="label">商品尺寸</span> {item.size}
              </div>
              <div>
                <span className="label">狀態</span> {item.status}
              </div>
            </MobileItem>
          ))}
        </MobileList>
      </>
    )
  }
}
