import { useSelector, dataStore } from '@app/store'
import { useEffect, useState } from 'react'
import { Table, InputNumber } from 'antd'
import styled from 'styled-components'
import { DrawOutBtn } from '@app/pages/commodity'
import { getDefaultDateRange, formatDate } from '@app/utils/date'
import useRandomColors from '@app/utils/hooks/useRandomColors'
import { Content } from './index'
import { Container, RangePicker, ButtonContainer } from './tabStyle'
import ShipDialog from './shipDialog'

const { Column } = Table

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Img = styled.img.attrs((p) => ({ src: p.src }))`
  height: 80px;
  width: auto;
`

const disableStyle = `
  cursor: not-allowed;
  opacity: 0.5;
`

const Button = styled(DrawOutBtn)`
  font-size: 0.8rem;
  ${(p) => p.disable && disableStyle}
`

const Manufacturer = styled.div`
  color: ${(p) => p.color};
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  .ant-input-number {
    width: 60px;
    margin-right: 5px;
  }
  .ant-input-number-input-wrap,
  .ant-input-number-input {
    height: 100% !important;
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
    acc[prizeId] = { amount: 1, prizeName, commodityName }
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
  const manufacturerColor = useRandomColors(
    pendingPrize?.data,
    'manufacturerName'
  )

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
          <Warning>不同廠商的賞品不得合併出貨，若未處理獎品超過30天，則廠商會自動回收該獎品!!</Warning>
        </Info>
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          defaultValue={dateRange}
          onOk={(value) => {
            setListReq({
              ...listReq,
              start: formatDate(value[0]),
              end: formatDate(value[1]),
            })
          }}
        />
        <ButtonContainer left>
          <Button disable={!selectedRowKeys.length} onClick={onShip}>
            配送
          </Button>
        </ButtonContainer>
        <Table
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

          <Column title="獎品" dataIndex="prizeName" key="prizeName" />
          <Column
            title="廠商"
            dataIndex="manufacturerName"
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
            title="回收價格"
            dataIndex="reclaimPrize"
            key="reclaimPrize"
          />
          <Column title="數量" dataIndex="totalAmount" key="totalAmount" />
          <Column title="商品尺寸" key="size" dataIndex="size" />
          <Column title="狀態" dataIndex="status" key="status" />
          <Column title="" key="action" render={renderAction} width={220} />
        </Table>
      </Container>
    </Content>
  )
  function renderManufacturer(name) {
    return <Manufacturer color={manufacturerColor[name]}>{name}</Manufacturer>
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
          defaultValue={1}
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
}
