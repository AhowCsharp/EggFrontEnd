import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useEffect, useState } from 'react'
import { useSelector, dataStore } from '@app/store'
import { useParams } from 'react-router-dom'
import { breadCrumbs } from '@app/utils/paths'
import paths from '@app/utils/paths'
import ManufacturerTag from '@app/shared/tag'
import { DRAW_OUT_STATUS } from '@app/utils/constants'
import { useNavigate } from 'react-router-dom'
import { Radio } from 'antd'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CountdownTimer from '@app/shared/countdownTimer'
import { hideScrollBarStyle } from '@app/shared/header'
import Prize from './prize'
import ResultDialog from './resultDialog'
import CountdownDialog from './countdownDialog'
import ConfirmDialog from './confirmDialog'
import LotteryBlock from './lotteryBlock'
import Price from './price'

const multiDrawOutStyle = `
  background: #a80502;
  color: #fff;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const DrawOutInfo = styled.div`
  padding: 20px;
  span {
    margin: 10px;
  }
`

const ImgContainer = styled.div`
  width: 500px;
  height: 500px;
  border: 10px solid #331212;
  margin-right: 20px;
  ${(p) => p.img && `background: url('${p.img}') no-repeat center/cover;`}
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    max-height: 500px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const PrizeContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
  overflow-x: auto;
  ${hideScrollBarStyle}
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  p {
    margin: 5px 0;
  }
`

const Name = styled.div`
  color: #3e3e3e;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 10px 0;
`

const NavItem = styled.div``

const SelectionNav = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  font-size: 0.75rem;
  ${NavItem}+${NavItem} {
    margin-left: 10px;
  }
`

const Tag = styled.div`
  position: relative;
  width: 100px;
  height: 28px;
  background-color: #bdaa96;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 15px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -14px; /* 調整這裡讓箭頭部分和長方形對齊 */
    width: 0;
    height: 0;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 14px solid #bdaa96; /* 和背景色相同 */
    z-index: 1;
  }
`

export const DrawOutBtn = styled.div`
  cursor: pointer;
  background: #000;
  color: ${(p) => p.theme.color.orange};
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 12px;
  text-align: center;
  border-radius: 10px;
  ${(p) => p.isMultiDrawOut && multiDrawOutStyle}
`

export const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const DrawOutBtnBlock = styled(Block)`
  flex-direction: column;
  ${DrawOutBtn} {
    margin: 0 10px 15px 0;
  }
`

const Desc = styled.p`
  color: ${(p) => p.warning && p.theme.color.warning};
  ${(p) => p.large && 'font-size: 1.25rem;'}
  margin:10px 0 0;
`

const BtnBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  margin: 10px 0;
  ${DrawOutBtn} {
    margin: 0 10px;
  }
  .ant-radio-button-wrapper-checked {
    z-index: 0 !important;
  }
