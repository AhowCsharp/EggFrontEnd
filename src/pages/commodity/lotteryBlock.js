import styled from 'styled-components'
import lotteryImgs from '@app/static/lottery'
import Pagination from '@app/shared/products/pagination'
import { useState, useEffect, useRef } from 'react'
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
  ${(p) => !p.isDone && hoverStyle}

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
  category,
}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const lotteryImg = lotteryImgs[category] || lotteryImgs.default
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
                src={lotteryImg.img}
                hover={lotteryImg.hover}
                enableDrawOut={enableDrawOut}
                onClick={handleSelectPrize}
                isSelected={selectedPrizes.includes(index)}
              />
            )

          const src = lotteryImg.done[p?.prizeLevel] && lotteryImg.done
          return <Lottery key={index} index={index} src={src} isDone={true} />
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
  isDone = false,
  hover,
}) {
  const gifRef = useRef(null)
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
