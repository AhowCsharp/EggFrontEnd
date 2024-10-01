import styled from 'styled-components'
import DollarSign from '@app/shared/dollarSign'
import { CATEGORY } from '@app/utils/constants'

const BasePrice = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  z-index: 1;
  color: ${(p) => p.theme.color.orange};
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`

const DiscountPrice = styled(BasePrice)`
  color: #fff;
  font-size: 1rem;
  font-weight: normal;
  span {
    text-decoration: line-through;
    &.discount {
      color: ${(p) => p.theme.color.orange};
      font-size: 2rem;
      font-weight: 700;
      text-decoration: none;
      margin-left: 5px;
    }
  }
`

export default function Price({ category, drawOut1Price, discount }) {
  if (category === CATEGORY.LUCKY_BAG)
    return (
      <BasePrice>
        1<DollarSign category={category} />
      </BasePrice>
    )
  if (discount) {
    const discountPrice = Math.round((drawOut1Price * discount) / 100)
    return (
      <DiscountPrice>
        <span>{drawOut1Price}</span>
        <span className="discount">{discountPrice}</span>
        <DollarSign category={category} />
      </DiscountPrice>
    )
  }
  return (
    <BasePrice>
      {drawOut1Price}
      <DollarSign category={category} />
    </BasePrice>
  )
}
