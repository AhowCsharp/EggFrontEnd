import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { url } from '@app/utils/paths'
import {
  COMMODITY_STATUS_OPTIONS,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import { Radio as AntdRadio } from 'antd'
import Header from '@app/shared/categoryHeader'
import Button, { BUTTON_TYPE } from './button'
import Product from './product'

const { Group: BaseRadio } = AntdRadio

const ProductContainer = styled.div`
  display: flex;
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  align-items: center;
  padding: 10px 0;
  margin: 1rem 0;
  flex-wrap: wrap;
  margin-top: -20px;
  min-height: 150px;
  .item + .item {
    margin-left: 15px;
  }
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

const Radio = styled(BaseRadio)`
  .ant-radio-button-wrapper {
    border: none;
    background-color: #fff;
    border-radius: 32px;
    color: #101a29;
    padding: 6px 20px;
    line-height: 20px;
    margin: 0 4px;
    &.ant-radio-button-wrapper-checked,
    &:hover {
      background-color: #f2f3f9;
      color: #3a64ce;
    }
    &::before {
      content: none;
    }
  }
  .ant-wave {
    left: unset !important;
    top: unset !important;
    display: none !important;
    color: inherit !important;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  div + div {
    margin-left: 8px;
  }
`

export default function Products({
  data,
  category,
  isBase = false,
  status = false,
  setStatus,
}) {
  const goto = useNavigate()
  const isSoldOut = status === COMMODITY_STATUS.CLOSED

  return (
    <>
      <ButtonContainer>
        {status && (
          <Radio
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            optionType="button"
            options={COMMODITY_STATUS_OPTIONS}
          />
        )}
        {!!category && (
          <ButtonContainer>
            <Button type={BUTTON_TYPE.FILTER} />
            <Button />
          </ButtonContainer>
        )}
      </ButtonContainer>
      {!!category && <Header category={category} />}
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
