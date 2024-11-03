import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import { useParams, useNavigate } from 'react-router-dom'
import { breadCrumbs } from '@app/utils/paths'
import paths from '@app/utils/paths'
import ManufacturerTag from '@app/shared/tag'
import {
  DRAW_OUT_STATUS,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import CountdownTimer from '@app/shared/countdownTimer'
import { hideScrollBarStyle } from '@app/shared/header'
import BaseShipFeeIcon from '@app/static/truck.png'
import ScrollToDrawButton from '@app/shared/scrollToDrawButton'
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

const DrawOutTimesTag = styled.div`
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${(p) => p.theme.color.drawOutTimeBtn};
  color: ${(p) => p.theme.color.drawOutTimeBtn};
  display: flex;
  flex-wrap: wrap;
`

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    ${DrawOutTimesTag} {
      color: ${(p) => p.theme.mobile.color.font};
      border-color: ${(p) => p.theme.mobile.color.font};
      span {
        border-color: ${(p) => p.theme.mobile.color.font};
      }
    }
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
  p {
    margin: 5px 0;
  }
`

const Name = styled.div`
  color: #3e3e3e;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 10px 0;
  @media (max-width: 768px) {
    color: ${(p) => p.theme.mobile.color.font};
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
  margin: 10px 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -14px;
    width: 0;
    height: 0;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 14px solid #bdaa96;
    z-index: 1;
  }
`

const TagBlock = styled.div`
  ${Tag} + ${Tag} {
    margin-left: 1.5rem;
  }
`

const DrawOutBtn = styled.div`
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.color.red};
  background: ${(p) => (p.isWhite ? '#fff' : p.theme.color.red)};
  color: ${(p) => (p.isWhite ? p.theme.color.red : '#fff')};
  text-align: center;
  margin-left: 5px;
  @media (max-width: 768px) {
    padding: 0.5rem;
    flex: 1;
    margin-left: 0;
    margin-right: 5px;
  }
`

export { DrawOutBtn, DrawOutBtn as Button }

export const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const DrawOutBtnBlock = styled(Block)`
  margin-bottom: 10px;
  ${DrawOutBtn} + ${DrawOutBtn} {
    margin-left: 1rem;
  }
`

export const MobileDrawOutBtnBlock = styled(Block)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background: #fff;
    padding: 0 10px;
    margin: 0;
    z-index: ${(p) => p.theme.zIndex.dialog};
  }
`

const SelectedNumbers = styled.div`
  flex: 1;
  text-align: left;
  color: ${(p) => p.theme.color.red};
  font-weight: bold;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const SelectedText = styled.span`
  color: ${(p) => p.theme.color.red};
  font-weight: bold;
`

const SelectedTextRed = styled(SelectedText)`
  color: red;
`

const DescBlock = styled.div`
  background-color: #f2f2f2;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  @media (max-width: 768px) {
    background-color: ${(p) => p.theme.mobile.color.descBg};
  }
`

const Desc = styled.p`
  line-height: 1.25rem;
  color: ${(p) => p.warning && p.theme.color.warning};
  ${(p) => p.large && 'font-size: 1.25rem;'}
  ${(p) => p.bold && 'font-weight: bold;'}
  margin: 10px 0 0;
  @media (max-width: 768px) {
    color: ${(p) => p.warning && p.theme.mobile.color.warning};
  }
`

export const Header = styled.div`
  border-bottom: 1px solid
    ${(p) => (p.red ? p.theme.color.red : p.theme.color.headerBottomLine)};
  color: ${(p) => (p.red ? p.theme.color.red : '#160d00')};
  font-size: 1.5rem;
  padding-bottom: 8px;
  margin: 2rem 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  &.lottery {
    padding-bottom: 0;
  }
  div.block {
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    color: ${(p) => p.theme.mobile.color.font};
    border-color: ${(p) => p.theme.color.headerBottomLine};
    &.lottery {
      padding-bottom: 8px;
      .block {
        display: none;
      }
    }
  }
`

const DrawOutTimesTagBlock = styled(Block)`
  margin: 10px 0;
  ${DrawOutTimesTag} + ${DrawOutTimesTag} {
    margin-left: 0.75rem;
  }
  .label {
    padding-right: 6px;
    margin-right: 6px;
    border-right: 1px solid ${(p) => p.theme.color.drawOutTimeBtn};
  }
`

const ShipFeeIcon = styled.div`
  background-color: ${(p) => p.theme.color.red};
  position: relative;
  padding: 0.5rem;
  padding-right: 0.75rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(45deg);
    display: block;
    position: absolute;
    right: -8px;
    top: 50%;
  }
  img {
    width: 1rem;
    height: auto;
  }
