import styled from 'styled-components'
import { useState, useEffect } from 'react'
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
import SortDialog, { SortType } from './sortDialog'
import FilterDialog from './filterDialog'
import ManufacturerHeader from '../../pages/manufacturer/manufacturerHeader'

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
  width: 100%;
  .item:not(:nth-child(4n + 1)) {
    margin-left: 8px;
  }
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    flex-wrap: wrap;
    .item + .item {
      margin-left: 0;
    }
    .item:nth-child(even) {
      margin-left: 8px;
    }
  }
`

const DrawOutProductContainer = styled.div`
  display: flex;
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  align-items: center;
  padding: 10px 0;
  margin: 1rem 0;
  flex-wrap: wrap;
  min-height: 150px;
  width: 100%;
  gap: 8px;

  .item {
    flex: 1 1 calc((100% - (8px * 4)) / 5);
    max-width: calc((100% - (8px * 4)) / 5);
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    flex-wrap: wrap;
    gap: 8px;

    .item {
      flex: 1 1 calc((100% - 8px) / 2);
      max-width: calc((100% - 8px) / 2);
    }
  }
`;

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
  @media (max-width: 768px) {
    .ant-radio-button-wrapper {
      background-color: ${(p) => p.theme.mobile.color.background};
      color: ${(p) => p.theme.mobile.color.font};
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;

  > div + div {
    margin-left: 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    &.inside-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
`
export default function Products({
  data,
  category,
  isBase = false,
  status = false,
  setStatus,
  shouldDisplayControlBar = true,
  shouldSortDialogOpen,
  setShouldSortDialogOpen,
  filterOptions,
  setFilterOptions,
  manufacturerName,
  isHome = true,
  isDrawOutShowAll = false,
}) {
  const goto = useNavigate()
  const isSoldOut = status === COMMODITY_STATUS.CLOSED
  const [sortType, setSortType] = useState(SortType.Default)
  const [sortedData, setSortedData] = useState(data)

  const [shouldFilterDialogOpen, setShouldFilterDialogOpen] = useState(false)

  useEffect(() => {
    setSortedData(data)
    setSortType(SortType.Default)
  }, [data])

  useEffect(() => {
    if (isBase || !sortType || !data || !data.length) return
    const d = [...data]
    switch (sortType) {
      case SortType.Default:
        setSortedData(d)
        break
      case SortType.TimeNewToOld:
        setSortedData(
          d.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        )
        break
      case SortType.TimeOldToNew:
        setSortedData(
          d.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
        )
        break
      case SortType.PriceHighToLow:
        setSortedData(d.sort((a, b) => b.drawOut1Price - a.drawOut1Price))
        break
      case SortType.PriceLowToHigh:
        setSortedData(d.sort((a, b) => a.drawOut1Price - b.drawOut1Price))
        break
      case SortType.CountMoreToLess:
        setSortedData(
          d.sort((a, b) => b.totalDrawOutTimes - a.totalDrawOutTimes)
        )
        break
      case SortType.CountLessToMore:
        setSortedData(
          d.sort((a, b) => a.totalDrawOutTimes - b.totalDrawOutTimes)
        )
        break
    }
  }, [category, sortType, manufacturerName])

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
        {!isBase && shouldDisplayControlBar && (
          <ButtonContainer className="inside-container">
            <Button
              type={BUTTON_TYPE.FILTER}
              onClick={() => setShouldFilterDialogOpen(true)}
            />
            <Button onClick={() => setShouldSortDialogOpen(true)} />
          </ButtonContainer>
        )}
      </ButtonContainer>
      {!!category && <Header category={category} />}
      {!category && !isHome && <ManufacturerHeader/>}
      {
        sortedData && sortedData.length ? (
          isDrawOutShowAll ? (
            <DrawOutProductContainer>
              {sortedData.map((p, index) => (
                <Product
                  key={index}
                  data={p}
                  handleClick={handleClick}
                  isBase={isBase}
                  isSoldOut={isSoldOut}
                />
              ))}
            </DrawOutProductContainer>
          ) : (
            <ProductContainer>
              {sortedData.map((p, index) => (
                <Product
                  key={index}
                  data={p}
                  handleClick={handleClick}
                  isBase={isBase}
                  isSoldOut={isSoldOut}
                />
              ))}
            </ProductContainer>
          )
        ) : (
          <ProductContainer center={true}>無結果</ProductContainer>
        )
      }
      {shouldSortDialogOpen && (
        <SortDialog
          onClose={() => setShouldSortDialogOpen(false)}
          onClick={setSortType}
          type={sortType}
        />
      )}
      {shouldFilterDialogOpen && (
        <FilterDialog
          onClose={() => setShouldFilterDialogOpen(false)}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          category={category}
          manufacturerName={manufacturerName}
        />
      )}
    </>
  )
  function handleClick(data) {
    return () => {
      goto(url.commodity({ commodityId: data.id }))
    }
  }
}
