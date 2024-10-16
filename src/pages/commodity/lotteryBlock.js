import styled from 'styled-components'
import lotteryImgs from '@app/static/lottery'
import Pagination from '@app/shared/products/pagination'
import { useState, useEffect, useRef } from 'react'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'
import { Header } from './index'
const PageSize = DEFAULT_COMMODITIES_PAGINATION.pageSize

function getDrawTimeOptions(drawOutMultiplePriceStatus) {
  if (!drawOutMultiplePriceStatus) return [{ value: 1, label: '單抽' }]
  return [
    { value: 1, label: '單抽' },
    { value: 5, label: '五連抽' },
    { value: 10, label: '十連抽' },
  ]
}

const DisplayMode = {
  Pagination: 0,
  Default: 1,
  Simple: 2,
}

const DisplayModeLocale = {
  [DisplayMode.Default]: '普通模式',
  [DisplayMode.Pagination]: '分頁模式',
  [DisplayMode.Simple]: '演唱會模式',
}

const Block = styled.div`
  align-items: baseline;
  justify-content: center;
  display: flex;
  margin: 2rem 0;
`

const DrawOutInfo = styled.div`
  span + span {
    margin-left: 2rem;
  }
  span.value {
    color: ${(p) => p.theme.color.red};
  }
`

const DrawOutBtn = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: ${(p) => p.theme.color.red};
  color: #fff;
`

const DrawOutTimeBtn = styled(DrawOutBtn)`
  background: unset;
  color: ${(p) => p.theme.color.drawOutTimeBtn};
  border: 1px solid ${(p) => p.theme.color.drawOutTimeBtn};
  margin-left: 1rem;
`

const BtnBlock = styled.div`
  background-color: #f2f2f2;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  width: 100%;
  padding: 1.25rem 1.5rem;
  justify-content: space-between;
  flex-direction: row;
  margin: 10px 0;
  ${Block} {
    margin: 0;
  }
  ${DrawOutBtn} + ${DrawOutBtn} {
    margin-left: 1rem;
  }
