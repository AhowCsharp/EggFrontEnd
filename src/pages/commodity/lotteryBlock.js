import styled from 'styled-components'
import lotteryImgs from '@app/static/lottery'
import Pagination from '@app/shared/products/pagination'
import { useState, useEffect, useRef } from 'react'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'
import { Header } from './index'
const PageSize = DEFAULT_COMMODITIES_PAGINATION.pageSize

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
  prizes,
  enableDrawOut,
  selectedPrizes,
  setSelectedPrizes,
  drawOutTimes,
  category,
}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [displayMode, setDisplayMode] = useState(DisplayMode.Default)
  const lotteryImg = lotteryImgs[category] || lotteryImgs.default
  useEffect(() => {
    setData(prizes.slice((page - 1) * PageSize, page * PageSize))
  }, [prizes, page])
  const isSimple = displayMode === DisplayMode.Simple
  return (
    <>
      <Header isLotteryBlock>
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
      <LotteryContainer id="lottery" isSimple={isSimple}>
        {data.map((p, i) => {
          const index = (page - 1) * PageSize + i
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
    </>
  )
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
