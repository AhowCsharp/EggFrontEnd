import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import Products from '@app/shared/products'
import Pagination from '@app/shared/products/pagination'
import {
  DEFAULT_COMMODITIES_PAGINATION,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Commodities({ manufacturerName }) {

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = searchParams.get('page')
  const commodities = useSelector(() => dataStore.commodities)
  const [status, setStatus] = useState(COMMODITY_STATUS.OPENING)
  const [shouldSortDialogOpen, setShouldSortDialogOpen] = useState(false)
  const filterOptions = useSelector(
    () => dataStore.filterOptionsByCategory[manufacturerName]
  )

  useEffect(() => {
    let pageNumber = 1
    if (page && !isNaN(page)) {
      pageNumber = page
    } else {
      searchParams.delete('page')
      searchParams.set('page', 1)
      navigate(`${location.pathname}?${searchParams.toString()}`);
      return
    }
    const req = {
      manufacturerName,
      status,
      ...filterOptions,
      ...DEFAULT_COMMODITIES_PAGINATION,
      pageNumber: pageNumber,
    }
    dataStore.getCommodities(req)
  }, [status, manufacturerName, filterOptions, page])

  useEffect(() => {
    if (!filterOptions) dataStore.setFilterOptions(manufacturerName, {})
  }, [filterOptions])

  if (!commodities) return <Layout />
  return (
    <Layout>
      <Products
        data={commodities.data}
        status={status}
        setStatus={setStatus}
        shouldSortDialogOpen={shouldSortDialogOpen}
        setShouldSortDialogOpen={setShouldSortDialogOpen}
        setFilterOptions={(opts) =>
          dataStore.setFilterOptions(manufacturerName, opts)
        }
        filterOptions={filterOptions}
        manufacturerName={manufacturerName}
        isHome={false}
      />
      <Pagination
        onChange={(pageNumber, pageSize) => {
          searchParams.set('page', pageNumber)
          navigate(`${location.pathname}?${searchParams.toString()}`);
          // const req = {
          //   manufacturerName,
          //   status,
          //   pageNumber,
          //   pageSize,
          //   ...filterOptions,
          // }
          // dataStore.getCommodities(req)
        }}
        pageNumber={isNaN(page) ? 1 : page}
        totalCount={commodities.totalCount}
      />
    </Layout>
  )
}
