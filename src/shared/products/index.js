import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { url } from '@app/utils/paths'
import {
  COMMODITY_STATUS_OPTIONS,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import { Radio } from 'antd'
import Product from './product'

const ProductContainer = styled.div`
  display: flex;
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  align-items: center;
  padding: 10px 0;
  margin: 1rem;
  flex-wrap: wrap;
  margin-top: -20px;
  min-height: 150px;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

export default function Products({
  data,
  isBase = false,
  status = false,
  setStatus,
}) {
  const goto = useNavigate()
  const isSoldOut = status === COMMODITY_STATUS.CLOSED

  return (
    <>
      {status && (
        <Radio.Group
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          optionType="button"
          options={COMMODITY_STATUS_OPTIONS}
        />
      )}
      {data && data.length ? (
        <ProductContainer>
          {data.map((p, index) => (
            <Product
              key={index}
              data={p}
              handleClick={handleClick}
              isBase={isBase}
              isSoldOut={isSoldOut}
            />
          ))}
        </ProductContainer>
      ) : (
        <ProductContainer center={true}>無結果</ProductContainer>
      )}
    </>
  )
  function handleClick(data) {
    return () => {
      goto(url.commodity({ commodityId: data.id }))
    }
  }
}