`

const LotteryContainer = styled.div`
  padding: 0 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  @media (max-width: 768px) {
    margin: 0 20px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const hoverStyle = `  
&:hover {
  img {
    opacity: 0;
    &.hover-animation {
      opacity: 1;

    }
  }
}`

const BaseLottery = styled.div`
  width: calc(20% - 34px);
  display: flex;
  padding: 5px;
  margin: 10px 17px;
  background-color: ${(p) => (p.isSelected ? '#f4c221' : '#fff')};
  cursor: ${(p) => (p.enableDrawOut ? 'pointer' : 'default')};
  position: relative;
  text-align: center;
  justify-content: center;
  align-items: center;
  img {
    width: 67%;
    &.hover-animation {
      position: absolute;
      left: 16.5%;
      top: 0;
      opacity: 0;
    }
  }

  ${(p) => !p.isDone && hoverStyle}

  @media (max-width: 768px) {
    margin: 10px 8px;
    width: calc(33% - 16px);
    img {
      width: 100%;
      &.hover-animation {
        left: 0;
      }
    }
  }
`

const Button = styled.div`
  background-color: ${(p) => p.isActive && p.theme.color.red};
  color: ${(p) => (p.isActive ? '#fff' : p.theme.color.red)};
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: normal;
`

const SimpleLottery = styled.div`
  width: calc(16.666% - 8px);
  margin: 10px 4px;
  cursor: ${(p) => (p.enableDrawOut ? 'pointer' : 'default')};
  background-color: ${(p) => {
    if (p.isDone) return p.theme.color.gray
    return p.isSelected ? p.theme.color.orange : '#000'
  }};
  padding: 8px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
`

export default function LotteryBlock({
  enableDrawOut,
  selectedPrizes,
  setSelectedPrizes,
  drawOutTimes,
  commodity,
  handleDrawOut,
  setDrawOutTimes,
}) {
  const prizes = commodity.prizeIndexs || []
  const category = commodity.category
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [displayMode, setDisplayMode] = useState(DisplayMode.Pagination)
  const lotteryImg = lotteryImgs[category] || lotteryImgs.default
  const drawTimeOptions = getDrawTimeOptions(
    commodity?.drawOutMultiplePriceStatus
  )
  useEffect(() => {
    setData(prizes.slice((page - 1) * PageSize, page * PageSize))
  }, [prizes, page])

  useEffect(() => {
    if (displayMode === DisplayMode.Pagination) setPage(1)
  }, [displayMode])
  const isSimple = displayMode === DisplayMode.Simple
  const isPaginationMode = displayMode === DisplayMode.Pagination
  return (
    <>
      <Header className="lottery" red>
        幸運抽大獎
        <div className="block">
          {Object.values(DisplayMode).map((mode) => (
            <Button
              key={mode}
              onClick={() => setDisplayMode(mode)}
              isActive={mode === displayMode}
            >
              {DisplayModeLocale[mode]}
            </Button>
          ))}
        </div>
      </Header>
      <DrawOutInfo>
        <span>
          剩餘數量：
          <span className="value">{commodity.totalDrawOutTimes}</span>
        </span>
        <span>
          總數量：
          <span className="value">{commodity.fixedTotalDrawOutTimes}</span>
        </span>
      </DrawOutInfo>
      {enableDrawOut && (
        <>
          <BtnBlock>
            <Block>
              <span className="bold">選擇玩法</span>
              {drawTimeOptions.map((option) => (
                <DrawOutTimeBtn
                  key={option.value}
                  onClick={() => setDrawOutTimes(option.value)}
                >
                  {option.label}
                </DrawOutTimeBtn>
              ))}
            </Block>
            <Block>
              {drawOutTimes > 1 && (
                <DrawOutBtn isActive onClick={() => setSelectedPrizes([])}>
                  重新選擇
                </DrawOutBtn>
              )}
              <DrawOutBtn isActive onClick={handleRandomSelectPrizes}>
                隨機選號
              </DrawOutBtn>
            </Block>
          </BtnBlock>
        </>
      )}
      <LotteryContainer id="lottery" isSimple={isSimple}>
        {(isPaginationMode ? data : prizes).map((p, i) => {
          const index = isPaginationMode ? (page - 1) * PageSize + i : i
          if (!p)
            return (
              <Lottery
                key={index}
                index={index}
                src={lotteryImg.img}
                hover={lotteryImg.hover}
                enableDrawOut={enableDrawOut}
                onClick={handleSelectPrize}
                isSelected={selectedPrizes.includes(index)}
                isSimple={isSimple}
              />
            )

          const src = lotteryImg.done[p?.prizeLevel] && lotteryImg.done
          return (
            <Lottery
              key={index}
              index={index}
              src={src}
              isDone={true}
              isSimple={isSimple}
            />
          )
        })}
      </LotteryContainer>
      {displayMode === DisplayMode.Pagination && (
        <Pagination onChange={setPage} totalCount={prizes.length} alignCenter />
      )}
      {enableDrawOut && (
        <Block>
          <DrawOutBtn onClick={handleDrawOut}>立即抽獎</DrawOutBtn>
        </Block>
      )}
    </>
  )

  function handleRandomSelectPrizes() {
    const nowPagePrizes = data
      .map((p, index) => !p && (page - 1) * PageSize + index)
      .filter((p) => p)
    const randomPrizes = []
    while (randomPrizes.length < drawOutTimes) {
      if (nowPagePrizes.length) {
        const randomIndex = Math.floor(Math.random() * nowPagePrizes.length)
        if (!randomPrizes.includes(nowPagePrizes[randomIndex])) {
          randomPrizes.push(nowPagePrizes[randomIndex])
          nowPagePrizes.splice(randomIndex, 1)
        }
      } else {
        const randomIndex = Math.floor(Math.random() * prizes.length)
        if (!randomPrizes.includes(randomIndex) && !prizes[randomIndex]) {
          randomPrizes.push(randomIndex)
        }
      }
    }
    setSelectedPrizes(randomPrizes)
  }

  function handleSelectPrize(index) {
    if (selectedPrizes.length === drawOutTimes) {
      if (drawOutTimes === 1) setSelectedPrizes([index])
      return
    }
    let newSelectedPrizes = [...selectedPrizes]

    const alreadySelectedIndex = selectedPrizes.findIndex((i) => i === index)
    if (alreadySelectedIndex > -1) {
      newSelectedPrizes.splice(alreadySelectedIndex, 1)
    } else {
      newSelectedPrizes.push(index)
    }
    setSelectedPrizes(newSelectedPrizes)
  }
}

function Lottery({
  src,
  index,
  enableDrawOut = false,
  onClick,
  isSelected,
  isDone = false,
  hover,
  isSimple,
}) {
  const gifRef = useRef(null)
  if (isSimple) {
    return (
      <SimpleLottery
        enableDrawOut={enableDrawOut}
        onClick={handleClick}
        isSelected={isSelected}
        isDone={isDone}
      >
        {index + 1}
      </SimpleLottery>
    )
  }
  return (
    <BaseLottery
      enableDrawOut={enableDrawOut}
      onClick={handleClick}
      isSelected={isSelected}
      isDone={isDone}
      onMouseEnter={() => {
        if (gifRef.current) {
          gifRef.current.src = hover
        }
      }}
    >
      <Info>
        <img src={src} />
        {!isDone && (
          <img ref={gifRef} className="hover-animation" src={hover} />
        )}
        {index + 1}
      </Info>
    </BaseLottery>
  )
  function handleClick() {
    if (!enableDrawOut) return
    onClick?.(index)
  }
}
