import styled from 'styled-components'
import BaseDollarSign from '@app/shared/dollarSign'
import { CATEGORY } from '@app/utils/constants'
import { Block } from './index'

const BasePrice = styled.div`
  color: #ffc107;
  font-size: 3.75rem;
  font-weight: 700;
  margin-right: 10px;
  display: flex;
  align-items: center;
`

const DiscountPrice = styled(BasePrice)`
  color: ${(p) => p.theme.color.gray};
  font-size: 1.5rem;
  font-weight: normal;
  span {
    text-decoration: line-through;
    &.discount {
      color: ${(p) => p.theme.color.discount};
      font-size: 3.75rem;
      font-weight: 700;
      text-decoration: none;
      margin-left: 5px;
    }
  }
`

export default function Price({ category, drawOut1Price, discount }) {
  if (category === CATEGORY.LUCKY_BAG)
    return (
      <Block>
        <BasePrice>
          <DollarSign category={category} />1
        </BasePrice>
        /抽
      </Block>
    )
  if (discount) {
    const discountPrice = Math.round((drawOut1Price * discount) / 100)
    return (
      <Block>
        <DiscountPrice>
          <DollarSign category={category} />
          <span>{drawOut1Price}</span>
          <span className="discount">{discountPrice}</span>
        </DiscountPrice>
        /抽
      </Block>
    )
  }
  return (
    <Block>
      <BasePrice>
        <DollarSign category={category} />
        {drawOut1Price}
      </BasePrice>
      /抽
    </Block>
  )
}

function DollarSign({ category }) {
  return <BaseDollarSign category={category} size="2.5" mr8 />
}
