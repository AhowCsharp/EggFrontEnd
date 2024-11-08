import styled from 'styled-components'
import DollarSign from '@app/shared/dollarSign'
import { CATEGORY } from '@app/utils/constants'

const BasePrice = styled.div`
  margin-right: 8px;
  z-index: 1;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`

const DiscountPrice = styled(BasePrice)`
  color: #fff;
  font-size: 1rem;
  font-weight: normal;

  span {
    text-decoration: line-through;
    color: #565656;

    &.discount {
      color: #000;
      font-size: 1.5rem;
      font-weight: 700;
      text-decoration: none;
      margin-left: 5px;
    }
  }
    
  @media (max-width: 768px) {
    span {
      color: #fff; 
      text-decoration: line-through;
      text-decoration-color: #fff; 
      &.discount {
        color: red; 
        text-decoration: none;
      }
    }
  }
`;

export default function Price({ category, drawOut1Price, discount }) {
  if (category === CATEGORY.LUCKY_BAG)
    return (
      <BasePrice>
        <DollarSign category={category} /> 1
      </BasePrice>
    )
  if (discount) {
    const discountPrice = Math.round((drawOut1Price * discount) / 100)
    return (
      <DiscountPrice>
        <DollarSign catgory={category} />
        <span className="discount">{discountPrice}</span>
        <span>{drawOut1Price}</span>
      </DiscountPrice>
    )
  }
  return (
    <BasePrice>
      <DollarSign category={category} />
      {drawOut1Price}
    </BasePrice>
  )
}