`

function getDrawTimeOptions(drawOutMultiplePriceStatus) {
  if (!drawOutMultiplePriceStatus) return [{ value: 1, label: '單抽' }]
  return [
    { value: 1, label: '單抽' },
    { value: 5, label: '五連抽' },
    { value: 10, label: '十連抽' },
  ]
}

export default function Commodity() {
  const params = useParams()
  const goto = useNavigate()
  const commodityId = +params.commodityId
  const commodity = useSelector(() => dataStore.commodity)
  const drawOutStatus = useSelector(() => dataStore.drawOutStatus)
  const isDrawOuting = useSelector(() => dataStore.isDrawOuting)
  const drawOutResult = useSelector(() => dataStore.drawOutResult)
  const countdownSecDict = useSelector(() => dataStore.countdownSec)
  const countdownSec = countdownSecDict[commodityId]
  const isLogged = useSelector(() => dataStore.isLogged)
  const [shouldResultDialogOpen, setShouldResultDialogOpen] = useState(
    isDrawOuting || drawOutResult
  )
  const [shouldCountDownDialogOpen, setShouldCountDownDialogOpen] =
    useState(countdownSec)
  const [drawOutTimes, setDrawOutTimes] = useState(1)
  const [selectedPrizes, setSelectedPrizes] = useState([])
  const [showLotteryContainer, setShowLotteryContainer] = useState(false)
  const [drawOutReq, setDrawOutReq] = useState()
  const [enableDrawOut, setEnableDrawOut] = useState(false)
  const [nowDisplay, setNowDisplay] = useState()
  const drawTimeOptions = getDrawTimeOptions(
    commodity?.drawOutMultiplePriceStatus
  )
  useEffect(() => {
    dataStore.getCommodity(commodityId)
  }, [])

  useEffect(() => {
    setSelectedPrizes([])
  }, [drawOutTimes])

  useEffect(() => {
    if (countdownSec) setShouldCountDownDialogOpen(true)
  }, [countdownSec])

  useEffect(() => {
    setShouldResultDialogOpen(isDrawOuting || drawOutResult)
  }, [isDrawOuting, drawOutResult])

  useEffect(() => {
    if (!showLotteryContainer) return
    onSectionNavClick('lottery')()
  }, [showLotteryContainer])

  useEffect(() => {
    if (!commodity) return
    if (!commodity.prizes) dataStore.getPrizes(commodityId)
    setNowDisplay(commodity)
    dataStore.setBreadCrumbs([
      ...breadCrumbs.default,
      commodity.category,
      commodity.name,
    ])
  }, [commodity])

  if (!commodity) return <Layout />
  return (
    <Layout>
      {shouldResultDialogOpen && !drawOutReq && (
        <ResultDialog
          isLoading={isDrawOuting}
          data={drawOutResult}
          onClose={onResultDialogClose}
        />
      )}
      {shouldCountDownDialogOpen &&
        drawOutStatus === DRAW_OUT_STATUS.PROTECTING && (
          <CountdownDialog
            countdownSec={countdownSec}
            cb={() => dataStore.setCountdownSec(commodityId)}
            onClose={() => setShouldCountDownDialogOpen(false)}
          />
        )}
      {drawOutReq && (
        <ConfirmDialog
          data={drawOutReq}
          drawOutStatus={drawOutStatus}
          onClose={() => {
            dataStore.setDrawOutStatus(DRAW_OUT_STATUS.SUCCESS)
            setSelectedPrizes([])
            setDrawOutReq(false)
          }}
          onSubmit={dataStore.drawOut}
        />
      )}
      <InfoContainer>
        <ImgContainer img={nowDisplay?.imgUrl} />
        <Info>
          <ManufacturerTag
            name={commodity.manufacturerName}
            id={commodity.manufacturerId}
          />
          <Name>{commodity.name}</Name>
          <SelectionNav>
            <NavItem onClick={onSectionNavClick('prize')}>賞品一覽</NavItem>
            <NavItem onClick={onSectionNavClick('description')}>
              商品說明
            </NavItem>
          </SelectionNav>
          <Price
            category={commodity.category}
            drawOut1Price={commodity.drawOut1Price}
            discount={commodity.discount}
          />
          <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
            {commodity.drawOut5Price !== null && (
              <Chip
                label={commodity.drawOut5Price + ' / 五連抽'}
                color="warning"
              />
            )}
            {commodity.drawOut10Price !== null && (
              <Chip
                label={commodity.drawOut10Price + ' / 十連抽'}
                color="warning"
              />
            )}
          </Stack>
          <DrawOutBtnBlock>
            <DrawOutBtn
              onClick={() => {
                if (!isLogged) return goto(paths.login)
                setEnableDrawOut(true)
                setShowLotteryContainer(true)
              }}
            >
              開抽
            </DrawOutBtn>
            <DrawOutBtn onClick={() => setShowLotteryContainer(true)}>
              檢視抽況
            </DrawOutBtn>
          </DrawOutBtnBlock>
          {!!countdownSec ? (
            <Desc warning>
              賞品鎖定中，解鎖倒數：
              <CountdownTimer
                initialSeconds={countdownSec}
                cb={() => dataStore.setCountdownSec(commodityId)}
              />
            </Desc>
          ) : null}
          <Desc warning>注意事項：</Desc>
          <Desc>
            單抽開獎保護360秒，五連抽開獎保護900秒，十連抽開獎保護1200秒。
          </Desc>
          <Desc warning large>
            下單前須知：
          </Desc>
          <Desc warning>
            一番賞、盲盒商品為「線上機率型」商品，一但完成抽獎程序，恕無法接受「退貨及退款」！
          </Desc>

          {commodity.isValidateDrawOutTimes && '抽出次數已達上限'}
        </Info>
      </InfoContainer>
      <div>
        {commodity.tags.map((t) => (
          <Tag>{t.tagName}</Tag>
        ))}
      </div>
      <PrizeContainer id="prize">
        {nowDisplay !== commodity && (
          <Prize
            data={commodity}
            onClick={() => setNowDisplay(commodity)}
            isCommodity
          />
        )}
        {commodity.prizes?.map((p) => (
          <Prize key={p.id} data={p} onClick={() => setNowDisplay(p)} />
        ))}
      </PrizeContainer>
      {showLotteryContainer && (
        <>
          {enableDrawOut && (
            <>
              <BtnBlock>
                <Radio.Group
                  onChange={(e) => setDrawOutTimes(e.target.value)}
                  value={drawOutTimes}
                  optionType="button"
                  options={drawTimeOptions}
                />
              </BtnBlock>
              <BtnBlock>
                {drawOutTimes > 1 && (
                  <DrawOutBtn onClick={() => setSelectedPrizes([])}>
                    重新選擇
                  </DrawOutBtn>
                )}
                <DrawOutBtn onClick={handleDrawOut}>送出</DrawOutBtn>
              </BtnBlock>
            </>
          )}
          <DrawOutInfo>
            <span>剩餘數量： {commodity.totalDrawOutTimes} </span>
            <span>/</span>
            <span>總數量： {commodity.fixedTotalDrawOutTimes}</span>
          </DrawOutInfo>
          <LotteryBlock
            prizes={commodity.prizeIndexs || []}
            enableDrawOut={enableDrawOut}
            selectedPrizes={selectedPrizes}
            setSelectedPrizes={setSelectedPrizes}
            drawOutTimes={drawOutTimes}
            category={commodity.category}
          />
          {enableDrawOut && (
            <BtnBlock>
              {drawOutTimes > 1 && (
                <DrawOutBtn onClick={() => setSelectedPrizes([])}>
                  重新選擇
                </DrawOutBtn>
              )}
              <DrawOutBtn onClick={handleDrawOut}>送出</DrawOutBtn>
            </BtnBlock>
          )}
        </>
      )}
      <Description
        id="description"
        dangerouslySetInnerHTML={{ __html: nowDisplay?.introduce }}
      />
      <Description>
        <p>【雙重中獎】無二次中獎且不附籤紙。</p>
        <p>
          【商品版本】根據合作店家的供應來源，可能會有多個不同版本的商品。如果您有疑問，請在購買前詢問。
        </p>
        <p>
          【商品量產】這些玩具是大量生產的產品，全新商品不能保證不會有原廠的缺陷。由於運送過程中可能會損壞包裝，請自行承擔風險。
        </p>
        <p>【出貨規定】我們使用宅配服務進行貨物的發送。</p>
        <p>
          在商品發送之前，請確保提供的姓名和其他資訊是正確的，以確保順利的物流運送。如果由於個人填寫錯誤導致無法正常配送，買家需要自行支付再次發送的費用。{' '}
        </p>
        <p>
          【到貨時間】我們通常會在申請出貨後的第二天開始計算，然後在 10到
          14個工作日內（不包括例假日）送達給消費者。一些供應商可能會有彈性的發貨日期，詳細請參考商品頁面。
        </p>
        <p>
          【包裝狀況說明】由於商品在原廠製作、運送和通過海關檢查的過程中可能會損壞包裝或被原廠二次檢查，所以請注意。如果您對包裝狀況要求很高，建議您不要購買。
        </p>
        <p>
          【全新未開封】這表示商品本身是未拆封的，不包括宣傳材料、運輸包裝等商品附加物品。如果您對運輸包裝有特殊要求，建議您不要購買。
        </p>
        <p>
          【商品開箱】收到商品後，請錄製完整的開箱過程，影片應該完整記錄整個過程，不要有中斷。如果您發現任何問題，請在三天內向我們報告。
        </p>
        <p>
          【金融事項】根據政府的金融法規，短時間內頻繁刷卡可能被視為風險行為，並可能導致暫停信用卡功能。建議您一次性購買足夠的金幣以避免此情況。
        </p>
      </Description>
    </Layout>
  )
  function onSectionNavClick(id) {
    return () => {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
  }

  function handleDrawOut() {
    const req = {
      commodityId,
      times: drawOutTimes,
      consecutive: drawOutTimes !== 1,
      chooseIndexes: selectedPrizes,
    }
    onSectionNavClick('layout')()
    setDrawOutReq({
      req,
      category: commodity.category,
      totalDrawOutTimes: commodity.totalDrawOutTimes,
      totalCost: getTotalCost(drawOutTimes, commodity),
    })
    dataStore.setDrawOutStatus(DRAW_OUT_STATUS.CONFIRMING)
  }

  function onResultDialogClose() {
    setShouldResultDialogOpen(false)
    dataStore.clearDrawOutResult()
  }

  function getTotalCost(drawOutTimes, commodity) {
    if (drawOutTimes === 5) return drawOutTimes * commodity.drawOut5Price
    if (drawOutTimes === 10) return drawOutTimes * commodity.drawOut10Price
    return commodity.drawOut1Price
  }
}
