import styled from 'styled-components'
import filterIcon from '@app/static/filter.png'
import sortIcon from '@app/static/sort.png'

const BaseButton = styled.div`
  background-color: ${(p) => p.theme.color.red};
  padding: 0 16px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem !important;
  img {
    width: 1.2rem !important;
    height: 1.2rem !important;
    margin-right: 8px !important;
  }
`

export const BUTTON_TYPE = {
  FILTER: 'filter',
  SORT: 'sort',
}

export default function Button({ type }) {
  if (type === BUTTON_TYPE.FILTER) {
    return (
      <BaseButton>
        <img src={filterIcon} />
        篩選
      </BaseButton>
    )
  }
  return (
    <BaseButton>
      <img src={sortIcon} />
      排序
    </BaseButton>
  )
}