`

const ShipFee = styled.div`
  background-color: #fff;
  border: 1px solid ${(p) => p.theme.color.red};
  border-radius: 4px;
  color: ${(p) => p.theme.color.red};
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .value {
    margin: 0 0.5rem;
  }
`

export default function Commodity() {
  const params = useParams()
  const goto = useNavigate()
  const commodityId = +params.commodityId
  const commodity = useSelector(() => dataStore.commodity)
  const drawOutStatus = useSelector(() => dataStore.drawOutStatus)
  const protectPlayer = useSelector(() => dataStore.protectPlayer)
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
  const [protectOneShot, setProtectOneShot] = useState(180)
  const [protectFiveShot, setProtectFiveShot] = useState(600)
  const [protectTenShot, setProtectTenShot] = useState(780)

  const shouldDisplayDrawOutTimesTagBlock =
    commodity?.drawOut5Price !== null || commodity?.drawOut10Price !== null

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

    switch (commodity.category) {
      case '扭蛋':
        setProtectOneShot(120)
        setProtectFiveShot(180)
        setProtectTenShot(300)
        break
      case '福袋':
        setProtectOneShot(180)
        setProtectFiveShot(240)
        setProtectTenShot(360)
        break
      default:
        setProtectOneShot(180)
        setProtectFiveShot(600)
        setProtectTenShot(780)
        break
    }
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
            protectPlayer={protectPlayer}
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
          <Block className="between">
            <ManufacturerTag
              name={commodity.manufacturerName}
              id={commodity.manufacturerId}
            />
            <ShipFeeTag freight={nowDisplay?.freight} />
          </Block>

          <Name>{commodity.name}</Name>
          <Price
            category={commodity.category}
            drawOut1Price={commodity.drawOut1Price}
            discount={commodity.discount}
          />
          {shouldDisplayDrawOutTimesTagBlock && (
            <>
              <DrawOutTimesTagBlock>
                {commodity.drawOut5Price !== null && (
                  <DrawOutTimesTag>
                    <span className="label">五連抽</span>
                    {`每抽 ${Math.round(commodity.drawOut5Price)} 元`}
                  </DrawOutTimesTag>
                )}
                {commodity.drawOut10Price !== null && (
                  <DrawOutTimesTag>
                    <span className="label">十連抽</span>
                    {`每抽 ${Math.round(commodity.drawOut10Price)} 元`}
                  </DrawOutTimesTag>
                )}
              </DrawOutTimesTagBlock>
            </>
          )}
          <DrawOutBtnBlock className="hide-in-mobile">
            {commodity.status === COMMODITY_STATUS.OPENING && (
              <DrawOutBtn
                onClick={() => {
                  if (!isLogged) return goto(paths.login)

                  setEnableDrawOut(true)
                  setShowLotteryContainer(true)
                }}
              >
                開抽
              </DrawOutBtn>
            )}
            <DrawOutBtn isWhite onClick={() => setShowLotteryContainer(true)}>
              檢視抽況
            </DrawOutBtn>
          </DrawOutBtnBlock>
          <DescBlock>
            { commodity.protectTime && commodity.protectTime > 0 && (
                <Desc warning>
                保護玩家: {commodity.protectPlayer}⏰ 賞品鎖定中，解鎖倒數🛸               
                <CountdownTimer
                  initialSeconds={commodity.protectTime}
                  cb={() => dataStore.setCountdownSec(commodityId)}
                />
              </Desc>
            ) }
            <Desc bold>注意事項</Desc>
            <Desc>
              單抽開獎保護{protectOneShot}秒，五連抽開獎保護{protectFiveShot}
              秒，十連抽開獎保護{protectTenShot}秒。
            </Desc>
            <Desc warning bold>
              抽獎前須知
            </Desc>
            <Desc warning>
              任何廠商皆無法手動下架已經被抽過獎的賞品，請各位哥們放心，平台罩著 🧙‍♂️ <br/><br/>
              若該獎品上方出現 🔥，即代表" 所有 "貼上此圖標的獎品" 一起 " 被抽完後才會下架 !<br/>
              { !commodity.protectTime && (
                <>
                  <br/>
                  一番賞、盲盒、扭蛋、特別賞、抽獎型商品皆為「線上機率型」商品 ! <br/>
                  <br/>
                  一但完成抽獎程序，恕無法接受「退貨及退款」！🙆‍♂️🙇‍♀️🧏🙋‍♂️🤴🧕👰🤱🙋<br/> 
                </>
              )}
            </Desc>
          </DescBlock>
          {commodity.isValidateDrawOutTimes && '抽出次數已達上限'}
        </Info>
      </InfoContainer>
      <TagBlock>
        {commodity.tags.map((t) => (
          <Tag key={t.tagName}>{t.tagName}</Tag>
        ))}
      </TagBlock>
      <Header>獎品一覽</Header>
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
      <Header>獎品說明</Header>
      <Description
        id="description"
        dangerouslySetInnerHTML={{ __html: nowDisplay?.introduce }}
      />
      {showLotteryContainer && (
        <>
          <LotteryBlock
            commodity={commodity}
            enableDrawOut={enableDrawOut}
            selectedPrizes={selectedPrizes}
            setSelectedPrizes={setSelectedPrizes}
            drawOutTimes={drawOutTimes}
            handleDrawOut={handleDrawOut}
            setDrawOutTimes={setDrawOutTimes}
          />
        </>
      )}
      <Header>下單前須知</Header>
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
          【到貨時間】我們通常會在申請出貨後的隔日開始計算，然後在 7
          個工作日內（不包括例假日）處理配送物流給消費者。一些供應商可能會有彈性的發貨日期，詳細請參考商品頁面的介紹。
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
      {enableDrawOut && (
        <ScrollToDrawButton selectedPrizes={selectedPrizes} />
      )}
      {/* 将移动端按钮通过 Portal 渲染到 body 下 */}
      {ReactDOM.createPortal(
        <MobileDrawOutBtnBlock>
          {enableDrawOut ? (
            <>
              <SelectedNumbers>
                {selectedPrizes.length > 0 ? (
                  <SelectedText>
                    已選擇: {selectedPrizes.join('、')}
                  </SelectedText>
                ) : (
                  <SelectedTextRed>未選擇</SelectedTextRed>
                )}
              </SelectedNumbers>
              <ButtonsContainer>
                <DrawOutBtn onClick={handleDrawOut}>抽獎</DrawOutBtn>
                <DrawOutBtn isWhite onClick={handleRandomSelect}>
                  隨機
                </DrawOutBtn>
                <DrawOutBtn isWhite onClick={handleReselect}>
                  重選
                </DrawOutBtn>
              </ButtonsContainer>
            </>
          ) : (
            <>
              <DrawOutBtn
                onClick={() => {
                  if (!isLogged) return goto(paths.login)
                  setEnableDrawOut(true)
                  setShowLotteryContainer(true)
                }}
              >
                開抽
              </DrawOutBtn>
              <DrawOutBtn isWhite onClick={() => setShowLotteryContainer(true)}>
                檢視抽況
              </DrawOutBtn>
            </>
          )}
        </MobileDrawOutBtnBlock>,
        document.body
      )}
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

  function handleRandomSelect() {
    // 根据 drawOutTimes 随机选择对应数量的号码
    const availablePrizes = commodity.prizes.filter(
      (p) => !selectedPrizes.includes(p.id)
    )
    if (availablePrizes.length >= drawOutTimes) {
      const randomIndexes = []
      while (randomIndexes.length < drawOutTimes) {
        const randomIndex = Math.floor(Math.random() * availablePrizes.length)
        const prizeId = availablePrizes[randomIndex].id
        if (!randomIndexes.includes(prizeId)) {
          randomIndexes.push(prizeId)
        }
      }
      setSelectedPrizes(randomIndexes)
    } else {
      // 如果剩余的奖品不足，则全选
      setSelectedPrizes(availablePrizes.map((p) => p.id))
    }
  }

  function handleReselect() {
    // 清空已选择的号码
    setSelectedPrizes([])
  }

  function onResultDialogClose() {
    setShouldResultDialogOpen(false)
    dataStore.clearDrawOutResult()
  }

  function getTotalCost(drawOutTimes, commodity) {
    const { drawOut1Price, drawOut5Price, drawOut10Price, discount } =
      commodity
    if (!discount) {
      if (drawOutTimes === 5) return drawOutTimes * drawOut5Price
      if (drawOutTimes === 10) return drawOutTimes * drawOut10Price
      return drawOut1Price
    } else {
      if (drawOutTimes === 5)
        return drawOutTimes * Math.round((drawOut5Price * discount) / 100)
      if (drawOutTimes === 10)
        return drawOutTimes * Math.round((drawOut10Price * discount) / 100)
      return Math.round((drawOut1Price * discount) / 100)
    }
  }
}

function ShipFeeTag({ freight }) {
  if (!freight) return null
  return (
    <ShipFee>
      <ShipFeeIcon>
        <img src={BaseShipFeeIcon} alt="運費圖標" />
      </ShipFeeIcon>
      <span className="value"> {`NT$ ${freight}`}</span>
    </ShipFee>
  )
}
