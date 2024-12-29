import Layout from '@app/shared/layout'
import { useSelector, dataStore } from '@app/store'
import Products from '@app/shared/products'
import Pagination from '@app/shared/products/pagination'
import {
  CATEGORY,
  DEFAULT_COMMODITIES_PAGINATION,
  COMMODITY_STATUS,
} from '@app/utils/constants'
import { useEffect, useState } from 'react'
import { SEO } from '@app/shared/SEO'
import { useLocation, useNavigate } from 'react-router-dom'
const Category = CATEGORY.LUCKY_BAG

export default function LuckyBag() {

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = searchParams.get('page')
  const commodities = useSelector(() => dataStore.commodities)
  const [status, setStatus] = useState(COMMODITY_STATUS.OPENING)
  const [shouldSortDialogOpen, setShouldSortDialogOpen] = useState(false)
  const filterOptions = useSelector(
    () => dataStore.filterOptionsByCategory[Category]
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
      category: Category,
      status,
      ...filterOptions,
      ...DEFAULT_COMMODITIES_PAGINATION,
      pageNumber: pageNumber,
    }
    dataStore.getCommodities(req)
  }, [status, filterOptions, page])

  if (!commodities) return <Layout />
  return (
    <Layout>
      <SEO type="lucky-bag" />
      <Products
        data={commodities.data}
        status={status}
        setStatus={setStatus}
        category={Category}
        shouldSortDialogOpen={shouldSortDialogOpen}
        setShouldSortDialogOpen={setShouldSortDialogOpen}
        setFilterOptions={(opts) => dataStore.setFilterOptions(Category, opts)}
        filterOptions={filterOptions}
      />
      <Pagination
        onChange={(pageNumber, pageSize) => {
          searchParams.set('page', pageNumber)
          navigate(`${location.pathname}?${searchParams.toString()}`);
          // const req = {
          //   category: Category,
          //   pageNumber,
          //   pageSize,
          // }
          // dataStore.getCommodities(req)
        }}
        pageNumber={isNaN(page) ? 1 : page}
        totalCount={commodities.totalCount}
      />
    </Layout>
  )
}
