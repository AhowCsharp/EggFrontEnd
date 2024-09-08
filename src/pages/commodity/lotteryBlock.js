import styled from 'styled-components'
import lotteryImg from '@app/static/lottery/lottery.png'
import lotteryDoneImg from '@app/static/lottery/lottery-done.png'
import lotteryHoverAnimation from '@app/static/lottery/lottery-hover.gif'
import Pagination from '@app/shared/products/pagination'
import { useState, useEffect } from 'react'
import { DEFAULT_COMMODITIES_PAGINATION } from '@app/utils/constants'
import { Info } from './index'

const PageSize = DEFAULT_COMMODITIES_PAGINATION.pageSize

const LotteryContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`

const BaseLottery = styled.div`
  width: calc(20% - 34px);
  display: flex;
  padding: 5px;
  margin: 10px 17px;
  background-color: ${(p) => (p.isSelected ? '#f4c221' : '#fff')};
  cursor: ${(p) => (p.enableDrawOut ? 'pointer' : 'default')};
  position: relative;
  img {
    width: 100%;
    &.hover-animation {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      opacity: 0;
    }
  }
  img ${Info} {
    text-align: center;
  }
  &:hover {
    img {
      opacity: 0;
      &.hover-animation {
        opacity: 1;
      }
    }
  }
  @media (max-width: 768px) {
    margin: 10px 8px;
    width: calc(33% - 16px);
  }
`

export default function LotteryBlock({
  prizes,
  enableDrawOut,
  selectedPrizes,
  setSelectedPrizes,
  drawOutTimes,
}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    setData(prizes.slice((page - 1) * PageSize, page * PageSize))
  }, [prizes, page])

  return (
    <>
      <Pagination onChange={setPage} totalCount={prizes.length} />
      <LotteryContainer id="lottery">
        {data.map((p, i) => {
          const index = (page - 1) * PageSize + i
          if (!p)
            return (
              <Lottery
                key={index}
                index={index}
                src={lotteryImg}
                hover={lotteryHoverAnimation}
                enableDrawOut={enableDrawOut}
                onClick={handleSelectPrize}
                isSelected={selectedPrizes.includes(index)}
              />
            )
          const src = p?.prizeLevel ? lotteryDoneImg : lotteryImg
          return <Lottery key={index} index={index} src={src} />
        })}
      </LotteryContainer>
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
  hover,
}) {
  return (
    <BaseLottery
      enableDrawOut={enableDrawOut}
      onClick={handleClick}
      isSelected={isSelected}
    >
      <Info>
        <img src={src} />
        <img className="hover-animation" src={hover} />
        {index + 1}
      </Info>
    </BaseLottery>
  )
  function handleClick() {
    if (!enableDrawOut) return
    onClick?.(index)
  }
}
