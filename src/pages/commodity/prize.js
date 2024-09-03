import styled from 'styled-components'
import { PRIZE_LEVEL } from '@app/utils/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0;
  justify-content: space-between;
  cursor: pointer;
  img {
    width: 150px;
    height: 150px;
    &:hover {
      transform: scale(1.03);
    }
  }
  h4 {
    margin: 8px 0;
  }
`

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(p) =>
    PRIZE_LEVEL[p.prizeLevel]?.color || p.theme.color.defaultPrizeTag};
  color: #fff;
  max-width: 180px;
  border-radius: 100px;
  flex-direction: row;
  padding: 8px;
  margin-top: 8px;
`

export default function Prize({ data, onClick, isCommodity }) {
  const name = data?.prizeName || data?.name
  return (
    <Container onClick={onClick}>
      <img src={data?.imgUrl} alt={name} />
      <h4>{name}</h4>
      {!isCommodity && (
        <>
          <span>回收價格：{data.reclaimPrice}</span>
          <PrizeLevelAndAmount {...data} />
        </>
      )}
    </Container>
  )
}

function PrizeLevelAndAmount({ prizeLevel, amount, fixedAmount }) {
  return (
    <Label prizeLevel={prizeLevel}>
      <span>{PRIZE_LEVEL[prizeLevel].name}</span>
      <span>
        {amount}/{fixedAmount}
      </span>
    </Label>
  )
}
